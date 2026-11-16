'use client'

import { ChevronDown, FileText } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useCallback, useState } from 'react'
import { GitHubIcon } from '@/components/icons/BrandIcons'
import { Button } from '@/components/ui/Button'
import { DocumentViewer } from '@/components/ui/DocumentViewer'
import { useI18n } from '@/i18n/I18nProvider'
import type { Research } from '@/types/content'

/** The research paper: authors, expandable abstract, method, key results and the paper itself. */
export function PublicationCard({ research }: { research: Research }) {
  const { dict, profile } = useI18n()
  const t = dict.education
  const [abstractOpen, setAbstractOpen] = useState(false)
  const [paperOpen, setPaperOpen] = useState(false)
  const closePaper = useCallback(() => setPaperOpen(false), [])

  return (
    <article className="glass rounded-3xl border border-border p-6 md:p-8">
      <p className="font-mono text-xs tracking-[0.18em] text-accent uppercase">{t.paper}</p>
      <h3 className="mt-3 text-xl leading-snug font-semibold text-text md:text-2xl">{research.title}</h3>
      <p className="mt-3 text-sm text-muted">
        {research.authors.map((a, i) => (
          <span key={a}>
            {i ? ', ' : ''}
            <span className={a === profile.fullName ? 'font-medium text-text' : undefined}>{a}</span>
          </span>
        ))}
      </p>
      <p className="mt-1 text-xs text-subtle">
        {research.affiliation} · {research.period}
      </p>

      <dl className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3">
        {research.results.map((r) => (
          <div key={r.label} className="rounded-xl border border-border bg-surface-2 px-3 py-3">
            <dt className="sr-only">{r.label}</dt>
            <dd>
              <span className="block font-semibold text-text">{r.value}</span>
              <span className="mt-0.5 block text-xs leading-snug text-subtle">{r.label}</span>
            </dd>
          </div>
        ))}
      </dl>

      <button
        type="button"
        onClick={() => setAbstractOpen((v) => !v)}
        aria-expanded={abstractOpen}
        className="mt-6 flex w-full items-center justify-between rounded-xl border border-border px-4 py-3 text-start text-sm font-medium text-text transition-colors hover:bg-surface-2"
      >
        {t.abstract}
        <ChevronDown
          className={`size-4 transition-transform ${abstractOpen ? 'rotate-180' : ''}`}
          aria-hidden
        />
      </button>
      <AnimatePresence initial={false}>
        {abstractOpen ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="pt-4 text-sm leading-relaxed text-muted">{research.abstract}</p>
            <ul className="mt-4 space-y-2">
              {research.method.map((m) => (
                <li key={m} className="flex gap-3 text-sm leading-relaxed text-muted">
                  <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-accent-2" />
                  {m}
                </li>
              ))}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="mt-6 flex flex-wrap gap-2">
        <Button size="sm" onClick={() => setPaperOpen(true)}>
          <FileText className="size-4" aria-hidden /> {dict.projects.readPaper}
        </Button>
        <a
          href={research.repo}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-9 items-center gap-1.5 rounded-full border border-border px-3.5 text-sm text-muted transition-colors hover:text-text"
        >
          <GitHubIcon className="size-4" /> {t.repository}
        </a>
      </div>

      <DocumentViewer
        open={paperOpen}
        onClose={closePaper}
        title="Reducing ICU Alarm Fatigue"
        subtitle={dict.projects.paperPdf}
        src={research.pdf}
        downloadName="Siraj-Munir-ICU-Alarm-Fatigue-Paper.pdf"
      />
    </article>
  )
}
