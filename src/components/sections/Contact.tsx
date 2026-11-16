import { Clock, Mail, MapPin } from 'lucide-react'
import { ContactForm } from '@/components/contact/ContactForm'
import { CopyEmail } from '@/components/contact/CopyEmail'
import { GitHubIcon, LinkedInIcon } from '@/components/icons/BrandIcons'
import { Reveal } from '@/components/motion/Reveal'
import { Em } from '@/components/ui/Em'
import { SectionHeading } from '@/components/ui/SectionHeading'
import type { Site } from '@/content'
import { format } from '@/i18n/config'

const row = 'flex items-center gap-3 glass rounded-2xl border border-border p-4'
const iconBox = 'grid size-10 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent'

export function Contact({ site }: { site: Site }) {
  const { profile } = site
  const t = site.dict.contact
  const c = site.dict.common
  return (
    <section id="contact" aria-labelledby="contact-title" className="relative py-24 md:py-36">
      <div className="container-page">
        <SectionHeading
          id="contact-title"
          index="07"
          eyebrow={t.eyebrow}
          title={
            <>
              {t.titleBefore}
              <Em>{t.titleEm}</Em>
              {t.titleAfter}
            </>
          }
          description={t.description}
        />

        <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:gap-14">
          <Reveal className="space-y-3">
            <div className={row}>
              <span className={iconBox}>
                <Mail className="size-4.5" aria-hidden />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-subtle">{c.email}</p>
                <a
                  href={`mailto:${profile.email}`}
                  dir="ltr"
                  className="block truncate text-start font-medium text-text hover:text-accent"
                >
                  {profile.email}
                </a>
              </div>
              <CopyEmail email={profile.email} />
            </div>
            <a
              href={profile.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={`${row} group transition-colors hover:border-border-strong`}
            >
              <span className={iconBox}>
                <LinkedInIcon className="size-4.5" />
              </span>
              <div>
                <p className="text-xs text-subtle">{c.linkedin}</p>
                <p dir="ltr" className="font-medium text-text group-hover:text-accent">
                  in/siraj-munir-10furc
                </p>
              </div>
            </a>
            <a
              href={profile.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className={`${row} group transition-colors hover:border-border-strong`}
            >
              <span className={iconBox}>
                <GitHubIcon className="size-4.5" />
              </span>
              <div>
                <p className="text-xs text-subtle">{c.github}</p>
                <p dir="ltr" className="font-medium text-text group-hover:text-accent">
                  SirajMunir10
                </p>
              </div>
            </a>
            <div className={row}>
              <span className={iconBox}>
                <MapPin className="size-4.5" aria-hidden />
              </span>
              <div>
                <p className="text-xs text-subtle">{t.basedIn}</p>
                <p className="font-medium text-text">{profile.location}</p>
              </div>
            </div>
            <p className="flex items-center gap-2 px-1 pt-2 text-sm text-muted">
              <Clock className="size-4 shrink-0 text-accent-2" aria-hidden />
              {format(t.replyTime, { availability: profile.availability })}
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="glass rounded-3xl border border-border p-6 md:p-8">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
