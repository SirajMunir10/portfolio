'use client'

import { ArrowUpRight, CalendarDays, MapPin } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useId, useRef, useState } from 'react'
import { Badge } from '@/components/ui/Badge'
import { cn } from '@/lib/utils'
import type { Experience } from '@/types/content'

/**
 * Accessible tabs (arrow keys, Home/End) listing each role. Vertical on desktop,
 * a horizontal scroller on phones. The panel content animates when the tab changes.
 */
export function ExperienceTabs({ items }: { items: Experience[] }) {
  const [index, setIndex] = useState(0)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const baseId = useId()
  const job = items[index]

  function onKeyDown(e: React.KeyboardEvent) {
    const last = items.length - 1
    const next =
      e.key === 'ArrowDown' || e.key === 'ArrowRight'
        ? index === last
          ? 0
          : index + 1
        : e.key === 'ArrowUp' || e.key === 'ArrowLeft'
          ? index === 0
            ? last
            : index - 1
          : e.key === 'Home'
            ? 0
            : e.key === 'End'
              ? last
              : null
    if (next === null) return
    e.preventDefault()
    setIndex(next)
    tabs.current[next]?.focus()
  }

  return (
    <div className="grid gap-8 md:grid-cols-[15rem_1fr] md:gap-12">
      <div
        role="tablist"
        aria-label="Roles"
        aria-orientation="vertical"
        onKeyDown={onKeyDown}
        className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 md:mx-0 md:flex-col md:gap-1 md:overflow-visible md:px-0"
      >
        {items.map((item, i) => {
          const selected = i === index
          return (
            <button
              key={item.company}
              ref={(el) => {
                tabs.current[i] = el
              }}
              role="tab"
              id={`${baseId}-tab-${i}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setIndex(i)}
              className={cn(
                'relative shrink-0 rounded-xl px-4 py-3 text-left transition-colors md:w-full',
                selected ? 'text-text' : 'text-muted hover:bg-surface-2 hover:text-text'
              )}
            >
              {selected ? (
                <motion.span
                  layoutId={`${baseId}-active`}
                  className="absolute inset-0 rounded-xl border border-border bg-surface shadow-card"
                  transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                />
              ) : null}
              <span className="relative block text-sm font-semibold">{item.company}</span>
              <span className="relative block font-mono text-[0.7rem] text-subtle">
                {item.start} – {item.end ?? 'Present'}
              </span>
            </button>
          )
        })}
      </div>

      <div
        role="tabpanel"
        id={`${baseId}-panel`}
        aria-labelledby={`${baseId}-tab-${index}`}
        tabIndex={0}
        className="min-h-88 rounded-2xl"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.article
            key={job.company}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <h3 className="text-xl font-semibold text-text md:text-2xl">
              {job.role}{' '}
              <span className="text-accent">
                @{' '}
                {job.companyUrl ? (
                  <a
                    href={job.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-0.5 underline-offset-4 hover:underline"
                  >
                    {job.company}
                    <ArrowUpRight className="size-4" aria-hidden />
                  </a>
                ) : (
                  job.company
                )}
              </span>
            </h3>
            <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs text-subtle">
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="size-3.5" aria-hidden />
                {job.start} – {job.end ?? 'Present'}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="size-3.5" aria-hidden />
                {job.location}
              </span>
              <span>{job.employment}</span>
            </p>
            <p className="mt-5 text-base leading-relaxed text-muted">{job.summary}</p>
            <ul className="mt-5 space-y-3">
              {job.highlights.map((h, i) => (
                <motion.li
                  key={h}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 * i + 0.1, duration: 0.4 }}
                  className="flex gap-3 text-[0.95rem] leading-relaxed text-muted"
                >
                  <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent-2" />
                  {h}
                </motion.li>
              ))}
            </ul>
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Tools and skills">
              {job.stack.map((s) => (
                <li key={s}>
                  <Badge>{s}</Badge>
                </li>
              ))}
            </ul>
          </motion.article>
        </AnimatePresence>
      </div>
    </div>
  )
}
