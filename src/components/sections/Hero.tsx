import { ArrowRight, Download, Mail, MapPin } from 'lucide-react'
import { GitHubIcon, LinkedInIcon } from '@/components/icons/BrandIcons'
import { Magnetic } from '@/components/motion/Magnetic'
import { HeroVisual } from '@/components/three/HeroVisual'
import { StaticField } from '@/components/three/StaticField'
import { ButtonLink } from '@/components/ui/Button'
import { profile } from '@/content/profile'

const delay = (ms: number) => ({ animationDelay: `${ms}ms` })

function Headline() {
  const { headline, headlineHighlight } = profile
  const [before, after] = headline.split(headlineHighlight)
  return (
    <>
      {before}
      <span className="bg-linear-to-r from-accent to-accent-2 bg-clip-text text-transparent">
        {headlineHighlight}
      </span>
      {after}
    </>
  )
}

const iconLink =
  'grid size-10 place-items-center rounded-full border border-border bg-surface/80 text-muted backdrop-blur transition-colors hover:border-border-strong hover:text-text'

export function Hero() {
  return (
    <section
      aria-label="Introduction"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden pt-24 pb-20"
    >
      {/* Background: dotted grid, then the embedding space, then a fade that keeps the text readable. */}
      <div
        aria-hidden
        className="bg-dots absolute inset-0 -z-20 mask-[radial-gradient(ellipse_at_center,black,transparent_75%)]"
      />
      <div className="absolute inset-0 -z-10 opacity-40 md:opacity-100">
        <HeroVisual fallback={<StaticField />} />
      </div>
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-linear-to-b from-bg/70 via-bg/40 to-bg md:bg-linear-to-r md:from-bg md:from-25% md:via-bg/60 md:via-45% md:to-transparent md:to-70%"
      />

      <div className="container-page">
        <div className="max-w-2xl">
          <p
            className="animate-rise inline-flex items-center gap-2.5 rounded-full border border-border bg-surface/80 py-1.5 pr-4 pl-3 text-sm text-muted backdrop-blur"
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
            className="animate-rise mt-7 text-5xl font-semibold tracking-tight text-text sm:text-6xl md:text-7xl"
            style={delay(80)}
          >
            {profile.name}
            <span className="mt-2 block font-mono text-base font-normal tracking-normal text-accent sm:text-lg">
              {profile.role}
            </span>
          </h1>

          <p
            className="animate-rise mt-7 text-2xl leading-snug font-medium text-text sm:text-3xl"
            style={delay(180)}
          >
            <Headline />
          </p>

          <p
            className="animate-rise mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
            style={delay(280)}
          >
            {profile.intro}
          </p>

          <div className="animate-rise mt-9 flex flex-wrap items-center gap-3" style={delay(380)}>
            <Magnetic>
              <ButtonLink href="#projects" size="lg">
                See my work
                <ArrowRight
                  className="size-4 transition-transform group-hover/button:translate-x-0.5"
                  aria-hidden
                />
              </ButtonLink>
            </Magnetic>
            <ButtonLink href="#contact" variant="secondary" size="lg">
              Get in touch
            </ButtonLink>
            {profile.resume ? (
              <ButtonLink href={profile.resume.url} variant="ghost" size="lg">
                <Download className="size-4" aria-hidden /> Resume
              </ButtonLink>
            ) : null}
          </div>

          <div className="animate-rise mt-9 flex items-center gap-2" style={delay(480)}>
            <a
              href={profile.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className={iconLink}
            >
              <GitHubIcon className="size-4.5" />
            </a>
            <a
              href={profile.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className={iconLink}
            >
              <LinkedInIcon className="size-4.5" />
            </a>
            <a href={`mailto:${profile.email}`} aria-label="Email" className={iconLink}>
              <Mail className="size-4.5" aria-hidden />
            </a>
          </div>
        </div>
      </div>

      <a
        href="#about"
        aria-label="Scroll to About"
        className="animate-rise absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[0.7rem] tracking-[0.2em] text-subtle uppercase sm:flex"
        style={delay(900)}
      >
        Scroll
        <span className="relative h-10 w-px overflow-hidden bg-border">
          <span className="absolute inset-x-0 top-0 h-1/2 animate-[scroll-cue_1.8s_ease-in-out_infinite] bg-accent" />
        </span>
      </a>
    </section>
  )
}
