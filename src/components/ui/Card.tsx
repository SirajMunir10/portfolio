import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

/** Frosted glass surface. `interactive` adds a gentle lift and a brighter edge on hover. */
export function Card({
  className,
  interactive = false,
  ...rest
}: ComponentProps<'div'> & { interactive?: boolean }) {
  return (
    <div
      className={cn(
        'glass rounded-3xl border border-border',
        interactive &&
          'transition-[transform,border-color] duration-500 ease-out-expo hover:-translate-y-1 hover:border-accent/30',
        className
      )}
      {...rest}
    />
  )
}
