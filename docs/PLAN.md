# Portfolio website plan: Siraj Munir

Status: **approved, in progress**.
Last updated: 16 Nov 2026

## Decisions (16 Nov 2026)

- **ICU results:** use the paper's figures: false alarms cut by 37.7% (310 → 193), false-positive rate from 92.6% to 46.1%, precision from 0.074 to 0.539, recall 1.0, 0.54 ms per record, 25.9% corrupted records filtered.
- **XO languages:** 21, as supported by the code.
- **Certifications:** from LinkedIn and the certificate PDFs: IBM Machine Learning with Python, Oracle OCI 2025 AI Foundations Associate, Yale Connected Leadership, University of Michigan Speaking and Presenting: Poise. The IELTS certificate, transcripts and passport documents are private and not published unless approved.
- **Project images:** AVAGuard is captured from its live Vercel demo, and Al Safwa uses the screenshots in its GitHub repo. Edenbridge images come later; until then it appears as a compact card.
- **Project location:** `Documents/M Siraj Munir Documents/portfolio`.

---

## 1. Goal and audience

**Goal:** a single, fast, animated portfolio site that gets Siraj interviews for **AI Engineer** roles, with a working contact form.

**Audience:**
- **Recruiters and HR (UAE and remote):** they scan for about 30 seconds and look for title, experience, skills, CV and contact.
- **Hiring managers and engineers:** they open projects to judge the depth of the work: architecture, results and code.

**Principle:** everything is readable on the page itself. Project details, certificates, the research paper and the CV open in in-page viewers (modals), so a visitor never has to leave the site to see the proof. External links (GitHub, live demos, credential checks) stay available as secondary actions.

---

## 2. What we learned from the reference site (faizanaziz.dev)

The site was studied with Playwright at desktop (1440 px) and mobile (390 px) widths.

| Area | Reference site | Our decision |
|---|---|---|
| Hosting | Vercel, custom domain | Vercel at `*.vercel.app` for now; a domain can be added later |
| Tech | Plain HTML, CSS and JS, plus ScrollReveal loaded from unpkg | Next.js (App Router), TypeScript, typed content files |
| Layout | One page: Hero → About → Experience (tabs) → Featured work → Other projects → Contact; separate `/archive` page | Same easy flow, plus Highlights, Skills, Certifications, Education & Awards and Research; no separate archive page, everything on one page |
| Colours | Navy `#0D0F18` with gold `#D6B25E` | **Not reused.** New neutral palette with one accent (section 5) |
| Fonts | Space Grotesk and JetBrains Mono | **Not reused.** Geist Sans and Geist Mono |
| Animation | Fade/slide reveal on scroll, hover transitions, no keyframes | Richer but purposeful motion (section 6); respects "reduce motion" |
| 3D | None | One interactive 3D scene in the hero, lazy-loaded (section 7) |
| Nav | Numbered anchor links, Resume button, vertical email on the right, social icons on the left | Sticky header with active-section highlight, a scroll progress bar, Resume opens an in-page CV viewer |

**Gaps in the reference that we will fix:**
- **SEO:** it has only a description tag. There's no Open Graph image, no structured data (JSON-LD), no sitemap or robots file, and the `<h1>` is "Hi, my name is" instead of the name.
- **Accessibility:** it ignores the "reduce motion" setting, and some text has low contrast.
- **Performance:** about 3 MB is transferred, with large PNGs, and an external script blocks rendering.
- **Content:** the "What's Next?" section is empty. There are no certifications, education, awards or contact form, and the archive is on another page.

---

## 3. Content inventory

Sources: latest CV (`Muhammad_Siraj_Munir_CV-3.pdf`, 18 Oct 2026), GitHub profile and pinned repos, the XO project, the ICU paper, and LinkedIn (pending, see section 12).

**Profile**
- Muhammad Siraj Munir, AI Engineer, Dubai, UAE
- Email: sirajmunirfurc@gmail.com · LinkedIn: /in/siraj-munir-10furc · GitHub: SirajMunir10
- Phone: shown only if approved (section 12)

**Experience**
1. **AI Engineering Intern, Xoto**, Dubai (Sep 2026 to present): built XO, a multilingual chat and voice assistant (RAG, embeddings, vector search, CRM gateways, a deterministic mortgage engine, an admin portal); benchmarked TTS, STT and LLM models for latency.
2. **Project Manager Intern, Excelerate**, remote (Apr to May 2025): led a 9-person international team evaluating AI tools.
3. **Web Developer Intern, Tech Net Group**, Rawalpindi (Jul to Aug 2024): React.js apps, API integration, UI performance.

**Featured projects** (matching the pinned repos)
1. **XO: UAE real estate and mortgage conversational assistant**, repo `XO-uae-realestate-mortage-conversational-assistant`. 21 languages, voice, RAG, 223 backend tests.
2. **AVAGuard: AI cloud security compliance tool** (final-year project for Agency VA, team project), repo `AVAGuard-final-year-project`, with a live demo.
3. **Reducing ICU Alarm Fatigue** (research paper), repo `Reducing-ICU-Alarm-Fatigue`. Includes the paper PDF and an in-page abstract.
4. **Al Safwa Fabrics** (B2B catalogue website), repo `Safwa_Website`.

**Other projects:** Edenbridge Grammar website (live), Hotel Reservation System (`SMaap`, live).

**Certifications** (from the CV; LinkedIn may add more)
- Machine Learning with Python, IBM (Aug 2026)
- Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate, Oracle (Oct 2025)
- Connected Leadership, Yale University (Jul 2026)

**Education and awards**
- BS Software Engineering, Foundation University Islamabad (FUSST, Rawalpindi), 2022 to 2026, CGPA 3.68/4.00
- Merit scholarships: 2nd position (3rd semester, GPA 3.9) and 3rd position (5th semester, GPA 3.9) in a batch of 150
- CodeWar Season 2, inter-university coding competition (HITEC University)
- Class Representative and Student Coordinator

---

## 4. Page structure (one page)

| # | Section | Contents | Interaction |
|---|---|---|---|
| 0 | Header | Logo mark, links (About, Experience, Projects, Skills, Certifications, Contact), Resume button, theme toggle | Sticky with blur, highlights the active section, top scroll-progress bar, full-screen mobile menu |
| 1 | Hero | `<h1>` Siraj Munir; "AI Engineer building LLM, RAG and voice AI products"; two buttons (See my work, Contact me); location and availability chip | Interactive 3D "embedding space" (section 7), staggered text entrance |
| 2 | Highlights | 4–5 numbers that prove impact, e.g. 21 languages in XO, 223 automated tests, 37.7% fewer ICU false alarms, 3.68 CGPA | Numbers count up when they come into view |
| 3 | About | Short story, photo, "What I work on" focus areas | Photo with a subtle parallax |
| 4 | Experience | Xoto, Excelerate, Tech Net Group | Tabs on desktop, accordion on mobile, animated indicator |
| 5 | Featured projects | 4 cards: problem → what I built → results → tech, plus screenshots | "Read case study" opens an in-page modal with gallery, architecture and links |
| 6 | Other projects | Compact cards (Edenbridge, Hotel Reservation) | Hover lift |
| 7 | Skills | Grouped: AI & ML, AI systems, Backend & data, Frontend, Research & evaluation, Tools | Filter chips; skills used in projects link to those projects |
| 8 | Certifications | Cards with issuer, date and skills | Click opens the certificate image in an in-page viewer; "Verify" link secondary |
| 9 | Research | ICU paper: title, co-authors, abstract, key results | "Read paper" opens the PDF in an in-page viewer |
| 10 | Education & awards | Timeline: degree, scholarships, competitions, leadership | Timeline line draws while scrolling |
| 11 | Contact | Form (name, email, subject, message), plus email, LinkedIn, GitHub and location | Validation, loading state, success and error toast |
| 12 | Footer | Short credits, back-to-top button, last updated | — |

**Smart scroll pop-ups** (subtle and non-blocking):
- After the visitor finishes the Projects section, a small corner card offers "Want the full CV?" with View and Download.
- Near the end of the page, a light nudge offers "Open to AI Engineer roles, let's talk".
- **Rules:** at most 2 per visit, each dismissible, never covering content, never shown twice (remembered on the device), and never on very short visits.

---

## 5. Design system

**Look:** minimal, modern, high contrast. One accent colour, lots of space, clear hierarchy. Light theme by default plus a dark theme (following the device setting, with a toggle).

**Colours** (final values checked against WCAG AA contrast before build)

| Token | Light | Dark | Use |
|---|---|---|---|
| `--bg` | `#FAFAF9` | `#0A0A0B` | Page background (neutral, not navy) |
| `--surface` | `#FFFFFF` | `#141417` | Cards, header |
| `--text` | `#111113` | `#F4F4F5` | Headings and body |
| `--muted` | `#52525B` | `#A1A1AA` | Secondary text |
| `--border` | `#E4E4E7` | `#27272A` | Lines and dividers |
| `--accent` | `#4F46E5` (indigo) | `#818CF8` | Buttons, links, highlights |
| `--accent-2` | `#0D9488` (teal) | `#2DD4BF` | Small touches only: 3D points, success states |

**Type:** Geist Sans for headings and body, Geist Mono for small labels and code-like tags. Fluid sizes from mobile to desktop.

**Components:** Button, IconButton, Badge/Tag, Card, Section header, Tabs, Accordion, Modal (case study, certificate, PDF), Toast, Tooltip, Timeline item, Stat counter.

---

## 6. Animation plan

Library: **Motion** (Framer Motion) for UI motion; CSS for simple hovers.

| Where | Animation |
|---|---|
| Page load | Hero text rises in word by word; buttons fade in after it |
| Scrolling | Sections and cards reveal with a short fade and lift, staggered; the timeline line draws as you scroll |
| Numbers | Highlights count up once when visible |
| Hover | Cards lift and tilt slightly toward the cursor; buttons have a magnetic pull; links get an animated underline |
| Navigation | The active link indicator slides between items; smooth scrolling to sections |
| Modals | Scale-and-fade open, background blur, closes with Esc or a click outside |
| Pop-ups | Slide in from a corner, auto-hide after a few seconds |

**Rules:** animations stay under 600 ms, only `transform` and `opacity` are animated (no layout shift), and with "reduce motion" switched on, content appears instantly without movement.

---

## 7. 3D: interactive, light and SEO-safe

**Hero scene: "Embedding space"**. A field of glowing points arranged in clusters, like documents in a vector database (the core of RAG, which Siraj builds).
- Moving the cursor acts like a search query: nearby points light up and connect with thin lines to their nearest neighbours.
- Clusters drift slowly; on scroll, the camera eases back.
- It ties the visual to Siraj's actual expertise, instead of a generic spinning shape.

**Performance and SEO safeguards:**
- Built with React Three Fiber and drei, loaded **only after the page is visible** (dynamic import, no server rendering).
- All text stays plain HTML rendered on the server, so search engines read everything. The canvas is decorative and hidden from screen readers.
- Pixel ratio is capped, points are a single GPU-instanced draw call, and rendering pauses when the hero is off-screen or the tab is hidden.
- Phones, low-power devices and "reduce motion" users get a static gradient image instead.
- Budget: the 3D code loads separately and must not delay the first view (Largest Contentful Paint target under 2.5 s).

No other 3D is planned, to protect speed. A second, smaller scene could be added only if the performance budget allows.

---

## 8. Technology

| Area | Choice | Why |
|---|---|---|
| Framework | Next.js (App Router), React, TypeScript | Server-rendered HTML for SEO, file-based routing, built for Vercel |
| Styling | Tailwind CSS with CSS variables for themes | Fast, consistent design tokens, small CSS |
| Motion | Motion (Framer Motion) | Scroll reveals, layout animations, reduced-motion support |
| 3D | three, @react-three/fiber, @react-three/drei | Modern React 3D, lazy-loadable |
| Forms | React Hook Form + Zod | Same validation in the browser and on the server |
| Email | Next.js API route + Resend (recommended) or Web3Forms | See section 9 |
| Quality | ESLint, Prettier, Vitest + Testing Library, Playwright, Lighthouse | Tests and checks before each merge |
| Analytics | Vercel Analytics and Speed Insights (free) | Visits and real-world speed, no cookies banner needed |

---

## 9. Contact form

**Flow:** visitor fills in the form → the browser checks the fields → the server route `/api/contact` checks them again → the email is delivered to sirajmunirfurc@gmail.com → the visitor sees a success message.

**Protection:**
- a hidden honeypot field against bots;
- a rate limit per visitor;
- a length limit on every field;
- no secrets in the browser (the email key lives only in Vercel's environment settings).

**Delivery options:**
- **Resend (recommended):** free tier, professional, and you can reply directly to the sender. Needs a free Resend account and one API key added to Vercel.
- **Web3Forms:** even simpler, free, with no server key, but less control.

---

## 10. Folder structure

```
portfolio/
├── docs/                      Plan, design notes, content sources
├── public/
│   ├── images/                Profile photo, project screenshots (WebP/AVIF)
│   ├── certificates/          Certificate images for the in-page viewer
│   ├── documents/             CV and research paper PDFs
│   └── og/                    Social sharing image
├── src/
│   ├── app/
│   │   ├── layout.tsx         Fonts, metadata, theme, analytics
│   │   ├── page.tsx           The one-page portfolio (assembles sections)
│   │   ├── globals.css        Design tokens and base styles
│   │   ├── api/contact/route.ts   Contact form endpoint
│   │   ├── sitemap.ts · robots.ts · opengraph-image.tsx · not-found.tsx
│   ├── components/
│   │   ├── layout/            Header, MobileMenu, Footer, ScrollProgress
│   │   ├── sections/          Hero, Highlights, About, Experience, Projects, Skills,
│   │   │                      Certifications, Research, Education, Contact
│   │   ├── ui/                Button, Card, Badge, Tabs, Accordion, Modal, Toast, Tooltip
│   │   ├── motion/            Reveal, Stagger, CountUp, Magnetic, Tilt
│   │   └── three/             EmbeddingSpace scene and its static fallback
│   ├── content/               Typed data: profile, experience, projects, skills,
│   │                          certifications, education (one place to edit text)
│   ├── hooks/                 useActiveSection, useReducedMotion, useScrollPopups
│   ├── lib/                   SEO helpers, contact validation (Zod), rate limit, utils
│   └── types/                 Shared TypeScript types
├── tests/
│   ├── unit/                  Components and validation (Vitest)
│   └── e2e/                   Full page flows on desktop and mobile (Playwright)
├── .github/workflows/ci.yml   Lint, type-check, tests and build on every push
└── config files               next.config, tsconfig, eslint, prettier, package.json
```

All visible text lives in `src/content/`, so later updates (a new job or certificate) need no component changes.

---

## 11. Quality targets

These are targets, verified with real measurements before launch; no numbers are claimed in advance.
- **Lighthouse:** 95 or higher for Performance, Accessibility, Best Practices and SEO, on mobile and desktop.
- **Core Web Vitals:** LCP under 2.5 s, CLS under 0.1, INP under 200 ms.
- **Accessibility:** keyboard navigation throughout, visible focus, AA contrast, alt text, a skip link, "reduce motion" support.
- **SEO:** proper title and description, Open Graph and Twitter cards, a `Person` JSON-LD schema with links, sitemap, robots, one `<h1>`, semantic sections.
- **Responsive:** checked at 360, 390, 768, 1024, 1366 and 1440 px.

---

## 12. Inputs needed from Siraj

| # | Item | Why |
|---|---|---|
| 1 | **LinkedIn certifications:** names, issuer, date, credential link | LinkedIn blocks automated access. The easiest way is to copy the "Licenses & certifications" section, or send a LinkedIn "Save to PDF" export |
| 2 | **Certificate files** (PNG/JPG/PDF) | Needed to show certificates inside the site; Coursera and Oracle pages cannot be embedded |
| 3 | **Profile photo** (the LinkedIn one, high resolution) | About section and social image |
| 4 | **CV to offer for download:** which file | The newest seems to be `Muhammad_Siraj_Munir_CV-3.pdf` |
| 5 | **Show phone number?** Yes or no | Privacy choice |
| 6 | **ICU result to quote:** the paper says 37.7% fewer false alarms (310 → 193) and a false-positive rate falling from 92.6% to 46.1%; the CV says "69%" | Numbers must match the paper |
| 7 | **XO languages:** the code supports 21, the CV says 16 | Pick one so everything matches |
| 8 | **Contact form delivery:** Resend or Web3Forms | Section 9 |
| 9 | **Screenshots or images** for AVAGuard, Al Safwa and Edenbridge, or approval to capture them from the live sites | Project cards |
| 10 | **Optional Higgsfield media** (section 13) | Hero or project visuals |

---

## 13. Higgsfield (optional media)

Higgsfield is an AI image and video generator. It isn't plugged into the website. It's used **to create media files** that the site then shows.

**Good uses:**
- a short, silent, looping background clip for a project card (for example, a cinematic shot of a Dubai skyline for XO);
- stylised cover images for projects that have no screenshots;
- a polished portrait from your photo, as long as it still looks like you.

**How to give them to me:**
1. Generate the media on Higgsfield and download it (MP4 for video, PNG for images).
2. Put the files in `portfolio/public/media/raw/` and tell me what each one is for.
3. I'll compress them (WebM/MP4 under about 2 MB, a poster image, lazy loading) so they don't slow the site or hurt SEO.

No Higgsfield account details or API keys are ever placed in the website.

---

## 14. Git workflow

- `main` always holds a working, deployable site. Vercel deploys from it.
- Every piece of work goes on its own branch, then is merged into `main` with a merge commit, so the history shows each feature clearly.
- **Commit messages** follow Conventional Commits, for example `feat(hero): add interactive embedding-space scene`, `fix(contact): handle rate-limit response`, `chore(deps): ...`.
- Commits are authored only by SirajMunir10 \<sirajmunirfurc@gmail.com\>.
- Nothing is pushed without approval.

**Planned branches, in order:**

| # | Branch | Delivers |
|---|---|---|
| 1 | `chore/project-setup` | Next.js, TypeScript, Tailwind, ESLint/Prettier, folder structure, this plan |
| 2 | `feat/design-system` | Colours, fonts, themes, UI components |
| 3 | `feat/layout-navigation` | Header, mobile menu, scroll progress, footer |
| 4 | `feat/content-model` | Typed content files filled from the CV and GitHub |
| 5 | `feat/hero-3d` | Hero section and the embedding-space scene with fallback |
| 6 | `feat/about-experience` | Highlights, About, Experience |
| 7 | `feat/projects` | Featured projects, case-study modals, other projects |
| 8 | `feat/skills-certifications` | Skills filter, certifications and viewer |
| 9 | `feat/research-education` | Research paper viewer, education and awards timeline |
| 10 | `feat/contact-form` | Form, API route, email delivery, toasts |
| 11 | `feat/scroll-popups` | Smart CV and contact nudges |
| 12 | `feat/seo-analytics` | Metadata, OG image, JSON-LD, sitemap, analytics |
| 13 | `test/quality` | Unit and end-to-end tests, Lighthouse and accessibility fixes |
| 14 | `docs/readme` | Project README with screenshots |

---

## 15. Delivery phases and approvals

| Phase | Work | You approve |
|---|---|---|
| 0 | This plan | The plan, the palette and the inputs in section 12 |
| 1 | Branches 1–4: setup, design system, layout, content | A local preview of the design and navigation |
| 2 | Branches 5–9: all sections, 3D and animations | A local preview of the full page |
| 3 | Branches 10–12: contact form, pop-ups, SEO | A form test email arriving in your inbox |
| 4 | Branch 13: testing and tuning | Lighthouse results and screenshots |
| 5 | Push to GitHub, connect Vercel, go live | The live link |
