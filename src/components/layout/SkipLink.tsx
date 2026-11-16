'use client'

import { useI18n } from '@/i18n/I18nProvider'

/** First focusable element: lets keyboard users jump past the navigation. */
export function SkipLink() {
  const { dict } = useI18n()
  return (
    <a
      href="#main"
      className="fixed start-3 top-3 z-80 -translate-y-20 rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-contrast transition-transform focus:translate-y-0"
    >
      {dict.common.skipToContent}
    </a>
  )
}
