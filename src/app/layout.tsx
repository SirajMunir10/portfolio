import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { BackToTop } from '@/components/layout/BackToTop'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { ScrollNudges } from '@/components/layout/ScrollNudges'
import { ScrollProgress } from '@/components/layout/ScrollProgress'
import { SkipLink } from '@/components/layout/SkipLink'
import { ThemeScript } from '@/components/theme/ThemeScript'
import './globals.css'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'], display: 'swap' })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'], display: 'swap' })

export const metadata: Metadata = {
  title: 'Siraj Munir · AI Engineer',
  description: 'Portfolio of Siraj Munir, AI Engineer in Dubai building LLM, RAG and voice AI products.',
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fafaf9' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0b' },
  ],
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      data-theme="light"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <head>
        <ThemeScript />
      </head>
      <body id="top">
        <SkipLink />
        <ScrollProgress />
        <Header />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer />
        <BackToTop />
        <ScrollNudges />
      </body>
    </html>
  )
}
