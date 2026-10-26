/** Best-effort per-instance throttle; no visitor data is stored permanently. */
const WINDOW_MS = 60_000;
const LIMIT = 15;
const MAX_CLIENTS = 1000;
const clients = new Map<string, { count: number; resetAt: number }>();

export const checkRateLimit = (request: Request, now = Date.now()) => {
  const key = (request.headers.get("x-vercel-forwarded-for")
    || request.headers.get("x-forwarded-for") || "unknown").split(",")[0].trim();
  let bucket = clients.get(key);
  if (!bucket || bucket.resetAt <= now) {
    if (clients.size >= MAX_CLIENTS) {
      for (const [client, value] of clients) if (value.resetAt <= now) clients.delete(client);
      if (clients.size >= MAX_CLIENTS) clients.delete(clients.keys().next().value!);
    }
    bucket = { count: 0, resetAt: now + WINDOW_MS };
    clients.set(key, bucket);
  }
  if (bucket.count >= LIMIT) return { allowed: false, remaining: 0, resetAt: bucket.resetAt };
  bucket.count++;
  return { allowed: true, remaining: LIMIT - bucket.count, resetAt: bucket.resetAt };
};
