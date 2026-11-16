import { About } from '@/components/sections/About'
import { Certifications } from '@/components/sections/Certifications'
import { Contact } from '@/components/sections/Contact'
import { Education } from '@/components/sections/Education'
import { Experience } from '@/components/sections/Experience'
import { Hero } from '@/components/sections/Hero'
import { Highlights } from '@/components/sections/Highlights'
import { Projects } from '@/components/sections/Projects'
import { Skills } from '@/components/sections/Skills'

/** The whole portfolio on one page, in reading order. */
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
      <Contact />
    </>
  )
}
