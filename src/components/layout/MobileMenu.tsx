'use client'

import { ArrowUpRight, Mail, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { GitHubIcon, LinkedInIcon } from '@/components/icons/BrandIcons'
import { ResumeButton } from '@/components/resume/ResumeButton'
import { navHref } from '@/hooks/useActiveNav'
import { useI18n } from '@/i18n/I18nProvider'
import { cn } from '@/lib/utils'
import { LanguageList } from './LanguageSwitcher'

type Props = { open: boolean; onClose: () => void; active: string | null; isHome: boolean }

export function MobileMenu({ open, onClose, active, isHome }: Props) {
  const { dict, profile, navigation, locale } = useI18n()
  const closeRef = useRef<HTMLButtonElement>(null)

  // While open: lock page scroll, close on Escape, and move focus into the menu.
  useEffect(() => {
    if (!open) return
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = overflow
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label={dict.nav.menu}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-70 flex flex-col overflow-y-auto bg-bg lg:hidden"
        >
          <div className="container-page flex h-16 shrink-0 items-center justify-end">
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label={dict.nav.closeMenu}
              className="glass grid size-10 place-items-center rounded-full border border-border text-text"
            >
              <X className="size-4.5" aria-hidden />
            </button>
          </div>

          <nav aria-label={dict.nav.mobileLabel} className="container-page flex flex-1 flex-col justify-center pb-12">
            <ul className="space-y-1">
              {navigation.map((item, i) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.05, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={navHref(locale, item.href, isHome)}
                    onClick={onClose}
                    aria-current={active === item.id ? 'true' : undefined}
                    className={cn(
                      'flex items-baseline gap-4 py-1.5 text-4xl font-semibold tracking-tight transition-colors',
                      active === item.id ? 'text-accent' : 'text-text hover:text-accent'
                    )}
                  >
                    <span className="font-mono text-sm font-normal text-subtle">{String(i + 1).padStart(2, '0')}</span>
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </ul>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-10 space-y-6 border-t border-border pt-8"
            >
              <LanguageList />
              <div className="flex flex-wrap items-center gap-3">
                <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 text-sm text-muted hover:text-text">
                  <Mail className="size-4" aria-hidden /> {profile.email}
                </a>
                <span className="flex gap-2">
                  <a
                    href={profile.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={dict.common.github}
                    className="grid size-10 place-items-center rounded-full border border-border text-muted hover:text-text"
                  >
                    <GitHubIcon className="size-4.5" />
                  </a>
                  <a
                    href={profile.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={dict.common.linkedin}
                    className="grid size-10 place-items-center rounded-full border border-border text-muted hover:text-text"
                  >
                    <LinkedInIcon className="size-4.5" />
                  </a>
                </span>
                <ResumeButton unstyled className="inline-flex items-center gap-1 text-sm font-medium text-accent">
                  {dict.common.viewCv} <ArrowUpRight className="size-4 rtl:-scale-x-100" aria-hidden />
                </ResumeButton>
              </div>
            </motion.div>
          </nav>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
