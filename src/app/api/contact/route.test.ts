import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { POST } from './route'

let ip = 0
/** Each request comes from a new address unless told otherwise, so the rate limit stays out of the way. */
function post(body: unknown, from = `10.0.0.${++ip}`) {
  return POST(
    new Request('http://localhost/api/contact', {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-forwarded-for': from },
      body: typeof body === 'string' ? body : JSON.stringify(body),
    })
  )
}

const message = () => ({
  name: 'Jane Doe',
  email: 'jane@company.com',
  reason: 'collaboration',
  message: 'Hello Siraj, <b>let us</b> build a voice assistant together!',
  company: '',
  startedAt: Date.now() - 60_000,
  locale: 'de',
})

describe('POST /api/contact', () => {
  const fetchMock = vi.fn()

  beforeEach(() => {
    vi.stubGlobal('fetch', fetchMock)
    vi.stubEnv('RESEND_API_KEY', 'test-key')
    vi.stubEnv('CONTACT_TO_EMAIL', 'inbox@example.com')
    fetchMock.mockReset().mockResolvedValue(new Response('{}', { status: 200 }))
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    vi.unstubAllEnvs()
    vi.restoreAllMocks()
  })

  it('sends a valid message by email in English, noting the visitor language', async () => {
    const res = await post(message())
    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({ ok: true })
    expect(fetchMock).toHaveBeenCalledOnce()
    const [url, init] = fetchMock.mock.calls[0]
    expect(url).toBe('https://api.resend.com/emails')
    const email = JSON.parse(init.body)
    expect(email.to).toEqual(['inbox@example.com'])
    expect(email.reply_to).toBe('jane@company.com')
    expect(email.subject).toBe('Portfolio: Collaboration from Jane Doe')
    expect(email.text).toContain('Site language: Deutsch')
    // Visitor text is escaped in the HTML version.
    expect(email.html).toContain('&lt;b&gt;let us&lt;/b&gt;')
    expect(email.html).not.toContain('<b>let us</b>')
  })

  it('answers invalid fields with error codes', async () => {
    const res = await post({ ...message(), email: 'not-an-email', reason: 'spam' })
    expect(res.status).toBe(400)
    expect(await res.json()).toEqual({
      ok: false,
      error: 'invalid',
      fields: { email: 'emailInvalid', reason: 'reasonMissing' },
    })
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('rejects a body that is not JSON', async () => {
    expect((await post('{oops')).status).toBe(400)
  })

  it('rejects an oversized body', async () => {
    expect((await post({ ...message(), message: 'x'.repeat(20_000) })).status).toBe(413)
  })

  it('pretends to succeed for bots, without sending anything', async () => {
    const honeypot = await post({ ...message(), company: 'Bot Inc' })
    const tooFast = await post({ ...message(), startedAt: Date.now() })
    expect([honeypot.status, tooFast.status]).toEqual([200, 200])
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('reports when email is not configured', async () => {
    vi.stubEnv('RESEND_API_KEY', '')
    const res = await post(message())
    expect(res.status).toBe(503)
    expect(await res.json()).toEqual({ ok: false, error: 'not_configured' })
  })

  it('reports a failed send', async () => {
    fetchMock.mockResolvedValue(new Response('bad', { status: 500 }))
    expect((await post(message())).status).toBe(502)
  })

  it('limits one address to five messages per ten minutes', async () => {
    const statuses = []
    for (let i = 0; i < 6; i++) statuses.push((await post(message(), '203.0.113.7')).status)
    expect(statuses).toEqual([200, 200, 200, 200, 200, 429])
  })
})
