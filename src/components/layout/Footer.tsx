import { ArrowUp, Mail, MapPin } from 'lucide-react'
import { GitHubIcon, LinkedInIcon } from '@/components/icons/BrandIcons'
import type { Site } from '@/content'
import { format } from '@/i18n/config'
import { Logo } from './Logo'

const socialClass =
  'grid size-10 place-items-center rounded-full border border-border text-muted transition-colors hover:border-border-strong hover:text-text'

export function Footer({ site }: { site: Site }) {
  const { profile, navigation, dict } = site
  return (
    <footer className="border-t border-border">
      <div className="container-page grid gap-10 py-12 md:grid-cols-[1.4fr_1fr_auto] md:items-start">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Logo />
            <div className="leading-tight">
              <p className="font-semibold text-text">{profile.name}</p>
              <p className="font-mono text-xs text-subtle">{profile.role}</p>
            </div>
          </div>
          <p className="max-w-sm text-sm text-muted">{profile.headline}</p>
          <p className="flex items-center gap-2 text-sm text-muted">
            <MapPin className="size-4" aria-hidden /> {profile.location}
          </p>
        </div>

        <nav aria-label={dict.nav.footerLabel}>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
            {navigation.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className="text-muted transition-colors hover:text-text">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex gap-2">
          <a href={`mailto:${profile.email}`} aria-label={dict.common.email} className={socialClass}>
            <Mail className="size-4.5" aria-hidden />
          </a>
          <a
            href={profile.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={dict.common.github}
            className={socialClass}
          >
            <GitHubIcon className="size-4.5" />
          </a>
          <a
            href={profile.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={dict.common.linkedin}
            className={socialClass}
          >
            <LinkedInIcon className="size-4.5" />
          </a>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-page flex flex-col gap-3 py-6 text-xs text-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>{format(dict.footer.builtBy, { name: profile.name })}</p>
          <a href="#top" className="inline-flex items-center gap-1.5 transition-colors hover:text-text">
            {dict.common.backToTop} <ArrowUp className="size-3.5" aria-hidden />
          </a>
        </div>
      </div>
    </footer>
  )
}
