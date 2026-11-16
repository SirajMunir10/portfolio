'use client'

import { Moon, Sun } from 'lucide-react'
import { useLayoutEffect, useSyncExternalStore } from 'react'
import { cn } from '@/lib/utils'
import { THEME_STORAGE_KEY } from './ThemeScript'

type Theme = 'light' | 'dark'

function readTheme(): Theme {
  return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'
}

/** Re-renders whenever data-theme on <html> changes, whoever changed it. */
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
  return () => observer.disconnect()
}

export function ThemeToggle({ className }: { className?: string }) {
  const theme = useSyncExternalStore<Theme>(subscribe, readTheme, () => 'light')

  // React's dev-mode remount clears attributes on <html>; put the saved theme back (no-op in production).
  useLayoutEffect(() => {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY)
      if (saved === 'light' || saved === 'dark') document.documentElement.setAttribute('data-theme', saved)
    } catch {}
  }, [])

  function toggle() {
    const next: Theme = readTheme() === 'dark' ? 'light' : 'dark'
    document.documentElement.setAttribute('data-theme', next)
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next)
    } catch {}
  }

  const label = theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className={cn(
        'relative grid size-10 place-items-center rounded-full border border-border bg-surface text-muted transition-colors hover:border-border-strong hover:text-text',
        className
      )}
    >
      <Sun
        aria-hidden
        className="size-4.5 scale-100 rotate-0 transition-transform duration-500 dark:scale-0 dark:-rotate-90"
      />
      <Moon
        aria-hidden
        className="absolute size-4.5 scale-0 rotate-90 transition-transform duration-500 dark:scale-100 dark:rotate-0"
      />
    </button>
  )
}
