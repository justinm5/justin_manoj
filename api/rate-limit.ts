/**
 * Lightweight in-memory rate limiter for the serverless chat endpoint.
 *
 * NOTE: Serverless functions may be recycled between requests, so this is a
 * hot-instance guard, not a cross-region/global limit. For production-scale
 * abuse prevention, swap this out for Redis or Vercel KV.
 */

type Bucket = {
  tokens: number;
  lastRefill: number;
};

const WINDOW_MS = 60_000; // 1 minute
const DEFAULT_LIMIT = 15; // requests per window per IP

const buckets = new Map<string, Bucket>();

const getClientIp = (request: Request): string => {
  const headers = request.headers;
  const raw =
    headers.get("x-forwarded-for") ??
    headers.get("x-real-ip") ??
    headers.get("cf-connecting-ip") ??
    "unknown";
  return raw.split(",")[0].trim() || "unknown";
};

const getRateLimit = (): number => {
  const value = Number(process.env.RATE_LIMIT_PER_MINUTE);
  return Number.isFinite(value) && value > 0 ? value : DEFAULT_LIMIT;
};

export const checkRateLimit = (
  request: Request,
): { allowed: boolean; ip: string; remaining: number; resetAt: number } => {
  const ip = getClientIp(request);
  const now = Date.now();
  const limit = getRateLimit();

  let bucket = buckets.get(ip);
  if (!bucket) {
    bucket = { tokens: limit - 1, lastRefill: now };
    buckets.set(ip, bucket);
  } else {
    const elapsed = now - bucket.lastRefill;
    const tokensToAdd = Math.floor((elapsed / WINDOW_MS) * limit);
    bucket.tokens = Math.min(limit, bucket.tokens + tokensToAdd);
    bucket.lastRefill =
      bucket.tokens === limit ? now : bucket.lastRefill + tokensToAdd * (WINDOW_MS / limit);

    if (bucket.tokens >= 1) {
      bucket.tokens -= 1;
    } else {
      return { allowed: false, ip, remaining: 0, resetAt: bucket.lastRefill + WINDOW_MS };
    }
  }

  return {
    allowed: true,
    ip,
    remaining: bucket.tokens,
    resetAt: bucket.lastRefill + WINDOW_MS,
  };
};
