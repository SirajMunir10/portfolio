import { Award as AwardIcon, GraduationCap } from 'lucide-react'
import { AwardCertificate } from '@/components/education/AwardCertificate'
import { PublicationCard } from '@/components/education/PublicationCard'
import { Timeline, TimelineItem } from '@/components/education/Timeline'
import { Reveal } from '@/components/motion/Reveal'
import { Em } from '@/components/ui/Em'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { awards, education } from '@/content/education'
import { research } from '@/content/research'

export function Education() {
  const [degree, ...earlier] = education

  return (
    <section id="education" aria-labelledby="education-title" className="relative py-24 md:py-36">
      <div className="container-page">
        <SectionHeading
          index="06"
          id="education-title"
          eyebrow="Education"
          title={
            <>
              Education, research <Em>&amp; awards</Em>
            </>
          }
          description="A software engineering degree with consistent top results, and published research on making ICU monitoring more trustworthy."
        />

        <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <Timeline>
            <TimelineItem date={`${degree.start} – ${degree.end}`} highlight>
              <h3 className="flex items-start gap-2 text-lg font-semibold text-text">
                <GraduationCap className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden />
                {degree.degree}
              </h3>
              <p className="mt-1 text-sm text-muted">
                {degree.school} · {degree.location}
              </p>
              {degree.grade ? (
                <p className="mt-2 inline-block rounded-full bg-accent-soft px-3 py-1 font-mono text-xs text-accent">
                  {degree.grade}
                </p>
              ) : null}
              <ul className="mt-3 space-y-1.5">
                {degree.details.map((d) => (
                  <li key={d} className="flex gap-2.5 text-sm leading-relaxed text-muted">
                    <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-subtle" />
                    {d}
                  </li>
                ))}
              </ul>
            </TimelineItem>

            {awards.map((a) => (
              <TimelineItem key={a.title} date={a.date}>
                <h3 className="flex items-start gap-2 font-semibold text-text">
                  <AwardIcon className="mt-0.5 size-4.5 shrink-0 text-accent-2" aria-hidden />
                  {a.title}
                </h3>
                <p className="mt-1 text-sm text-muted">{a.issuer}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{a.description}</p>
                <AwardCertificate award={a} />
              </TimelineItem>
            ))}

            {earlier.map((e) => (
              <TimelineItem key={e.degree} date={`${e.start} – ${e.end}`}>
                <h3 className="font-semibold text-text">{e.degree}</h3>
                <p className="mt-1 text-sm text-muted">
                  {e.school} · {e.location}
                </p>
              </TimelineItem>
            ))}
          </Timeline>

          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <PublicationCard research={research} />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
