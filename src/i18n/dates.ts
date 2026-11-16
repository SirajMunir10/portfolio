import { intlLocale, type Locale } from './config'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

/**
 * Rewrites "Sep 2026" style dates (also inside ranges like "Dec 2025 – Jul 2026") in the visitor's language,
 * and replaces "Present" with the translated word.
 */
export function localizeDates(text: string, locale: Locale, present: string) {
  const fmt = new Intl.DateTimeFormat(intlLocale[locale], { month: 'short', year: 'numeric', timeZone: 'UTC' })
  return text
    .replace(/\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{4})\b/g, (_, m: string, y: string) =>
      locale === 'en' ? `${m} ${y}` : fmt.format(new Date(Date.UTC(Number(y), MONTHS.indexOf(m), 1)))
    )
    .replace(/\bPresent\b/g, present)
}
