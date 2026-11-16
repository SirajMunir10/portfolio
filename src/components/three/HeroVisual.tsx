'use client'

import { AnimatePresence, motion } from 'motion/react'
import dynamic from 'next/dynamic'
import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { formationInfo } from './formations'

// Loaded in its own chunk, only on capable devices, after the page is idle: never blocks first paint.
const MorphField = dynamic(() => import('./MorphField'), { ssr: false })

function supportsWebGL() {
  try {
    const canvas = document.createElement('canvas')
    return !!(canvas.getContext('webgl2') || canvas.getContext('webgl'))
  } catch {
    return false
  }
}

/**
 * Shows the static fallback first (server-rendered, no JavaScript needed), then fades in the interactive
 * particle scene on desktop-sized screens with motion allowed and WebGL available.
 */
export function HeroVisual({ fallback }: { fallback: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const [enabled, setEnabled] = useState(false)
  const [running, setRunning] = useState(true)
  const [formation, setFormation] = useState(0)
  const onFormation = useCallback((i: number) => setFormation(i), [])

  useEffect(() => {
    const capable =
      window.matchMedia('(min-width: 768px)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches &&
      supportsWebGL()
    if (!capable) return
    const start = () => setEnabled(true)
    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(start, { timeout: 1500 })
      return () => window.cancelIdleCallback(id)
    }
    const id = setTimeout(start, 600)
    return () => clearTimeout(id)
  }, [])

  // Pause rendering when the hero is off-screen or the tab is in the background.
  useEffect(() => {
    if (!enabled || !ref.current) return
    let inView = true
    const update = () => setRunning(inView && document.visibilityState === 'visible')
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting
      update()
    })
    observer.observe(ref.current)
    document.addEventListener('visibilitychange', update)
    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', update)
    }
  }, [enabled])

  const info = formationInfo[formation]

  return (
    <div ref={ref} aria-hidden className="pointer-events-none absolute inset-0">
      <div className={enabled ? 'opacity-0 transition-opacity duration-700' : 'opacity-100'}>{fallback}</div>
      {enabled ? (
        <>
          <div className="absolute inset-0 animate-[fade-in_1.4s_ease-out_both]">
            <MorphField active={running} onFormation={onFormation} />
          </div>
          <div className="absolute right-8 bottom-8 hidden w-72 text-right md:block">
            <AnimatePresence mode="wait">
              <motion.p
                key={info.name}
                initial={{ opacity: 0, y: 8, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -8, filter: 'blur(4px)' }}
                transition={{ duration: 0.45 }}
                className="text-sm font-medium text-text"
              >
                <span className="mr-2 font-mono text-xs text-accent">
                  {String(formation + 1).padStart(2, '0')} / {String(formationInfo.length).padStart(2, '0')}
                </span>
                {info.name}
                <span className="mt-0.5 block text-xs font-normal text-muted">{info.detail}</span>
              </motion.p>
            </AnimatePresence>
            <p className="mt-3 font-mono text-[0.68rem] text-subtle">
              Move to disturb · click the shape to morph
            </p>
          </div>
        </>
      ) : null}
    </div>
  )
}
