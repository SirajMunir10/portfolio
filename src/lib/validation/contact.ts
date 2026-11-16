import { z } from 'zod'

/** Shared by the form (instant feedback) and the API route (the check that counts). */

export const contactReasons = [
  'Job opportunity',
  'Freelance project',
  'Collaboration',
  'Something else',
] as const

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Please enter your name.')
    .max(80, 'Please keep your name under 80 characters.'),
  email: z.email('Please enter a valid email address.').trim().max(120, 'That email address is too long.'),
  reason: z.enum(contactReasons, 'Please choose what this is about.'),
  message: z
    .string()
    .trim()
    .min(20, 'Please write at least 20 characters so I can help.')
    .max(2000, 'Please keep your message under 2,000 characters.'),
  /** Honeypot: hidden from people, often filled in by bots. Must stay empty. */
  company: z.string().max(0).optional().default(''),
  /** When the form was first shown (ms since epoch); submissions faster than a human can type are rejected. */
  startedAt: z.number().int().positive(),
})

export type ContactInput = z.input<typeof contactSchema>
export type ContactField = 'name' | 'email' | 'reason' | 'message'

export const MESSAGE_MAX = 2000
/** Anything submitted within this many milliseconds of the form appearing is treated as automated. */
export const MIN_FILL_MS = 3000

/** First error message per field, for showing under each input. */
export function fieldErrors(error: z.ZodError): Partial<Record<ContactField, string>> {
  const out: Partial<Record<ContactField, string>> = {}
  for (const issue of error.issues) {
    const key = issue.path[0] as ContactField
    if (key && !out[key]) out[key] = issue.message
  }
  return out
}
