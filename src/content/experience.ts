import type { Experience } from '@/types/content'

/** Most recent first. Sources: the latest CV and the earlier CV for dates and details. */
export const experience: Experience[] = [
  {
    company: 'Xoto',
    companyUrl: 'https://www.xoto.ae',
    role: 'AI Engineer / LLM Engineer',
    location: 'Dubai, UAE',
    start: 'Sep 2026',
    end: null,
    summary:
      "Engineered XO, the company's LLM-powered conversational assistant for real estate buyers, agents, brokers and mortgage advisors.",
    highlights: [
      'Built XO end to end with RAG, embeddings, vector search and LLM orchestration over a multi-step tool loop.',
      'Developed multilingual voice and text workflows in 21 languages, with multi-intent handling and context-aware conversations.',
      'Benchmarked and optimised LLM, speech-to-text and text-to-speech models for latency and response quality.',
      'Kept every number out of the model: a deterministic mortgage engine reads versioned rule tables, and leads route to CRM gateways only after consent.',
      'Built the admin portal: role-based access, analytics, conversation review, knowledge-base editing and versioned business rules.',
      'Wrote 223 backend tests and Playwright end-to-end tests across desktop, Android and iPhone.',
    ],
    stack: ['Python', 'FastAPI', 'OpenAI', 'ElevenLabs', 'RAG', 'PostgreSQL', 'Next.js', 'Playwright'],
  },
  {
    company: 'Crater Code',
    role: 'Software Developer',
    start: 'Sep 2024',
    end: 'Jun 2025',
    summary:
      'Worked on a real-time disaster monitoring system that combines AI chatbots with geolocation data.',
    highlights: [
      'Contributed to a real-time disaster monitoring system integrating AI chatbots and geolocation data.',
      'Supported backend development and system integration for low-latency performance.',
      'Worked on AI-powered features that made real-time monitoring information easier to access.',
    ],
    stack: ['AI chatbots', 'Geolocation data', 'Backend integration'],
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
    role: 'Web Developer',
    employment: 'Internship',
    location: 'Rawalpindi, Pakistan',
    start: 'Jul 2024',
    end: 'Aug 2024',
    summary: 'Front-end development of a real-time web dashboard.',
    highlights: [
      'Developed a real-time weather dashboard using the OpenWeather API.',
      'Implemented interactive front-end features with React.js and Redux.',
      'Optimised functionality and performance, earning an A+ project grade.',
    ],
    stack: ['React', 'Redux', 'JavaScript', 'OpenWeather API'],
  },
]
