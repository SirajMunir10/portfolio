'use client'

import { useEffect, useState } from 'react'

/**
 * Returns the id of the section currently in the reading zone (a band just below the header),
 * so navigation can highlight where the visitor is.
 */
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const elements = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el)
    if (!elements.length) return

    const visible = new Map<string, boolean>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) visible.set(entry.target.id, entry.isIntersecting)
        const first = ids.find((id) => visible.get(id))
        setActive(first ?? null)
      },
      // A thin band 35–40% down the viewport decides which section is "current".
      { rootMargin: '-35% 0px -60% 0px', threshold: 0 }
    )
    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [ids])

  return active
}
