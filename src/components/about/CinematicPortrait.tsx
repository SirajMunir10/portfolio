'use client'

import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import Image from 'next/image'
import { useRef } from 'react'
import { profile } from '@/content/profile'

/**
 * Film-still treatment for the portrait: letterbox bars with credits, the black-and-white photo
 * with a slow push-in and scroll parallax, a drifting warm light leak, vignette and grain,
 * and the name set like an opening credit. Always dark, in both themes, as a deliberate contrast moment.
 */
export function CinematicPortrait() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-7%', '7%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['18px', '-18px'])
  if (!profile.photo) return null

  const [first, ...rest] = profile.fullName.split(' ')

  return (
    <figure
      ref={ref}
      className="relative isolate overflow-hidden rounded-4xl border border-white/10 bg-[#060508] text-white shadow-lift"
    >
      {/* Top letterbox with credits */}
      <div className="relative z-30 flex h-9 items-center justify-between bg-black px-5 font-mono text-[0.62rem] tracking-[0.3em] text-white/45 uppercase md:h-11 md:px-8">
        <span>Scene 01 · About</span>
        <span className="hidden sm:inline">{profile.location}</span>
      </div>

      <div className="relative grid md:min-h-[34rem] md:grid-cols-[1fr_1fr] lg:min-h-[38rem]">
        {/* Photograph */}
        <div className="relative aspect-4/5 overflow-hidden md:order-2 md:aspect-auto">
          <motion.div style={reduce ? undefined : { y }} className="absolute inset-x-0 -inset-y-[8%]">
            <div className="absolute inset-0 motion-safe:animate-[push-in_24s_ease-in-out_infinite_alternate]">
              <Image
                src={profile.photo.src}
                alt={profile.photo.alt}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover object-[62%_28%] brightness-90 contrast-125 grayscale"
              />
            </div>
          </motion.div>
          {/* Warm light leak drifting across the frame */}
          <div
            aria-hidden
            className="absolute -top-1/4 -right-1/3 h-[140%] w-[90%] mix-blend-screen motion-safe:animate-[light-leak_14s_ease-in-out_infinite_alternate]"
            style={{
              background:
                'radial-gradient(closest-side, rgb(255 110 70 / 0.38), rgb(140 90 255 / 0.12) 55%, transparent)',
            }}
          />
          {/* Vignette, then a fade into the text panel */}
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_40%,transparent_35%,rgb(0_0_0/0.65)_100%)]"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-linear-to-t from-[#060508] via-transparent to-transparent md:bg-linear-to-r md:from-[#060508] md:via-[#060508]/20"
          />
        </div>

        {/* Credits */}
        <motion.figcaption
          style={reduce ? undefined : { y: textY }}
          className="relative z-10 -mt-24 flex flex-col justify-end px-6 pb-8 md:order-1 md:mt-0 md:px-12 md:pb-14"
        >
          <p className="font-mono text-[0.65rem] tracking-[0.35em] text-white/50 uppercase">Featuring</p>
          <p className="mt-4 font-serif text-6xl leading-[0.9] italic md:text-7xl lg:text-8xl">
            {first}
            <br />
            <span className="not-italic">{rest.join(' ')}</span>
          </p>
          <p className="mt-6 font-mono text-xs tracking-[0.3em] text-[#ff9b80] uppercase">{profile.role}</p>
          <blockquote className="mt-8 max-w-sm border-l border-white/20 pl-4 text-base leading-relaxed text-white/75 md:text-lg">
            “{profile.quote}”
          </blockquote>
        </motion.figcaption>

        {/* Fine film grain over the whole frame */}
        <div
          aria-hidden
          className="grain pointer-events-none absolute inset-0 z-20 opacity-[0.12] mix-blend-overlay"
        />
      </div>

      {/* Bottom letterbox */}
      <div className="relative z-30 flex h-9 items-center justify-between bg-black px-5 font-mono text-[0.62rem] tracking-[0.3em] text-white/45 uppercase md:h-11 md:px-8">
        <span className="flex items-center gap-2 whitespace-nowrap">
          <span className="size-1.5 rounded-full bg-[#ff5a36] motion-safe:animate-pulse" aria-hidden /> 35mm ·
          B&amp;W
        </span>
        <span className="hidden whitespace-nowrap sm:inline">{profile.availability}</span>
      </div>
    </figure>
  )
}
