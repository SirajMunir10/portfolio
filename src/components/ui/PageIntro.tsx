import Link from 'next/link'
import type { ReactNode } from 'react'

type Crumb = { label: string; href: string }

type Props = {
  eyebrow: ReactNode
  title: ReactNode
  description?: ReactNode
  /** Trail back to the parent pages; the current page is the heading itself. */
  crumbs?: Crumb[]
  breadcrumbLabel?: string
  children?: ReactNode
}

const delay = (ms: number) => ({ animationDelay: `${ms}ms` })

/** Opening of an inner page: breadcrumb, label, the page's single h1 and an intro line. */
export function PageIntro({ eyebrow, title, description, crumbs, breadcrumbLabel, children }: Props) {
  return (
    <header className="container-page pt-32 pb-12 md:pt-44 md:pb-16">
      {crumbs?.length ? (
        <nav aria-label={breadcrumbLabel} className="animate-rise mb-8" style={delay(0)}>
          <ol className="flex flex-wrap items-center gap-2 font-mono text-xs text-subtle">
            {crumbs.map((c, i) => (
              <li key={c.href} className="flex items-center gap-2">
                {i > 0 ? <span aria-hidden>/</span> : null}
                <Link href={c.href} className="transition-colors hover:text-text">
                  {c.label}
                </Link>
              </li>
            ))}
          </ol>
        </nav>
      ) : null}
      <p
        className="animate-rise flex items-center gap-3 font-mono text-xs tracking-[0.2em] text-subtle uppercase"
        style={delay(60)}
      >
        <span aria-hidden className="h-px w-8 bg-accent" />
        {eyebrow}
      </p>
      <h1
        className="animate-rise mt-5 max-w-4xl text-5xl leading-[1.02] font-semibold tracking-tight text-text md:text-7xl"
        style={delay(120)}
      >
        {title}
      </h1>
      {description ? (
        <p className="animate-rise mt-6 max-w-2xl text-lg leading-relaxed text-muted md:text-xl" style={delay(200)}>
          {description}
        </p>
      ) : null}
      {children}
    </header>
  )
}
