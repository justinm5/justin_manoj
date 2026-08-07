import { useEffect, useState } from "react";
import { fetchCover, getCachedCover } from "@/lib/book-covers";

interface BookCoverProps {
  title: string;
  author: string;
}

/**
 * Renders real cover art when Open Library or Google Books has it, and a
 * typographic cover built from the title when neither does. Either way the
 * tile keeps the same 2:3 aspect ratio so the shelf never reflows.
 */
export const BookCover = ({ title, author }: BookCoverProps) => {
  const [cover, setCover] = useState<string | null | undefined>(() =>
    getCachedCover(title, author),
  );
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (cover !== undefined) return;

    const controller = new AbortController();
    let active = true;

    void fetchCover(title, author, controller.signal).then((url) => {
      if (active) setCover(url);
    });

    return () => {
      active = false;
      controller.abort();
    };
  }, [title, author, cover]);

  if (typeof cover === "string" && !failed) {
    return (
      <img
        className="book-cover"
        src={cover}
        alt=""
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
      />
    );
  }

  const pending = cover === undefined && !failed;

  return (
    <div
      className={`book-cover book-cover--fallback${
        pending ? " book-cover--pending" : ""
      }`}
      aria-hidden="true"
    >
      {!pending && <span className="book-cover-text">{title}</span>}
    </div>
  );
};

export default BookCover;
