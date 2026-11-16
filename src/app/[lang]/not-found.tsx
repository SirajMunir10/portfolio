import { ArrowLeft } from 'lucide-react'
import { ButtonLink } from '@/components/ui/Button'

export default function NotFound() {
  return (
    <section className="container-page flex min-h-[80dvh] flex-col items-start justify-center pt-24">
      <p className="font-mono text-sm text-accent">404</p>
      <h1 className="mt-3 text-4xl font-semibold text-text md:text-5xl">This page does not exist.</h1>
      <p className="mt-4 max-w-md text-muted">
        The link may be old or mistyped. Everything about my work is on the home page.
      </p>
      <ButtonLink href="/" className="mt-8">
        <ArrowLeft className="size-4" aria-hidden /> Back to the portfolio
      </ButtonLink>
    </section>
  )
}
