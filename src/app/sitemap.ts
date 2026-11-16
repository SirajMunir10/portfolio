import type { MetadataRoute } from 'next'
import { projects } from '@/content/projects'
import { locales } from '@/i18n/config'
import { siteUrl } from '@/lib/site'

/** Every page in every language, each listing its other language versions as alternates. */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl()
  const pages: { path: string; priority: number }[] = [
    { path: '', priority: 1 },
    { path: '/projects', priority: 0.9 },
    { path: '/about', priority: 0.8 },
    ...projects.map((p) => ({ path: `/projects/${p.slug}`, priority: p.featured ? 0.8 : 0.6 })),
  ]
  return pages.flatMap(({ path, priority }) => {
    const languages = Object.fromEntries(locales.map((l) => [l, `${base}/${l}${path}`]))
    return locales.map((l) => ({
      url: `${base}/${l}${path}`,
      changeFrequency: 'monthly' as const,
      priority: l === 'en' ? priority : Math.round(priority * 90) / 100,
      alternates: { languages },
    }))
  })
}
