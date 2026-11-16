import { Reveal } from '@/components/motion/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { skillGroups } from '@/content/skills'
import { SkillsExplorer } from './SkillsExplorer'

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="relative py-24 md:py-32">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-surface-2/50 mask-[linear-gradient(transparent,black_15%,black_85%,transparent)]"
      />
      <div className="container-page">
        <SectionHeading
          id="skills-title"
          eyebrow="Skills"
          title="The toolkit behind the work"
          description="Grouped by what I use them for, from production AI systems to research. Filter to focus on one area."
        />
        <Reveal>
          <SkillsExplorer groups={skillGroups} />
        </Reveal>
      </div>
    </section>
  )
}
