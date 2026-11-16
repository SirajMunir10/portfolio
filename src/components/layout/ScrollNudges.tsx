'use client'

import { ArrowRight, Download, FileText, Sparkles, X } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useEffect, type ReactNode } from 'react'
import { GitHubIcon, LinkedInIcon } from '@/components/icons/BrandIcons'
import { profile } from '@/content/profile'
import { useScrollNudges, type NudgeId } from '@/hooks/useScrollNudges'

const AUTO_HIDE_MS = 12_000

const action =
  'inline-flex h-9 items-center gap-1.5 rounded-full px-3.5 text-sm font-medium transition-colors'

function Content({ id, onClose }: { id: NudgeId; onClose: () => void }): ReactNode {
  if (id === 'after-projects') {
    return profile.resume ? (
      <>
        <p className="font-semibold text-text">Want the full CV?</p>
        <p className="mt-1 text-sm text-muted">Every role, project and result on one page.</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <a
            href={profile.resume.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className={`${action} bg-accent text-accent-contrast hover:bg-accent-hover`}
          >
            <FileText className="size-4" aria-hidden /> View CV
          </a>
          <a
            href={profile.resume.url}
            download={profile.resume.fileName}
            onClick={onClose}
            className={`${action} border border-border text-text hover:bg-surface-2`}
          >
            <Download className="size-4" aria-hidden /> Download
          </a>
        </div>
      </>
    ) : (
      <>
        <p className="font-semibold text-text">Enjoyed the projects?</p>
        <p className="mt-1 text-sm text-muted">
          The code is on GitHub, and I share what I build on LinkedIn.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <a
            href={profile.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className={`${action} bg-accent text-accent-contrast hover:bg-accent-hover`}
          >
            <GitHubIcon className="size-4" /> GitHub
          </a>
          <a
            href={profile.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className={`${action} border border-border text-text hover:bg-surface-2`}
          >
            <LinkedInIcon className="size-4" /> Connect
          </a>
        </div>
      </>
    )
  }
  return (
    <>
      <p className="font-semibold text-text">{profile.availability}</p>
      <p className="mt-1 text-sm text-muted">
        Based in {profile.location}. Happy to talk about your team and what you are building.
      </p>
      <div className="mt-4">
        <a
          href="#contact"
          onClick={onClose}
          className={`${action} group bg-accent text-accent-contrast hover:bg-accent-hover`}
        >
          Let&apos;s talk{' '}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
        </a>
      </div>
    </>
  )
}

/** Small corner card that appears at the right moment while scrolling, then gets out of the way. */
export function ScrollNudges() {
  const { active, dismiss } = useScrollNudges()
  const reduce = useReducedMotion()

  useEffect(() => {
    if (!active) return
    const timer = setTimeout(dismiss, AUTO_HIDE_MS)
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && dismiss()
    window.addEventListener('keydown', onKey)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('keydown', onKey)
    }
  }, [active, dismiss])

  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed inset-x-3 bottom-3 z-40 flex justify-end sm:inset-x-auto sm:right-6 sm:bottom-6"
    >
      <AnimatePresence>
        {active ? (
          <motion.aside
            key={active}
            role="complementary"
            aria-label="Suggestion"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto relative w-full overflow-hidden rounded-2xl border border-border bg-surface/95 p-5 pr-12 shadow-lift backdrop-blur-xl sm:w-[22rem]"
          >
            <span
              aria-hidden
              className="absolute inset-x-0 top-0 h-0.5 bg-linear-to-r from-accent to-accent-2"
            />
            <motion.span
              aria-hidden
              className="absolute bottom-0 left-0 h-0.5 bg-accent/40"
              initial={{ width: '100%' }}
              animate={{ width: '0%' }}
              transition={{ duration: AUTO_HIDE_MS / 1000, ease: 'linear' }}
            />
            <span className="mb-3 inline-grid size-8 place-items-center rounded-lg bg-accent-soft text-accent">
              <Sparkles className="size-4" aria-hidden />
            </span>
            <Content id={active} onClose={dismiss} />
            <button
              type="button"
              onClick={dismiss}
              aria-label="Dismiss"
              className="absolute top-3 right-3 grid size-8 place-items-center rounded-full text-subtle transition-colors hover:bg-surface-2 hover:text-text"
            >
              <X className="size-4" aria-hidden />
            </button>
          </motion.aside>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
