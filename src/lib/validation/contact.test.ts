import { describe, expect, it } from 'vitest'
import { en } from '@/i18n/dictionaries/en'
import { contactReasons, contactSchema, fieldErrors, reasonLabels } from './contact'

const valid = {
  name: 'Jane Doe',
  email: 'jane@company.com',
  reason: 'job',
  message: 'We are hiring an AI Engineer in Berlin and would love to talk.',
  company: '',
  startedAt: 1_700_000_000_000,
}

const errorsFor = (input: Record<string, unknown>) => {
  const result = contactSchema.safeParse(input)
  return result.success ? {} : fieldErrors(result.error)
}

describe('contact form validation', () => {
  it('accepts a complete message, with or without a language', () => {
    expect(contactSchema.safeParse(valid).success).toBe(true)
    expect(contactSchema.safeParse({ ...valid, locale: 'ar' }).success).toBe(true)
  })

  it('rejects a language the site does not offer', () => {
    expect(contactSchema.safeParse({ ...valid, locale: 'fr' }).success).toBe(false)
  })

  it('returns one error code per field', () => {
    expect(errorsFor({ ...valid, name: 'J', email: 'nope', reason: 'spam', message: 'short' })).toEqual({
      name: 'nameShort',
      email: 'emailInvalid',
      reason: 'reasonMissing',
      message: 'messageShort',
    })
    expect(errorsFor({ ...valid, name: 'x'.repeat(81), message: 'x'.repeat(2001) })).toEqual({
      name: 'nameLong',
      message: 'messageLong',
    })
  })

  it('falls back to a sensible code when a value has the wrong type', () => {
    expect(errorsFor({ ...valid, name: 42, email: null })).toEqual({
      name: 'nameShort',
      email: 'emailInvalid',
    })
  })

  it('treats a filled-in honeypot as invalid without blaming a visible field', () => {
    const result = contactSchema.safeParse({ ...valid, company: 'Bot Inc' })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues.some((i) => i.path[0] === 'company')).toBe(true)
      expect(fieldErrors(result.error)).toEqual({})
    }
  })

  it('has a translatable message for every error code and reason', () => {
    for (const code of [
      'nameShort',
      'nameLong',
      'emailInvalid',
      'emailLong',
      'reasonMissing',
      'messageShort',
      'messageLong',
    ]) {
      expect(en.contact.form.errors).toHaveProperty(code)
    }
    for (const reason of contactReasons) {
      expect(en.contact.form.reasons[reason]).toBe(reasonLabels[reason])
    }
  })
})
