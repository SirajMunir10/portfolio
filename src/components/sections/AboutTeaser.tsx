import { ArrowRight } from 'lucide-react'
import { CinematicPortrait } from '@/components/about/CinematicPortrait'
import { Reveal } from '@/components/motion/Reveal'
import { ButtonLink } from '@/components/ui/Button'
import { Em } from '@/components/ui/Em'
import { SectionHeading } from '@/components/ui/SectionHeading'
import type { Site } from '@/content'
import { localeHref } from '@/i18n/config'

/** Home page: the portrait and one paragraph, with the full story on the About page. */
export function AboutTeaser({ site }: { site: Site }) {
  const { profile, dict, locale } = site
  const t = dict.about
  return (
    <section id="about" aria-labelledby="about-title" className="container-page py-24 md:py-32">
      <SectionHeading
        index="03"
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

      <div className="mt-12 grid gap-8 lg:mt-16 lg:grid-cols-[1.5fr_1fr] lg:items-end lg:gap-16">
        <Reveal>
          <p className="text-lg leading-relaxed text-text md:text-xl md:leading-relaxed">{profile.about[0]}</p>
        </Reveal>
        <Reveal delay={0.1} className="lg:justify-self-end">
          <ButtonLink href={localeHref(locale, '/about')} variant="secondary" size="lg">
            {dict.home.moreAbout}
            <ArrowRight
              className="size-4 transition-transform group-hover/button:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover/button:-translate-x-0.5"
              aria-hidden
            />
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  )
}
