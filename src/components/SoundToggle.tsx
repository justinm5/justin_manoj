import { useCallback, useEffect, useRef, useState } from "react";

const SOUND_STORAGE_KEY = "interface-sounds";
const SOUND_TARGETS = [
  ".theme-toggle",
  ".mobile-menu-toggle",
  ".mobile-menu-close",
  ".home-exp-item",
  ".pc-card",
  ".book-card",
  ".books-filter-chip",
  ".ask-reset",
  '.ask-chat-form button[type="submit"]',
].join(",");

type SoundKind = "hover" | "press";

const emitClick = (context: AudioContext, kind: SoundKind) => {
  const now = context.currentTime;
  const duration = kind === "hover" ? 0.032 : 0.05;
  const oscillator = context.createOscillator();
  const gain = context.createGain();

  oscillator.type = "triangle";
  oscillator.frequency.setValueAtTime(kind === "hover" ? 520 : 760, now);
  oscillator.frequency.exponentialRampToValueAtTime(
    kind === "hover" ? 340 : 260,
    now + duration,
  );

  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(
    kind === "hover" ? 0.012 : 0.026,
    now + 0.002,
  );
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  oscillator.connect(gain).connect(context.destination);
  oscillator.start(now);
  oscillator.stop(now + duration);
};

const createAudioContext = () => {
  const AudioContextClass =
    window.AudioContext ??
    (window as typeof window & { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext;

  return AudioContextClass ? new AudioContextClass() : null;
};

export const SoundToggle = () => {
  const [enabled, setEnabled] = useState(() => {
    if (typeof window === "undefined") return true;
    return localStorage.getItem(SOUND_STORAGE_KEY) !== "off";
  });
  const contextRef = useRef<AudioContext | null>(null);
  const lastPlayedAtRef = useRef(0);

  const play = useCallback(
    (kind: SoundKind, force = false) => {
      if ((!enabled && !force) || typeof window === "undefined") return;

      const now = performance.now();
      if (kind === "hover" && now - lastPlayedAtRef.current < 70) return;
      lastPlayedAtRef.current = now;

      const context = contextRef.current ?? createAudioContext();
      if (!context) return;
      contextRef.current = context;

      if (context.state === "suspended") {
        void context
          .resume()
          .then(() => emitClick(context, kind))
          .catch(() => undefined);
        return;
      }

      emitClick(context, kind);
    },
    [enabled],
  );

  useEffect(() => {
    localStorage.setItem(SOUND_STORAGE_KEY, enabled ? "on" : "off");
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;

    const unlockAudio = () => {
      const context = contextRef.current ?? createAudioContext();
      if (!context) return;
      contextRef.current = context;
      if (context.state === "suspended") {
        void context.resume().catch(() => undefined);
      }
    };

    document.addEventListener("pointerdown", unlockAudio, {
      capture: true,
      once: true,
    });

    return () => {
      document.removeEventListener("pointerdown", unlockAudio, true);
    };
  }, [enabled]);

  useEffect(() => {
    const handlePointerOver = (event: PointerEvent) => {
      if (event.pointerType && event.pointerType !== "mouse") return;
      if (!(event.target instanceof Element)) return;

      const target = event.target.closest(SOUND_TARGETS);
      if (!target) return;
      if (
        event.relatedTarget instanceof Node &&
        target.contains(event.relatedTarget)
      ) {
        return;
      }

      play("hover");
    };

    const handleClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      if (event.target.closest(SOUND_TARGETS)) play("press");
    };

    document.addEventListener("pointerover", handlePointerOver);
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("pointerover", handlePointerOver);
      document.removeEventListener("click", handleClick);
    };
  }, [play]);

  useEffect(
    () => () => {
      if (contextRef.current) void contextRef.current.close();
    },
    [],
  );

  const handleToggle = () => {
    play("press", true);
    setEnabled((current) => !current);
  };

  const action = enabled
    ? "Turn interface sounds off"
    : "Turn interface sounds on";

  return (
    <button
      type="button"
      className="sound-toggle"
      aria-label={action}
      aria-pressed={enabled}
      title={action}
      onClick={handleToggle}
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") play("hover");
      }}
    >
      {enabled ? (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M11 5 6 9H2v6h4l5 4V5Z" />
          <path d="M15.5 8.5a5 5 0 0 1 0 7" />
          <path d="M18 6a8.5 8.5 0 0 1 0 12" />
        </svg>
      ) : (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M11 5 6 9H2v6h4l5 4V5Z" />
          <path d="m16 9 5 5" />
          <path d="m21 9-5 5" />
        </svg>
      )}
    </button>
  );
};
