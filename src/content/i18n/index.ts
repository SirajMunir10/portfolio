import type { Locale } from '@/i18n/config'
import { ar } from './ar'
import { de } from './de'
import { nl } from './nl'
import type { ContentTranslation } from './types'

/** Translated page content per language. English is the base content itself, so it has no entry. */
export const translations: Partial<Record<Locale, ContentTranslation>> = { nl, de, ar }
