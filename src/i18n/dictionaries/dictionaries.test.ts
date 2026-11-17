import { describe, expect, it } from 'vitest'
import { locales } from '../config'
import { getDictionary } from '.'
import { en } from './en'

/** Every string in a dictionary with its dotted path, e.g. ["nav.about", "About"]. */
function leaves(value: unknown, path = ''): [string, string][] {
  if (typeof value === 'string') return [[path, value]]
  if (Array.isArray(value)) return value.flatMap((v, i) => leaves(v, `${path}[${i}]`))
  if (value && typeof value === 'object')
    return Object.entries(value).flatMap(([k, v]) => leaves(v, path ? `${path}.${k}` : k))
  return []
}

const placeholders = (s: string) => [...s.matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort()
const english = new Map(leaves(en))

describe.each(locales.filter((l) => l !== 'en'))('%s dictionary', (locale) => {
  const dict = getDictionary(locale)
  const entries = leaves(dict)

  it('is a real translation, not the English fallback', () => {
    expect(dict).not.toBe(en)
  })

  it('has exactly the same keys and list lengths as English', () => {
    expect(entries.map(([path]) => path).sort()).toEqual([...english.keys()].sort())
  })

  it('keeps every {placeholder} of the English string', () => {
    for (const [path, text] of entries) {
      expect(placeholders(text), `${locale}: ${path}`).toEqual(placeholders(english.get(path)!))
    }
  })

  it('has no empty strings where English has text', () => {
    for (const [path, text] of entries) {
      if (english.get(path)) expect(text.trim(), `${locale}: ${path}`).not.toBe('')
    }
  })
})

describe('Arabic dictionary', () => {
  it('writes numbers with Western digits, as is usual in the UAE', () => {
    for (const [path, text] of leaves(getDictionary('ar'))) {
      expect(text, path).not.toMatch(/[٠-٩۰-۹]/)
    }
  })
})
