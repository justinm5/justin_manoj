/**
 * Serverless endpoint backing the footer "now playing / last played" widget.
 *
 * Requires three environment variables on the host:
 *   SPOTIFY_CLIENT_ID
 *   SPOTIFY_CLIENT_SECRET
 *   SPOTIFY_REFRESH_TOKEN   (scopes: user-read-currently-playing, user-read-recently-played)
 *
 * When any of them is missing the endpoint returns `{ configured: false }` and
 * the widget renders nothing, so the footer degrades cleanly.
 */

import type { IncomingMessage, ServerResponse } from "node:http";

const TOKEN_URL = "https://accounts.spotify.com/api/token";
const NOW_PLAYING_URL = "https://api.spotify.com/v1/me/player/currently-playing";
const RECENT_URL = "https://api.spotify.com/v1/me/player/recently-played?limit=1";

/** Cache at the edge so a busy page does not burn through Spotify's rate limit. */
const CACHE_CONTROL = "public, max-age=0, s-maxage=2";

type SpotifyArtist = { name: string };
type SpotifyImage = { url: string; width?: number; height?: number };

type SpotifyTrack = {
  name?: string;
  artists?: SpotifyArtist[];
  album?: { images?: SpotifyImage[] };
  external_urls?: { spotify?: string };
};

export type LastPlayedPayload = {
  configured: true;
  isPlaying: boolean;
  title: string;
  artists: string;
  albumArt: string | null;
  url: string | null;
  playedAt: string | null;
};

const sendJson = (
  res: ServerResponse,
  body: unknown,
  status = 200,
  cache = false,
) => {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  if (cache) res.setHeader("Cache-Control", CACHE_CONTROL);
  res.end(JSON.stringify(body));
};

/** Works in Node (Buffer) and Vercel Edge (btoa). */
const encodeBase64 = (value: string): string => {
  if (typeof Buffer !== "undefined") {
    return Buffer.from(value).toString("base64");
  }
  return (globalThis as unknown as { btoa: (s: string) => string }).btoa(value);
};

const getAccessToken = async (
  clientId: string,
  clientSecret: string,
  refreshToken: string,
): Promise<string> => {
  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${encodeBase64(`${clientId}:${clientSecret}`)}`,
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  });

  if (!res.ok) {
    throw new Error(`token refresh failed (${res.status}): ${(await res.text()).slice(0, 200)}`);
  }

  const data = (await res.json()) as { access_token?: string };
  if (!data.access_token) throw new Error("token refresh returned no access_token");
  return data.access_token;
};

const toPayload = (
  track: SpotifyTrack,
  isPlaying: boolean,
  playedAt: string | null,
): LastPlayedPayload => ({
  configured: true,
  isPlaying,
  title: track.name ?? "Unknown track",
  artists: (track.artists ?? []).map((artist) => artist.name).join(", "),
  albumArt: track.album?.images?.at(-1)?.url ?? track.album?.images?.[0]?.url ?? null,
  url: track.external_urls?.spotify ?? null,
  playedAt,
});

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  if (req.method !== "GET" && req.method !== "get") {
    sendJson(res, { error: "Method not allowed" }, 405);
    return;
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID?.trim();
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET?.trim();
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN?.trim();

  if (!clientId || !clientSecret || !refreshToken) {
    sendJson(res, { configured: false }, 200, true);
    return;
  }

  try {
    const accessToken = await getAccessToken(clientId, clientSecret, refreshToken);
    const auth = { Authorization: `Bearer ${accessToken}` };

    const nowPlaying = await fetch(NOW_PLAYING_URL, { headers: auth });

    // 204 means nothing is playing right now; anything 2xx with a body is a track.
    if (nowPlaying.status === 200) {
      const data = (await nowPlaying.json()) as {
        is_playing?: boolean;
        item?: SpotifyTrack | null;
      };
      if (data.item && data.is_playing) {
        sendJson(res, toPayload(data.item, true, null), 200, true);
        return;
      }
    }

    const recent = await fetch(RECENT_URL, { headers: auth });
    if (!recent.ok) {
      sendJson(res, { error: `Spotify error (${recent.status})` }, 502);
      return;
    }

    const data = (await recent.json()) as {
      items?: { track?: SpotifyTrack; played_at?: string }[];
    };
    const item = data.items?.[0];
    if (!item?.track) {
      sendJson(res, { error: "No recent tracks" }, 404);
      return;
    }

    sendJson(res, toPayload(item.track, false, item.played_at ?? null), 200, true);
  } catch (error) {
    sendJson(res, { error: "Request failed", detail: String(error) }, 500);
  }
}
