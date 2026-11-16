'use client'

import { Menu } from 'lucide-react'
import { motion, useMotionValueEvent, useScroll } from 'motion/react'
import Link from 'next/link'
import { useState } from 'react'
import { ResumeButton } from '@/components/resume/ResumeButton'
import { ThemeToggle } from '@/components/theme/ThemeToggle'
import { ButtonLink } from '@/components/ui/Button'
import { useActiveNav } from '@/hooks/useActiveNav'
import { format, localeHref } from '@/i18n/config'
import { useI18n } from '@/i18n/I18nProvider'
import { cn } from '@/lib/utils'
import { LanguageSwitcher } from './LanguageSwitcher'
import { Logo } from './Logo'
import { MobileMenu } from './MobileMenu'

export function Header() {
  const { dict, profile, navigation, locale } = useI18n()
  const { active, isHome } = useActiveNav()
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  // Solid background once the page moves; hide while reading downwards, show again on any upward scroll.
  useMotionValueEvent(scrollY, 'change', (y) => {
    const previous = scrollY.getPrevious() ?? 0
    setScrolled(y > 12)
    setHidden(y > 480 && y > previous + 4)
    if (y < previous - 4) setHidden(false)
  })

  return (
    <>
      <motion.header
        initial={false}
        animate={{ y: hidden && !menuOpen ? '-110%' : '0%' }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-50"
      >
        {/* At the top the header is open and transparent; once scrolling, it becomes a floating glass pill. */}
        <div
          className={cn(
            'mx-auto max-w-6xl border transition-[margin,width,border-radius,background-color,border-color,box-shadow] duration-500 ease-out-expo',
            scrolled
              ? 'glass mt-3 w-[calc(100%-1.5rem)] rounded-full border-border md:mt-4'
              : 'w-full border-transparent'
          )}
        >
          <nav
            aria-label={dict.nav.mainLabel}
            className={cn(
              'flex items-center justify-between gap-3 transition-[height,padding] duration-500',
              scrolled ? 'h-14 px-2 md:px-3' : 'container-page h-16 md:h-18'
            )}
          >
            <Link
              href={isHome ? '#top' : localeHref(locale)}
              className="flex shrink-0 items-center gap-3 rounded-xl"
              aria-label={format(isHome ? dict.nav.backToTopLogo : dict.nav.homeLogo, { name: profile.name })}
            >
              <Logo />
              <span className="hidden flex-col leading-tight sm:flex">
                <span className="text-sm font-semibold text-text">{profile.name}</span>
                <span className="font-mono text-[0.7rem] whitespace-nowrap text-subtle">{profile.role}</span>
              </span>
            </Link>

            <ul className="hidden items-center gap-0.5 lg:flex">
              {navigation.map((item) => {
                const isActive = active === item.id
                return (
                  <li key={item.id} className="relative">
                    <Link
                      href={localeHref(locale, item.href)}
                      aria-current={isActive ? (item.href.startsWith('/') ? 'page' : 'true') : undefined}
                      className={cn(
                        'relative z-10 block rounded-full px-3 py-2 text-sm whitespace-nowrap transition-colors',
                        isActive ? 'text-text' : 'text-muted hover:text-text'
                      )}
                    >
                      {item.label}
                    </Link>
                    {isActive ? (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 rounded-full bg-surface-2 ring-1 ring-border"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    ) : null}
                  </li>
                )
              })}
            </ul>

            <div className="flex shrink-0 items-center gap-2">
              <LanguageSwitcher />
              <ThemeToggle />
              <ResumeButton variant="secondary" size="sm" className="hidden xl:inline-flex">
                {dict.common.resume}
              </ResumeButton>
              <ButtonLink href={localeHref(locale, '#contact')} size="sm" className="hidden md:inline-flex">
                {dict.common.letsTalk}
              </ButtonLink>
              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                aria-label={dict.nav.openMenu}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                className="glass grid size-10 place-items-center rounded-full border border-border text-text lg:hidden"
              >
                <Menu className="size-4.5" aria-hidden />
              </button>
            </div>
          </nav>
        </div>
      </motion.header>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} active={active} />
    </>
  )
}
