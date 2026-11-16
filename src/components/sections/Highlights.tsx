import { CountUp } from '@/components/motion/CountUp'
import { Stagger, StaggerItem } from '@/components/motion/Reveal'
import type { Site } from '@/content'

/** Four proof points right under the hero, in one glass panel. Numbers count up the first time they are seen. */
export function Highlights({ site }: { site: Site }) {
  return (
    <section aria-label={site.dict.highlights.label} className="container-page pb-8 md:pb-16">
      <Stagger className="glass grid grid-cols-2 overflow-hidden rounded-3xl border border-border md:grid-cols-4">
        {site.highlights.map((h, i) => (
          <StaggerItem
            key={h.label}
            className={[
              'border-border p-5 md:p-8',
              i % 2 === 0 ? 'border-e' : '',
              i < 2 ? 'border-b md:border-b-0' : '',
              i === 1 ? 'md:border-e' : '',
              i === 3 ? '' : 'md:border-e',
            ].join(' ')}
          >
            <p className="text-4xl font-semibold tracking-tighter text-text md:text-5xl">
              <CountUp value={h.value} decimals={h.decimals} prefix={h.prefix} suffix={h.suffix} />
            </p>
            <p className="mt-2 text-sm font-medium text-text">{h.label}</p>
            <p className="mt-1 text-xs leading-relaxed text-subtle md:text-sm">{h.detail}</p>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  )
}
