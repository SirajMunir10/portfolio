import type { z } from 'zod'
import type { contactSchema } from '@/lib/validation/contact'

type Message = z.output<typeof contactSchema>

export type SendResult = { ok: true } | { ok: false; reason: 'not_configured' | 'send_failed' }

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!)

/**
 * Sends the contact message through Resend's HTTP API. Settings come only from server environment
 * variables, so no key ever reaches the browser. Replying to the email answers the visitor directly.
 */
export async function sendContactEmail(message: Message): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_TO_EMAIL
  const from = process.env.CONTACT_FROM_EMAIL || 'Portfolio <onboarding@resend.dev>'
  if (!apiKey || !to) return { ok: false, reason: 'not_configured' }

  const subject = `Portfolio: ${message.reason} from ${message.name}`
  const text = [
    `Name: ${message.name}`,
    `Email: ${message.email}`,
    `About: ${message.reason}`,
    '',
    message.message,
  ].join('\n')
  const html = `
    <div style="font-family:system-ui,sans-serif;line-height:1.6;color:#111">
      <p style="margin:0 0 4px"><strong>${escapeHtml(message.name)}</strong> &lt;${escapeHtml(message.email)}&gt;</p>
      <p style="margin:0 0 16px;color:#555">${escapeHtml(message.reason)}</p>
      <p style="white-space:pre-wrap;margin:0">${escapeHtml(message.message)}</p>
    </div>`

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from, to: [to], reply_to: message.email, subject, text, html }),
      signal: AbortSignal.timeout(10_000),
    })
    if (!res.ok) {
      console.error('Contact email failed', res.status, await res.text().catch(() => ''))
      return { ok: false, reason: 'send_failed' }
    }
    return { ok: true }
  } catch (error) {
    console.error('Contact email failed', error)
    return { ok: false, reason: 'send_failed' }
  }
}
