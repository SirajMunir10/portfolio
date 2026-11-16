'use client'

import { ArrowLeft } from 'lucide-react'
import { ButtonLink } from '@/components/ui/Button'
import { useI18n } from '@/i18n/I18nProvider'

export default function NotFound() {
  const { dict, locale } = useI18n()
  return (
    <section className="container-page flex min-h-[80dvh] flex-col items-start justify-center pt-24">
      <p className="font-mono text-sm text-accent">404</p>
      <h1 className="mt-3 text-4xl font-semibold text-text md:text-5xl">{dict.notFound.title}</h1>
      <p className="mt-4 max-w-md text-muted">{dict.notFound.body}</p>
      <ButtonLink href={`/${locale}`} className="mt-8">
        <ArrowLeft className="size-4 rtl:-scale-x-100" aria-hidden /> {dict.notFound.back}
      </ButtonLink>
    </section>
  )
}
