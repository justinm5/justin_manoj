import { useEffect, useState } from "react";
import { Loader2, Music2 } from "lucide-react";

interface SpotifyStoredToken {
  accessToken: string;
  refreshToken?: string;
  expiresAt: number;
}

interface SpotifyTokenResponse {
  access_token: string;
  expires_in: number;
  refresh_token?: string;
}

interface SpotifyRecentResponse {
  items?: Array<{
    played_at: string;
    track: {
      name: string;
      artists: Array<{ name: string }>;
      album: {
        images: Array<{ url: string }>;
      };
      external_urls?: {
        spotify?: string;
      };
    };
  }>;
}

interface LastTrack {
  name: string;
  artists: string;
  albumArt?: string;
  playedAt: string;
  trackUrl?: string;
}

const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID as string | undefined;
const SPOTIFY_SCOPE = "user-read-recently-played";

const TOKEN_KEY = "spotify.lastPlayed.token";
const CODE_VERIFIER_KEY = "spotify.pkce.verifier";
const STATE_KEY = "spotify.pkce.state";

const redirectUri = () => `${window.location.origin}/`;

const randomString = (length: number) => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
  const values = crypto.getRandomValues(new Uint8Array(length));
  let result = "";
  for (let i = 0; i < values.length; i += 1) {
    result += chars[values[i] % chars.length];
  }
  return result;
};

const toBase64Url = (input: ArrayBuffer) => {
  const bytes = new Uint8Array(input);
  let binary = "";
  bytes.forEach((value) => {
    binary += String.fromCharCode(value);
  });
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
};

const createCodeChallenge = async (verifier: string) => {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(verifier));
  return toBase64Url(digest);
};

const getStoredToken = (): SpotifyStoredToken | null => {
  const raw = localStorage.getItem(TOKEN_KEY);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as SpotifyStoredToken;
  } catch {
    return null;
  }
};

const setStoredToken = (token: SpotifyStoredToken) => {
  localStorage.setItem(TOKEN_KEY, JSON.stringify(token));
};

const clearStoredToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

const clearAuthParams = () => {
  const url = new URL(window.location.href);
  url.searchParams.delete("code");
  url.searchParams.delete("state");
  url.searchParams.delete("error");
  window.history.replaceState({}, document.title, `${url.pathname}${url.search}${url.hash}`);
};

const exchangeCode = async (code: string, verifier: string) => {
  if (!CLIENT_ID) {
    throw new Error("Spotify client is not configured.");
  }

  const body = new URLSearchParams({
    client_id: CLIENT_ID,
    grant_type: "authorization_code",
    code,
    redirect_uri: redirectUri(),
    code_verifier: verifier,
  });

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  if (!response.ok) {
    throw new Error("Could not authorize Spotify.");
  }

  const payload = (await response.json()) as SpotifyTokenResponse;
  return {
    accessToken: payload.access_token,
    refreshToken: payload.refresh_token,
    expiresAt: Date.now() + payload.expires_in * 1000,
  } as SpotifyStoredToken;
};

const refreshAccessToken = async (token: SpotifyStoredToken) => {
  if (!CLIENT_ID || !token.refreshToken) {
    throw new Error("Spotify refresh token is missing.");
  }

  const body = new URLSearchParams({
    client_id: CLIENT_ID,
    grant_type: "refresh_token",
    refresh_token: token.refreshToken,
  });

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  if (!response.ok) {
    throw new Error("Could not refresh Spotify token.");
  }

  const payload = (await response.json()) as SpotifyTokenResponse;
  return {
    accessToken: payload.access_token,
    refreshToken: payload.refresh_token ?? token.refreshToken,
    expiresAt: Date.now() + payload.expires_in * 1000,
  } as SpotifyStoredToken;
};

const fetchLastPlayedTrack = async (accessToken: string) => {
  const response = await fetch("https://api.spotify.com/v1/me/player/recently-played?limit=1", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!response.ok) {
    throw new Error("Could not fetch recent Spotify track.");
  }

  const payload = (await response.json()) as SpotifyRecentResponse;
  const item = payload.items?.[0];

  if (!item) {
    return null;
  }

  return {
    name: item.track.name,
    artists: item.track.artists.map((artist) => artist.name).join(", "),
    albumArt: item.track.album.images[0]?.url,
    playedAt: item.played_at,
    trackUrl: item.track.external_urls?.spotify,
  } as LastTrack;
};

export const SpotifyLastPlayed = () => {
  const [track, setTrack] = useState<LastTrack | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const loadTrack = async () => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      if (!CLIENT_ID) {
        setIsConnected(false);
        setErrorMessage("Add VITE_SPOTIFY_CLIENT_ID in .env to enable Spotify sync.");
        return;
      }

      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");
      const state = params.get("state");
      const authError = params.get("error");

      if (authError) {
        clearAuthParams();
        setIsConnected(false);
        setErrorMessage("Spotify connection was canceled.");
        return;
      }

      if (code) {
        const storedState = localStorage.getItem(STATE_KEY);
        const verifier = localStorage.getItem(CODE_VERIFIER_KEY);

        if (!state || state !== storedState || !verifier) {
          clearAuthParams();
          throw new Error("Spotify connection validation failed.");
        }

        const token = await exchangeCode(code, verifier);
        setStoredToken(token);
        localStorage.removeItem(CODE_VERIFIER_KEY);
        localStorage.removeItem(STATE_KEY);
        clearAuthParams();
      }

      let token = getStoredToken();
      if (!token) {
        setTrack(null);
        setIsConnected(false);
        return;
      }

      if (token.expiresAt <= Date.now() + 60_000) {
        token = await refreshAccessToken(token);
        setStoredToken(token);
      }

      let recentTrack: LastTrack | null = null;
      try {
        recentTrack = await fetchLastPlayedTrack(token.accessToken);
      } catch {
        token = await refreshAccessToken(token);
        setStoredToken(token);
        recentTrack = await fetchLastPlayedTrack(token.accessToken);
      }

      setTrack(recentTrack);
      setIsConnected(true);
    } catch (error) {
      clearStoredToken();
      setIsConnected(false);
      setTrack(null);
      setErrorMessage(error instanceof Error ? error.message : "Could not load Spotify track.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadTrack();
  }, []);

  const connectSpotify = async () => {
    if (!CLIENT_ID) {
      return;
    }

    const verifier = randomString(96);
    const state = randomString(24);
    const challenge = await createCodeChallenge(verifier);

    localStorage.setItem(CODE_VERIFIER_KEY, verifier);
    localStorage.setItem(STATE_KEY, state);

    const params = new URLSearchParams({
      client_id: CLIENT_ID,
      response_type: "code",
      redirect_uri: redirectUri(),
      scope: SPOTIFY_SCOPE,
      code_challenge_method: "S256",
      code_challenge: challenge,
      state,
      show_dialog: "false",
    });

    window.location.assign(`https://accounts.spotify.com/authorize?${params.toString()}`);
  };

  const playedLabel = track
    ? new Date(track.playedAt).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })
    : null;

  return (
    <div className="rounded-2xl border border-border/40 p-4 bg-card/20 backdrop-blur-sm">
      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
        What I&apos;m Listening To
      </p>

      <div className="mt-3 flex items-center gap-3">
        {track?.albumArt ? (
          <img
            src={track.albumArt}
            alt={`${track.name} album art`}
            className="w-12 h-12 rounded-lg object-cover border border-border/40"
          />
        ) : (
          <div className="w-12 h-12 rounded-lg bg-accent/10 border border-border/40 flex items-center justify-center">
            <Music2 className="w-5 h-5 text-foreground/80" />
          </div>
        )}

        <div className="min-w-0">
          {isLoading ? (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="w-4 h-4 animate-spin" />
              Loading latest track...
            </div>
          ) : track ? (
            <>
              <p className="text-sm font-medium text-foreground truncate">{track.name}</p>
              <p className="text-xs text-muted-foreground truncate">{track.artists}</p>
            </>
          ) : (
            <p className="text-sm text-muted-foreground">
              {errorMessage ?? "Connect Spotify to show your last played song."}
            </p>
          )}
        </div>
      </div>

      {!isLoading && track && (
        <p className="mt-3 text-xs text-foreground/70">
          Last played {playedLabel ? `at ${playedLabel}` : "recently"}.
        </p>
      )}

      <div className="mt-3 flex items-center gap-3">
        {!isConnected ? (
          <button
            type="button"
            onClick={() => void connectSpotify()}
            className="text-sm font-medium text-foreground/80 hover:text-accent transition-colors"
          >
            Connect Spotify
          </button>
        ) : (
          <button
            type="button"
            onClick={() => void loadTrack()}
            className="text-sm font-medium text-foreground/80 hover:text-accent transition-colors"
          >
            Refresh track
          </button>
        )}

        {track?.trackUrl && (
          <a
            href={track.trackUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-foreground/80 hover:text-accent transition-colors"
          >
            Open song
          </a>
        )}
      </div>
    </div>
  );
};
