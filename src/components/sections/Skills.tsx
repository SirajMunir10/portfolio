import { Reveal } from '@/components/motion/Reveal'
import { Em } from '@/components/ui/Em'
import { SectionHeading } from '@/components/ui/SectionHeading'
import type { Site } from '@/content'
import { SkillsExplorer } from './SkillsExplorer'

export function Skills({ site }: { site: Site }) {
  const t = site.dict.skills
  return (
    <section id="skills" aria-labelledby="skills-title" className="relative py-24 md:py-36">
      <div className="container-page">
        <SectionHeading
          index="01"
          id="skills-title"
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
          <SkillsExplorer groups={site.skillGroups} />
        </Reveal>
      </div>
    </section>
  )
}
