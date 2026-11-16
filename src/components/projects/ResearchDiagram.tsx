'use client'

import { useI18n } from '@/i18n/I18nProvider'

/**
 * Cover for the ICU research project: the paper's three-tier pipeline drawn in SVG,
 * with dashed "data" flowing between the layers (CSS animation, theme-aware colours).
 * The flow always runs left to right, like the paper's figure; only the words are translated.
 */
const LAYER_X = [24, 232, 440]
const VALUES = ['−37.7%', '1.0', '0.54 ms']

export function ResearchDiagram() {
  const { dict } = useI18n()
  const t = dict.research
  return (
    <svg viewBox="0 0 640 400" className="size-full" role="img" aria-label={t.diagramLabel} direction="ltr">
      <defs>
        <linearGradient id="rd-flow" x1="0" x2="1">
          <stop offset="0" stopColor="var(--accent)" />
          <stop offset="1" stopColor="var(--accent-2)" />
        </linearGradient>
      </defs>

      {/* Incoming heart-rate trace */}
      <g transform="translate(24 30)">
        <text x="0" y="14" className="fill-subtle font-mono" fontSize="13">
          {t.stream}
        </text>
        <path
          d="M190 32 H260 L272 6 L286 60 L298 18 L308 32 H592"
          fill="none"
          stroke="var(--accent-2)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="6 6"
          className="animate-[dash-flow_1s_linear_infinite]"
        />
      </g>

      {/* Flow between layers */}
      {[
        [204, 196, 232, 196],
        [412, 196, 440, 196],
      ].map(([x1, y1, x2, y2], i) => (
        <line
          key={i}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="url(#rd-flow)"
          strokeWidth="3"
          strokeDasharray="5 5"
          className="animate-[dash-flow_1s_linear_infinite]"
        />
      ))}

      {t.layers.map((l, i) => (
        <g key={i} transform={`translate(${LAYER_X[i]} 116)`}>
          <rect width="180" height="160" rx="20" fill="var(--surface-solid)" stroke="var(--border-strong)" />
          <rect x="20" y="0" width="140" height="5" rx="2.5" fill="url(#rd-flow)" opacity={0.55 + i * 0.2} />
          <text x="20" y="40" className="fill-accent font-mono" fontSize="14">
            {`0${i + 1}`}
          </text>
          <text x="20" y="72" className="fill-text" fontSize="21" fontWeight="600">
            {l.title}
          </text>
          {l.lines.map((line, j) => (
            <text key={j} x="20" y={104 + j * 22} className="fill-muted" fontSize="15">
              {line}
            </text>
          ))}
        </g>
      ))}

      {VALUES.map((value, i) => (
        <g key={value} transform={`translate(${24 + i * 208} 300)`}>
          <rect width="180" height="76" rx="16" fill="var(--accent-soft)" />
          <text x="20" y="36" className="fill-accent" fontSize="24" fontWeight="600">
            {value}
          </text>
          <text x="20" y="60" className="fill-muted font-mono" fontSize="13">
            {t.chips[i]}
          </text>
        </g>
      ))}
    </svg>
  )
}
