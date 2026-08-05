import { useEffect, useState } from "react";

type Track = {
  isPlaying: boolean;
  title: string;
  artists: string;
  albumArt: string | null;
  url: string | null;
  playedAt: string | null;
};

const ENDPOINT = "/api/spotify-last-played";
const REFRESH_MS = 15_000;
const CACHE_KEY = "spotify-last-played-v1";

const readCache = (): Track | null => {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    return raw ? (JSON.parse(raw) as Track) : null;
  } catch {
    return null;
  }
};

const writeCache = (track: Track) => {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(track));
  } catch {
    // Storage blocked — the widget just re-fetches on the next load.
  }
};

/** "3m", "2h", "4d" — compact enough for the footer. */
const relativeTime = (iso: string): string => {
  const seconds = Math.max(0, (Date.now() - new Date(iso).getTime()) / 1000);
  if (seconds < 90) return "just now";
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.round(hours / 24)}d ago`;
};

/**
 * Footer widget showing what I'm playing on Spotify, or the last thing I
 * finished. Renders nothing at all when the API has no credentials configured,
 * so the footer never shows a broken or empty card.
 */
export const SpotifyLastPlayed = () => {
  const [track, setTrack] = useState<Track | null>(readCache);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let active = true;
    const controller = new AbortController();

    const load = async () => {
      try {
        const res = await fetch(ENDPOINT, { signal: controller.signal });
        if (!res.ok) throw new Error(String(res.status));

        const data = (await res.json()) as { configured?: boolean } & Partial<Track>;
        if (!active) return;

        if (data.configured === false || !data.title) {
          setHidden(true);
          return;
        }

        const next: Track = {
          isPlaying: Boolean(data.isPlaying),
          title: data.title,
          artists: data.artists ?? "",
          albumArt: data.albumArt ?? null,
          url: data.url ?? null,
          playedAt: data.playedAt ?? null,
        };
        setTrack(next);
        writeCache(next);
      } catch {
        // Offline, no backend (plain `vite dev`), or an upstream hiccup. Keep
        // whatever is cached; hide only if we have nothing to show.
        if (active && !readCache()) setHidden(true);
      }
    };

    void load();
    const timer = window.setInterval(() => void load(), REFRESH_MS);

    return () => {
      active = false;
      controller.abort();
      window.clearInterval(timer);
    };
  }, []);

  if (hidden || !track) return null;

  const statusLabel = track.isPlaying ? "Now Playing" : "Last Played";
  const timeLabel = track.playedAt ? relativeTime(track.playedAt) : null;
  const status = timeLabel ? `${statusLabel} · ${timeLabel}` : statusLabel;

  const body = (
    <>
      {track.albumArt ? (
        <img className="spotify-art" src={track.albumArt} alt="" width={34} height={34} />
      ) : (
        <span className="spotify-art spotify-art--empty" aria-hidden="true" />
      )}
      <span className="spotify-info">
        <span className="spotify-status">
          {track.isPlaying && <span className="spotify-dot" aria-hidden="true" />}
          {status}
        </span>
        <span className="spotify-title">{track.title}</span>
        {track.artists && <span className="spotify-artists">{track.artists}</span>}
      </span>
    </>
  );

  if (!track.url) {
    return (
      <div className="spotify-widget" aria-label={`${status}: ${track.title}`}>
        {body}
      </div>
    );
  }

  return (
    <a
      className="spotify-widget"
      href={track.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${status}: ${track.title} by ${track.artists}. Open in Spotify.`}
    >
      {body}
    </a>
  );
};

export default SpotifyLastPlayed;
