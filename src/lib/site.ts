import { profile } from '@/content/profile'
import { skillGroups } from '@/content/skills'

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

export const site = {
  title: `${profile.name} · ${profile.role} in Dubai`,
  description:
    'Siraj Munir is an AI Engineer in Dubai who builds LLM, RAG and voice AI products end to end: a 21-language chat and voice assistant, AI-assisted cloud security tooling and published ICU monitoring research.',
  keywords: [
    'Siraj Munir',
    'AI Engineer',
    'AI Engineer Dubai',
    'LLM engineer',
    'RAG',
    'Voice AI',
    'Conversational AI',
    'Machine learning',
    'FastAPI',
    'Next.js',
    'Portfolio',
  ],
}

/** schema.org Person data, so search engines understand who the site is about. */
export function personJsonLd() {
  const url = siteUrl()
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    alternateName: profile.fullName,
    jobTitle: profile.role,
    description: site.description,
    url,
    image: profile.photo ? `${url}${profile.photo.src}` : undefined,
    email: `mailto:${profile.email}`,
    address: { '@type': 'PostalAddress', addressLocality: 'Dubai', addressCountry: 'AE' },
    worksFor: { '@type': 'Organization', name: 'Xoto', url: 'https://www.xoto.ae' },
    alumniOf: { '@type': 'CollegeOrUniversity', name: 'Foundation University Islamabad' },
    knowsAbout: skillGroups.slice(0, 2).flatMap((g) => g.skills),
    sameAs: [profile.socials.github, profile.socials.linkedin],
  }
}
