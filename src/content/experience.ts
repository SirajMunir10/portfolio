import type { Experience } from '@/types/content'

export const experience: Experience[] = [
  {
    company: 'Xoto',
    companyUrl: 'https://www.xoto.ae',
    role: 'AI Engineering Intern',
    employment: 'Internship',
    location: 'Dubai, UAE',
    start: 'Sep 2026',
    end: null,
    summary:
      "Built XO, the company's multilingual chat and voice assistant for real estate buyers, agents, brokers and mortgage advisors.",
    highlights: [
      'Built XO end to end: a chat and voice assistant that answers in 21 languages, including right-to-left Arabic, Urdu and Persian.',
      'Benchmarked speech-to-text, text-to-speech and language models against latency targets for real-time voice conversations.',
      'Designed the LLM tool loop and a RAG pipeline over the company knowledge base, with an honest "I don\'t know" fallback.',
      'Kept every number out of the model: a deterministic mortgage engine reads versioned rule tables, and leads route to CRM gateways only after consent.',
      'Built the admin portal: role-based access, analytics, conversation review, knowledge-base editing and versioned business rules.',
      'Wrote 223 backend tests and Playwright end-to-end tests across desktop, Android and iPhone.',
    ],
    stack: ['Python', 'FastAPI', 'OpenAI', 'ElevenLabs', 'PostgreSQL', 'Next.js', 'React', 'Playwright'],
  },
  {
    company: 'Excelerate',
    companyUrl: 'https://4excelerate.org',
    role: 'Project Manager Intern',
    employment: 'Internship · Remote',
    location: 'Dubai, UAE',
    start: 'Apr 2025',
    end: 'May 2025',
    summary: 'Led an international team evaluating AI tools for real business workflows.',
    highlights: [
      'Led a 9-member international team evaluating AI tools for task automation, resource management and risk mitigation.',
      'Presented the findings in a quantitative analysis report that covered ethical and sustainability considerations.',
    ],
    stack: ['Project management', 'AI tool evaluation', 'Quantitative analysis'],
  },
  {
    company: 'Tech Net Group',
    companyUrl: 'https://www.technetgrp.com',
    role: 'Web Developer Intern',
    employment: 'Internship',
    location: 'Rawalpindi, Pakistan',
    start: 'Jul 2024',
    end: 'Aug 2024',
    summary: 'Front-end development on client web applications.',
    highlights: [
      'Built responsive React.js applications for client projects.',
      'Optimised UI performance and integrated APIs and data handling.',
    ],
    stack: ['React', 'JavaScript', 'REST APIs'],
  },
]
