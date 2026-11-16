'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef, useState, type ReactNode } from 'react'

// Loaded in its own chunk, only on capable devices, after the page is idle: never blocks first paint.
const EmbeddingSpace = dynamic(() => import('./EmbeddingSpace'), { ssr: false })

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
 * 3D scene on desktop-sized screens with motion allowed and WebGL available.
 */
export function HeroVisual({ fallback }: { fallback: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const [enabled, setEnabled] = useState(false)
  const [running, setRunning] = useState(true)

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

  return (
    <div ref={ref} aria-hidden className="pointer-events-none absolute inset-0">
      <div className={enabled ? 'opacity-0 transition-opacity duration-700' : 'opacity-100'}>{fallback}</div>
      {enabled ? (
        <div className="animate-[fade-in_1.2s_ease-out_both]">
          <EmbeddingSpace active={running} />
        </div>
      ) : null}
    </div>
  )
}
