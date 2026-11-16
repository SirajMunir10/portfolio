import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

/** Surface with a hairline border and soft shadow. `interactive` adds the hover lift. */
export function Card({
  className,
  interactive = false,
  ...rest
}: ComponentProps<'div'> & { interactive?: boolean }) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-border bg-surface shadow-card',
        interactive &&
          'transition-[transform,box-shadow,border-color] duration-300 ease-out-expo hover:-translate-y-1 hover:border-border-strong hover:shadow-lift',
        className
      )}
      {...rest}
    />
  )
}
