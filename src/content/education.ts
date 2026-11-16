import type { Award, Education } from '@/types/content'

export const education: Education[] = [
  {
    degree: 'BS Software Engineering',
    school: 'Foundation University Islamabad (FUSST campus)',
    location: 'Rawalpindi, Pakistan',
    start: 'Sep 2022',
    end: 'Aug 2026',
    grade: 'CGPA 3.68 / 4.00',
    details: [
      'Final-year project: AVAGuard, AI-assisted cloud security compliance for Agency VA.',
      'Research: Reducing ICU alarm fatigue with a tiered Lambda architecture.',
      'Class Representative and Student Coordinator, leading university teams at inter-university competitions.',
    ],
  },
  {
    degree: 'Intermediate in Computer Science',
    school: 'Pakistan School Muscat',
    location: 'Muscat, Oman',
    start: 'Nov 2020',
    end: 'Sep 2021',
    details: [],
  },
]

export const awards: Award[] = [
  {
    title: 'Merit scholarship, 3rd position',
    issuer: 'Foundation University Islamabad',
    date: 'Feb 2025',
    description: '3rd in a batch of 150 students in the 5th semester, with a 3.9 GPA.',
  },
  {
    title: 'Merit scholarship, 2nd position',
    issuer: 'Foundation University Islamabad',
    date: 'May 2024',
    description: '2nd in a batch of 150 students in the 3rd semester, with a 3.9 GPA.',
  },
  {
    title: 'CodeWar Season 2, inter-university coding competition',
    issuer: 'HITEC University Taxila',
    date: 'Dec 2023',
    description: 'Competed in a timed inter-university programming contest.',
  },
]
