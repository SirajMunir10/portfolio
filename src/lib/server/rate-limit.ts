/**
 * Small sliding-window rate limiter kept in memory. Each server instance counts separately,
 * which is enough to stop one visitor or script from flooding the contact form.
 */
const hits = new Map<string, number[]>()
const MAX_KEYS = 5000

export function rateLimit(key: string, limit: number, windowMs: number) {
  const now = Date.now()
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs)
  if (recent.length >= limit) {
    hits.set(key, recent)
    return { ok: false as const, retryAfterSec: Math.ceil((windowMs - (now - recent[0])) / 1000) }
  }
  recent.push(now)
  hits.set(key, recent)
  if (hits.size > MAX_KEYS) {
    for (const [k, times] of hits) if (!times.some((t) => now - t < windowMs)) hits.delete(k)
  }
  return { ok: true as const }
}

/** The visitor's address as reported by the hosting platform's proxy. */
export function clientKey(request: Request) {
  const forwarded = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
  return forwarded || request.headers.get('x-real-ip') || 'unknown'
}
