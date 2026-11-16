import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

/** Emphasis in headings: a serif italic word in the accent colour. */
export function Em({
  children,
  tone = 'accent',
  className,
}: {
  children: ReactNode
  tone?: 'accent' | 'warm'
  className?: string
}) {
  return (
    <em
      className={cn(
        'font-serif font-normal tracking-normal italic',
        tone === 'warm' ? 'text-accent-2' : 'text-accent',
        className
      )}
    >
      {children}
    </em>
  )
}
