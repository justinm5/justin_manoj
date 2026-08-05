import { useEffect, useRef, useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { logoDevUrl } from "@/lib/logos";
import { askUi, displayName, type AskPart } from "@/data/context";
import { answerLocally } from "@/lib/local-answer";

type ChatMessage = { role: "user" | "assistant"; content: string };

const renderPart = (part: AskPart, index: number) => {
  if (part.type === "text") {
    return <span key={index}>{part.value}</span>;
  }
  if (part.type === "link") {
    const external = /^(https?:|mailto:)/i.test(part.href);
    return (
      <a
        key={index}
        className="ask-link"
        href={part.href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
      >
        {part.label}
      </a>
    );
  }
  return (
    <img
      key={index}
      className="ask-inline-logo"
      src={logoDevUrl(part.domain, 32)}
      alt={part.alt ?? ""}
      width={14}
      height={14}
      decoding="async"
      onError={(event) => {
        const target = event.currentTarget;
        target.style.display = "none";
      }}
    />
  );
};

const Ask = () => {
  const [transcript, setTranscript] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [status, setStatus] = useState("");
  const [isError, setIsError] = useState(false);
  const [sending, setSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [transcript, status]);

  const setError = (message: string) => {
    setStatus(message);
    setIsError(true);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const text = input.trim();
    if (!text || sending) return;

    const nextTranscript: ChatMessage[] = [
      ...transcript,
      { role: "user", content: text },
    ];
    setTranscript(nextTranscript);
    setInput("");
    setSending(true);
    setStatus("thinking…");
    setIsError(false);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextTranscript }),
      });

      if (!res.ok) throw new Error(`request failed (${res.status})`);

      const data = (await res.json()) as { reply?: string; error?: string };
      if (!data.reply) throw new Error(data.error || "no reply from server");

      setTranscript([
        ...nextTranscript,
        { role: "assistant", content: data.reply },
      ]);
      setStatus("");
    } catch {
      // No chat backend reachable (e.g. plain `vite dev` or static hosting):
      // fall back to on-device retrieval over the same context facts.
      const reply = answerLocally(text);
      setTranscript([...nextTranscript, { role: "assistant", content: reply }]);
      setStatus("answered offline from local context");
      setIsError(false);
    } finally {
      setSending(false);
      inputRef.current?.focus();
    }
  };

  const handleReset = () => {
    setTranscript([]);
    setStatus("");
    setIsError(false);
    inputRef.current?.focus();
  };

  return (
    <SiteLayout bodyClass="ask-page" contentClassName="ask-main" title="Ask">
      <header className="ask-hero">
        <span className="ask-hi">{askUi.greeting}</span>
        <span className="ask-name-script" aria-label={displayName}>
          {displayName}
        </span>
      </header>

      <section className="ask-window" aria-label="Context and chat">
        <div className="ask-window-titlebar">
          <span className="ask-window-title">{askUi.windowTitle}</span>
          <div className="ask-window-chrome">
            <button
              type="button"
              className="ask-reset"
              aria-label="Clear chat"
              onClick={handleReset}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
                <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
                <path d="M16 16h5v5" />
              </svg>
            </button>
            <span className="ask-traffic" aria-hidden="true">
              <span className="ask-traffic-dot ask-traffic-dot--red" />
              <span className="ask-traffic-dot ask-traffic-dot--yellow" />
              <span className="ask-traffic-dot ask-traffic-dot--green" />
            </span>
          </div>
        </div>

        <div className="ask-window-scroll" ref={scrollRef}>
          <div className="ask-static">
            {askUi.sections.map((section) => (
              <div key={section.title}>
                <p className="ask-section-label">{section.title}</p>
                {section.lines.map((line, lineIndex) => (
                  <p
                    key={lineIndex}
                    className={`ask-line-static${
                      line.variant === "footer"
                        ? " ask-line-static--footer"
                        : ""
                    }`}
                  >
                    <span className="ask-prompt" aria-hidden="true">
                      {"> "}
                    </span>
                    {line.parts.map(renderPart)}
                  </p>
                ))}
              </div>
            ))}
          </div>

          <div className="ask-chat-log" aria-live="polite">
            {transcript.map((message, index) =>
              message.role === "user" ? (
                <div key={index} className="ask-chat-line ask-chat-line--user">
                  <span className="ask-chat-gt" aria-hidden="true">
                    {"> "}
                  </span>
                  <span className="ask-chat-text">{message.content}</span>
                </div>
              ) : (
                <div
                  key={index}
                  className="ask-chat-line ask-chat-line--assistant"
                >
                  {message.content}
                </div>
              ),
            )}
          </div>
        </div>

        <div className="ask-window-footer">
          <form className="ask-chat-form" autoComplete="off" onSubmit={handleSubmit}>
            <label htmlFor="chat-input" className="visually-hidden">
              Your message
            </label>
            <input
              type="text"
              id="chat-input"
              name="message"
              ref={inputRef}
              value={input}
              placeholder={askUi.inputPlaceholder}
              onChange={(event) => setInput(event.target.value)}
              required
            />
            <button type="submit" disabled={sending}>
              send &#8629;
            </button>
          </form>
          <p
            className={`ask-chat-status${
              isError ? " ask-chat-status--error" : ""
            }`}
            role="status"
          >
            {status}
          </p>
        </div>
      </section>
    </SiteLayout>
  );
};

export default Ask;
