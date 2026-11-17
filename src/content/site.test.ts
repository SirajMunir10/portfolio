import { describe, expect, it } from 'vitest'
import { locales } from '@/i18n/config'
import { getSite } from '.'
import { experience } from './experience'
import { profile } from './profile'

describe('getSite', () => {
  it('returns the English base content unchanged for English', () => {
    const site = getSite('en')
    expect(site.profile.headline).toBe(profile.headline)
    expect(site.profile.location).toBe('Dubai, UAE')
    expect(site.experience[0].start).toBe(experience[0].start)
  })

  it.each(locales.filter((l) => l !== 'en'))('layers the %s translation over the base content', (locale) => {
    const en = getSite('en')
    const site = getSite(locale)
    expect(site.profile.headline).not.toBe(en.profile.headline)
    expect(site.projects[0].tagline).not.toBe(en.projects[0].tagline)
    // Names, links and figures are never translated.
    expect(site.profile.name).toBe(en.profile.name)
    expect(site.profile.email).toBe(en.profile.email)
    expect(site.projects.map((p) => p.slug)).toEqual(en.projects.map((p) => p.slug))
    expect(site.projects.flatMap((p) => p.results.map((r) => r.value))).toEqual(
      en.projects.flatMap((p) => p.results.map((r) => r.value))
    )
    // Dates are written in the visitor's language.
    expect(site.experience.find((e) => e.end)?.start).not.toBe(en.experience.find((e) => e.end)?.start)
  })

  it('names the four target countries in each language', () => {
    expect(getSite('en').opportunities.regionNames.map((r) => r.name)).toEqual([
      'United Arab Emirates',
      'United States',
      'Germany',
      'Netherlands',
    ])
    expect(getSite('de').opportunities.regionNames.map((r) => r.name)).toContain('Deutschland')
    expect(getSite('nl').opportunities.regionNames.map((r) => r.name)).toContain('Duitsland')
    expect(getSite('ar').opportunities.regionNames[0].name).toContain('الإمارات')
  })

  it('writes Arabic places with Arabic city names', () => {
    expect(getSite('ar').profile.location).toContain('دبي')
  })

  it('labels every navigation item', () => {
    for (const locale of locales) {
      for (const item of getSite(locale).navigation) expect(item.label, `${locale}: ${item.id}`).toBeTruthy()
    }
  })

  it('keeps in-progress certificates marked in every language', () => {
    for (const locale of locales) {
      const site = getSite(locale)
      for (const c of site.certifications.filter((c) => c.inProgress)) {
        expect(c.issued).toBe(site.dict.certifications.inProgress)
      }
    }
  })
})
