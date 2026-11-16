/** Shapes of the portfolio content. All visible text lives in src/content and follows these types. */

export type Link = { label: string; href: string }

export type Profile = {
  name: string
  fullName: string
  role: string
  headline: string
  /** Part of the headline drawn with the accent gradient. Must appear in `headline`. */
  headlineHighlight: string
  intro: string
  about: string[]
  location: string
  timezone: string
  email: string
  availability: string
  socials: { github: string; linkedin: string }
  /** CV shown in the in-page viewer and offered for download; null hides the Resume button. */
  resume: { url: string; fileName: string } | null
  photo: { src: string; alt: string } | null
  focusAreas: { title: string; description: string }[]
}

export type Experience = {
  company: string
  companyUrl?: string
  role: string
  employment: string
  location: string
  start: string
  end: string | null
  summary: string
  highlights: string[]
  stack: string[]
}

export type ProjectImage = { src: string; alt: string; width: number; height: number }

export type Project = {
  slug: string
  title: string
  tagline: string
  category: string
  period: string
  /** Who built it, e.g. "Solo project" or "Team of 3, final-year project". */
  team: string
  featured: boolean
  summary: string
  problem: string
  built: string[]
  results: { value: string; label: string }[]
  stack: string[]
  links: { github?: string; live?: string; paper?: string }
  images: ProjectImage[]
}

export type Certification = {
  name: string
  issuer: string
  issued: string
  expires?: string
  credentialId?: string
  verifyUrl?: string
  /** Original PDF, offered for download. */
  file?: string
  /** Rendered certificate shown in the in-page viewer (works on every device). */
  image?: { src: string; width: number; height: number }
  skills: string[]
}

export type Education = {
  degree: string
  school: string
  location: string
  start: string
  end: string
  grade?: string
  details: string[]
}

export type Award = { title: string; issuer: string; date: string; description: string }

export type SkillGroup = { id: string; title: string; skills: string[] }

export type Highlight = {
  value: number
  decimals?: number
  prefix?: string
  suffix?: string
  label: string
  detail: string
}

export type Research = {
  title: string
  authors: string[]
  affiliation: string
  period: string
  abstract: string
  results: { value: string; label: string }[]
  method: string[]
  pdf: string
  repo: string
}

export type SpokenLanguage = { name: string; level: string }
