import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type Tone = 'neutral' | 'accent' | 'teal'

const tones: Record<Tone, string> = {
  neutral: 'border-border bg-surface-2 text-muted',
  accent: 'border-accent/20 bg-accent-soft text-accent',
  teal: 'border-accent-2/25 bg-accent-2-soft text-accent-2',
}

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
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[0.72rem] leading-5 tracking-tight',
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  )
}
