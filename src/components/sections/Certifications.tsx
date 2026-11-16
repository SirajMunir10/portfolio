import { CertificateCard } from '@/components/certifications/CertificateCard'
import { Stagger, StaggerItem } from '@/components/motion/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { certifications } from '@/content/certifications'

export function Certifications() {
  return (
    <section
      id="certifications"
      aria-labelledby="certifications-title"
      className="container-page py-24 md:py-32"
    >
      <SectionHeading
        id="certifications-title"
        eyebrow="Certifications"
        title="Verified learning"
        description="Open any certificate to see it in full, download the original or check it with the issuer."
      />
      <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {certifications.map((c) => (
          <StaggerItem key={c.name}>
            <CertificateCard cert={c} />
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  )
}
