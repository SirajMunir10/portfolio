import { buildCloud, mulberry32 } from './cloud'

/**
 * Particle formations for the hero scene. Every formation has the same number of points,
 * so the GPU can morph from any one to any other.
 */

export const PARTICLES = 9000

export const formationInfo = [
  { name: 'Knowledge', detail: 'one connected model of the domain' },
  { name: 'Retrieval', detail: 'documents clustered by meaning (RAG)' },
  { name: 'Voice', detail: 'speech in, speech out, in real time' },
  { name: 'Reasoning', detail: 'multi-step LLM tool loops' },
] as const

function gaussian(rand: () => number) {
  let u = 0
  let v = 0
  while (u === 0) u = rand()
  while (v === 0) v = rand()
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v)
}

/** Fibonacci sphere shell with a light inner core. */
export function sphere(n = PARTICLES, radius = 2.3, seed = 1) {
  const rand = mulberry32(seed)
  const out = new Float32Array(n * 3)
  const golden = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < n; i++) {
    const inner = rand() < 0.1
    const y = 1 - (2 * (i + 0.5)) / n
    const r = Math.sqrt(1 - y * y)
    const theta = i * golden
    const R = inner ? radius * Math.cbrt(rand()) * 0.85 : radius * (0.97 + rand() * 0.06)
    out[i * 3] = Math.cos(theta) * r * R
    out[i * 3 + 1] = y * R
    out[i * 3 + 2] = Math.sin(theta) * r * R
  }
  return out
}

/** Topic clusters, like documents grouped in a vector database. */
export function clusters(n = PARTICLES) {
  const cloud = buildCloud(n, 7, 7)
  const out = new Float32Array(n * 3)
  for (let i = 0; i < n * 3; i++) out[i] = cloud.positions[i] * 0.62
  return out
}

/** Layered sound wave, the shape of speech. */
export function wave(n = PARTICLES, seed = 3) {
  const rand = mulberry32(seed)
  const out = new Float32Array(n * 3)
  const lines = 10
  for (let i = 0; i < n; i++) {
    const k = i % lines
    const x = (rand() * 2 - 1) * 3.1
    const envelope = Math.exp((-x * x) / 2.8)
    const y =
      (Math.sin(x * 4.2 + k * 0.55) * 0.85 + Math.sin(x * 9.5 + k) * 0.22) * envelope * (0.45 + k * 0.08)
    out[i * 3] = x
    out[i * 3 + 1] = y + gaussian(rand) * 0.025
    out[i * 3 + 2] = (k - (lines - 1) / 2) * 0.13 + gaussian(rand) * 0.03
  }
  return out
}

/** Torus knot (2, 3): a loop that keeps coming back to itself, like an agent's tool loop. */
export function knot(n = PARTICLES, seed = 4) {
  const rand = mulberry32(seed)
  const out = new Float32Array(n * 3)
  const p = 2
  const q = 3
  for (let i = 0; i < n; i++) {
    const t = (i / n) * Math.PI * 2
    const r = Math.cos(q * t) + 2.1
    out[i * 3] = r * Math.cos(p * t) * 0.78 + gaussian(rand) * 0.13
    out[i * 3 + 1] = r * Math.sin(p * t) * 0.78 + gaussian(rand) * 0.13
    out[i * 3 + 2] = -Math.sin(q * t) * 0.78 + gaussian(rand) * 0.13
  }
  return out
}

/** Per-particle random value (colour, size) and morph delay (a sweep from left to right). */
export function particleAttributes(n = PARTICLES, seed = 9) {
  const rand = mulberry32(seed)
  const random = new Float32Array(n)
  const delay = new Float32Array(n)
  const base = sphere(n)
  for (let i = 0; i < n; i++) {
    random[i] = rand()
    delay[i] = ((base[i * 3] + 2.3) / 4.6) * 0.7 + rand() * 0.3
  }
  return { random, delay }
}
