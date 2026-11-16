import { notFound } from 'next/navigation'
import { About } from '@/components/sections/About'
import { Certifications } from '@/components/sections/Certifications'
import { Contact } from '@/components/sections/Contact'
import { Education } from '@/components/sections/Education'
import { Experience } from '@/components/sections/Experience'
import { Hero } from '@/components/sections/Hero'
import { Highlights } from '@/components/sections/Highlights'
import { Projects } from '@/components/sections/Projects'
import { Skills } from '@/components/sections/Skills'
import { getSite } from '@/content'
import { isLocale } from '@/i18n/config'
import { personJsonLd } from '@/lib/site'

/** The whole portfolio on one page, in reading order, in the requested language. */
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
      <Highlights site={site} />
      <About site={site} />
      <Experience site={site} />
      <Projects site={site} />
      <Skills site={site} />
      <Certifications site={site} />
      <Education site={site} />
      <Contact site={site} />
    </>
  )
}
