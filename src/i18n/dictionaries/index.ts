import type { Locale } from '../config'
import { en, type Dictionary } from './en'

/** All dictionaries are small, so they are bundled statically and typed against English. */
const dictionaries: Record<Locale, Dictionary> = { en, nl: en, de: en, ar: en }

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale]
}

export type { Dictionary }
