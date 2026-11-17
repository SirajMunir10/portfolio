import { NextResponse, type NextRequest } from 'next/server'
import { LOCALE_COOKIE, locales } from '@/i18n/config'
import { pickLocale } from '@/i18n/negotiate'

/** Adds the language to any address that has none, e.g. "/" → "/de" for a German browser. */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const hasLocale = locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`))
  if (hasLocale) return
  const locale = pickLocale(request.cookies.get(LOCALE_COOKIE)?.value, request.headers.get('accept-language'))
  request.nextUrl.pathname = `/${locale}${pathname === '/' ? '' : pathname}`
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  // Skip framework internals, the API, metadata routes and any file with an extension.
  matcher: ['/((?!_next|api|_vercel|opengraph-image|apple-icon|icon|robots.txt|sitemap.xml|manifest.webmanifest|.*\\..*).*)'],
}
