/**
 * Shape of a content translation. The English content files are the base; a translation
 * replaces only the visible text and keeps every link, image, date and technical name.
 */
export type ContentTranslation = {
  profile: {
    role: string
    headline: string
    /** Must appear inside `headline`. */
    headlineHighlight: string
    intro: string
    quote: string
    about: string[]
    availability: string
    photoAlt: string
    focusAreas: { title: string; description: string }[]
  }
  highlights: { label: string; detail: string }[]
  /** Proficiency levels, in the same order as the spoken languages. */
  languageLevels: string[]
  /** Keyed by company name. */
  experience: Record<string, { role: string; employment?: string; summary: string; highlights: string[] }>
  /** Keyed by project slug. `results` and `imageAlts` follow the order of the English entries. */
  projects: Record<
    string,
    {
      tagline: string
      category: string
      team: string
      summary: string
      problem: string
      built: string[]
      results: string[]
      imageAlts: string[]
    }
  >
  /** Keyed by the English degree name. */
  education: Record<string, { degree: string; school: string; grade?: string; details: string[] }>
  awards: { title: string; issuer: string; description: string }[]
  /** Keyed by skill group id. */
  skillGroupTitles: Record<string, string>
  research: { affiliation: string; abstract: string; results: string[]; method: string[] }
  callouts: { label: string; detail: string }[]
  formations: { name: string; detail: string }[]
}
