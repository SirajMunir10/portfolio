'use client'

import { CalendarDays, Users } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'
import type { Project } from '@/types/content'
import { ImageGallery } from './ImageGallery'
import { ProjectLinks } from './ProjectLinks'
import { ResearchDiagram } from './ResearchDiagram'

type Props = { project: Project; open: boolean; onClose: () => void; onOpenPaper: () => void }

const label = 'mb-3 font-mono text-xs font-medium tracking-[0.18em] text-subtle uppercase'

/** Full project story in a dialog: gallery, problem, what was built, results, stack and links. */
export function CaseStudy({ project, open, onClose, onOpenPaper }: Props) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={project.title}
      subtitle={project.tagline}
      size="xl"
      bodyClassName="px-5 py-6 sm:px-8 sm:py-8"
    >
      <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div className="min-w-0 space-y-8">
          {project.images.length ? (
            <ImageGallery images={project.images} />
          ) : (
            <div className="aspect-16/10 overflow-hidden rounded-2xl border border-border bg-surface-2 p-3">
              <ResearchDiagram />
            </div>
          )}
          <section>
            <h3 className={label}>The problem</h3>
            <p className="text-base leading-relaxed text-muted">{project.problem}</p>
          </section>
          <section>
            <h3 className={label}>What I built</h3>
            <ul className="space-y-3">
              {project.built.map((item) => (
                <li key={item} className="flex gap-3 leading-relaxed text-muted">
                  <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent-2" />
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="min-w-0 space-y-8 lg:sticky lg:top-0 lg:self-start">
          <div className="space-y-2 text-sm text-muted">
            <p className="flex items-center gap-2">
              <CalendarDays className="size-4 text-accent" aria-hidden /> {project.period}
            </p>
            <p className="flex items-center gap-2">
              <Users className="size-4 text-accent" aria-hidden /> {project.team}
            </p>
          </div>
          {project.results.length ? (
            <section>
              <h3 className={label}>Results</h3>
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
            <h3 className={label}>Built with</h3>
            <ul className="flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <li key={s}>
                  <Badge>{s}</Badge>
                </li>
              ))}
            </ul>
          </section>
          <ProjectLinks project={project} onOpenPaper={onOpenPaper} />
        </aside>
      </div>
    </Modal>
  )
}
