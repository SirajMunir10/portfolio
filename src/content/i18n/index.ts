import type { Locale } from '@/i18n/config'
import type { ContentTranslation } from './types'

/** Content translations by locale. English is the base content and needs no entry. */
export const translations: Partial<Record<Locale, ContentTranslation>> = {}
