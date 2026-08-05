import { useEffect, useRef } from "react";
import type { ProjectMedia as ProjectMediaData } from "@/data/context";

const VIDEO_PATTERN = /\.(mp4|webm|mov)$/i;

/**
 * Demo frame for a project card.
 *
 * With no media it renders an empty 16:9 frame, so the layout is already the
 * right shape when a capture gets dropped in later. Videos stay paused on
 * their poster until the card is hovered or focused, which keeps the page
 * quiet and avoids several clips autoplaying at once.
 */
export const ProjectMedia = ({ media }: { media?: ProjectMediaData }) => {
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const isVideo = Boolean(media) && VIDEO_PATTERN.test(media!.src);

  // Playback is driven by the whole card rather than just this frame, so
  // hovering the title or description starts the clip too.
  useEffect(() => {
    const video = videoRef.current;
    const frame = frameRef.current;
    if (!isVideo || !video || !frame) return;

    const target = frame.closest(".pc-card") ?? frame;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    const play = () => {
      if (reduced.matches) return;
      // play() rejects if the pointer leaves mid-gesture; nothing to recover.
      void video.play().catch(() => {});
    };

    const pause = () => {
      video.pause();
      video.currentTime = 0;
    };

    target.addEventListener("mouseenter", play);
    target.addEventListener("mouseleave", pause);
    target.addEventListener("focusin", play);
    target.addEventListener("focusout", pause);

    return () => {
      target.removeEventListener("mouseenter", play);
      target.removeEventListener("mouseleave", pause);
      target.removeEventListener("focusin", play);
      target.removeEventListener("focusout", pause);
    };
  }, [isVideo]);

  if (!media) {
    return (
      <div className="pc-media pc-media--empty" aria-hidden="true">
        <span className="pc-media-placeholder">demo soon</span>
      </div>
    );
  }

  if (!isVideo) {
    return (
      <div className="pc-media" ref={frameRef}>
        <img
          className="pc-media-asset"
          src={media.src}
          alt={media.alt ?? ""}
          loading="lazy"
          decoding="async"
        />
      </div>
    );
  }

  return (
    <div className="pc-media" ref={frameRef}>
      <video
        ref={videoRef}
        className="pc-media-asset"
        src={media.src}
        poster={media.poster}
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={media.alt}
      />
      <span className="pc-media-hint" aria-hidden="true">
        hover to play
      </span>
    </div>
  );
};

export default ProjectMedia;
