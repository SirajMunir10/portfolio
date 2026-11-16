import { Reveal } from '@/components/motion/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { experience } from '@/content/experience'
import { ExperienceTabs } from './ExperienceTabs'

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="relative py-24 md:py-32">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-surface-2/50 mask-[linear-gradient(transparent,black_15%,black_85%,transparent)]"
      />
      <div className="container-page">
        <SectionHeading
          id="experience-title"
          eyebrow="Experience"
          title="Where I've worked"
          description="From front-end work to leading an international team, and now building production AI in Dubai."
        />
        <Reveal>
          <ExperienceTabs items={experience} />
        </Reveal>
      </div>
    </section>
  )
}
