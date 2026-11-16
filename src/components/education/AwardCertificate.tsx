'use client'

import { Expand } from 'lucide-react'
import Image from 'next/image'
import { useCallback, useState } from 'react'
import { Modal } from '@/components/ui/Modal'
import { format } from '@/i18n/config'
import { useI18n } from '@/i18n/I18nProvider'
import type { Award } from '@/types/content'

/** "View certificate" button for an award, opening the certificate image in a dialog. */
export function AwardCertificate({ award }: { award: Award }) {
  const { dict } = useI18n()
  const [open, setOpen] = useState(false)
  const close = useCallback(() => setOpen(false), [])
  if (!award.certificate) return null
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
      >
        <Expand className="size-4" aria-hidden /> {dict.certifications.viewCertificate}
      </button>
      <Modal
        open={open}
        onClose={close}
        title={award.title}
        subtitle={`${award.issuer} · ${award.date}`}
        size="xl"
        bodyClassName="bg-surface-2 p-3 sm:p-6"
      >
        <Image
          src={award.certificate.src}
          alt={format(dict.education.awardAlt, { title: award.title })}
          width={award.certificate.width}
          height={award.certificate.height}
          sizes="(min-width: 1280px) 1100px, 95vw"
          className="mx-auto h-auto w-full max-w-5xl rounded-lg shadow-card"
        />
      </Modal>
    </>
  )
}
