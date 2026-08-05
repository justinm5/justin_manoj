import { useEffect, useState } from "react";
import { coverUrl, fetchCoverId, getCachedCoverId } from "@/lib/book-covers";

interface BookCoverProps {
  title: string;
  author: string;
}

/**
 * Renders real cover art when Open Library has it, and a typographic cover
 * built from the title when it does not. Either way the tile keeps the same
 * 2:3 aspect ratio so the shelf never reflows as covers arrive.
 */
export const BookCover = ({ title, author }: BookCoverProps) => {
  const [coverId, setCoverId] = useState<number | null | undefined>(() =>
    getCachedCoverId(title, author),
  );
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (coverId !== undefined) return;

    const controller = new AbortController();
    let active = true;

    void fetchCoverId(title, author, controller.signal).then((id) => {
      if (active) setCoverId(id);
    });

    return () => {
      active = false;
      controller.abort();
    };
  }, [title, author, coverId]);

  if (typeof coverId === "number" && !failed) {
    return (
      <img
        className="book-cover"
        src={coverUrl(coverId, "M")}
        alt=""
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
      />
    );
  }

  // Undefined means the lookup is still in flight; keep the tile quiet rather
  // than flashing a fallback that is about to be replaced.
  const pending = coverId === undefined && !failed;

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
