import { formationInfo } from '@/components/three/formations'
import { intlLocale, type Locale } from '@/i18n/config'
import { localizeDates } from '@/i18n/dates'
import { getDictionary } from '@/i18n/dictionaries'
import { particleCallouts } from './callouts'
import { certifications } from './certifications'
import { awards, education } from './education'
import { experience } from './experience'
import { translations } from './i18n'
import { navigation } from './navigation'
import { highlights, opportunities, profile, spokenLanguages } from './profile'
import { projects } from './projects'
import { research } from './research'
import { skillGroups } from './skills'

/**
 * Everything the page shows, in one language: the English base content with that language's
 * translation layered over the visible text, dates formatted for the locale, and interface text.
 */
export function getSite(locale: Locale) {
  const dict = getDictionary(locale)
  const tr = translations[locale]
  const date = (text: string) => localizeDates(text, locale, dict.common.present)
  const regionName = new Intl.DisplayNames([intlLocale[locale]], { type: 'region' })
  const languageName = new Intl.DisplayNames([intlLocale[locale]], { type: 'language' })

  const localizedProfile = {
    ...profile,
    ...(tr
      ? {
          role: tr.profile.role,
          headline: tr.profile.headline,
          headlineHighlight: tr.profile.headlineHighlight,
          intro: tr.profile.intro,
          quote: tr.profile.quote,
          about: tr.profile.about,
          availability: tr.profile.availability,
          focusAreas: tr.profile.focusAreas,
        }
      : {}),
    location: localizeLocation(profile.location, locale, regionName),
    photo: profile.photo && { ...profile.photo, alt: tr?.profile.photoAlt ?? profile.photo.alt },
  }

  const localizedProjects = projects.map((p) => {
    const t = tr?.projects[p.slug]
    return {
      ...p,
      period: date(p.period),
      ...(t
        ? {
            tagline: t.tagline,
            category: t.category,
            team: t.team,
            summary: t.summary,
            problem: t.problem,
            built: t.built,
            results: p.results.map((r, i) => ({ ...r, label: t.results[i] ?? r.label })),
            images: p.images.map((img, i) => ({ ...img, alt: t.imageAlts[i] ?? img.alt })),
          }
        : {}),
    }
  })

  return {
    locale,
    dict,
    profile: localizedProfile,
    highlights: highlights.map((h, i) => ({ ...h, ...(tr?.highlights[i] ?? {}) })),
    spokenLanguages: spokenLanguages.map((l, i) => ({
      ...l,
      name: languageName.of(l.code) ?? l.name,
      level: tr?.languageLevels[i] ?? l.level,
    })),
    opportunities: {
      ...opportunities,
      regionNames: opportunities.regions.map((code) => ({ code, name: regionName.of(code) ?? code })),
    },
    navigation: navigation.map((n) => ({ ...n, label: dict.nav[n.id] })),
    experience: experience.map((e) => {
      const t = tr?.experience[e.company]
      return {
        ...e,
        ...(t ?? {}),
        location: e.location && localizeLocation(e.location, locale, regionName),
        start: date(e.start),
        end: e.end && date(e.end),
      }
    }),
    projects: localizedProjects,
    featuredProjects: localizedProjects.filter((p) => p.featured),
    otherProjects: localizedProjects.filter((p) => !p.featured),
    certifications: certifications.map((c) => ({
      ...c,
      issued: c.inProgress ? dict.certifications.inProgress : date(c.issued),
      expires: c.expires && date(c.expires),
    })),
    education: education.map((e) => {
      const t = tr?.education[e.degree]
      return {
        ...e,
        ...(t ?? {}),
        location: localizeLocation(e.location, locale, regionName),
        start: date(e.start),
        end: date(e.end),
      }
    }),
    awards: awards.map((a, i) => ({ ...a, ...(tr?.awards[i] ?? {}), date: date(a.date) })),
    skillGroups: skillGroups.map((g) => ({ ...g, title: tr?.skillGroupTitles[g.id] ?? g.title })),
    research: {
      ...research,
      period: date(research.period),
      ...(tr
        ? {
            affiliation: tr.research.affiliation,
            abstract: tr.research.abstract,
            method: tr.research.method,
            results: research.results.map((r, i) => ({ ...r, label: tr.research.results[i] ?? r.label })),
          }
        : {}),
    },
    callouts: tr?.callouts ?? particleCallouts,
    formations: tr?.formations ?? formationInfo.map((f) => ({ ...f })),
  }
}

export type Site = ReturnType<typeof getSite>

/** "Dubai, UAE" style places: the country comes from Intl; Arabic also needs the city names. */
const COUNTRY_CODES: Record<string, string> = { UAE: 'AE', Pakistan: 'PK', Oman: 'OM' }
const ARABIC_CITIES: Record<string, string> = { Dubai: 'دبي', Rawalpindi: 'راولبندي', Muscat: 'مسقط' }
function localizeLocation(place: string, locale: Locale, regionName: Intl.DisplayNames) {
  if (locale === 'en') return place
  const [city, country] = place.split(', ')
  const code = country && COUNTRY_CODES[country]
  const localCity = locale === 'ar' ? (ARABIC_CITIES[city] ?? city) : city
  return code ? `${localCity}${locale === 'ar' ? '، ' : ', '}${regionName.of(code) ?? country}` : place
}
