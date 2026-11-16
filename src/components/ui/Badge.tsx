import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type Tone = 'neutral' | 'accent' | 'teal'

const tones: Record<Tone, string> = {
  neutral: 'border-border bg-surface-2 text-muted',
  accent: 'border-accent/20 bg-accent-soft text-accent',
  teal: 'border-accent-2/25 bg-accent-2-soft text-accent-2',
}

/** Small, quiet tag for technologies and skills. */
export function Badge({
  children,
  tone = 'neutral',
  className,
}: {
  children: ReactNode
  tone?: Tone
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs leading-5',
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  )
}
