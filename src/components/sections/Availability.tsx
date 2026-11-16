import { ArrowRight, Building2, FileText, Laptop, MapPin, Plane } from 'lucide-react'
import { Reveal } from '@/components/motion/Reveal'
import { ResumeButton } from '@/components/resume/ResumeButton'
import { Badge } from '@/components/ui/Badge'
import { ButtonLink } from '@/components/ui/Button'
import { Em } from '@/components/ui/Em'
import { SectionHeading } from '@/components/ui/SectionHeading'
import type { Site } from '@/content'
import { format } from '@/i18n/config'

const label = 'mb-4 font-mono text-xs font-medium tracking-[0.18em] text-subtle uppercase'
const iconBox = 'grid size-10 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent'

/** Where and how Siraj is open to work: four countries, remote or on-site, and relocation. */
export function Availability({ site }: { site: Site }) {
  const { dict, opportunities, profile } = site
  const t = dict.opportunities
  const modes = [
    { Icon: Laptop, title: t.remote, detail: t.remoteDetail, show: opportunities.modes.includes('remote') },
    { Icon: Building2, title: t.onsite, detail: t.onsiteDetail, show: opportunities.modes.includes('onsite') },
    { Icon: Plane, title: t.relocation, detail: t.relocationDetail, show: opportunities.relocation },
  ].filter((m) => m.show)

  return (
    <section id="availability" aria-labelledby="availability-title" className="container-page py-24 md:py-32">
      <SectionHeading
        index="04"
        id="availability-title"
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

      <Reveal>
        <div className="glass grid overflow-hidden rounded-3xl border border-border lg:grid-cols-[1.3fr_1fr]">
          <div className="border-b border-border p-6 md:p-10 lg:border-e lg:border-b-0">
            <h3 className={label}>{t.where}</h3>
            <ul className="grid gap-3 sm:grid-cols-2">
              {opportunities.regionNames.map((r) => (
                <li key={r.code} className="rounded-2xl border border-border bg-surface-2/60 p-5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs tracking-widest text-accent">{r.code}</span>
                    <span className="relative flex size-2" aria-hidden>
                      <span className="absolute inset-0 animate-[pulse-ring_1.8s_ease-out_infinite] rounded-full bg-emerald-500" />
                      <span className="relative size-2 rounded-full bg-emerald-500" />
                    </span>
                  </div>
                  <p className="mt-4 text-xl font-semibold text-text">{r.name}</p>
                  <p className="mt-1 text-sm text-subtle">{t.remoteAndOnsite}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col p-6 md:p-10">
            <h3 className={label}>{t.how}</h3>
            <ul className="space-y-5">
              {modes.map(({ Icon, title, detail }) => (
                <li key={title} className="flex items-start gap-4">
                  <span className={iconBox}>
                    <Icon className="size-4.5" aria-hidden />
                  </span>
                  <div>
                    <p className="font-medium text-text">{title}</p>
                    <p className="mt-0.5 text-sm text-muted">{detail}</p>
                  </div>
                </li>
              ))}
            </ul>

            <h3 className={`${label} mt-9`}>{t.rolesLabel}</h3>
            <ul className="flex flex-wrap gap-2">
              {t.roles.map((role) => (
                <li key={role}>
                  <Badge tone="accent" className="px-3 py-1 text-sm">
                    {role}
                  </Badge>
                </li>
              ))}
            </ul>

            <p className="mt-8 flex items-center gap-2 text-sm text-muted">
              <MapPin className="size-4 shrink-0 text-accent" aria-hidden />
              {format(t.currently, { location: profile.location })}
            </p>

            <div className="mt-6 flex flex-wrap gap-3 lg:mt-auto lg:pt-8">
              <ButtonLink href="#contact">
                {t.cta}
                <ArrowRight
                  className="size-4 transition-transform group-hover/button:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover/button:-translate-x-0.5"
                  aria-hidden
                />
              </ButtonLink>
              <ResumeButton variant="secondary">
                <FileText className="size-4" aria-hidden /> {dict.common.viewCv}
              </ResumeButton>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
