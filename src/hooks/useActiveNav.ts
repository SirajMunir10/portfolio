'use client'

import { usePathname } from 'next/navigation'
import { pathWithoutLocale } from '@/i18n/config'
import { useI18n } from '@/i18n/I18nProvider'
import { useActiveSection } from './useActiveSection'

/** Home page sections that map to a navigation item. Availability counts as Contact. */
const HOME_SECTIONS = ['projects', 'experience', 'about', 'availability', 'contact'] as const
const NONE: readonly string[] = []

/**
 * Which navigation item is current: on the home page, the section being read;
 * on any other page, the item whose page contains it (a case study counts as Projects).
 */
export function useActiveNav() {
  const { navigation } = useI18n()
  const pathname = usePathname()
  const rest = pathWithoutLocale(pathname)
  const isHome = rest === '' || rest === '/'
  const section = useActiveSection(isHome ? HOME_SECTIONS : NONE, pathname)

  const active = isHome
    ? section === 'availability'
      ? 'contact'
      : section
    : (navigation.find((n) => n.href.startsWith('/') && (rest === n.href || rest.startsWith(`${n.href}/`)))?.id ??
      null)

  return { active, isHome }
}
