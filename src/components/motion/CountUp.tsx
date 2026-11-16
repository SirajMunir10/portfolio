'use client'

import { animate, useInView, useReducedMotion } from 'motion/react'
import { useEffect, useRef } from 'react'

type Props = { value: number; decimals?: number; prefix?: string; suffix?: string; duration?: number }

function format(n: number, decimals: number) {
  return n.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
}

/**
 * Renders the final number on the server (so it is always correct without JavaScript),
 * then counts up from zero the first time it scrolls into view.
 */
export function CountUp({ value, decimals = 0, prefix = '', suffix = '', duration = 1.6 }: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' })
  const reduce = useReducedMotion()

  useEffect(() => {
    if (!inView || reduce || !ref.current) return
    const el = ref.current
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (n) => (el.textContent = `${prefix}${format(n, decimals)}${suffix}`),
    })
    return () => controls.stop()
  }, [inView, reduce, value, decimals, prefix, suffix, duration])

  return (
    <span ref={ref} className="tabular-nums">
      {`${prefix}${format(value, decimals)}${suffix}`}
    </span>
  )
}
