'use client'

import { Menu } from 'lucide-react'
import { motion, useMotionValueEvent, useScroll } from 'motion/react'
import { useState } from 'react'
import { ThemeToggle } from '@/components/theme/ThemeToggle'
import { ButtonLink } from '@/components/ui/Button'
import { navigation } from '@/content/navigation'
import { profile } from '@/content/profile'
import { useActiveSection } from '@/hooks/useActiveSection'
import { cn } from '@/lib/utils'
import { Logo } from './Logo'
import { MobileMenu } from './MobileMenu'

const ids = navigation.map((n) => n.id)

export function Header() {
  const active = useActiveSection(ids)
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
        <div
          className={cn(
            'transition-[background-color,border-color,backdrop-filter] duration-300',
            scrolled
              ? 'border-b border-border bg-bg/75 backdrop-blur-xl backdrop-saturate-150'
              : 'border-b border-transparent'
          )}
        >
          <nav
            aria-label="Main"
            className="container-page flex h-16 items-center justify-between gap-4 md:h-[4.5rem]"
          >
            <a
              href="#top"
              className="flex items-center gap-3 rounded-xl"
              aria-label={`${profile.name}, back to top`}
            >
              <Logo />
              <span className="hidden flex-col leading-tight sm:flex">
                <span className="text-sm font-semibold text-text">{profile.name}</span>
                <span className="font-mono text-[0.7rem] text-subtle">{profile.role}</span>
              </span>
            </a>

            <ul className="hidden items-center gap-1 lg:flex">
              {navigation.map((item) => {
                const isActive = active === item.id
                return (
                  <li key={item.id} className="relative">
                    <a
                      href={`#${item.id}`}
                      aria-current={isActive ? 'true' : undefined}
                      className={cn(
                        'relative z-10 block rounded-full px-3.5 py-2 text-sm transition-colors',
                        isActive ? 'text-text' : 'text-muted hover:text-text'
                      )}
                    >
                      {item.label}
                    </a>
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

            <div className="flex items-center gap-2">
              <ThemeToggle />
              {profile.resume ? (
                <ButtonLink
                  href={profile.resume.url}
                  variant="secondary"
                  size="sm"
                  className="hidden md:inline-flex"
                >
                  Resume
                </ButtonLink>
              ) : null}
              <ButtonLink href="#contact" size="sm" className="hidden md:inline-flex">
                Let&apos;s talk
              </ButtonLink>
              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                aria-label="Open menu"
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                className="grid size-10 place-items-center rounded-full border border-border bg-surface text-text lg:hidden"
              >
                <Menu className="size-[18px]" aria-hidden />
              </button>
            </div>
          </nav>
        </div>
      </motion.header>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} active={active} />
    </>
  )
}
