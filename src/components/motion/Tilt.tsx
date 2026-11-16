'use client'

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react'
import type { ReactNode } from 'react'

/** Tilts its content slightly toward the mouse in 3D, with a soft light following the cursor. */
export function Tilt({
  children,
  className,
  max = 5,
}: {
  children: ReactNode
  className?: string
  max?: number
}) {
  const reduce = useReducedMotion()
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), { stiffness: 200, damping: 22 })
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), { stiffness: 200, damping: 22 })
  const glareX = useTransform(px, (v) => `${v * 100}%`)
  const glareY = useTransform(py, (v) => `${v * 100}%`)

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    if (reduce || e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width)
    py.set((e.clientY - r.top) / r.height)
  }

  function reset() {
    px.set(0.5)
    py.set(0.5)
  }

  return (
    <motion.div
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={reduce ? undefined : { rotateX, rotateY, transformPerspective: 1000 }}
      className={`group/tilt relative ${className ?? ''}`}
    >
      {children}
      {reduce ? null : (
        <motion.span
          aria-hidden
          style={{ '--gx': glareX, '--gy': glareY } as React.CSSProperties}
          className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[radial-gradient(400px_circle_at_var(--gx)_var(--gy),color-mix(in_oklab,var(--accent)_14%,transparent),transparent_60%)] opacity-0 transition-opacity duration-300 group-hover/tilt:opacity-100"
        />
      )}
    </motion.div>
  )
}
