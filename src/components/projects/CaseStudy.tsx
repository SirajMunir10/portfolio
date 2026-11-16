'use client'

import { ArrowRight, CalendarDays, Users } from 'lucide-react'
import Link from 'next/link'
import { useCallback, useState } from 'react'
import { Reveal } from '@/components/motion/Reveal'
import { Badge } from '@/components/ui/Badge'
import { DocumentViewer } from '@/components/ui/DocumentViewer'
import { localeHref } from '@/i18n/config'
import { useI18n } from '@/i18n/I18nProvider'
import type { Project } from '@/types/content'
import { ImageGallery } from './ImageGallery'
import { ProjectLinks } from './ProjectLinks'
import { ResearchDiagram } from './ResearchDiagram'

type Props = { project: Project; next: { slug: string; title: string; tagline: string } }

const label = 'mb-3 font-mono text-xs font-medium tracking-[0.18em] text-subtle uppercase'

/** Body of a case study page: gallery, problem, what was built, then results, stack and links alongside. */
export function CaseStudy({ project, next }: Props) {
  const { dict, locale } = useI18n()
  const [paperOpen, setPaperOpen] = useState(false)
  const closePaper = useCallback(() => setPaperOpen(false), [])
  const visual = project.images.length ? (
    <ImageGallery images={project.images} />
  ) : project.links.paper ? (
    <div className="aspect-16/10 overflow-hidden rounded-2xl border border-border bg-surface-2 p-3">
      <ResearchDiagram />
    </div>
  ) : null

  return (
    <div className="container-page pb-24 md:pb-32">
      <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-14">
        <Reveal className="min-w-0 space-y-10">
          {visual}
          <section>
            <h2 className={label}>{dict.projects.problem}</h2>
            <p className="text-lg leading-relaxed text-muted">{project.problem}</p>
          </section>
          <section>
            <h2 className={label}>{dict.projects.built}</h2>
            <ul className="space-y-3">
              {project.built.map((item) => (
                <li key={item} className="flex gap-3 leading-relaxed text-muted">
                  <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent-2" />
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </Reveal>

        <Reveal delay={0.1} className="min-w-0">
          <aside className="glass space-y-8 rounded-3xl border border-border p-6 lg:sticky lg:top-28">
            <div className="space-y-2 text-sm text-muted">
              <p className="flex items-center gap-2">
                <CalendarDays className="size-4 shrink-0 text-accent" aria-hidden /> {project.period}
              </p>
              <p className="flex items-center gap-2">
                <Users className="size-4 shrink-0 text-accent" aria-hidden /> {project.team}
              </p>
            </div>
            {project.results.length ? (
              <section>
                <h2 className={label}>{dict.projects.results}</h2>
                <ul className="grid gap-2">
                  {project.results.map((r) => (
                    <li key={r.label} className="rounded-xl border border-border bg-surface-2 px-4 py-3">
                      <span className="block text-xl font-semibold text-text">{r.value}</span>
                      <span className="text-sm text-muted">{r.label}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
            <section>
              <h2 className={label}>{dict.common.builtWith}</h2>
              <ul className="flex flex-wrap gap-2">
                {project.stack.map((s) => (
                  <li key={s}>
                    <Badge>{s}</Badge>
                  </li>
                ))}
              </ul>
            </section>
            <ProjectLinks project={project} onOpenPaper={() => setPaperOpen(true)} />
          </aside>
        </Reveal>
      </div>

      <Reveal className="mt-20 md:mt-28">
        <Link
          href={localeHref(locale, `/projects/${next.slug}`)}
          className="group glass flex items-center justify-between gap-6 rounded-3xl border border-border p-6 transition-colors hover:border-border-strong md:p-8"
        >
          <span>
            <span className="block font-mono text-xs tracking-[0.18em] text-subtle uppercase">
              {dict.pages.nextProject}
            </span>
            <span className="mt-2 block text-2xl font-semibold text-text transition-colors group-hover:text-accent md:text-3xl">
              {next.title}
            </span>
            <span className="mt-1 block text-muted">{next.tagline}</span>
          </span>
          <span className="grid size-12 shrink-0 place-items-center rounded-full bg-accent text-accent-contrast">
            <ArrowRight
              className="size-5 transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5"
              aria-hidden
            />
          </span>
        </Link>
      </Reveal>

      {project.links.paper ? (
        <DocumentViewer
          open={paperOpen}
          onClose={closePaper}
          title={project.title}
          subtitle={dict.projects.paperPdf}
          src={project.links.paper}
          downloadName="Siraj-Munir-ICU-Alarm-Fatigue-Paper.pdf"
        />
      ) : null}
    </div>
  )
}
