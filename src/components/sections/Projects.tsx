import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { GitHubIcon } from '@/components/icons/BrandIcons'
import { Stagger, StaggerItem } from '@/components/motion/Reveal'
import { FeaturedProject } from '@/components/projects/FeaturedProject'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import type { Site } from '@/content'
import { format, localeHref } from '@/i18n/config'

const iconLink =
  'relative z-10 grid size-9 place-items-center rounded-full border border-border text-muted transition-colors hover:text-text'

/** Projects page: every featured project in full, then the smaller ones as cards. */
export function Projects({ site }: { site: Site }) {
  const t = site.dict.projects
  return (
    <section id="projects" aria-label={site.dict.pages.projectsTitle} className="container-page pt-8 pb-24 md:pb-32">
      <div className="space-y-24 md:space-y-32">
        {site.featuredProjects.map((project, i) => (
          <FeaturedProject key={project.slug} project={project} index={i} />
        ))}
      </div>

      <h2 className="mt-28 mb-6 font-mono text-xs font-medium tracking-[0.18em] text-subtle uppercase">{t.other}</h2>
      <Stagger className="grid gap-4 md:grid-cols-2">
        {site.otherProjects.map((p) => (
          <StaggerItem key={p.slug}>
            <Card interactive className="relative flex h-full flex-col p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-xs text-subtle">
                    {p.category} · {p.period}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-text">
                    {/* The title link stretches over the whole card; the icon links sit above it. */}
                    <Link
                      href={localeHref(site.locale, `/projects/${p.slug}`)}
                      className="after:absolute after:inset-0 after:rounded-[inherit] hover:text-accent"
                    >
                      {p.title}
                    </Link>
                  </h3>
                </div>
                <div className="flex shrink-0 gap-1.5">
                  {p.links.github ? (
                    <a
                      href={p.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={format(t.codeOnGithub, { title: p.title })}
                      className={iconLink}
                    >
                      <GitHubIcon className="size-4" />
                    </a>
                  ) : null}
                  {p.links.live ? (
                    <a
                      href={p.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={format(t.liveSiteOf, { title: p.title })}
                      className={iconLink}
                    >
                      <ArrowUpRight className="size-4 rtl:-scale-x-100" aria-hidden />
                    </a>
                  ) : null}
                </div>
              </div>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{p.summary}</p>
              <ul className="mt-5 flex flex-wrap gap-1.5" aria-label={site.dict.common.builtWith}>
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
