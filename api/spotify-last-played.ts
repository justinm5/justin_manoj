interface SpotifyTokenPayload {
  access_token?: string;
}

interface SpotifyRecentResponse {
  items?: Array<{
    played_at?: string;
    track?: {
      name?: string;
      artists?: Array<{ name?: string }>;
      external_urls?: { spotify?: string };
      album?: {
        name?: string;
        images?: Array<{ url?: string }>;
      };
    };
  }>;
}

type RuntimeEnv = Record<string, string | undefined>;

interface ApiRequest {
  method?: string;
  url?: string;
}

interface ApiResponse {
  statusCode: number;
  setHeader: (name: string, value: string) => void;
  end: (body: string) => void;
}

const getEnv = () =>
  ((globalThis as typeof globalThis & { process?: { env?: RuntimeEnv } }).process?.env ??
    {}) as RuntimeEnv;

const json = (res: ApiResponse, status: number, body: Record<string, unknown>) => {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(body));
};

const isProductionRuntime = (env: RuntimeEnv) =>
  env.VERCEL_ENV === "production" || env.NODE_ENV === "production";

const getMissingCredentials = (credentials: {
  clientId?: string;
  clientSecret?: string;
  refreshToken?: string;
}) => {
  const missing: string[] = [];
  if (!credentials.clientId) missing.push("SPOTIFY_CLIENT_ID");
  if (!credentials.clientSecret) missing.push("SPOTIFY_CLIENT_SECRET");
  if (!credentials.refreshToken) missing.push("SPOTIFY_REFRESH_TOKEN");
  return missing;
};

const getAccessToken = async (clientId: string, clientSecret: string, refreshToken: string) => {
  const body = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: refreshToken,
  });

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });

  if (!response.ok) {
    return null;
  }

  const payload = (await response.json()) as SpotifyTokenPayload;
  return payload.access_token ?? null;
};

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return json(res, 405, { error: "Method not allowed." });
  }

  const env = getEnv();
  const clientId = env.SPOTIFY_CLIENT_ID;
  const clientSecret = env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = env.SPOTIFY_REFRESH_TOKEN;
  const requestUrl = new URL(req.url ?? "/", "http://localhost");
  const debugRequested = requestUrl.searchParams.get("debug") === "1";
  const productionRuntime = isProductionRuntime(env);

  const missingCredentials = getMissingCredentials({ clientId, clientSecret, refreshToken });
  if (missingCredentials.length > 0) {
    if (!productionRuntime && debugRequested) {
      return json(res, 500, {
        error: "Spotify server credentials are missing.",
        missing: missingCredentials,
        vercelEnv: env.VERCEL_ENV ?? null,
      });
    }

    return json(res, 500, { error: "Spotify server credentials are missing." });
  }

  try {
    const accessToken = await getAccessToken(clientId, clientSecret, refreshToken);
    if (!accessToken) {
      return json(res, 502, { error: "Could not refresh Spotify access token." });
    }

    const recentResponse = await fetch("https://api.spotify.com/v1/me/player/recently-played?limit=1", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!recentResponse.ok) {
      return json(res, 502, { error: "Could not fetch recent Spotify track." });
    }

    const recentPayload = (await recentResponse.json()) as SpotifyRecentResponse;
    const item = recentPayload.items?.[0];
    const track = item?.track;

    if (!track || !track.name || !item?.played_at) {
      return json(res, 200, { trackName: null });
    }

    return json(res, 200, {
      albumArtUrl: track.album?.images?.[0]?.url ?? null,
      albumName: track.album?.name ?? "",
      artists: (track.artists ?? []).map((artist) => artist.name).filter(Boolean),
      playedAt: item.played_at,
      trackName: track.name,
      trackUrl: track.external_urls?.spotify ?? null,
    });
  } catch {
    return json(res, 500, { error: "Unexpected Spotify API error." });
  }
}
