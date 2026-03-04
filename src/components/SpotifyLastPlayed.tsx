import { useCallback, useEffect, useState } from "react";
import { Loader2, Music2 } from "lucide-react";

interface SpotifyLastPlayedPayload {
  albumName: string;
  artists: string[];
  playedAt: string;
  trackName: string;
  trackUrl?: string;
  albumArtUrl?: string;
}

const POLL_INTERVAL_MS = 20000;

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
  const [track, setTrack] = useState<SpotifyLastPlayedPayload | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const loadTrack = useCallback(async (signal?: AbortSignal) => {
    try {
      const response = await fetch("/api/spotify-last-played", {
        cache: "no-store",
        signal,
      });

      if (!response.ok) {
        throw new Error("Could not load Spotify activity.");
      }

      const payload = (await response.json()) as SpotifyLastPlayedPayload | { trackName: null };
      if ("trackName" in payload && payload.trackName === null) {
        setTrack(null);
      } else {
        setTrack(payload as SpotifyLastPlayedPayload);
      }

      setErrorMessage(null);
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return;
      }
      setErrorMessage("Spotify activity is unavailable right now.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    void loadTrack(controller.signal);

    const intervalId = window.setInterval(() => {
      void loadTrack();
    }, POLL_INTERVAL_MS);

    return () => {
      controller.abort();
      window.clearInterval(intervalId);
    };
  }, [loadTrack]);

  return (
    <div className="rounded-2xl border border-border/40 p-4 bg-card/20 backdrop-blur-sm">
      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
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
          className="mt-3 flex items-center gap-3 group"
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

          <div className="min-w-0">
            <p className="text-xs text-muted-foreground truncate">{track.albumName}</p>
            <p className="text-base font-semibold text-foreground leading-tight truncate">
              {track.trackName}
            </p>
            <p className="mt-0.5 text-sm text-muted-foreground truncate">{track.artists.join(", ")}</p>
            <p className="mt-1 text-[11px] tracking-[0.04em] text-muted-foreground">
              {formatRelativeTime(track.playedAt)}
            </p>
          </div>
        </a>
      ) : (
        <p className="mt-3 text-sm text-muted-foreground">
          {errorMessage ?? "No recently played Spotify track found."}
        </p>
      )}
    </div>
  );
};
