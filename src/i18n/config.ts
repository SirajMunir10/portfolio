/** Languages the site is available in. The first is the default. */
export const locales = ['en', 'nl', 'de', 'ar'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'en'

export const isLocale = (value: string): value is Locale => (locales as readonly string[]).includes(value)

/** Name of each language in that language, for the switcher. */
export const localeNames: Record<Locale, string> = {
  en: 'English',
  nl: 'Nederlands',
  de: 'Deutsch',
  ar: 'العربية',
}

/** Locale used for Intl formatting (dates). Arabic keeps Latin digits, as is common in the UAE. */
export const intlLocale: Record<Locale, string> = {
  en: 'en-GB',
  nl: 'nl-NL',
  de: 'de-DE',
  ar: 'ar-AE-u-nu-latn',
}

/** Open Graph locale codes. */
export const ogLocale: Record<Locale, string> = { en: 'en_US', nl: 'nl_NL', de: 'de_DE', ar: 'ar_AE' }

export const direction = (locale: Locale): 'ltr' | 'rtl' => (locale === 'ar' ? 'rtl' : 'ltr')

/** Cookie that remembers a visitor's chosen language. */
export const LOCALE_COOKIE = 'NEXT_LOCALE'

/** Replaces {placeholders} in a dictionary string. */
export function format(template: string, values: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? `{${key}}`))
}
