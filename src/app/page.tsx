import { About } from '@/components/sections/About'
import { Certifications } from '@/components/sections/Certifications'
import { Education } from '@/components/sections/Education'
import { Experience } from '@/components/sections/Experience'
import { Hero } from '@/components/sections/Hero'
import { Highlights } from '@/components/sections/Highlights'
import { Projects } from '@/components/sections/Projects'
import { Skills } from '@/components/sections/Skills'
import { SectionHeading } from '@/components/ui/SectionHeading'

/** One-page portfolio. The contact placeholder is replaced by its own branch. */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Highlights />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Certifications />
      <Education />
      <section id="contact" aria-labelledby="contact-title" className="container-page py-28">
        <SectionHeading id="contact-title" eyebrow="Contact" title="Contact" description="Coming next." />
        <div className="h-64 rounded-2xl border border-dashed border-border" />
      </section>
    </>
  )
}
