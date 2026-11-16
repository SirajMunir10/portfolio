import type { Certification } from '@/types/content'

/** Sources: LinkedIn "Licenses & certifications" and the certificate PDFs. */
export const certifications: Certification[] = [
  {
    name: 'AI Engineering Professional Certificate',
    issuer: 'IBM',
    issued: 'In progress',
    inProgress: true,
    skills: ['Deep learning', 'PyTorch', 'Generative AI', 'LLMs'],
  },
  {
    name: 'Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate',
    issuer: 'Oracle',
    issued: 'Oct 2025',
    expires: 'Oct 2027',
    credentialId: '322812648OCI25AICFA',
    verifyUrl:
      'https://catalog-education.oracle.com/ords/certview/sharebadge?id=D964D8667FE83F3A001886B0508AAA5DDD64243AC10CFD0FE67C8CE921519317',
    file: '/documents/certificates/oracle-oci-ai-foundations-associate.pdf',
    image: { src: '/images/certificates/oracle-oci-ai-foundations-associate.jpg', width: 1600, height: 1131 },
    skills: ['AI and ML foundations', 'Deep learning', 'Generative AI', 'LLMs'],
  },
  {
    name: 'Machine Learning with Python',
    issuer: 'IBM',
    issued: 'Aug 2026',
    credentialId: '1PL1PNIWA7XT',
    verifyUrl: 'https://coursera.org/verify/1PL1PNIWA7XT',
    file: '/documents/certificates/ibm-machine-learning-with-python.pdf',
    image: { src: '/images/certificates/ibm-machine-learning-with-python.jpg', width: 1600, height: 1236 },
    skills: ['Supervised learning', 'Unsupervised learning', 'scikit-learn', 'Model evaluation'],
  },
  {
    name: 'Connected Leadership',
    issuer: 'Yale University',
    issued: 'Jul 2026',
    credentialId: 'G7H93YQAIUY9',
    verifyUrl: 'https://coursera.org/verify/G7H93YQAIUY9',
    file: '/documents/certificates/yale-connected-leadership.pdf',
    image: { src: '/images/certificates/yale-connected-leadership.jpg', width: 1600, height: 1236 },
    skills: ['Leadership', 'Team collaboration'],
  },
  {
    name: 'Speaking and Presenting: Poise',
    issuer: 'University of Michigan',
    issued: 'Jul 2026',
    credentialId: 'KE9D2WP1ZOL3',
    verifyUrl: 'https://coursera.org/verify/KE9D2WP1ZOL3',
    file: '/documents/certificates/michigan-speaking-and-presenting-poise.pdf',
    image: {
      src: '/images/certificates/michigan-speaking-and-presenting-poise.jpg',
      width: 1600,
      height: 1236,
    },
    skills: ['Public speaking', 'Presentation'],
  },
]
