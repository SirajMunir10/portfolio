import { Reveal } from '@/components/motion/Reveal'
import { Em } from '@/components/ui/Em'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { experience } from '@/content/experience'
import { ExperienceTabs } from './ExperienceTabs'

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="relative py-24 md:py-36">
      <div className="container-page">
        <SectionHeading
          index="02"
          id="experience-title"
          eyebrow="Experience"
          title={
            <>
              Where I&apos;ve <Em>worked</Em>
            </>
          }
          description="From front-end and real-time systems to leading an international team, and now building production AI in Dubai."
        />
        <Reveal>
          <ExperienceTabs items={experience} />
        </Reveal>
      </div>
    </section>
  )
}
