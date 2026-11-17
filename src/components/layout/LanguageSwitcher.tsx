'use client'

import { Check, Globe } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { usePathname } from 'next/navigation'
import { useEffect, useId, useRef, useState } from 'react'
import { LOCALE_COOKIE, localeNames, locales, pathWithoutLocale, type Locale } from '@/i18n/config'
import { useI18n } from '@/i18n/I18nProvider'
import { cn } from '@/lib/utils'

/** Remembers the choice for a year, so the proxy sends returning visitors straight to it. */
function remember(locale: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000; SameSite=Lax`
}

/** On click: save the choice and keep the visitor on the same page and section in the new language. */
function onPick(locale: Locale) {
  return (e: React.MouseEvent<HTMLAnchorElement>) => {
    remember(locale)
    e.currentTarget.href = `/${locale}${pathWithoutLocale(window.location.pathname)}${window.location.hash}`
  }
}

/** The current page in each language, so the links are right even before any click. */
function useRest() {
  return pathWithoutLocale(usePathname())
}

/** Compact language menu for the header. */
export function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, dict } = useI18n()
  const rest = useRest()
  const [open, setOpen] = useState(false)
  const menuId = useId()
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onDown = (e: PointerEvent) => !root.current?.contains(e.target as Node) && setOpen(false)
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('pointerdown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div ref={root} className={cn('relative', className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        className="glass flex h-10 items-center gap-1.5 rounded-full border border-border px-3 text-sm font-medium text-text transition-colors hover:border-border-strong"
      >
        <Globe className="size-4 text-muted" aria-hidden />
        <span className="sr-only">
          {dict.nav.language}: {localeNames[locale]},{' '}
        </span>
        <span className="uppercase">{locale}</span>
      </button>
      <AnimatePresence>
        {open ? (
          <motion.ul
            id={menuId}
            role="menu"
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.18 }}
            className="absolute end-0 top-12 z-10 w-44 overflow-hidden rounded-2xl border border-border bg-surface-solid/95 p-1.5 shadow-lift backdrop-blur-xl"
          >
            {locales.map((l) => (
              <li key={l} role="none">
                <a
                  role="menuitem"
                  href={`/${l}${rest}`}
                  hrefLang={l}
                  lang={l}
                  onClick={onPick(l)}
                  aria-current={l === locale ? 'true' : undefined}
                  className={cn(
                    'flex items-center justify-between rounded-xl px-3 py-2 text-sm transition-colors',
                    l === locale ? 'bg-accent-soft text-accent' : 'text-text hover:bg-surface-2'
                  )}
                >
                  <span>{localeNames[l]}</span>
                  {l === locale ? <Check className="size-4" aria-hidden /> : <span className="font-mono text-xs text-subtle uppercase">{l}</span>}
                </a>
              </li>
            ))}
          </motion.ul>
        ) : null}
      </AnimatePresence>
    </div>
  )
}

/** Inline language list for the mobile menu. */
export function LanguageList() {
  const { locale, dict } = useI18n()
  const rest = useRest()
  return (
    <div role="group" aria-label={dict.nav.language} className="flex flex-wrap gap-2">
      {locales.map((l) => (
        <a
          key={l}
          href={`/${l}${rest}`}
          hrefLang={l}
          lang={l}
          onClick={onPick(l)}
          aria-current={l === locale ? 'true' : undefined}
          className={cn(
            'rounded-full border px-3.5 py-1.5 text-sm transition-colors',
            l === locale ? 'border-accent bg-accent-soft text-accent' : 'border-border text-muted hover:text-text'
          )}
        >
          {localeNames[l]}
        </a>
      ))}
    </div>
  )
}
