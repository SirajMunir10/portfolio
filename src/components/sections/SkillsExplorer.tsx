'use client'

import { AnimatePresence, LayoutGroup, motion } from 'motion/react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import type { SkillGroup } from '@/types/content'

/** Filter chips over the skill groups; cards re-flow smoothly when the filter changes. */
export function SkillsExplorer({ groups }: { groups: SkillGroup[] }) {
  const [filter, setFilter] = useState<string>('all')
  const visible = filter === 'all' ? groups : groups.filter((g) => g.id === filter)
  const options = [{ id: 'all', title: 'All' }, ...groups.map((g) => ({ id: g.id, title: g.title }))]

  return (
    <LayoutGroup>
      <div
        role="group"
        aria-label="Filter skills"
        className="-mx-5 mb-8 flex gap-2 overflow-x-auto px-5 pb-1 md:mx-0 md:flex-wrap md:px-0"
      >
        {options.map((o) => {
          const active = filter === o.id
          return (
            <button
              key={o.id}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(o.id)}
              className={cn(
                'relative shrink-0 rounded-full px-4 py-2 text-sm transition-colors',
                active ? 'text-accent-contrast' : 'text-muted hover:text-text'
              )}
            >
              {active ? (
                <motion.span
                  layoutId="skill-filter"
                  className="absolute inset-0 rounded-full bg-accent"
                  transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                />
              ) : (
                <span className="absolute inset-0 rounded-full border border-border" />
              )}
              <span className="relative">{o.title}</span>
            </button>
          )
        })}
      </div>

      <motion.ul layout className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((g, gi) => (
            <motion.li
              key={g.id}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className={cn(
                'glass rounded-3xl border border-border p-6',
                filter !== 'all' && 'sm:col-span-2 lg:col-span-3'
              )}
            >
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-semibold text-text">{g.title}</h3>
                <span className="font-mono text-xs text-subtle">
                  {String(g.skills.length).padStart(2, '0')}
                </span>
              </div>
              <ul className="mt-4 flex flex-wrap gap-2">
                {g.skills.map((s, i) => (
                  <motion.li
                    key={s}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.02 * i + 0.03 * gi }}
                    className="rounded-lg border border-border bg-surface-2 px-2.5 py-1 text-sm text-text transition-colors hover:border-accent/40 hover:bg-accent-soft hover:text-accent"
                  >
                    {s}
                  </motion.li>
                ))}
              </ul>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </LayoutGroup>
  )
}
