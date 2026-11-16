import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type Props = {
  eyebrow: string
  title: ReactNode
  description?: ReactNode
  id?: string
  className?: string
}

/** Section title block: small mono label, large heading and an optional intro line. */
export function SectionHeading({ eyebrow, title, description, id, className }: Props) {
  return (
    <header className={cn('mb-10 max-w-2xl md:mb-14', className)}>
      <p className="mb-3 flex items-center gap-2 font-mono text-xs font-medium tracking-[0.18em] text-accent uppercase">
        <span aria-hidden className="h-px w-6 bg-accent" />
        {eyebrow}
      </p>
      <h2 id={id} className="text-3xl font-semibold text-text md:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">{description}</p>
      ) : null}
    </header>
  )
}
