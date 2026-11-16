import { ArrowUpRight } from 'lucide-react'
import { GitHubIcon } from '@/components/icons/BrandIcons'
import { Stagger, StaggerItem } from '@/components/motion/Reveal'
import { FeaturedProject } from '@/components/projects/FeaturedProject'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { Em } from '@/components/ui/Em'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { featuredProjects, otherProjects } from '@/content/projects'

export function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="container-page py-24 md:py-32">
      <SectionHeading
        index="03"
        id="projects-title"
        eyebrow="Projects"
        title={
          <>
            Things I&apos;ve <Em>built</Em>
          </>
        }
        description="Production AI, security tooling, research and client work. Open any project for the full story, screenshots and results."
      />

      <div className="space-y-24 md:space-y-32">
        {featuredProjects.map((project, i) => (
          <FeaturedProject key={project.slug} project={project} index={i} />
        ))}
      </div>

      <h3 className="mt-28 mb-6 font-mono text-xs font-medium tracking-[0.18em] text-subtle uppercase">
        Other projects
      </h3>
      <Stagger className="grid gap-4 md:grid-cols-2">
        {otherProjects.map((p) => (
          <StaggerItem key={p.slug}>
            <Card interactive className="flex h-full flex-col p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-xs text-subtle">
                    {p.category} · {p.period}
                  </p>
                  <h4 className="mt-2 text-lg font-semibold text-text">{p.title}</h4>
                </div>
                <div className="flex shrink-0 gap-1.5">
                  {p.links.github ? (
                    <a
                      href={p.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${p.title} code on GitHub`}
                      className="grid size-9 place-items-center rounded-full border border-border text-muted transition-colors hover:text-text"
                    >
                      <GitHubIcon className="size-4" />
                    </a>
                  ) : null}
                  {p.links.live ? (
                    <a
                      href={p.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${p.title} live site`}
                      className="grid size-9 place-items-center rounded-full border border-border text-muted transition-colors hover:text-text"
                    >
                      <ArrowUpRight className="size-4" aria-hidden />
                    </a>
                  ) : null}
                </div>
              </div>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{p.summary}</p>
              <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Built with">
                {p.stack.map((s) => (
                  <li key={s}>
                    <Badge>{s}</Badge>
                  </li>
                ))}
              </ul>
            </Card>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  )
}
