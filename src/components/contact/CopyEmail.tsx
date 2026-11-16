'use client'

import { Check, Copy } from 'lucide-react'
import { useState } from 'react'
import { useI18n } from '@/i18n/I18nProvider'

/** Copies the email address and confirms with a short "Copied" state. */
export function CopyEmail({ email }: { email: string }) {
  const { dict } = useI18n()
  const [copied, setCopied] = useState(false)
  async function copy() {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${email}`
    }
  }
  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? dict.contact.emailCopied : dict.contact.copyEmail}
      className="grid size-9 shrink-0 place-items-center rounded-full border border-border text-muted transition-colors hover:text-text"
    >
      {copied ? (
        <Check className="size-4 text-accent-2" aria-hidden />
      ) : (
        <Copy className="size-4" aria-hidden />
      )}
    </button>
  )
}
