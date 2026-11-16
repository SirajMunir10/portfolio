import { notFound } from 'next/navigation'
import { Projects } from '@/components/sections/Projects'
import { Em } from '@/components/ui/Em'
import { PageIntro } from '@/components/ui/PageIntro'
import { getSite } from '@/content'
import { defaultLocale, isLocale, localeHref } from '@/i18n/config'
import { pageMetadata } from '@/lib/site'

export async function generateMetadata({ params }: PageProps<'/[lang]/projects'>) {
  const { lang } = await params
  const locale = isLocale(lang) ? lang : defaultLocale
  const { dict } = getSite(locale)
  return pageMetadata(locale, '/projects', dict.pages.projectsTitle, dict.pages.projectsDescription)
}

/** Every project: the featured ones in full, the smaller ones as cards, each with its own case study. */
export default async function ProjectsPage({ params }: PageProps<'/[lang]/projects'>) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const site = getSite(lang)
  const t = site.dict.projects

  return (
    <>
      <PageIntro
        crumbs={[{ label: site.dict.nav.home, href: localeHref(lang) }]}
        breadcrumbLabel={site.dict.nav.breadcrumb}
        eyebrow={t.eyebrow}
        title={
          <>
            {t.titleBefore}
            <Em>{t.titleEm}</Em>
            {t.titleAfter}
          </>
        }
        description={t.description}
      />
      <Projects site={site} />
    </>
  )
}
