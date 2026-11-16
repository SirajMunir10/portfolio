import { buildCloud } from './cloud'

/**
 * Server-rendered picture of the same embedding space (no JavaScript, no WebGL).
 * Used on phones, with reduced motion, and while the 3D scene loads.
 */
const cloud = buildCloud(520)
const VIEW_W = 1000
const VIEW_H = 640

const dots = Array.from({ length: 520 }, (_, i) => {
  const x = cloud.positions[i * 3] + 2.2
  const y = cloud.positions[i * 3 + 1]
  const z = cloud.positions[i * 3 + 2]
  const scale = 8 / (8 - z) // simple perspective
  return {
    cx: +(VIEW_W / 2 + x * 78 * scale).toFixed(1),
    cy: +(VIEW_H / 2 - y * 78 * scale).toFixed(1),
    r: +((1.1 + cloud.seeds[i] * 1.6) * scale).toFixed(2),
    teal: cloud.clusters[i] > 0.5,
    o: +(0.25 + 0.5 * (1 - (z + 2) / 5)).toFixed(2),
  }
})

export function StaticField() {
  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 size-full"
      role="presentation"
    >
      {dots.map((d, i) => (
        <circle
          key={i}
          cx={d.cx}
          cy={d.cy}
          r={d.r}
          fill={d.teal ? 'var(--accent-2)' : 'var(--accent)'}
          fillOpacity={d.o}
        />
      ))}
    </svg>
  )
}
