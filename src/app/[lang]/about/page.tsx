import { notFound } from 'next/navigation'
import { CinematicPortrait } from '@/components/about/CinematicPortrait'
import { Reveal } from '@/components/motion/Reveal'
import { AboutStory } from '@/components/sections/AboutStory'
import { Certifications } from '@/components/sections/Certifications'
import { Education } from '@/components/sections/Education'
import { Highlights } from '@/components/sections/Highlights'
import { Skills } from '@/components/sections/Skills'
import { Em } from '@/components/ui/Em'
import { PageIntro } from '@/components/ui/PageIntro'
import { getSite } from '@/content'
import { defaultLocale, isLocale, localeHref } from '@/i18n/config'
import { pageMetadata } from '@/lib/site'

export async function generateMetadata({ params }: PageProps<'/[lang]/about'>) {
  const { lang } = await params
  const locale = isLocale(lang) ? lang : defaultLocale
  const { dict } = getSite(locale)
  return pageMetadata(locale, '/about', dict.pages.aboutTitle, dict.pages.aboutDescription)
}

/** The long version: story, numbers, skills, certificates, education and research. */
export default async function AboutPage({ params }: PageProps<'/[lang]/about'>) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const site = getSite(lang)
  const { dict } = site

  return (
    <>
      <PageIntro
        crumbs={[{ label: dict.nav.home, href: localeHref(lang) }]}
        breadcrumbLabel={dict.nav.breadcrumb}
        eyebrow={dict.about.eyebrow}
        title={
          <>
            {dict.pages.aboutHeadingBefore}
            <Em>{dict.pages.aboutHeadingEm}</Em>
            {dict.pages.aboutHeadingAfter}
          </>
        }
        description={site.profile.intro}
      />
      <div className="container-page">
        <Reveal y={40}>
          <CinematicPortrait />
        </Reveal>
      </div>
      <AboutStory site={site} />
      <Highlights site={site} />
      <Skills site={site} />
      <Certifications site={site} />
      <Education site={site} />
    </>
  )
}
