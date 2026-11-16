import type { Project } from '@/types/content'

/** Featured projects follow the order pinned on GitHub. The first image is the cover. */
export const projects: Project[] = [
  {
    slug: 'xo',
    title: 'XO',
    tagline: 'Multilingual AI chat and voice assistant for UAE real estate and mortgages',
    category: 'Conversational AI · Production',
    period: 'Sep 2026 – Present',
    team: 'Built end to end at Xoto',
    featured: true,
    summary:
      'A production assistant that lets buyers search properties, check mortgage eligibility, estimate payments and fees, ask questions about the company and request an advisor callback, by text or voice, in 21 languages.',
    problem:
      'Property buyers in the UAE compare listings, work out what a bank will lend and add up fees, often in a second language. Agents and advisors answer the same questions by hand, and a wrong number costs trust.',
    built: [
      'LLM with function calling and a multi-step tool loop over 18 tools: property search, comparisons, mortgage calculators, knowledge retrieval and handoff.',
      'RAG over the company knowledge base with an "I don\'t know, let me connect you to an advisor" fallback instead of guessing.',
      'Live voice: speech-to-text streamed over WebSockets, spoken replies with the current word highlighted, and interruption handling.',
      'A deterministic mortgage engine that reads versioned rule, fee and rate tables, so the model never does the maths.',
      'Consent-gated advisor callbacks saved to PostgreSQL before being routed to the right team.',
      'An admin portal with four roles: analytics, conversation review, knowledge-base editing, and draft-publish-restore for rules and prompts.',
    ],
    results: [
      { value: '21', label: 'languages, including right-to-left' },
      { value: '223', label: 'backend tests passing' },
      { value: '15/15', label: 'approved mortgage cases matched to the dirham' },
    ],
    stack: [
      'Python',
      'FastAPI',
      'OpenAI',
      'ElevenLabs',
      'RAG',
      'WebSockets',
      'PostgreSQL',
      'Next.js',
      'React',
      'Playwright',
    ],
    links: {
      github: 'https://github.com/SirajMunir10/XO-uae-realestate-mortage-conversational-assistant',
      live: 'https://xoto-blitz.vercel.app',
    },
    images: [
      {
        src: '/images/projects/xo/home-desktop.jpg',
        alt: 'XO landing page with the chat widget open',
        width: 1366,
        height: 768,
      },
      {
        src: '/images/projects/xo/chat-properties-desktop.jpg',
        alt: 'XO showing live off-plan and ready property results in the chat',
        width: 1366,
        height: 768,
      },
      {
        src: '/images/projects/xo/mortgage-card-desktop.jpg',
        alt: 'XO mortgage eligibility card with the tightest lending limit explained',
        width: 1366,
        height: 768,
      },
      {
        src: '/images/projects/xo/voice-mode-desktop.jpg',
        alt: 'XO in voice mode while it speaks a reply',
        width: 1366,
        height: 768,
      },
      {
        src: '/images/projects/xo/arabic-rtl-mobile.jpg',
        alt: 'XO on a phone in Arabic with a right-to-left layout',
        width: 540,
        height: 1170,
      },
      {
        src: '/images/projects/xo/advisor-callback-mobile.jpg',
        alt: 'XO advisor callback card asking the visitor to confirm their details',
        width: 540,
        height: 1170,
      },
      {
        src: '/images/projects/xo/admin-signin-desktop.jpg',
        alt: 'XO admin back-office sign-in page',
        width: 1366,
        height: 768,
      },
    ],
  },
  {
    slug: 'avaguard',
    title: 'AVAGuard',
    tagline: 'AI-assisted cloud security compliance for Microsoft Azure',
    category: 'AI · Cloud security · Final-year project',
    period: 'Sep 2025 – Jul 2026',
    team: 'Team final-year project, built for Agency VA',
    featured: true,
    summary:
      'Connects to a Microsoft Entra ID tenant without installing agents, runs CIS benchmark checks, scores the risk and explains every failed control with tailored, AI-generated remediation guidance.',
    problem:
      'Manual Azure AD compliance audits were slow and inconsistent. Security teams had to check each control by hand and then interpret long benchmark documents to work out what to fix.',
    built: [
      'An agentless assessment pipeline that signs in to Microsoft Entra ID through MSAL and runs 10 CIS benchmark checks concurrently.',
      'Severity-weighted risk scoring (critical 10×, high 7×, medium 4×, low 1×) and mapping of results to NIST 800-53 and ISO 27001.',
      'A RAG engine trained on CIS documentation that maps each failed control to context-aware remediation steps.',
      'Audit-ready reports in HTML, PDF, CSV and JSON, scan comparison, and role-based dashboards.',
      'Three ways to use it: a command-line scanner, a PyQt6 desktop app and a Django web portal with MFA and hash-chained audit logs.',
    ],
    results: [
      { value: '10', label: 'CIS benchmark checks run concurrently' },
      { value: '3', label: 'frameworks mapped: CIS, NIST 800-53, ISO 27001' },
      { value: '4', label: 'report formats for auditors and teams' },
    ],
    stack: ['Python', 'RAG', 'Microsoft Entra ID', 'MSAL', 'Django', 'PyQt6', 'Click', 'Supabase'],
    links: {
      github: 'https://github.com/SirajMunir10/AVAGuard-final-year-project',
      live: 'https://ava-guard-industry-project-nu.vercel.app',
    },
    images: [
      {
        src: '/images/projects/avaguard/landing-desktop.jpg',
        alt: 'AVAGuard landing page with a compliance score preview',
        width: 1440,
        height: 900,
      },
      {
        src: '/images/projects/avaguard/how-it-works-desktop.jpg',
        alt: 'AVAGuard five-step pipeline: connect, analyse, score, map and report',
        width: 1440,
        height: 900,
      },
      {
        src: '/images/projects/avaguard/capabilities-desktop.jpg',
        alt: 'AVAGuard list of automated CIS benchmark checks',
        width: 1440,
        height: 900,
      },
      {
        src: '/images/projects/avaguard/login-desktop.jpg',
        alt: 'AVAGuard enterprise security portal sign-in',
        width: 1440,
        height: 900,
      },
      {
        src: '/images/projects/avaguard/landing-mobile.jpg',
        alt: 'AVAGuard landing page on a phone',
        width: 780,
        height: 1688,
      },
    ],
  },
  {
    slug: 'icu-alarm-fatigue',
    title: 'Reducing ICU Alarm Fatigue',
    tagline: 'A tiered Lambda architecture for real-time and historical vital-sign data',
    category: 'Research · Machine learning · Healthcare',
    period: 'Dec 2025 – Jul 2026',
    team: 'Research paper with 2 co-authors',
    featured: true,
    summary:
      'ICU monitors raise false alarms 80 to 99% of the time, so clinicians start to tune them out. This research validates data before machine-learning inference and adds patient context, cutting false alarms without missing real events.',
    problem:
      'Real-time vital-sign streams are processed separately from historical records and clinical context, so alerts are generated from incomplete and often corrupted sensor data.',
    built: [
      'A Speed Layer that discards sensor artefacts and impossible readings in under a millisecond.',
      'A Hybrid Layer that runs contextual anomaly detection with an Isolation Forest model under strict latency limits.',
      'A Serving Layer that combines real-time alerts with historical health records into one queryable patient view.',
      'An evaluation on 5,000 heart-rate records from the MIMIC-III clinical database against a rule-based threshold baseline.',
    ],
    results: [
      { value: '37.7%', label: 'fewer false alarms (310 → 193)' },
      { value: '1.0', label: 'recall: no real anomaly missed' },
      { value: '0.54 ms', label: 'average processing time per record' },
    ],
    stack: ['Python', 'Isolation Forest', 'Lambda architecture', 'MIMIC-III', 'Stream processing'],
    links: {
      github: 'https://github.com/SirajMunir10/Reducing-ICU-Alarm-Fatigue',
      paper: '/documents/reducing-icu-alarm-fatigue.pdf',
    },
    images: [],
  },
  {
    slug: 'al-safwa',
    title: 'Al Safwa Fabrics',
    tagline: 'Mobile-first B2B catalogue and inquiry website for a fabric supplier',
    category: 'Web · SEO · Client project',
    period: 'Nov 2026',
    team: 'Solo: design, development and testing',
    featured: true,
    summary:
      'A 24/7 salesperson for a fabric supplier in Pakistan: every fabric has its own page with exact specs, buyers filter the catalogue in seconds on a phone, and ordering happens on WhatsApp with a pre-filled message.',
    problem:
      'Fabric buyers shop from their phones and order on WhatsApp, and every buyer asks the same questions about GSM, width, colours and minimum order, which the supplier answered one chat at a time.',
    built: [
      'Six combinable catalogue filters that work even without JavaScript, with shareable URLs.',
      'Fabric pages with every spec as crawlable text, a swipeable gallery and quote or sample requests.',
      'A 9-page branded PDF catalogue generated from the same data, with a QR code for every fabric.',
      'SEO for search engines and AI assistants: per-page metadata, sitemap, structured data and an llms.txt summary.',
    ],
    results: [
      { value: '271', label: 'automated tests passing' },
      { value: '100', label: 'Lighthouse SEO score' },
      { value: '100', label: 'Lighthouse accessibility score' },
    ],
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'React PDF', 'Vitest', 'Playwright'],
    links: { github: 'https://github.com/SirajMunir10/Safwa_Website' },
    images: [
      {
        src: '/images/projects/al-safwa/home-desktop.jpg',
        alt: 'Al Safwa Fabrics home page',
        width: 1440,
        height: 900,
      },
      {
        src: '/images/projects/al-safwa/catalogue-desktop.jpg',
        alt: 'Al Safwa catalogue with combinable fabric filters',
        width: 1440,
        height: 900,
      },
      {
        src: '/images/projects/al-safwa/fabric-desktop.jpg',
        alt: 'Al Safwa fabric page with gallery, key specs and quote actions',
        width: 1440,
        height: 900,
      },
      {
        src: '/images/projects/al-safwa/mobile-screens.jpg',
        alt: 'Al Safwa pages on phones',
        width: 1600,
        height: 1110,
      },
      {
        src: '/images/projects/al-safwa/pdf-catalogue.jpg',
        alt: 'Pages of the generated PDF catalogue with QR codes',
        width: 1600,
        height: 582,
      },
    ],
  },
  {
    slug: 'edenbridge',
    title: 'Edenbridge Grammar School',
    tagline: 'Responsive, SEO-optimised website for a school in Pakistan',
    category: 'Web · WordPress',
    period: 'Feb 2026',
    team: 'Built with the school CEO, curriculum designer and a development team',
    featured: false,
    summary:
      'A school website that improved online visibility and made information easy for parents to find, delivered with Agile requirement gathering and feedback cycles.',
    problem:
      'The school needed a stronger online presence so parents could find admissions and curriculum information quickly.',
    built: [
      'A responsive WordPress site with Elementor-based layout customisation.',
      'Search optimisation to improve visibility.',
      'Deployment and hosting on Hostinger.',
    ],
    results: [],
    stack: ['WordPress', 'Elementor', 'SEO', 'Hostinger'],
    links: { live: 'https://edenbridgegrammar.com' },
    images: [],
  },
  {
    slug: 'hotel-reservation',
    title: 'Hotel Reservation System',
    tagline: 'Full-stack booking system with authentication',
    category: 'Web · Full stack · University project',
    period: 'Nov 2024 – Jan 2025',
    team: 'Fifth-semester academic project',
    featured: false,
    summary:
      'A responsive hotel reservation system with booking workflows, user authentication and database operations.',
    problem: 'Guests needed a simple way to browse rooms and book online on any device.',
    built: [
      'React front end, responsive on every device.',
      'PHP back end with authentication and structured database operations.',
    ],
    results: [],
    stack: ['React', 'PHP', 'Authentication', 'Responsive design'],
    links: { github: 'https://github.com/SirajMunir10/SMaap', live: 'https://s-maap.vercel.app' },
    images: [],
  },
]

export const featuredProjects = projects.filter((p) => p.featured)
export const otherProjects = projects.filter((p) => !p.featured)
