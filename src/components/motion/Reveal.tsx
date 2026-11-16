'use client'

import { motion, useReducedMotion, type Variants } from 'motion/react'
import type { ReactNode } from 'react'

const ease = [0.16, 1, 0.3, 1] as const

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  /** Distance in px the content rises while fading in. */
  y?: number
  as?: 'div' | 'li' | 'section' | 'article'
}

/** Fades and lifts its content in the first time it scrolls into view. */
export function Reveal({ children, className, delay = 0, y = 24, as = 'div' }: RevealProps) {
  const reduce = useReducedMotion()
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.7, ease, delay }}
    >
      {children}
    </Tag>
  )
}

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
}

/** Container that reveals its <StaggerItem> children one after another. */
export function Stagger({ children, className, as = 'div' }: Omit<RevealProps, 'delay' | 'y'>) {
  const reduce = useReducedMotion()
  const Tag = motion[as === 'li' ? 'ul' : as]
  return (
    <Tag
      className={className}
      variants={container}
      initial={reduce ? false : 'hidden'}
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
    >
      {children}
    </Tag>
  )
}

export function StaggerItem({ children, className, as = 'div' }: Omit<RevealProps, 'delay' | 'y'>) {
  const Tag = motion[as]
  return (
    <Tag className={className} variants={item}>
      {children}
    </Tag>
  )
}
