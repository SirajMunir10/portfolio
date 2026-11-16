import { Brain, Languages, MapPin, Mic, Search, Sparkles } from 'lucide-react'
import { CinematicPortrait } from '@/components/about/CinematicPortrait'
import { Reveal, Stagger, StaggerItem } from '@/components/motion/Reveal'
import { Card } from '@/components/ui/Card'
import { Em } from '@/components/ui/Em'
import { SectionHeading } from '@/components/ui/SectionHeading'
import type { Site } from '@/content'

const focusIcons = [Sparkles, Search, Mic, Brain]

export function About({ site }: { site: Site }) {
  const { profile, spokenLanguages, dict } = site
  const t = dict.about
  return (
    <section id="about" aria-labelledby="about-title" className="container-page py-24 md:py-36">
      <SectionHeading
        index="01"
        id="about-title"
        eyebrow={t.eyebrow}
        title={
          <>
            {t.titleBefore}
            <Em>{t.titleEm}</Em>
            {t.titleAfter}
          </>
        }
      />

      <Reveal y={40}>
        <CinematicPortrait />
      </Reveal>

      <div className="mt-16 grid gap-12 lg:mt-20 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
        <Reveal className="space-y-6 text-lg leading-relaxed text-muted md:text-xl md:leading-relaxed">
          {profile.about.map((paragraph, i) => (
            <p key={paragraph.slice(0, 24)} className={i === 0 ? 'text-text' : undefined}>
              {paragraph}
            </p>
          ))}
        </Reveal>

        <div className="space-y-4">
          <h3 className="font-mono text-xs tracking-[0.2em] text-subtle uppercase">{t.workOn}</h3>
          <Stagger className="grid gap-3 sm:grid-cols-2">
            {profile.focusAreas.map((area, i) => {
              const Icon = focusIcons[i % focusIcons.length]
              return (
                <StaggerItem key={area.title}>
                  <Card interactive className="h-full p-5">
                    <span className="grid size-9 place-items-center rounded-xl bg-accent-soft text-accent">
                      <Icon className="size-4.5" aria-hidden />
                    </span>
                    <h4 className="mt-4 font-semibold text-text">{area.title}</h4>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">{area.description}</p>
                  </Card>
                </StaggerItem>
              )
            })}
          </Stagger>

          <Card className="space-y-4 p-5">
            <p className="flex items-center gap-2.5 text-sm text-muted">
              <MapPin className="size-4 text-accent" aria-hidden />
              {t.basedIn} <span className="font-medium text-text">{profile.location}</span>
            </p>
            <div>
              <p className="mb-2.5 flex items-center gap-2.5 text-sm text-muted">
                <Languages className="size-4 text-accent" aria-hidden />
                {t.languages}
              </p>
              <ul className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-2">
                {spokenLanguages.map((l) => (
                  <li key={l.code} className="rounded-xl border border-border bg-surface-2 px-3 py-2">
                    <span className="block text-sm font-medium text-text">{l.name}</span>
                    <span className="block text-xs text-subtle">{l.level}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
