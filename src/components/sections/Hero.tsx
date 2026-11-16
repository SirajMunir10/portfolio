import { ArrowRight, FileText, Mail, MapPin } from 'lucide-react'
import { GitHubIcon, LinkedInIcon } from '@/components/icons/BrandIcons'
import { Magnetic } from '@/components/motion/Magnetic'
import { ResumeButton } from '@/components/resume/ResumeButton'
import { HeroVisual } from '@/components/three/HeroVisual'
import { StaticField } from '@/components/three/StaticField'
import { ButtonLink } from '@/components/ui/Button'
import { Em } from '@/components/ui/Em'
import type { Site } from '@/content'

const delay = (ms: number) => ({ animationDelay: `${ms}ms` })

function Headline({ headline, highlight }: { headline: string; highlight: string }) {
  const [before, after] = headline.split(highlight)
  return (
    <>
      {before}
      <Em tone="warm" className="text-[1.12em] leading-none">
        {highlight}
      </Em>
      {after}
    </>
  )
}

const iconLink =
  'glass grid size-10 place-items-center rounded-full border border-border text-muted transition-colors hover:border-border-strong hover:text-text'

export function Hero({ site }: { site: Site }) {
  const { profile, dict } = site
  return (
    <section
      aria-label={dict.hero.label}
      className="relative isolate flex min-h-svh items-center overflow-hidden pt-24 pb-20"
    >
      {/* Background: the particle scene, then a soft fade that keeps the text readable over it. */}
      <div className="absolute inset-0 -z-10 opacity-40 md:opacity-100">
        <HeroVisual fallback={<StaticField />} />
      </div>
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-linear-to-b from-bg/60 via-bg/30 to-transparent md:bg-linear-to-r md:from-bg/85 md:from-20% md:via-bg/40 md:via-45% md:to-transparent md:to-65% rtl:md:bg-linear-to-l"
      />

      <div className="container-page">
        <div className="max-w-2xl">
          <p
            className="animate-rise glass inline-flex items-center gap-2.5 rounded-full border border-border py-1.5 ps-3 pe-4 text-sm text-muted"
            style={delay(0)}
          >
            <span className="relative flex size-2">
              <span className="absolute inset-0 animate-[pulse-ring_1.8s_ease-out_infinite] rounded-full bg-emerald-500" />
              <span className="relative size-2 rounded-full bg-emerald-500" />
            </span>
            {profile.availability}
            <span aria-hidden className="text-border-strong">
              ·
            </span>
            <span className="inline-flex items-center gap-1">
              <MapPin className="size-3.5" aria-hidden />
              {profile.location}
            </span>
          </p>

          <h1
            className="animate-rise mt-8 text-6xl leading-[0.95] font-semibold tracking-tighter text-text sm:text-7xl md:text-8xl"
            style={delay(80)}
          >
            {profile.name}
            <span className="mt-4 block font-mono text-sm font-normal tracking-[0.2em] text-accent uppercase sm:text-base">
              {profile.role}
            </span>
          </h1>

          <p
            className="animate-rise mt-8 text-2xl leading-snug font-medium tracking-tight text-text sm:text-[2rem]"
            style={delay(180)}
          >
            <Headline headline={profile.headline} highlight={profile.headlineHighlight} />
          </p>

          <p className="animate-rise mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg" style={delay(280)}>
            {profile.intro}
          </p>

          <div className="animate-rise mt-9 flex flex-wrap items-center gap-3" style={delay(380)}>
            <Magnetic>
              <ButtonLink href="#projects" size="lg">
                {dict.hero.seeWork}
                <ArrowRight
                  className="size-4 transition-transform group-hover/button:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover/button:-translate-x-0.5"
                  aria-hidden
                />
              </ButtonLink>
            </Magnetic>
            <ButtonLink href="#contact" variant="secondary" size="lg">
              {dict.hero.getInTouch}
            </ButtonLink>
            <ResumeButton variant="ghost" size="lg">
              <FileText className="size-4" aria-hidden /> {dict.common.viewCv}
            </ResumeButton>
          </div>

          <div className="animate-rise mt-9 flex items-center gap-2" style={delay(480)}>
            <a href={profile.socials.github} target="_blank" rel="noopener noreferrer" aria-label={dict.common.github} className={iconLink}>
              <GitHubIcon className="size-4.5" />
            </a>
            <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label={dict.common.linkedin} className={iconLink}>
              <LinkedInIcon className="size-4.5" />
            </a>
            <a href={`mailto:${profile.email}`} aria-label={dict.common.email} className={iconLink}>
              <Mail className="size-4.5" aria-hidden />
            </a>
          </div>
        </div>
      </div>

      <a
        href="#about"
        aria-label={dict.hero.scrollToAbout}
        className="animate-rise absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[0.7rem] tracking-[0.2em] text-subtle uppercase sm:flex"
        style={delay(900)}
      >
        {dict.hero.scroll}
        <span className="relative h-10 w-px overflow-hidden bg-border">
          <span className="absolute inset-x-0 top-0 h-1/2 animate-[scroll-cue_1.8s_ease-in-out_infinite] bg-accent" />
        </span>
      </a>
    </section>
  )
}
