import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono, IBM_Plex_Sans_Arabic, Instrument_Serif } from 'next/font/google'
import { BackToTop } from '@/components/layout/BackToTop'
import { Backdrop } from '@/components/layout/Backdrop'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { ScrollNudges } from '@/components/layout/ScrollNudges'
import { ScrollProgress } from '@/components/layout/ScrollProgress'
import { SkipLink } from '@/components/layout/SkipLink'
import { ThemeScript } from '@/components/theme/ThemeScript'
import { getSite } from '@/content'
import { defaultLocale, direction, isLocale, locales, ogLocale } from '@/i18n/config'
import { I18nProvider } from '@/i18n/I18nProvider'
import { keywords, languageAlternates, siteUrl, socialImage } from '@/lib/site'
import '../globals.css'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'], display: 'swap' })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'], display: 'swap' })
const instrumentSerif = Instrument_Serif({
  variable: '--font-instrument-serif',
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  display: 'swap',
})
// Only applied (and so only downloaded) on the Arabic pages.
const arabic = IBM_Plex_Sans_Arabic({
  variable: '--font-arabic',
  subsets: ['arabic'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  preload: false,
  // No size-matched Arial stand-in: Arial would also catch the Arabic glyphs this font is here for.
  adjustFontFallback: false,
})

/** Every language is prerendered as static HTML. */
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: LayoutProps<'/[lang]'>): Promise<Metadata> {
  const { lang } = await params
  const locale = isLocale(lang) ? lang : defaultLocale
  const { dict, profile } = getSite(locale)
  return {
    metadataBase: new URL(siteUrl()),
    title: { default: dict.meta.title, template: `%s · ${profile.name}` },
    description: dict.meta.description,
    keywords,
    authors: [{ name: profile.name, url: profile.socials.linkedin }],
    creator: profile.name,
    alternates: { canonical: `/${locale}`, languages: languageAlternates() },
    openGraph: {
      type: 'profile',
      url: `/${locale}`,
      siteName: profile.name,
      title: dict.meta.title,
      description: dict.meta.description,
      locale: ogLocale[locale],
      alternateLocale: locales.filter((l) => l !== locale).map((l) => ogLocale[l]),
      firstName: 'Siraj',
      lastName: 'Munir',
      images: [socialImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: dict.meta.title,
      description: dict.meta.description,
      images: [socialImage.url],
    },
    robots: { index: true, follow: true },
    formatDetection: { telephone: false },
  }
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f6f4f1' },
    { media: '(prefers-color-scheme: dark)', color: '#08070c' },
  ],
}

export default async function RootLayout({ children, params }: LayoutProps<'/[lang]'>) {
  const { lang } = await params
  const locale = isLocale(lang) ? lang : defaultLocale
  const site = getSite(locale)
  const fonts = [geistSans.variable, geistMono.variable, instrumentSerif.variable]
  if (locale === 'ar') fonts.push(arabic.variable)

  return (
    <html
      lang={locale}
      dir={direction(locale)}
      data-theme="light"
      // Smooth scrolling is for in-page links; this lets Next.js jump instantly on page navigations.
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${fonts.join(' ')} antialiased`}
    >
      <head>
        <ThemeScript />
      </head>
      <body id="top">
        <I18nProvider
          site={{
            locale,
            dict: site.dict,
            profile: site.profile,
            navigation: site.navigation,
            callouts: site.callouts,
            formations: site.formations,
          }}
        >
          <Backdrop />
          <SkipLink />
          <ScrollProgress />
          <Header />
          <main id="main" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <Footer site={site} />
          <BackToTop />
          <ScrollNudges />
        </I18nProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
