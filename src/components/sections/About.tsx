import { Brain, Languages, MapPin, Mic, Search, Sparkles } from 'lucide-react'
import Image from 'next/image'
import { Reveal, Stagger, StaggerItem } from '@/components/motion/Reveal'
import { Card } from '@/components/ui/Card'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { profile, spokenLanguages } from '@/content/profile'

const focusIcons = [Sparkles, Search, Mic, Brain]

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="container-page py-24 md:py-32">
      <SectionHeading id="about-title" eyebrow="About" title="AI that holds up when real users arrive." />

      <div className="grid gap-12 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
        <div>
          <Reveal className="space-y-5 text-base leading-relaxed text-muted md:text-lg">
            {profile.about.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </Reveal>

          <h3 className="mt-12 mb-5 font-mono text-xs font-medium tracking-[0.18em] text-subtle uppercase">
            What I work on
          </h3>
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
        </div>

        <Reveal delay={0.1} className="lg:pt-2">
          <div className="relative mx-auto max-w-sm lg:sticky lg:top-28">
            {profile.photo ? (
              <div className="group relative">
                <div
                  aria-hidden
                  className="absolute -inset-3 -z-10 rounded-4xl bg-linear-to-br from-accent/25 to-accent-2/25 opacity-60 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                />
                <div className="overflow-hidden rounded-3xl border border-border bg-surface">
                  <Image
                    src={profile.photo.src}
                    alt={profile.photo.alt}
                    width={420}
                    height={570}
                    sizes="(min-width: 1024px) 384px, 90vw"
                    className="aspect-4/5 w-full object-cover object-top transition-transform duration-700 ease-out-expo group-hover:scale-[1.03]"
                  />
                </div>
              </div>
            ) : null}

            <Card className="relative mt-5 space-y-4 p-5">
              <p className="flex items-center gap-2.5 text-sm text-muted">
                <MapPin className="size-4 text-accent" aria-hidden />
                Based in <span className="font-medium text-text">{profile.location}</span>
              </p>
              <div>
                <p className="mb-2.5 flex items-center gap-2.5 text-sm text-muted">
                  <Languages className="size-4 text-accent" aria-hidden />
                  Languages I speak
                </p>
                <ul className="grid grid-cols-2 gap-2">
                  {spokenLanguages.map((l) => (
                    <li key={l.name} className="rounded-xl border border-border bg-surface-2 px-3 py-2">
                      <span className="block text-sm font-medium text-text">{l.name}</span>
                      <span className="block text-xs text-subtle">{l.level}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
