/**
 * Cover for the ICU research project: the paper's three-tier pipeline drawn in SVG,
 * with dashed "data" flowing between the layers (CSS animation, theme-aware colours).
 */
const layers = [
  { x: 24, title: 'Speed layer', lines: ['Validates readings', 'in under 1 ms'] },
  { x: 232, title: 'Hybrid layer', lines: ['Isolation Forest', 'anomaly detection'] },
  { x: 440, title: 'Serving layer', lines: ['Alerts + history', 'in one view'] },
]

const results = [
  ['−37.7%', 'false alarms'],
  ['1.0', 'recall'],
  ['0.54 ms', 'per record'],
]

export function ResearchDiagram() {
  return (
    <svg
      viewBox="0 0 640 400"
      className="size-full"
      role="img"
      aria-label="Tiered Lambda architecture: vital signs flow through a speed layer, a hybrid layer with Isolation Forest, and a serving layer, cutting false alarms by 37.7% with recall of 1.0 at 0.54 ms per record"
    >
      <defs>
        <linearGradient id="rd-flow" x1="0" x2="1">
          <stop offset="0" stopColor="var(--accent)" />
          <stop offset="1" stopColor="var(--accent-2)" />
        </linearGradient>
      </defs>

      {/* Incoming heart-rate trace */}
      <g transform="translate(24 30)">
        <text x="0" y="14" className="fill-subtle font-mono" fontSize="13">
          vital signs · 1 Hz stream
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

      {layers.map((l, i) => (
        <g key={l.title} transform={`translate(${l.x} 116)`}>
          <rect width="180" height="160" rx="20" fill="var(--surface)" stroke="var(--border-strong)" />
          <rect x="20" y="0" width="140" height="5" rx="2.5" fill="url(#rd-flow)" opacity={0.55 + i * 0.2} />
          <text x="20" y="40" className="fill-accent font-mono" fontSize="14">
            {`0${i + 1}`}
          </text>
          <text x="20" y="72" className="fill-text" fontSize="21" fontWeight="600">
            {l.title}
          </text>
          {l.lines.map((t, j) => (
            <text key={t} x="20" y={104 + j * 22} className="fill-muted" fontSize="15">
              {t}
            </text>
          ))}
        </g>
      ))}

      {results.map(([value, label], i) => (
        <g key={label} transform={`translate(${24 + i * 208} 300)`}>
          <rect width="180" height="76" rx="16" fill="var(--accent-soft)" />
          <text x="20" y="36" className="fill-accent" fontSize="24" fontWeight="600">
            {value}
          </text>
          <text x="20" y="60" className="fill-muted font-mono" fontSize="13">
            {label}
          </text>
        </g>
      ))}
    </svg>
  )
}
