'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import Image from 'next/image'
import { useState } from 'react'
import { format } from '@/i18n/config'
import { useI18n } from '@/i18n/I18nProvider'
import { cn } from '@/lib/utils'
import type { ProjectImage } from '@/types/content'

/** Large image with previous/next controls, arrow-key support and a thumbnail strip. */
export function ImageGallery({ images }: { images: ProjectImage[] }) {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const { dict, dir } = useI18n()
  const rtl = dir === 'rtl'
  if (!images.length) return null
  const image = images[index]
  const go = (next: number) => {
    setDirection(next > index ? 1 : -1)
    setIndex((next + images.length) % images.length)
  }
  const portrait = image.height > image.width

  return (
    <div
      className="space-y-3"
      onKeyDown={(e) => {
        // Arrow keys follow reading direction: "forward" is left in right-to-left languages.
        if (e.key === 'ArrowRight') go(rtl ? index - 1 : index + 1)
        if (e.key === 'ArrowLeft') go(rtl ? index + 1 : index - 1)
      }}
    >
      <div className="relative aspect-16/10 overflow-hidden rounded-2xl border border-border bg-surface-2">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={image.src}
            custom={direction}
            initial={{ opacity: 0, x: direction * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -40 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 1024px) 900px, 95vw"
              className={cn(portrait ? 'object-contain p-4' : 'object-cover object-top')}
            />
          </motion.div>
        </AnimatePresence>
        {images.length > 1 ? (
          <>
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label={dict.projects.previousImage}
              className="absolute start-3 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full border border-border bg-surface/90 text-text shadow-card backdrop-blur"
            >
              <ChevronLeft className="size-5 rtl:-scale-x-100" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label={dict.projects.nextImage}
              className="absolute end-3 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full border border-border bg-surface/90 text-text shadow-card backdrop-blur"
            >
              <ChevronRight className="size-5 rtl:-scale-x-100" aria-hidden />
            </button>
          </>
        ) : null}
      </div>
      <p className="text-center text-sm text-muted" aria-live="polite">
        {image.alt}
        <span className="ms-2 font-mono text-xs text-subtle">
          {index + 1}/{images.length}
        </span>
      </p>
      {images.length > 1 ? (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={img.src}
              type="button"
              onClick={() => go(i)}
              aria-label={format(dict.projects.showImage, { index: i + 1, alt: img.alt })}
              aria-current={i === index}
              className={cn(
                'relative h-14 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-all',
                i === index ? 'border-accent' : 'border-transparent opacity-60 hover:opacity-100'
              )}
            >
              <Image src={img.src} alt="" fill sizes="80px" className="object-cover object-top" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}
