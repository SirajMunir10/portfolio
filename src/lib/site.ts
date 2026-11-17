import type { Metadata } from 'next'
import type { Site } from '@/content'
import { locales, ogLocale, type Locale } from '@/i18n/config'

/**
 * Public address of the site: NEXT_PUBLIC_SITE_URL when set (e.g. a custom domain),
 * otherwise Vercel's production address, otherwise localhost for development.
 */
export function siteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL
  if (explicit) return explicit.replace(/\/$/, '')
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL
  if (vercel) return `https://${vercel}`
  return 'http://localhost:3000'
}

export const keywords = [
  'Siraj Munir',
  'AI Engineer',
  'LLM Engineer',
  'AI Engineer Dubai',
  'AI Engineer UAE',
  'AI Engineer Germany',
  'AI Engineer Netherlands',
  'RAG',
  'Voice AI',
  'Conversational AI',
  'Machine learning',
  'FastAPI',
  'Next.js',
]

/** hreflang alternates of one page (e.g. "/about") in every language, with English as the default. */
export function languageAlternates(path = '') {
  return {
    ...Object.fromEntries(locales.map((l) => [l, `/${l}${path}`])),
    'x-default': `/en${path}`,
  }
}

/**
 * The shared social preview card (app/opengraph-image.tsx). It lives at the app root, outside the
 * language segment, so pages point to it explicitly; otherwise LinkedIn and others show no image.
 */
export const socialImage = {
  url: '/opengraph-image',
  width: 1200,
  height: 630,
  alt: 'Siraj Munir, AI Engineer in Dubai',
}

/** Metadata for an inner page: its own title, description, canonical URL and language versions. */
export function pageMetadata(locale: Locale, path: string, title: string, description: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: `/${locale}${path}`, languages: languageAlternates(path) },
    openGraph: {
      type: 'website',
      url: `/${locale}${path}`,
      title,
      description,
      locale: ogLocale[locale],
      images: [socialImage],
    },
    twitter: { card: 'summary_large_image', title, description, images: [socialImage.url] },
  }
}

/** schema.org Person data, so search engines understand who the site is about. */
export function personJsonLd(site: Site) {
  const url = `${siteUrl()}/${site.locale}`
  const { profile } = site
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    alternateName: profile.fullName,
    jobTitle: profile.role,
    description: site.dict.meta.description,
    url,
    image: profile.photo ? `${siteUrl()}${profile.photo.src}` : undefined,
    email: `mailto:${profile.email}`,
    address: { '@type': 'PostalAddress', addressLocality: 'Dubai', addressCountry: 'AE' },
    worksFor: { '@type': 'Organization', name: 'Xoto', url: 'https://www.xoto.ae' },
    alumniOf: { '@type': 'CollegeOrUniversity', name: 'Foundation University Islamabad' },
    knowsAbout: site.skillGroups.slice(0, 2).flatMap((g) => g.skills),
    knowsLanguage: site.spokenLanguages.map((l) => l.code),
    sameAs: [profile.socials.github, profile.socials.linkedin],
  }
}
