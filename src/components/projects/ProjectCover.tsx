import Image from 'next/image'
import type { Project } from '@/types/content'
import { ResearchDiagram } from './ResearchDiagram'

/** Project preview framed like a browser window. Research projects without screenshots show their diagram. */
export function ProjectCover({ project, priority = false }: { project: Project; priority?: boolean }) {
  const cover = project.images[0]
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-card">
      <div className="flex items-center gap-1.5 border-b border-border bg-surface-2 px-4 py-2.5" aria-hidden>
        <span className="size-2.5 rounded-full bg-border-strong" />
        <span className="size-2.5 rounded-full bg-border-strong" />
        <span className="size-2.5 rounded-full bg-border-strong" />
        <span className="ml-3 truncate font-mono text-[0.7rem] text-subtle">
          {project.links.live?.replace(/^https?:\/\//, '') ?? `${project.slug}`}
        </span>
      </div>
      <div className="relative aspect-16/10 overflow-hidden bg-linear-to-br from-accent-soft to-accent-2-soft">
        {cover ? (
          <Image
            src={cover.src}
            alt={cover.alt}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 620px, 95vw"
            className="object-cover object-top transition-transform duration-700 ease-out-expo group-hover/cover:scale-[1.04]"
          />
        ) : (
          <div className="absolute inset-0 p-2 sm:p-4">
            <ResearchDiagram />
          </div>
        )}
      </div>
    </div>
  )
}
