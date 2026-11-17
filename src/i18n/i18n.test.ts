import { describe, expect, it } from 'vitest'
import { direction, format, isLocale, localeHref, pathWithoutLocale } from './config'
import { localizeDates } from './dates'
import { pickLocale } from './negotiate'

describe('pickLocale', () => {
  it('prefers a saved choice over the browser language', () => {
    expect(pickLocale('nl', 'de-DE,de;q=0.9')).toBe('nl')
  })

  it('ignores a saved value that is not a supported language', () => {
    expect(pickLocale('fr', 'de-DE')).toBe('de')
  })

  it('follows the browser ranking and ignores the region', () => {
    expect(pickLocale(undefined, 'fr-FR,ar-AE;q=0.8,de;q=0.9')).toBe('de')
    expect(pickLocale(undefined, 'ar-AE,ar;q=0.9,en;q=0.8')).toBe('ar')
  })

  it('falls back to English', () => {
    expect(pickLocale(undefined, null)).toBe('en')
    expect(pickLocale(undefined, 'fr,es;q=0.5')).toBe('en')
    expect(pickLocale(undefined, 'garbage;q=abc')).toBe('en')
  })
})

describe('locale helpers', () => {
  it('recognises only supported languages', () => {
    expect(isLocale('ar')).toBe(true)
    expect(isLocale('fr')).toBe(false)
  })

  it('builds links inside a language', () => {
    expect(localeHref('de')).toBe('/de')
    expect(localeHref('de', '/about')).toBe('/de/about')
    expect(localeHref('de', '#contact')).toBe('/de#contact')
  })

  it('strips only a leading language prefix', () => {
    expect(pathWithoutLocale('/de/projects/xo')).toBe('/projects/xo')
    expect(pathWithoutLocale('/ar')).toBe('')
    expect(pathWithoutLocale('/designs')).toBe('/designs')
  })

  it('fills placeholders and leaves unknown ones visible', () => {
    expect(format('Hi {name}, {count} new', { name: 'Siraj', count: 3 })).toBe('Hi Siraj, 3 new')
    expect(format('{missing}', {})).toBe('{missing}')
  })

  it('reads Arabic right to left and the rest left to right', () => {
    expect(direction('ar')).toBe('rtl')
    expect(direction('nl')).toBe('ltr')
  })
})

describe('localizeDates', () => {
  it('leaves English dates as written', () => {
    expect(localizeDates('Sep 2026 – Present', 'en', 'Present')).toBe('Sep 2026 – Present')
  })

  it('formats months in the visitor language and translates "Present"', () => {
    const de = localizeDates('Dec 2025 – Present', 'de', 'Heute')
    expect(de).toMatch(/^Dez\.? 2025 – Heute$/)
    expect(localizeDates('Oct 2025', 'nl', 'Heden')).toMatch(/^okt\.? 2025$/)
  })

  it('keeps Western digits in Arabic', () => {
    const ar = localizeDates('Sep 2026', 'ar', 'الآن')
    expect(ar).toContain('2026')
    expect(ar).toContain('سبتمبر')
    expect(ar).not.toMatch(/[٠-٩]/)
  })
})
