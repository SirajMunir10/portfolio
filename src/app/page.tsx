import { SectionHeading } from '@/components/ui/SectionHeading'
import { navigation } from '@/content/navigation'
import { profile } from '@/content/profile'

/** Temporary layout: each section is a placeholder until its own branch replaces it. */
export default function HomePage() {
  return (
    <>
      <section className="container-page flex min-h-[80dvh] flex-col justify-center pt-24">
        <p className="font-mono text-sm text-accent">{profile.role}</p>
        <h1 className="mt-3 text-5xl font-semibold tracking-tight md:text-7xl">{profile.name}</h1>
        <p className="mt-6 max-w-xl text-lg text-muted">{profile.headline}</p>
      </section>
      {navigation.map((item) => (
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
