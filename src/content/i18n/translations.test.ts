import { describe, expect, it } from 'vitest'
import { formationInfo } from '@/components/three/formations'
import { particleCallouts } from '../callouts'
import { awards, education } from '../education'
import { experience } from '../experience'
import { highlights, profile, spokenLanguages } from '../profile'
import { projects } from '../projects'
import { research } from '../research'
import { skillGroups } from '../skills'
import { translations } from '.'

const sorted = (xs: string[]) => [...xs].sort()

describe('content translations', () => {
  it('exist for Dutch, German and Arabic', () => {
    expect(Object.keys(translations).sort()).toEqual(['ar', 'de', 'nl'])
  })
})

describe.each(Object.entries(translations))('%s content', (locale, tr) => {
  it('covers every company, project, degree and skill group by its key', () => {
    expect(sorted(Object.keys(tr.experience))).toEqual(sorted(experience.map((e) => e.company)))
    expect(sorted(Object.keys(tr.projects))).toEqual(sorted(projects.map((p) => p.slug)))
    expect(sorted(Object.keys(tr.education))).toEqual(sorted(education.map((e) => e.degree)))
    expect(sorted(Object.keys(tr.skillGroupTitles))).toEqual(sorted(skillGroups.map((g) => g.id)))
  })

  it('has one entry for every item that is matched by position', () => {
    expect(tr.highlights).toHaveLength(highlights.length)
    expect(tr.languageLevels).toHaveLength(spokenLanguages.length)
    expect(tr.awards).toHaveLength(awards.length)
    expect(tr.callouts).toHaveLength(particleCallouts.length)
    expect(tr.formations).toHaveLength(formationInfo.length)
    expect(tr.profile.focusAreas).toHaveLength(profile.focusAreas.length)
    expect(tr.profile.about).toHaveLength(profile.about.length)
    expect(tr.research.results).toHaveLength(research.results.length)
    expect(tr.research.method).toHaveLength(research.method.length)
    for (const p of projects) {
      expect(tr.projects[p.slug].results, p.slug).toHaveLength(p.results.length)
      expect(tr.projects[p.slug].imageAlts, p.slug).toHaveLength(p.images.length)
    }
    for (const e of experience) {
      expect(tr.experience[e.company].highlights, e.company).toHaveLength(e.highlights.length)
    }
  })

  it('highlights a phrase that actually appears in the headline', () => {
    expect(tr.profile.headline).toContain(tr.profile.headlineHighlight)
  })

  it('keeps the key facts exactly as in English', () => {
    const about = tr.profile.about.join(' ')
    for (const fact of ['21', '3.68', '37.7']) expect(about, `${locale} about`).toContain(fact)
  })

  it('uses no em dashes, matching the English style', () => {
    expect(JSON.stringify(tr)).not.toContain('—')
  })
})
