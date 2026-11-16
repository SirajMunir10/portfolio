import { notFound } from 'next/navigation'
import { CaseStudy } from '@/components/projects/CaseStudy'
import { PageIntro } from '@/components/ui/PageIntro'
import { getSite } from '@/content'
import { projects } from '@/content/projects'
import { defaultLocale, isLocale, localeHref } from '@/i18n/config'
import { pageMetadata } from '@/lib/site'

/** Every case study is prerendered in every language (the language comes from the parent segment). */
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: PageProps<'/[lang]/projects/[slug]'>) {
  const { lang, slug } = await params
  const locale = isLocale(lang) ? lang : defaultLocale
  const project = getSite(locale).projects.find((p) => p.slug === slug)
  if (!project) return {}
  return pageMetadata(locale, `/projects/${slug}`, project.title, `${project.tagline} ${project.summary}`)
}

export default async function CaseStudyPage({ params }: PageProps<'/[lang]/projects/[slug]'>) {
  const { lang, slug } = await params
  if (!isLocale(lang)) notFound()
  const site = getSite(lang)
  const index = site.projects.findIndex((p) => p.slug === slug)
  if (index === -1) notFound()
  const project = site.projects[index]
  const next = site.projects[(index + 1) % site.projects.length]
  const { dict } = site

  return (
    <>
      <PageIntro
        crumbs={[
          { label: dict.nav.home, href: localeHref(lang) },
          { label: dict.pages.allProjects, href: localeHref(lang, '/projects') },
        ]}
        breadcrumbLabel={dict.nav.breadcrumb}
        eyebrow={
          <>
            {dict.pages.caseStudy} · {project.category}
          </>
        }
        title={project.title}
        description={project.tagline}
      />
      <CaseStudy project={project} next={{ slug: next.slug, title: next.title, tagline: next.tagline }} />
    </>
  )
}
