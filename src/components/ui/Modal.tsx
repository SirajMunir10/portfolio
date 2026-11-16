'use client'

import { X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useId, useRef, useSyncExternalStore, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '@/lib/utils'

type Props = {
  open: boolean
  onClose: () => void
  title: string
  /** Optional line under the title. */
  subtitle?: ReactNode
  children: ReactNode
  size?: 'md' | 'lg' | 'xl'
  /** Extra controls shown next to the close button (e.g. Download). */
  actions?: ReactNode
  bodyClassName?: string
}

const sizes = { md: 'max-w-2xl', lg: 'max-w-4xl', xl: 'max-w-6xl' }

const noopSubscribe = () => () => {}

/** False during server render and hydration, true afterwards: portals are only created on the client. */
function useMounted() {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false
  )
}

const FOCUSABLE =
  'a[href], button:not([disabled]), iframe, input, select, textarea, [tabindex]:not([tabindex="-1"])'

/**
 * Accessible dialog: rendered in a portal, locks page scroll, keeps keyboard focus inside,
 * closes on Escape or a click on the backdrop, and returns focus to whatever opened it.
 */
export function Modal({
  open,
  onClose,
  title,
  subtitle,
  children,
  size = 'lg',
  actions,
  bodyClassName,
}: Props) {
  const panel = useRef<HTMLDivElement>(null)
  const titleId = useId()
  const mounted = useMounted()

  useEffect(() => {
    if (!open) return
    const opener = document.activeElement as HTMLElement | null
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    requestAnimationFrame(() => panel.current?.focus())

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        onClose()
        return
      }
      if (e.key !== 'Tab' || !panel.current) return
      const items = [...panel.current.querySelectorAll<HTMLElement>(FOCUSABLE)].filter(
        (el) => el.offsetParent !== null
      )
      if (!items.length) return
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && (document.activeElement === first || document.activeElement === panel.current)) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = overflow
      opener?.focus?.()
    }
  }, [open, onClose])

  if (!mounted) return null

  return createPortal(
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-90 flex items-end justify-center sm:items-center sm:p-6">
          <motion.div
            aria-hidden
            className="absolute inset-0 bg-black/55 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            ref={panel}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            tabIndex={-1}
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              'relative flex max-h-[92dvh] w-full flex-col overflow-hidden rounded-t-3xl border border-border bg-surface shadow-lift outline-none sm:rounded-3xl',
              sizes[size]
            )}
          >
            <header className="flex items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-7">
              <div className="min-w-0">
                <h2 id={titleId} className="truncate text-lg font-semibold text-text sm:text-xl">
                  {title}
                </h2>
                {subtitle ? <div className="mt-0.5 text-sm text-muted">{subtitle}</div> : null}
              </div>
              <div className="flex shrink-0 items-center gap-2">
                {actions}
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close"
                  className="grid size-9 place-items-center rounded-full border border-border text-muted transition-colors hover:text-text"
                >
                  <X className="size-4" aria-hidden />
                </button>
              </div>
            </header>
            <div className={cn('overflow-y-auto overscroll-contain', bodyClassName)}>{children}</div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>,
    document.body
  )
}
