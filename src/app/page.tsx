import { About } from '@/components/sections/About'
import { Experience } from '@/components/sections/Experience'
import { Hero } from '@/components/sections/Hero'
import { Highlights } from '@/components/sections/Highlights'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { navigation } from '@/content/navigation'

const built = new Set(['about', 'experience'])

/** One-page portfolio. Placeholder sections are replaced as each section branch lands. */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Highlights />
      <About />
      <Experience />
      {navigation
        .filter((item) => !built.has(item.id))
        .map((item) => (
          <section
            key={item.id}
            id={item.id}
            aria-labelledby={`${item.id}-title`}
            className="container-page py-28"
          >
            <SectionHeading
              id={`${item.id}-title`}
              eyebrow={item.label}
              title={item.label}
              description="Coming next."
            />
            <div className="h-64 rounded-2xl border border-dashed border-border" />
          </section>
        ))}
    </>
  )
}
