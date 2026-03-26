import { useCallback, useEffect, useState } from "react";
import { Loader2, Music2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface SpotifyLastPlayedPayload {
  albumName: string;
  artists: string[];
  isPlaying?: boolean;
  playedAt: string;
  trackName: string;
  trackUrl?: string;
  albumArtUrl?: string;
}

interface SpotifyLastPlayedProps {
  embedded?: boolean;
}

const POLL_INTERVAL_MS = 5000;
const TRACK_CACHE_KEY = "spotify.lastPlayed.cache";
const MAX_TITLE_CHARS = 46;
const MAX_ARTISTS_CHARS = 64;

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

const clampText = (value: string, maxChars: number) => {
  if (value.length <= maxChars) {
    return value;
  }
  return `${value.slice(0, maxChars - 1).trimEnd()}...`;
};

export const SpotifyLastPlayed = ({ embedded = false }: SpotifyLastPlayedProps) => {
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
    <div
      className={cn(
        "min-w-0 overflow-hidden relative",
        embedded
          ? "rounded-none p-0 bg-transparent border-0 shadow-none"
          : "rounded-2xl p-4 sm:p-5 bg-card/30 border border-white/12 shadow-[0_24px_60px_rgba(0,0,0,0.6),0_8px_20px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.12)]",
      )}
    >
      {!embedded ? (
        <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-white/5 blur-3xl" />
      ) : null}
      <div className="relative">
        <p className="text-[11px] font-mono uppercase tracking-[0.24em] text-muted-foreground/90">
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
          className="group mt-3 flex w-full min-w-0 items-center gap-3 overflow-hidden"
        >
          {/**
           * Hard clamp text length in addition to CSS ellipsis so extremely long
           * Spotify metadata never stretches the home layout.
           */}
          {track.albumArtUrl ? (
            <img
              src={track.albumArtUrl}
              alt={`${track.trackName} album art`}
              className="h-12 w-12 shrink-0 rounded-xl border border-white/10 object-cover shadow-[0_10px_24px_rgba(0,0,0,0.5)]"
            />
          ) : (
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5">
              <Music2 className="w-4 h-4 text-foreground/80" />
            </div>
          )}

          <div className="min-w-0 basis-0 flex-1">
            <p
              className="block w-full max-w-full overflow-hidden text-ellipsis whitespace-nowrap text-base font-semibold leading-tight text-foreground"
              title={track.trackName}
            >
              {clampText(track.trackName, MAX_TITLE_CHARS)}
            </p>
            <p
              className="mt-0.5 block w-full max-w-full overflow-hidden text-ellipsis whitespace-nowrap text-sm text-muted-foreground"
              title={track.artists.join(", ")}
            >
              {clampText(track.artists.join(", "), MAX_ARTISTS_CHARS)}
            </p>
            <div className="mt-1 flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-muted-foreground/80">
              {track.isPlaying ? (
                <>
                  <span className="h-1.5 w-1.5 rounded-full bg-foreground/70" />
                  Now Playing
                </>
              ) : (
                `Played ${formatRelativeTime(track.playedAt)}`
              )}
            </div>
          </div>
        </a>
      ) : (
        <p className="mt-3 text-sm text-muted-foreground">No recently played Spotify track found.</p>
      )}

      {isDebugMode && debugMessage ? (
        <p className="mt-2 text-[11px] text-amber-500/85">Debug: {debugMessage}</p>
      ) : null}
      </div>
    </div>
  );
};
