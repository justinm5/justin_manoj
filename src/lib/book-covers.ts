/**
 * Cover art lookup for the Books page.
 *
 * Tries Open Library first (no key), then falls back to Google Books
 * (no key, public endpoint). Results are memoised in localStorage so a
 * repeat visit renders covers instantly and we never hit the network for
 * the same title twice.
 */

const CACHE_KEY = "book-covers-v3";
const OPEN_LIBRARY_SEARCH = "https://openlibrary.org/search.json";
const GOOGLE_BOOKS_SEARCH = "https://www.googleapis.com/books/v1/volumes";

/** `null` means "we looked and found nothing" — distinct from "not looked yet". */
type CoverCache = Record<string, string | null>;

const cacheKeyFor = (title: string, author: string) =>
  `${title}::${author}`.toLowerCase();

const readCache = (): CoverCache => {
  if (typeof localStorage === "undefined") return {};
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    return raw ? (JSON.parse(raw) as CoverCache) : {};
  } catch {
    return {};
  }
};

const writeCache = (cache: CoverCache) => {
  if (typeof localStorage === "undefined") return;
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch {
    // Storage full or blocked — covers just re-fetch next visit.
  }
};

const openLibraryCoverUrl = (coverId: number) =>
  `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`;

const firstAuthor = (author: string) => author.split(/\s*&\s*/)[0];

const fetchOpenLibraryCover = async (
  title: string,
  author: string,
  signal?: AbortSignal,
): Promise<string | null> => {
  try {
    const url = new URL(OPEN_LIBRARY_SEARCH);
    url.searchParams.set("title", title);
    url.searchParams.set("author", firstAuthor(author));
    url.searchParams.set("limit", "5");
    url.searchParams.set("fields", "cover_i");

    const res = await fetch(url, { signal });
    if (!res.ok) return null;

    const data = (await res.json()) as { docs?: { cover_i?: number }[] };
    const doc = data.docs?.find((d) => typeof d.cover_i === "number");
    return doc && typeof doc.cover_i === "number"
      ? openLibraryCoverUrl(doc.cover_i)
      : null;
  } catch {
    return null;
  }
};

const googleBooksThumbnail = (
  data: { items?: { volumeInfo?: { imageLinks?: { thumbnail?: string } } }[] },
): string | null => {
  const thumb = data.items
    ?.map((item) => item.volumeInfo?.imageLinks?.thumbnail)
    .find(Boolean);
  return thumb ? thumb.replace(/^http:/, "https:") : null;
};

const fetchGoogleBooksCover = async (
  title: string,
  author: string,
  signal?: AbortSignal,
): Promise<string | null> => {
  try {
    const clean = (s: string) => s.replace(/"/g, "");
    const t = clean(title);
    const a = clean(firstAuthor(author));
    const queries = [
      `intitle:"${t}" inauthor:"${a}"`,
      `intitle:"${t}"`,
      `${t}`,
    ];

    for (const q of queries) {
      const url = new URL(GOOGLE_BOOKS_SEARCH);
      url.searchParams.set("q", q);
      url.searchParams.set("maxResults", "5");

      const res = await fetch(url, { signal });
      if (!res.ok) continue;

      const data = (await res.json()) as {
        items?: { volumeInfo?: { imageLinks?: { thumbnail?: string } } }[];
      };
      const thumb = googleBooksThumbnail(data);
      if (thumb) return thumb;
    }
  } catch {
    // Offline or blocked — fall through to the typographic cover.
  }
  return null;
};

export const getCachedCover = (
  title: string,
  author: string,
): string | null | undefined => readCache()[cacheKeyFor(title, author)];

export const fetchCover = async (
  title: string,
  author: string,
  signal?: AbortSignal,
): Promise<string | null> => {
  const key = cacheKeyFor(title, author);
  const cached = readCache();
  if (key in cached) return cached[key];

  let cover: string | null = await fetchOpenLibraryCover(title, author, signal);
  if (!cover) {
    cover = await fetchGoogleBooksCover(title, author, signal);
  }

  writeCache({ ...readCache(), [key]: cover });
  return cover;
};
