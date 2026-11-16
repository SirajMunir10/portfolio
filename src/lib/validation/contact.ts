import { z } from 'zod'
import { locales } from '@/i18n/config'

/**
 * Shared by the form (instant feedback) and the API route (the check that counts).
 * Errors are codes rather than sentences so each language can word them its own way;
 * the codes match the keys of `dict.contact.form.errors`.
 */

export const contactReasons = ['job', 'freelance', 'collaboration', 'other'] as const
export type ContactReason = (typeof contactReasons)[number]

/** English labels for the email that reaches the inbox, whatever language the visitor used. */
export const reasonLabels: Record<ContactReason, string> = {
  job: 'Job opportunity',
  freelance: 'Freelance project',
  collaboration: 'Collaboration',
  other: 'Something else',
}

export const MESSAGE_MAX = 2000
/** Anything submitted within this many milliseconds of the form appearing is treated as automated. */
export const MIN_FILL_MS = 3000

export const contactSchema = z.object({
  name: z.string().trim().min(2, 'nameShort').max(80, 'nameLong'),
  email: z.email('emailInvalid').trim().max(120, 'emailLong'),
  reason: z.enum(contactReasons, 'reasonMissing'),
  message: z.string().trim().min(20, 'messageShort').max(MESSAGE_MAX, 'messageLong'),
  /** Honeypot: hidden from people, often filled in by bots. Must stay empty. */
  company: z.string().max(0).optional().default(''),
  /** When the form was first shown (ms since epoch); submissions faster than a human can type are rejected. */
  startedAt: z.number().int().positive(),
  /** The language the visitor was reading, so the reply can match it. */
  locale: z.enum(locales).optional(),
})

export type ContactInput = z.input<typeof contactSchema>
export type ContactField = 'name' | 'email' | 'reason' | 'message'
export type ContactErrorCode =
  | 'nameShort'
  | 'nameLong'
  | 'emailInvalid'
  | 'emailLong'
  | 'reasonMissing'
  | 'messageShort'
  | 'messageLong'

const errorCodes = new Set<string>([
  'nameShort',
  'nameLong',
  'emailInvalid',
  'emailLong',
  'reasonMissing',
  'messageShort',
  'messageLong',
])

/** Used when a field fails a check without its own code, such as a value of the wrong type. */
const fallback: Record<ContactField, ContactErrorCode> = {
  name: 'nameShort',
  email: 'emailInvalid',
  reason: 'reasonMissing',
  message: 'messageShort',
}

/** First error code per field, for showing under each input. */
export function fieldErrors(error: z.ZodError): Partial<Record<ContactField, ContactErrorCode>> {
  const out: Partial<Record<ContactField, ContactErrorCode>> = {}
  for (const issue of error.issues) {
    const key = issue.path[0]
    if (typeof key !== 'string' || !(key in fallback)) continue
    const field = key as ContactField
    if (out[field]) continue
    out[field] = errorCodes.has(issue.message) ? (issue.message as ContactErrorCode) : fallback[field]
  }
  return out
}
