import { NextResponse, type NextRequest } from 'next/server'
import { defaultLocale, isLocale, LOCALE_COOKIE, locales, type Locale } from '@/i18n/config'

/** Best supported language: the visitor's saved choice, then their browser languages, then English. */
function preferredLocale(request: NextRequest): Locale {
  const saved = request.cookies.get(LOCALE_COOKIE)?.value
  if (saved && isLocale(saved)) return saved
  const header = request.headers.get('accept-language') ?? ''
  const ranked = header
    .split(',')
    .map((part) => {
      const [tag, q] = part.trim().split(';q=')
      return { base: tag.toLowerCase().split('-')[0], q: q ? Number(q) : 1 }
    })
    .filter((x) => x.base && !Number.isNaN(x.q))
    .sort((a, b) => b.q - a.q)
  return (ranked.find((x) => isLocale(x.base))?.base as Locale | undefined) ?? defaultLocale
}

/** Adds the language to any address that has none, e.g. "/" → "/de" for a German browser. */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const hasLocale = locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`))
  if (hasLocale) return
  request.nextUrl.pathname = `/${preferredLocale(request)}${pathname === '/' ? '' : pathname}`
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  // Skip framework internals, the API, metadata routes and any file with an extension.
  matcher: ['/((?!_next|api|_vercel|opengraph-image|apple-icon|icon|robots.txt|sitemap.xml|manifest.webmanifest|.*\\..*).*)'],
}
