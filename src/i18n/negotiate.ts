import { defaultLocale, isLocale, type Locale } from './config'

/**
 * Best supported language for a visitor: their saved choice, then the highest-ranked
 * browser language we support (by `q` weight, region ignored), then English.
 */
export function pickLocale(saved: string | undefined, acceptLanguage: string | null): Locale {
  if (saved && isLocale(saved)) return saved
  const ranked = (acceptLanguage ?? '')
    .split(',')
    .map((part) => {
      const [tag, q] = part.trim().split(';q=')
      return { base: tag.toLowerCase().split('-')[0], q: q ? Number(q) : 1 }
    })
    .filter((x) => x.base && !Number.isNaN(x.q))
    .sort((a, b) => b.q - a.q)
  return (ranked.find((x) => isLocale(x.base))?.base as Locale | undefined) ?? defaultLocale
}
