import { sphere } from './formations'

/**
 * Server-rendered picture of the particle sphere (no JavaScript, no WebGL).
 * Used on phones, with reduced motion, and while the 3D scene loads.
 */
const COUNT = 900
const points = sphere(COUNT, 2.3, 1)
const VIEW_W = 1000
const VIEW_H = 640
const TILT = 0.35

const dots = Array.from({ length: COUNT }, (_, i) => {
  const x = points[i * 3]
  const y0 = points[i * 3 + 1]
  const z0 = points[i * 3 + 2]
  // Tilt the sphere toward the viewer, then a simple perspective projection.
  const y = y0 * Math.cos(TILT) - z0 * Math.sin(TILT)
  const z = y0 * Math.sin(TILT) + z0 * Math.cos(TILT)
  const scale = 7.5 / (7.5 - z)
  const front = (z + 2.3) / 4.6
  return {
    cx: +(VIEW_W * 0.7 + x * 92 * scale).toFixed(1),
    cy: +(VIEW_H / 2 - y * 92 * scale).toFixed(1),
    r: +((0.9 + front * 1.4) * scale).toFixed(2),
    teal: i % 3 === 0,
    o: +(0.12 + front * 0.6).toFixed(2),
  }
})

export function StaticField() {
  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 size-full rtl:-scale-x-100"
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
