import { cn } from '@/lib/utils'

/** "SM" monogram: two strokes inside a rounded square, drawn in SVG so it stays crisp at any size. */
export function Logo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden className={cn('size-9', className)}>
      <rect x="1" y="1" width="38" height="38" rx="11" className="fill-text" />
      <path
        d="M17.5 13.5c-1.1-1.3-2.6-2-4.3-2-2.6 0-4.4 1.5-4.4 3.6 0 4.9 9.3 3 9.3 8.4 0 2.3-2 4-4.9 4-1.9 0-3.6-.8-4.8-2.3"
        className="fill-none stroke-bg"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <path
        d="M21.5 27.5v-15l4.75 8.5L31 12.5v15"
        className="fill-none stroke-accent-2"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
