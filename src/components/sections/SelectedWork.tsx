import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Reveal, Stagger, StaggerItem } from '@/components/motion/Reveal'
import { ProjectCover } from '@/components/projects/ProjectCover'
import { ButtonLink } from '@/components/ui/Button'
import { Em } from '@/components/ui/Em'
import { SectionHeading } from '@/components/ui/SectionHeading'
import type { Site } from '@/content'
import { format, localeHref } from '@/i18n/config'

/** Home page: the three strongest projects as cards, each opening its own case study page. */
export function SelectedWork({ site }: { site: Site }) {
  const { dict, locale } = site
  const t = dict.home
  const picks = site.featuredProjects.slice(0, 3)

  return (
    <section id="projects" aria-labelledby="work-title" className="container-page py-24 md:py-32">
      <SectionHeading
        index="01"
        id="work-title"
        eyebrow={t.workEyebrow}
        title={
          <>
            {t.workTitleBefore}
            <Em>{t.workTitleEm}</Em>
            {t.workTitleAfter}
          </>
        }
        description={t.workDescription}
      />

      <Stagger className="grid gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
        {picks.map((p, i) => (
          <StaggerItem key={p.slug} className={i === 2 ? 'md:col-span-2 lg:col-span-1' : undefined}>
            <Link
              href={localeHref(locale, `/projects/${p.slug}`)}
              className="group/cover flex h-full flex-col rounded-3xl"
            >
              <ProjectCover project={p} />
              <div className="flex flex-1 flex-col px-1 pt-5">
                <p className="font-mono text-xs text-subtle">
                  <span className="text-accent">{String(i + 1).padStart(2, '0')}</span> · {p.category}
                </p>
                <h3 className="mt-2 text-xl font-semibold text-text transition-colors group-hover/cover:text-accent md:text-2xl">
                  {p.title}
                </h3>
                <p className="mt-1.5 flex-1 leading-relaxed text-muted">{p.tagline}</p>
                {p.results.length ? (
                  <dl className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
                    {p.results.slice(0, 2).map((r) => (
                      <div key={r.label} className="flex items-baseline gap-1.5">
                        <dt className="sr-only">{r.label}</dt>
                        <dd className="text-sm text-subtle">
                          <span className="me-1.5 font-semibold text-text">{r.value}</span>
                          {r.label}
                        </dd>
                      </div>
                    ))}
                  </dl>
                ) : null}
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                  {dict.projects.readCase}
                  <ArrowRight
                    className="size-4 transition-transform group-hover/cover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover/cover:-translate-x-0.5"
                    aria-hidden
                  />
                </span>
              </div>
            </Link>
          </StaggerItem>
        ))}
      </Stagger>

      <Reveal className="mt-14 flex justify-center">
        <ButtonLink href={localeHref(locale, '/projects')} variant="secondary" size="lg">
          {format(t.allProjects, { count: site.projects.length })}
          <ArrowRight
            className="size-4 transition-transform group-hover/button:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover/button:-translate-x-0.5"
            aria-hidden
          />
        </ButtonLink>
      </Reveal>
    </section>
  )
}
