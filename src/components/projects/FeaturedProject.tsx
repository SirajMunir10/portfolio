'use client'

import { ArrowRight } from 'lucide-react'
import { useCallback, useState } from 'react'
import { Reveal } from '@/components/motion/Reveal'
import { Tilt } from '@/components/motion/Tilt'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { DocumentViewer } from '@/components/ui/DocumentViewer'
import { cn } from '@/lib/utils'
import type { Project } from '@/types/content'
import { CaseStudy } from './CaseStudy'
import { ProjectCover } from './ProjectCover'
import { ProjectLinks } from './ProjectLinks'

/** One featured project: framed cover on one side, story and results on the other (sides alternate). */
export function FeaturedProject({ project, index }: { project: Project; index: number }) {
  const [caseOpen, setCaseOpen] = useState(false)
  const [paperOpen, setPaperOpen] = useState(false)
  const flip = index % 2 === 1
  const closeCase = useCallback(() => setCaseOpen(false), [])
  const closePaper = useCallback(() => setPaperOpen(false), [])
  const openPaper = useCallback(() => {
    setCaseOpen(false)
    setPaperOpen(true)
  }, [])

  return (
    <article
      aria-labelledby={`project-${project.slug}`}
      className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14"
    >
      <Reveal className={cn(flip && 'lg:order-2')}>
        <Tilt className="rounded-2xl">
          <button
            type="button"
            onClick={() => setCaseOpen(true)}
            aria-label={`Open the ${project.title} case study`}
            className="group/cover block w-full rounded-2xl text-left"
          >
            <ProjectCover project={project} />
          </button>
        </Tilt>
      </Reveal>

      <Reveal delay={0.1} className={cn(flip && 'lg:order-1')}>
        <p className="flex items-center gap-3 font-mono text-xs text-subtle">
          <span className="text-accent">{String(index + 1).padStart(2, '0')}</span>
          <span aria-hidden className="h-px w-8 bg-border-strong" />
          {project.category}
        </p>
        <h3 id={`project-${project.slug}`} className="mt-3 text-2xl font-semibold text-text md:text-3xl">
          {project.title}
        </h3>
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

        <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Built with">
          {project.stack.slice(0, 6).map((s) => (
            <li key={s}>
              <Badge>{s}</Badge>
            </li>
          ))}
          {project.stack.length > 6 ? (
            <li>
              <Badge tone="accent">+{project.stack.length - 6} more</Badge>
            </li>
          ) : null}
        </ul>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <Button size="sm" onClick={() => setCaseOpen(true)}>
            Read the case study
            <ArrowRight
              className="size-4 transition-transform group-hover/button:translate-x-0.5"
              aria-hidden
            />
          </Button>
          <ProjectLinks project={project} onOpenPaper={() => setPaperOpen(true)} />
        </div>
      </Reveal>

      <CaseStudy project={project} open={caseOpen} onClose={closeCase} onOpenPaper={openPaper} />
      {project.links.paper ? (
        <DocumentViewer
          open={paperOpen}
          onClose={closePaper}
          title={project.title}
          subtitle="Research paper (PDF)"
          src={project.links.paper}
          downloadName="Siraj-Munir-ICU-Alarm-Fatigue-Paper.pdf"
        />
      ) : null}
    </article>
  )
}
