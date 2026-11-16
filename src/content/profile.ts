import type { Highlight, Profile, SpokenLanguage } from '@/types/content'

export const profile: Profile = {
  name: 'Siraj Munir',
  fullName: 'Muhammad Siraj Munir',
  role: 'AI Engineer',
  headline: 'I build LLM, RAG and voice AI products that people actually use.',
  headlineHighlight: 'LLM, RAG and voice AI',
  intro:
    'AI Engineer in Dubai. I take AI products from idea to production: the language model and voice pipeline, the retrieval behind it, the backend it runs on, and the tests and admin tools that keep it reliable once real users arrive.',
  about: [
    'At Xoto I built XO, a chat and voice assistant for UAE real estate and mortgages. It answers in 21 languages, searches live property listings, works out mortgage eligibility with a rule-based engine so the model never does the maths, and hands serious buyers to an advisor. I also built the admin portal the team uses to review conversations, update the knowledge base and change lending rules without waiting on a developer.',
    'I graduated in Software Engineering from Foundation University Islamabad with a 3.68 CGPA and two merit scholarships. My final-year research on ICU alarm fatigue cut false alarms by 37.7% without missing a single real event, and my final-year project, AVAGuard, automates cloud security audits against CIS benchmarks with AI-generated remediation guidance.',
    'I care about AI that is honest about what it knows, numbers that come from code rather than guesses, and products that are tested before anyone relies on them.',
  ],
  location: 'Dubai, UAE',
  timezone: 'Asia/Dubai',
  email: 'sirajmunirfurc@gmail.com',
  availability: 'Open to AI Engineer roles',
  socials: {
    github: 'https://github.com/SirajMunir10',
    linkedin: 'https://www.linkedin.com/in/siraj-munir-10furc',
  },
  resume: null,
  photo: { src: '/images/profile/siraj-munir.jpg', alt: 'Portrait of Siraj Munir' },
  focusAreas: [
    {
      title: 'LLM applications',
      description:
        'Function calling, multi-step tool loops, streaming replies, prompt design and guardrails.',
    },
    {
      title: 'Retrieval (RAG)',
      description: 'Embeddings, vector search and grounded answers with an honest "I don\'t know".',
    },
    {
      title: 'Voice AI',
      description: 'Live speech-to-text over WebSockets and text-to-speech with word-level timing.',
    },
    {
      title: 'Machine learning',
      description: 'Anomaly detection, model evaluation and benchmarking against real-world targets.',
    },
  ],
}

export const highlights: Highlight[] = [
  { value: 21, label: 'languages', detail: 'spoken and written by XO, my production assistant' },
  { value: 223, label: 'automated tests', detail: 'guarding the XO backend' },
  {
    value: 37.7,
    decimals: 1,
    suffix: '%',
    label: 'fewer false alarms',
    detail: 'in my ICU monitoring research',
  },
  { value: 3.68, decimals: 2, label: 'CGPA', detail: 'BS Software Engineering, two merit scholarships' },
]

export const spokenLanguages: SpokenLanguage[] = [
  { name: 'English', level: 'Full professional' },
  { name: 'Urdu', level: 'Native' },
  { name: 'Hindi', level: 'Full professional' },
  { name: 'Arabic', level: 'Professional working' },
]
