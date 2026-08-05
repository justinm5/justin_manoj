/**
 * Cover art lookup for the Books page.
 *
 * Uses the Open Library search API, which is free and needs no key. Results are
 * memoised in localStorage so a repeat visit renders covers instantly and we
 * never hit the network for the same title twice.
 */

const CACHE_KEY = "book-covers-v1";
const SEARCH_ENDPOINT = "https://openlibrary.org/search.json";

/** `null` means "we looked and there is no cover" — distinct from "not looked yet". */
type CoverCache = Record<string, number | null>;

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

export const coverUrl = (coverId: number, size: "S" | "M" | "L" = "M") =>
  `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`;

export const getCachedCoverId = (
  title: string,
  author: string,
): number | null | undefined => readCache()[cacheKeyFor(title, author)];

export const fetchCoverId = async (
  title: string,
  author: string,
  signal?: AbortSignal,
): Promise<number | null> => {
  const key = cacheKeyFor(title, author);
  const cached = readCache();
  if (key in cached) return cached[key];

  let coverId: number | null = null;
  try {
    const url = new URL(SEARCH_ENDPOINT);
    url.searchParams.set("title", title);
    // Only the first listed author — Open Library matches poorly on "A & B".
    url.searchParams.set("author", author.split(/\s*&\s*/)[0]);
    url.searchParams.set("limit", "1");
    url.searchParams.set("fields", "cover_i");

    const res = await fetch(url, { signal });
    if (res.ok) {
      const data = (await res.json()) as { docs?: { cover_i?: number }[] };
      coverId = data.docs?.[0]?.cover_i ?? null;
    }
  } catch {
    // Offline or blocked — fall through to the typographic cover.
    return null;
  }

  writeCache({ ...readCache(), [key]: coverId });
  return coverId;
};
