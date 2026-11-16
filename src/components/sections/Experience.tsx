import { Reveal } from '@/components/motion/Reveal'
import { Em } from '@/components/ui/Em'
import { SectionHeading } from '@/components/ui/SectionHeading'
import type { Site } from '@/content'
import { ExperienceTabs } from './ExperienceTabs'

export function Experience({ site }: { site: Site }) {
  const t = site.dict.experience
  return (
    <section id="experience" aria-labelledby="experience-title" className="relative py-24 md:py-36">
      <div className="container-page">
        <SectionHeading
          index="02"
          id="experience-title"
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
        <Reveal>
          <ExperienceTabs items={site.experience} />
        </Reveal>
      </div>
    </section>
  )
}
