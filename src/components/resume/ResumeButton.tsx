'use client'

import { useCallback, useState, type ReactNode } from 'react'
import { buttonClasses } from '@/components/ui/Button'
import { DocumentViewer } from '@/components/ui/DocumentViewer'
import { profile } from '@/content/profile'

type Props = {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  /** Render as a plain text link instead of a button shape. */
  unstyled?: boolean
  children: ReactNode
  onOpen?: () => void
}

/** Opens the CV in the in-page viewer (with download), so visitors never leave the site. */
export function ResumeButton({
  variant = 'secondary',
  size = 'md',
  className,
  unstyled,
  children,
  onOpen,
}: Props) {
  const [open, setOpen] = useState(false)
  const close = useCallback(() => setOpen(false), [])
  if (!profile.resume) return null
  return (
    <>
      <button
        type="button"
        onClick={() => {
          onOpen?.()
          setOpen(true)
        }}
        className={unstyled ? className : buttonClasses({ variant, size, className })}
      >
        {children}
      </button>
      <DocumentViewer
        open={open}
        onClose={close}
        title={`${profile.name} · CV`}
        subtitle={profile.role}
        src={profile.resume.url}
        downloadName={profile.resume.fileName}
      />
    </>
  )
}
