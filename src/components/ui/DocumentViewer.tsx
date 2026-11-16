'use client'

import { Download, ExternalLink } from 'lucide-react'
import type { ReactNode } from 'react'
import { useI18n } from '@/i18n/I18nProvider'
import { Modal } from './Modal'

type Props = {
  open: boolean
  onClose: () => void
  title: string
  subtitle?: ReactNode
  /** Same-site PDF path, e.g. /documents/paper.pdf */
  src: string
  downloadName?: string
}

const action =
  'inline-flex h-9 items-center gap-1.5 rounded-full border border-border px-3 text-sm text-muted transition-colors hover:text-text'

/**
 * Shows a PDF inside the page. Phone browsers that cannot embed PDFs get a clear button
 * to open it in their own viewer instead.
 */
export function DocumentViewer({ open, onClose, title, subtitle, src, downloadName }: Props) {
  const { dict } = useI18n()
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      subtitle={subtitle}
      size="xl"
      actions={
        <>
          <a href={src} target="_blank" rel="noopener noreferrer" className={action}>
            <ExternalLink className="size-4" aria-hidden />
            <span className="hidden sm:inline">{dict.common.open}</span>
          </a>
          <a href={src} download={downloadName} className={action}>
            <Download className="size-4" aria-hidden />
            <span className="hidden sm:inline">{dict.common.download}</span>
          </a>
        </>
      }
    >
      <div className="relative h-[78dvh] bg-surface-2">
        <iframe src={`${src}#view=FitH`} title={title} className="hidden size-full md:block" />
        <div className="flex size-full flex-col items-center justify-center gap-4 p-8 text-center md:hidden">
          <p className="max-w-xs text-sm text-muted">{dict.viewer.phoneNote}</p>
          <a
            href={src}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center gap-2 rounded-full bg-accent px-5 font-medium text-accent-contrast"
          >
            <ExternalLink className="size-4" aria-hidden /> {dict.viewer.openDocument}
          </a>
        </div>
      </div>
    </Modal>
  )
}
