import { ExternalLink, FileText } from 'lucide-react'
import { GitHubIcon } from '@/components/icons/BrandIcons'
import { cn } from '@/lib/utils'
import type { Project } from '@/types/content'

const linkClass =
  'inline-flex h-9 items-center gap-1.5 rounded-full glass border border-border px-3.5 text-sm text-muted transition-colors hover:border-border-strong hover:text-text'

type Props = { project: Project; onOpenPaper?: () => void; className?: string }

/** GitHub, live demo and paper links for a project. The paper opens in the in-page viewer when a handler is given. */
export function ProjectLinks({ project, onOpenPaper, className }: Props) {
  const { github, live, paper } = project.links
  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {github ? (
        <a href={github} target="_blank" rel="noopener noreferrer" className={linkClass}>
          <GitHubIcon className="size-4" /> Code
        </a>
      ) : null}
      {live ? (
        <a href={live} target="_blank" rel="noopener noreferrer" className={linkClass}>
          <ExternalLink className="size-4" aria-hidden /> Live site
        </a>
      ) : null}
      {paper && onOpenPaper ? (
        <button type="button" onClick={onOpenPaper} className={linkClass}>
          <FileText className="size-4" aria-hidden /> Read the paper
        </button>
      ) : null}
    </div>
  )
}
