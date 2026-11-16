import type { MetadataRoute } from 'next'
import { locales } from '@/i18n/config'
import { siteUrl } from '@/lib/site'

/** One entry per language, each listing the others as alternates. */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl()
  const languages = Object.fromEntries(locales.map((l) => [l, `${base}/${l}`]))
  return locales.map((l) => ({
    url: `${base}/${l}`,
    changeFrequency: 'monthly',
    priority: l === 'en' ? 1 : 0.9,
    alternates: { languages },
  }))
}
