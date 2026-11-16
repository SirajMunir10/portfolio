import type { SkillGroup } from '@/types/content'

export const skillGroups: SkillGroup[] = [
  {
    id: 'ai-systems',
    title: 'AI systems',
    skills: [
      'LLMs',
      'Function calling',
      'RAG',
      'Embeddings',
      'Vector search',
      'Conversational AI',
      'Voice AI (STT, TTS)',
      'Prompt design',
      'Guardrails',
    ],
  },
  {
    id: 'ml',
    title: 'Machine learning',
    skills: [
      'Machine learning',
      'Deep learning',
      'Generative AI',
      'NLP',
      'Anomaly detection',
      'Predictive modelling',
      'Model evaluation',
      'Benchmarking',
    ],
  },
  {
    id: 'languages',
    title: 'Languages and libraries',
    skills: ['Python', 'SQL', 'TypeScript', 'JavaScript', 'NumPy', 'Pandas', 'scikit-learn', 'TensorFlow'],
  },
  {
    id: 'backend',
    title: 'Backend and data',
    skills: [
      'FastAPI',
      'Django',
      'REST APIs',
      'Server-Sent Events',
      'WebSockets',
      'PostgreSQL',
      'Supabase',
      'PHP',
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend',
    skills: ['React', 'Next.js', 'Tailwind CSS', 'WordPress', 'Responsive design', 'Accessibility'],
  },
  {
    id: 'delivery',
    title: 'Testing and delivery',
    skills: [
      'unittest',
      'Pytest',
      'Playwright',
      'Vitest',
      'Docker',
      'Vercel',
      'Render',
      'Git and GitHub',
      'Agile',
    ],
  },
  {
    id: 'research',
    title: 'Research',
    skills: [
      'Algorithm evaluation',
      'Statistical analysis',
      'Experimental validation',
      'System architecture',
      'Performance optimisation',
    ],
  },
]
