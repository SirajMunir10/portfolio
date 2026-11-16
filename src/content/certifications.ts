import type { Certification } from '@/types/content'

/** Sources: LinkedIn "Licenses & certifications" and the certificate PDFs. Files are added with the Certifications section. */
export const certifications: Certification[] = [
  {
    name: 'Machine Learning with Python',
    issuer: 'IBM',
    issued: 'Aug 2026',
    credentialId: '1PL1PNIWA7XT',
    verifyUrl: 'https://coursera.org/share/bd4f5b594b780b8dfec13ea64365ab43',
    skills: ['Supervised learning', 'Unsupervised learning', 'scikit-learn', 'Model evaluation'],
  },
  {
    name: 'Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate',
    issuer: 'Oracle',
    issued: 'Oct 2025',
    expires: 'Oct 2027',
    credentialId: '322812648OCI25AICFA',
    verifyUrl:
      'https://catalog-education.oracle.com/ords/certview/sharebadge?id=D964D8667FE83F3A001886B0508AAA5DDD64243AC10CFD0FE67C8CE921519317',
    skills: ['AI and ML foundations', 'Deep learning', 'Generative AI', 'LLMs'],
  },
  {
    name: 'Connected Leadership',
    issuer: 'Yale University',
    issued: 'Jul 2026',
    credentialId: 'G7H93YQAIUY9',
    verifyUrl: 'https://coursera.org/share/bb7fcca27e7aef308705d352dc5d8890',
    skills: ['Leadership', 'Team collaboration'],
  },
  {
    name: 'Speaking and Presenting: Poise',
    issuer: 'University of Michigan',
    issued: 'Jul 2026',
    credentialId: 'KE9D2WP1ZOL3',
    verifyUrl: 'https://www.coursera.org/verify/KE9D2WP1ZOL3',
    skills: ['Public speaking', 'Presentation'],
  },
]
