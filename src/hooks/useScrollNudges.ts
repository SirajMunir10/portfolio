'use client'

import { useCallback, useEffect, useState } from 'react'

export type NudgeId = 'after-projects' | 'before-contact'

type Rule = {
  id: NudgeId
  /** Section whose arrival on screen triggers the nudge. */
  trigger: string
  /** Minimum time on the page before it may appear. */
  minSeconds: number
}

const RULES: Rule[] = [
  { id: 'after-projects', trigger: 'skills', minSeconds: 15 },
  { id: 'before-contact', trigger: 'education', minSeconds: 25 },
]

const STORAGE_KEY = 'nudges-seen'
const REMEMBER_DAYS = 7

function seenRecently(): NudgeId[] {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') as Record<string, number>
    const cutoff = Date.now() - REMEMBER_DAYS * 864e5
    return Object.entries(raw)
      .filter(([, at]) => at > cutoff)
      .map(([id]) => id as NudgeId)
  } catch {
    return []
  }
}

function remember(id: NudgeId) {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') as Record<string, number>
    raw[id] = Date.now()
    localStorage.setItem(STORAGE_KEY, JSON.stringify(raw))
  } catch {}
}

/**
 * Decides when to show a small, non-blocking nudge while the visitor scrolls.
 * At most one at a time; never on short visits, never while a dialog is open,
 * never after the visitor reached Contact, and never the same one twice within a week.
 */
export function useScrollNudges() {
  const [active, setActive] = useState<NudgeId | null>(null)

  useEffect(() => {
    const loadedAt = Date.now()
    const shown = new Set<NudgeId>(seenRecently())
    let current: NudgeId | null = null
    let reachedContact = false

    const dialogOpen = () => document.body.style.overflow === 'hidden'

    const tryShow = (rule: Rule) => {
      if (current || reachedContact || shown.has(rule.id) || dialogOpen()) return
      if ((Date.now() - loadedAt) / 1000 < rule.minSeconds) return
      shown.add(rule.id)
      remember(rule.id)
      current = rule.id
      setActive(rule.id)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          if (entry.target.id === 'contact') {
            reachedContact = true
            current = null
            setActive(null)
            continue
          }
          const rule = RULES.find((r) => r.trigger === entry.target.id)
          if (rule) tryShow(rule)
        }
      },
      { rootMargin: '0px 0px -40% 0px' }
    )
    for (const id of [...RULES.map((r) => r.trigger), 'contact']) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }

    const onDismissed = () => {
      current = null
    }
    window.addEventListener('nudge-dismissed', onDismissed)
    return () => {
      observer.disconnect()
      window.removeEventListener('nudge-dismissed', onDismissed)
    }
  }, [])

  const dismiss = useCallback(() => {
    setActive(null)
    window.dispatchEvent(new Event('nudge-dismissed'))
  }, [])

  return { active, dismiss }
}
