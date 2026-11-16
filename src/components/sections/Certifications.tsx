import { CertificateCard } from '@/components/certifications/CertificateCard'
import { Stagger, StaggerItem } from '@/components/motion/Reveal'
import { Em } from '@/components/ui/Em'
import { SectionHeading } from '@/components/ui/SectionHeading'
import type { Site } from '@/content'

export function Certifications({ site }: { site: Site }) {
  const t = site.dict.certifications
  // Earned certificates first; courses still in progress at the end.
  const completedFirst = [...site.certifications].sort((a, b) => Number(!!a.inProgress) - Number(!!b.inProgress))
  return (
    <section id="certifications" aria-labelledby="certifications-title" className="container-page py-24 md:py-32">
      <SectionHeading
        index="02"
        id="certifications-title"
        eyebrow={t.eyebrow}
        title={
          <>
            {t.titleBefore}
            <Em>{t.titleEm}</Em>
            {t.titleAfter}
          </>
        }
        description={t.description}
      />
      <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {completedFirst.map((c) => (
          <StaggerItem key={c.name}>
            <CertificateCard cert={c} />
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  )
}
