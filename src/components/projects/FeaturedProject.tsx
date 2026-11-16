'use client'

import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useCallback, useState } from 'react'
import { Reveal } from '@/components/motion/Reveal'
import { Tilt } from '@/components/motion/Tilt'
import { Badge } from '@/components/ui/Badge'
import { ButtonLink } from '@/components/ui/Button'
import { DocumentViewer } from '@/components/ui/DocumentViewer'
import { format, localeHref } from '@/i18n/config'
import { useI18n } from '@/i18n/I18nProvider'
import { cn } from '@/lib/utils'
import type { Project } from '@/types/content'
import { ProjectCover } from './ProjectCover'
import { ProjectLinks } from './ProjectLinks'

/** One featured project: framed cover on one side, story and results on the other (sides alternate). */
export function FeaturedProject({ project, index }: { project: Project; index: number }) {
  const [paperOpen, setPaperOpen] = useState(false)
  const { dict, locale } = useI18n()
  const flip = index % 2 === 1
  const href = localeHref(locale, `/projects/${project.slug}`)
  const closePaper = useCallback(() => setPaperOpen(false), [])

  return (
    <article
      aria-labelledby={`project-${project.slug}`}
      className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14"
    >
      <Reveal className={cn(flip && 'lg:order-2')}>
        <Tilt className="rounded-2xl">
          <Link
            href={href}
            aria-label={format(dict.projects.openCase, { title: project.title })}
            className="group/cover block w-full rounded-2xl"
          >
            <ProjectCover project={project} />
          </Link>
        </Tilt>
      </Reveal>

      <Reveal delay={0.1} className={cn(flip && 'lg:order-1')}>
        <p className="flex items-center gap-3 font-mono text-xs text-subtle">
          <span className="text-accent">{String(index + 1).padStart(2, '0')}</span>
          <span aria-hidden className="h-px w-8 bg-border-strong" />
          {project.category}
        </p>
        <h2 id={`project-${project.slug}`} className="mt-3 text-2xl font-semibold text-text md:text-3xl">
          {project.title}
        </h2>
        <p className="mt-2 text-lg text-text/80">{project.tagline}</p>
        <p className="mt-4 leading-relaxed text-muted">{project.summary}</p>

        {project.results.length ? (
          <dl className="mt-6 grid grid-cols-3 gap-2">
            {project.results.map((r) => (
              <div key={r.label} className="rounded-2xl border border-border bg-surface-2 px-3 py-3">
                <dt className="sr-only">{r.label}</dt>
                <dd>
                  <span className="block text-lg font-semibold text-text md:text-xl">{r.value}</span>
                  <span className="mt-0.5 block text-xs leading-snug text-subtle">{r.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        ) : null}

        <ul className="mt-5 flex flex-wrap gap-1.5" aria-label={dict.common.builtWith}>
          {project.stack.slice(0, 6).map((s) => (
            <li key={s}>
              <Badge>{s}</Badge>
            </li>
          ))}
          {project.stack.length > 6 ? (
            <li>
              <Badge tone="accent">{format(dict.common.more, { count: project.stack.length - 6 })}</Badge>
            </li>
          ) : null}
        </ul>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <ButtonLink href={href} size="sm">
            {dict.projects.readCase}
            <ArrowRight
              className="size-4 transition-transform group-hover/button:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover/button:-translate-x-0.5"
              aria-hidden
            />
          </ButtonLink>
          <ProjectLinks project={project} onOpenPaper={() => setPaperOpen(true)} />
        </div>
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
    </article>
  )
}
