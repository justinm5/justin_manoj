import { useEffect, useState } from "react";
import { books as fallbackBooks, type Book, type BookStatus } from "@/data/books";

/**
 * Goodreads retired its public developer API in Dec 2020, so this reads the
 * per-user RSS shelf feed instead (works for any public Goodreads profile):
 *
 *   https://www.goodreads.com/review/list_rss/<userId>?shelf=<shelf>
 *
 * The feed does not send CORS headers, so requests go through a public
 * read-only proxy. Set your id in `.env.local`:
 *
 *   VITE_GOODREADS_USER_ID=12345678-justin-manoj
 */
const goodreadsUserId = import.meta.env?.VITE_GOODREADS_USER_ID as string | undefined;

const SHELVES: { shelf: string; status: BookStatus; limit: number }[] = [
  { shelf: "currently-reading", status: "reading", limit: 3 },
  { shelf: "read", status: "finished", limit: 4 },
  { shelf: "to-read", status: "queued", limit: 3 },
];

const proxied = (url: string) => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;

const feedUrl = (userId: string, shelf: string) =>
  `https://www.goodreads.com/review/list_rss/${userId}?shelf=${shelf}&sort=date_updated`;

const textOf = (item: Element, tag: string) => item.getElementsByTagName(tag)[0]?.textContent ?? "";

const parseShelf = (xml: string, status: BookStatus, limit: number): Book[] => {
  const doc = new DOMParser().parseFromString(xml, "text/xml");
  if (doc.getElementsByTagName("parsererror").length > 0) return [];

  return Array.from(doc.getElementsByTagName("item"))
    .slice(0, limit)
    .map((item) => {
      const title = textOf(item, "title").trim();
      const author = textOf(item, "author_name").trim();
      const rating = Number(textOf(item, "user_rating"));

      return {
        id: textOf(item, "book_id") || `${status}-${title}`,
        title,
        author,
        status,
        note: rating > 0 ? `${"★".repeat(rating)}${"☆".repeat(5 - rating)}` : undefined,
      } satisfies Book;
    })
    .filter((book) => book.title.length > 0);
};

export const useGoodreadsBooks = () => {
  const [books, setBooks] = useState<Book[]>(fallbackBooks);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    if (!goodreadsUserId) return;

    let cancelled = false;

    const load = async () => {
      try {
        const responses = await Promise.all(
          SHELVES.map(async ({ shelf, status, limit }) => {
            const response = await fetch(proxied(feedUrl(goodreadsUserId, shelf)));
            if (!response.ok) return [];
            return parseShelf(await response.text(), status, limit);
          }),
        );

        const merged = responses.flat();
        if (!cancelled && merged.length > 0) {
          setBooks(merged);
          setIsLive(true);
        }
      } catch {
        // Keep the curated fallback list if the feed is unreachable.
      }
    };

    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  return { books, isLive };
};
