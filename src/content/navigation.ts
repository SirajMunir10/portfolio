/**
 * Main navigation. `href` is relative to the language root: "" is the home page, "/projects" a page,
 * "#contact" a section of the home page. On the home page, `id` also matches the section element
 * for the active highlight.
 */
export const navigation = [
  { id: 'home', href: '' },
  { id: 'projects', href: '/projects' },
  { id: 'experience', href: '#experience' },
  { id: 'about', href: '/about' },
  { id: 'contact', href: '#contact' },
] as const

export type NavId = (typeof navigation)[number]['id']
