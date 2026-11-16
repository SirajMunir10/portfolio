'use client'

import { motion, useReducedMotion, useScroll, useSpring } from 'motion/react'
import { useRef, type ReactNode } from 'react'

/** Vertical timeline whose line draws itself as the visitor scrolls through it. */
export function Timeline({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLOListElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 55%'] })
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 28 })

  return (
    <ol ref={ref} className="relative space-y-8 pl-8">
      <span aria-hidden className="absolute top-2 bottom-2 left-1.75 w-px bg-border" />
      <motion.span
        aria-hidden
        style={reduce ? undefined : { scaleY }}
        className="absolute top-2 bottom-2 left-1.75 w-px origin-top bg-linear-to-b from-accent to-accent-2"
      />
      {children}
    </ol>
  )
}

/** One entry: a dot on the line, a date label and the content. */
export function TimelineItem({
  date,
  children,
  highlight = false,
}: {
  date: string
  children: ReactNode
  highlight?: boolean
}) {
  return (
    <motion.li
      initial={{ opacity: 0, x: 16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative"
    >
      <span
        aria-hidden
        className={`absolute top-1.5 -left-8 grid size-3.75 place-items-center rounded-full border-2 bg-bg ${highlight ? 'border-accent' : 'border-border-strong'}`}
      >
        {highlight ? <span className="size-1.5 rounded-full bg-accent" /> : null}
      </span>
      <p className="font-mono text-xs text-subtle">{date}</p>
      <div className="mt-1.5">{children}</div>
    </motion.li>
  )
}
