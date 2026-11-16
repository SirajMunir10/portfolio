import { Reveal } from '@/components/motion/Reveal'
import { Em } from '@/components/ui/Em'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { skillGroups } from '@/content/skills'
import { SkillsExplorer } from './SkillsExplorer'

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="relative py-24 md:py-36">
      <div className="container-page">
        <SectionHeading
          index="04"
          id="skills-title"
          eyebrow="Skills"
          title={
            <>
              The toolkit behind <Em>the work</Em>
            </>
          }
          description="Grouped by what I use them for, from production AI systems to research. Filter to focus on one area."
        />
        <Reveal>
          <SkillsExplorer groups={skillGroups} />
        </Reveal>
      </div>
    </section>
  )
}
