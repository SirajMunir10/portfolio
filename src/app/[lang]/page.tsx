import { notFound } from 'next/navigation'
import { AboutTeaser } from '@/components/sections/AboutTeaser'
import { Availability } from '@/components/sections/Availability'
import { Contact } from '@/components/sections/Contact'
import { Experience } from '@/components/sections/Experience'
import { Hero } from '@/components/sections/Hero'
import { SelectedWork } from '@/components/sections/SelectedWork'
import { getSite } from '@/content'
import { isLocale } from '@/i18n/config'
import { personJsonLd } from '@/lib/site'

/**
 * Home: the short version, readable in a minute. The strongest work, experience, a glimpse of who I am,
 * then where I am open to work and how to reach me. Full detail lives on /projects and /about.
 */
export default async function HomePage({ params }: PageProps<'/[lang]'>) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const site = getSite(lang)

  return (
    <>
      <script
        type="application/ld+json"
        // Structured data for search engines; "<" is escaped so the JSON can never close the script tag.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd(site)).replace(/</g, '\\u003c') }}
      />
      <Hero site={site} />
      <SelectedWork site={site} />
      <Experience site={site} />
      <AboutTeaser site={site} />
      <Availability site={site} />
      <Contact site={site} />
    </>
  )
}
