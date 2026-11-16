import { sendContactEmail } from '@/lib/server/email'
import { clientKey, rateLimit } from '@/lib/server/rate-limit'
import { contactSchema, fieldErrors, MIN_FILL_MS } from '@/lib/validation/contact'

const MAX_BODY_BYTES = 10_000

/**
 * POST /api/contact
 * 200 { ok: true } · 400 invalid · 413 too large · 429 rate limited · 503 email not configured · 502 send failed
 */
export async function POST(request: Request) {
  const limited = rateLimit(`contact:${clientKey(request)}`, 5, 10 * 60 * 1000)
  if (!limited.ok) {
    return Response.json(
      { ok: false, error: 'rate_limited' },
      { status: 429, headers: { 'Retry-After': String(limited.retryAfterSec) } }
    )
  }

  const raw = await request.text()
  if (raw.length > MAX_BODY_BYTES) return Response.json({ ok: false, error: 'too_large' }, { status: 413 })

  let body: unknown
  try {
    body = JSON.parse(raw)
  } catch {
    return Response.json({ ok: false, error: 'invalid' }, { status: 400 })
  }

  const parsed = contactSchema.safeParse(body)
  if (!parsed.success) {
    // A filled honeypot means a bot: answer as if it worked, so it learns nothing.
    if (parsed.error.issues.some((i) => i.path[0] === 'company')) return Response.json({ ok: true })
    return Response.json({ ok: false, error: 'invalid', fields: fieldErrors(parsed.error) }, { status: 400 })
  }
  if (Date.now() - parsed.data.startedAt < MIN_FILL_MS) return Response.json({ ok: true })

  const sent = await sendContactEmail(parsed.data)
  if (!sent.ok) {
    const status = sent.reason === 'not_configured' ? 503 : 502
    return Response.json({ ok: false, error: sent.reason }, { status })
  }
  return Response.json({ ok: true })
}
