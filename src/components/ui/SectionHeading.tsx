import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type Props = {
  /** Two-digit section number, e.g. "01". */
  index: string
  eyebrow: string
  title: ReactNode
  description?: ReactNode
  id?: string
  className?: string
}

/** Editorial section header: a numbered label, a large heading (with optional serif emphasis) and an intro line. */
export function SectionHeading({ index, eyebrow, title, description, id, className }: Props) {
  return (
    <header className={cn('mb-12 max-w-3xl md:mb-16', className)}>
      <p className="flex items-center gap-3 font-mono text-xs tracking-[0.2em] text-subtle uppercase">
        <span className="text-accent">{index}</span>
        <span aria-hidden className="h-px w-8 bg-border-strong" />
        {eyebrow}
      </p>
      <h2 id={id} className="mt-5 text-4xl leading-[1.05] font-semibold text-text md:text-6xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted md:text-lg">{description}</p>
      ) : null}
    </header>
  )
}
