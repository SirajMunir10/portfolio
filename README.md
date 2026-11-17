# Siraj Munir Â· Portfolio

Personal portfolio of Siraj Munir, AI and LLM Engineer based in Dubai, open to AI Engineer roles in the UAE, USA, Germany and the Netherlands (remote or on-site).

**Live site: [sirajmunir-portfolio.vercel.app](https://sirajmunir-portfolio.vercel.app)**

## What's inside

- **Four languages**: English, Nederlands, Deutsch and Ø§Ù„Ø¹Ø±Ø¨ÙŠØ© (right to left), chosen from the browser language or the switcher and remembered with a cookie.
- **Pages**: a short home page, a projects index, a case study page per project, and an about page with skills, certificates, education and published research.
- **3D hero**: a WebGL particle field (React Three Fiber, custom shaders) that morphs between four shapes and surfaces facts as it moves. It falls back to a static image when WebGL or motion is unavailable.
- **Contact form**: validated on both sides with Zod, protected by a honeypot, a timing check and rate limiting, and delivered by email through Resend. Messages are not stored.
- **SEO**: per-language metadata, hreflang alternates, a sitemap, Open Graph images and schema.org Person data.

## Stack

Next.js 16 (App Router, React 19), TypeScript, Tailwind CSS 4, Motion, Three.js and React Three Fiber, Zod, Vitest, Playwright with axe, deployed on Vercel.

## Running locally

Requires Node 22 (see `.nvmrc`).

```bash
npm install
npm run dev          # http://localhost:3000
```

To send real emails from the contact form, copy `.env.example` to `.env.local` and fill in the Resend values. Without them the form still works, and tells visitors that email is not connected yet.

## Checks

| Command             | What it does                                                                |
| ------------------- | --------------------------------------------------------------------------- |
| `npm run lint`      | ESLint                                                                      |
| `npm run typecheck` | TypeScript                                                                  |
| `npm test`          | Unit tests: translations, content, routing helpers, form validation and API |
| `npm run build`     | Production build                                                            |
| `npm run test:e2e`  | Browser tests on desktop and phone, plus WCAG 2.2 AA checks in both themes  |

The browser tests run against the production build, so run `npm run build` first. To use an installed browser instead of downloading one, set `PLAYWRIGHT_CHANNEL=msedge` (or `chrome`).

Every push and pull request runs all of these on GitHub Actions.

## Deployment

The site deploys on Vercel. Set these environment variables in the Vercel project settings:

| Variable               | Purpose                                              |
| ---------------------- | ---------------------------------------------------- |
| `RESEND_API_KEY`       | Resend API key (server only)                         |
| `CONTACT_TO_EMAIL`     | Inbox that receives contact form messages            |
| `CONTACT_FROM_EMAIL`   | Sender address (a verified domain, or Resend's test) |
| `NEXT_PUBLIC_SITE_URL` | Public address, used for SEO and social previews     |

## Project layout

```
src/
  app/[lang]/        pages for each language, plus the contact API
  components/        sections, layout, 3D scene and UI parts
  content/           English content and the nl, de and ar translations
  i18n/              languages, dictionaries, dates and language detection
  lib/               site metadata, validation and server helpers
e2e/                 Playwright browser and accessibility tests
```
