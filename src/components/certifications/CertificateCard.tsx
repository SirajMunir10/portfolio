'use client'

import { BadgeCheck, Download, ExternalLink, Expand } from 'lucide-react'
import Image from 'next/image'
import { useCallback, useState } from 'react'
import { Badge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'
import type { Certification } from '@/types/content'

const action =
  'inline-flex h-9 items-center gap-1.5 rounded-full border border-border px-3 text-sm text-muted transition-colors hover:text-text'

/** Certificate preview card; opens the full certificate inside the page with download and verify actions. */
export function CertificateCard({ cert }: { cert: Certification }) {
  const [open, setOpen] = useState(false)
  const close = useCallback(() => setOpen(false), [])

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-card transition-[transform,box-shadow] duration-300 ease-out-expo hover:-translate-y-1 hover:shadow-lift">
      {cert.image ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={`View the ${cert.name} certificate`}
          className="relative block aspect-[1.414] overflow-hidden border-b border-border bg-surface-2"
        >
          <Image
            src={cert.image.src}
            alt=""
            fill
            sizes="(min-width: 1024px) 380px, (min-width: 640px) 45vw, 90vw"
            className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.05]"
          />
          <span className="absolute inset-0 grid place-items-center bg-black/0 transition-colors duration-300 group-hover:bg-black/35">
            <span className="flex translate-y-2 items-center gap-2 rounded-full bg-surface px-4 py-2 text-sm font-medium text-text opacity-0 shadow-lift transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              <Expand className="size-4" aria-hidden /> View certificate
            </span>
          </span>
        </button>
      ) : null}

      <div className="flex flex-1 flex-col p-5">
        <p className="flex items-center gap-1.5 font-mono text-xs text-accent">
          <BadgeCheck className="size-4" aria-hidden /> {cert.issuer}
        </p>
        <h3 className="mt-2 leading-snug font-semibold text-text">{cert.name}</h3>
        <p className="mt-1.5 text-sm text-subtle">
          Issued {cert.issued}
          {cert.expires ? ` · Valid until ${cert.expires}` : ''}
        </p>
        <ul className="mt-4 flex flex-1 flex-wrap content-start gap-1.5" aria-label="Skills covered">
          {cert.skills.map((s) => (
            <li key={s}>
              <Badge>{s}</Badge>
            </li>
          ))}
        </ul>
        <div className="mt-5 flex flex-wrap gap-2">
          {cert.image ? (
            <button type="button" onClick={() => setOpen(true)} className={action}>
              <Expand className="size-4" aria-hidden /> View
            </button>
          ) : null}
          {cert.verifyUrl ? (
            <a href={cert.verifyUrl} target="_blank" rel="noopener noreferrer" className={action}>
              <ExternalLink className="size-4" aria-hidden /> Verify
            </a>
          ) : null}
        </div>
      </div>

      {cert.image ? (
        <Modal
          open={open}
          onClose={close}
          title={cert.name}
          subtitle={
            <>
              {cert.issuer} · {cert.issued}
              {cert.credentialId ? (
                <span className="ml-2 font-mono text-xs">ID {cert.credentialId}</span>
              ) : null}
            </>
          }
          size="xl"
          actions={
            <>
              {cert.file ? (
                <a href={cert.file} download className={action}>
                  <Download className="size-4" aria-hidden />
                  <span className="hidden sm:inline">PDF</span>
                </a>
              ) : null}
              {cert.verifyUrl ? (
                <a href={cert.verifyUrl} target="_blank" rel="noopener noreferrer" className={action}>
                  <ExternalLink className="size-4" aria-hidden />
                  <span className="hidden sm:inline">Verify</span>
                </a>
              ) : null}
            </>
          }
          bodyClassName="bg-surface-2 p-3 sm:p-6"
        >
          <Image
            src={cert.image.src}
            alt={`${cert.name} certificate issued to Muhammad Siraj Munir by ${cert.issuer}`}
            width={cert.image.width}
            height={cert.image.height}
            sizes="(min-width: 1280px) 1100px, 95vw"
            className="mx-auto h-auto w-full max-w-5xl rounded-lg shadow-card"
          />
        </Modal>
      ) : null}
    </article>
  )
}
