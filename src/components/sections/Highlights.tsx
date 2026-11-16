import { CountUp } from '@/components/motion/CountUp'
import { Stagger, StaggerItem } from '@/components/motion/Reveal'
import { highlights } from '@/content/profile'

/** Four proof points right under the hero. Numbers count up the first time they are seen. */
export function Highlights() {
  return (
    <section aria-label="Highlights" className="container-page pb-8">
      <Stagger className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-4 [&>*]:bg-surface">
        {highlights.map((h) => (
          <StaggerItem key={h.label} className="p-5 md:p-7">
            <p className="text-3xl font-semibold tracking-tight text-text md:text-4xl">
              <CountUp value={h.value} decimals={h.decimals} prefix={h.prefix} suffix={h.suffix} />
            </p>
            <p className="mt-1 text-sm font-medium text-text">{h.label}</p>
            <p className="mt-1 text-xs leading-relaxed text-subtle md:text-sm">{h.detail}</p>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  )
}
