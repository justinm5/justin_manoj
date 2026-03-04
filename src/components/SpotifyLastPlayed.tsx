import { useCallback, useEffect, useState } from "react";
import { Loader2, Music2 } from "lucide-react";

interface SpotifyLastPlayedPayload {
  albumName: string;
  artists: string[];
  isPlaying?: boolean;
  playedAt: string;
  trackName: string;
  trackUrl?: string;
  albumArtUrl?: string;
}

const POLL_INTERVAL_MS = 5000;
const TRACK_CACHE_KEY = "spotify.lastPlayed.cache";

const getCachedTrack = (): SpotifyLastPlayedPayload | null => {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(TRACK_CACHE_KEY);
    if (!raw) {
      return null;
    }
    return JSON.parse(raw) as SpotifyLastPlayedPayload;
  } catch {
    return null;
  }
};

const cacheTrack = (track: SpotifyLastPlayedPayload) => {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(TRACK_CACHE_KEY, JSON.stringify(track));
};

const formatRelativeTime = (playedAt: string) => {
  const playedAtMs = new Date(playedAt).getTime();
  if (Number.isNaN(playedAtMs)) {
    return "recently";
  }

  const elapsedSeconds = Math.max(0, Math.floor((Date.now() - playedAtMs) / 1000));
  if (elapsedSeconds < 60) {
    return "just now";
  }

  const minutes = Math.floor(elapsedSeconds / 60);
  if (minutes < 60) {
    return `${minutes}m ago`;
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours}h ago`;
  }

  const days = Math.floor(hours / 24);
  if (days < 30) {
    return `${days}d ago`;
  }

  const months = Math.floor(days / 30);
  if (months < 12) {
    return `${months}mo ago`;
  }

  return `${Math.floor(months / 12)}y ago`;
};

export const SpotifyLastPlayed = () => {
  const initialTrack = getCachedTrack();
  const isDebugMode =
    import.meta.env.DEV &&
    typeof window !== "undefined" &&
    new URLSearchParams(window.location.search).get("spotifyDebug") === "1";

  const [track, setTrack] = useState<SpotifyLastPlayedPayload | null>(initialTrack);
  const [isLoading, setIsLoading] = useState(!initialTrack);
  const [debugMessage, setDebugMessage] = useState<string | null>(null);

  const loadTrack = useCallback(async (signal?: AbortSignal) => {
    try {
      setDebugMessage(null);
      const response = await fetch("/api/spotify-last-played", {
        cache: "no-store",
        signal,
      });

      if (!response.ok) {
        let apiError = "Could not load Spotify activity.";
        try {
          const errorPayload = (await response.json()) as { error?: string };
          if (errorPayload.error) {
            apiError = errorPayload.error;
          }
        } catch {
          // keep fallback message when error body is non-JSON
        }

        if (isDebugMode) {
          setDebugMessage(`Spotify API ${response.status}: ${apiError}`);
        }
        throw new Error(apiError);
      }

      const payload = (await response.json()) as SpotifyLastPlayedPayload | { trackName: null };
      if ("trackName" in payload && payload.trackName === null) {
        setTrack(null);
      } else {
        const nextTrack = payload as SpotifyLastPlayedPayload;
        setTrack(nextTrack);
        cacheTrack(nextTrack);
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return;
      }
      if (isDebugMode && error instanceof Error) {
        setDebugMessage(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  }, [isDebugMode]);

  useEffect(() => {
    const controller = new AbortController();
    void loadTrack(controller.signal);

    const refreshTrack = () => {
      void loadTrack();
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        refreshTrack();
      }
    };

    const intervalId = window.setInterval(refreshTrack, POLL_INTERVAL_MS);
    window.addEventListener("focus", refreshTrack);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      controller.abort();
      window.clearInterval(intervalId);
      window.removeEventListener("focus", refreshTrack);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [loadTrack]);

  return (
    <div className="overflow-hidden rounded-2xl border border-border/40 p-4 bg-card/20 backdrop-blur-sm">
      <p className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
        What I&apos;m Listening To
      </p>

      {isLoading ? (
        <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="w-4 h-4 animate-spin" />
          Loading latest track...
        </div>
      ) : track ? (
        <a
          href={track.trackUrl ?? "https://open.spotify.com"}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 flex w-full min-w-0 items-center gap-3 group"
        >
          {track.albumArtUrl ? (
            <img
              src={track.albumArtUrl}
              alt={`${track.trackName} album art`}
              className="w-14 h-14 rounded-lg object-cover border border-border/40"
            />
          ) : (
            <div className="w-14 h-14 rounded-lg bg-accent/10 border border-border/40 flex items-center justify-center">
              <Music2 className="w-5 h-5 text-foreground/80" />
            </div>
          )}

          <div className="min-w-0 flex-1">
            <p className="truncate text-base font-semibold leading-tight text-foreground">
              {track.trackName}
            </p>
            <p className="mt-0.5 truncate text-sm text-muted-foreground">
              {track.artists.join(", ")}
            </p>
            <p className="mt-1 text-[11px] tracking-[0.04em] text-muted-foreground">
              {track.isPlaying ? "Now Playing" : `Played ${formatRelativeTime(track.playedAt)}`}
            </p>
          </div>
        </a>
      ) : (
        <p className="mt-3 text-sm text-muted-foreground">No recently played Spotify track found.</p>
      )}

      {isDebugMode && debugMessage ? (
        <p className="mt-2 text-[11px] text-amber-500/85">Debug: {debugMessage}</p>
      ) : null}
    </div>
  );
};
