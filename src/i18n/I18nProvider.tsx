'use client'

import { createContext, useContext, type ReactNode } from 'react'
import type { Site } from '@/content'
import { direction, type Locale } from './config'
import type { Dictionary } from './dictionaries'

type I18nValue = {
  locale: Locale
  dir: 'ltr' | 'rtl'
  dict: Dictionary
  profile: Site['profile']
  navigation: Site['navigation']
  callouts: Site['callouts']
  formations: Site['formations']
}

const I18nContext = createContext<I18nValue | null>(null)

/** Gives client components the current language, its interface text and the shared profile data. */
export function I18nProvider({
  site,
  children,
}: {
  site: Pick<Site, 'locale' | 'dict' | 'profile' | 'navigation' | 'callouts' | 'formations'>
  children: ReactNode
}) {
  const value: I18nValue = {
    locale: site.locale,
    dir: direction(site.locale),
    dict: site.dict,
    profile: site.profile,
    navigation: site.navigation,
    callouts: site.callouts,
    formations: site.formations,
  }
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const value = useContext(I18nContext)
  if (!value) throw new Error('useI18n must be used inside I18nProvider')
  return value
}
