import type { Locale } from '../config'
import { ar } from './ar'
import { de } from './de'
import { en, type Dictionary } from './en'
import { nl } from './nl'

/** All dictionaries are small, so they are bundled statically and typed against English. */
const dictionaries: Record<Locale, Dictionary> = { en, nl, de, ar }

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale]
}

export type { Dictionary }
