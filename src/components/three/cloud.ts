/**
 * Deterministic point cloud shared by the 3D scene and its static fallback, so both show the same "embedding space".
 * Points sit in clusters, like documents grouped by topic in a vector database.
 */

export const CLOUD_COUNT = 1400
export const CLOUD_CLUSTERS = 7

/** Small seeded random generator: the same seed always produces the same cloud. */
export function mulberry32(seed: number) {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function gaussian(rand: () => number) {
  let u = 0
  let v = 0
  while (u === 0) u = rand()
  while (v === 0) v = rand()
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v)
}

export type Cloud = {
  positions: Float32Array // x, y, z per point
  clusters: Float32Array // 0..1 cluster position, used for colour
  seeds: Float32Array // 0..1 per point, used for size and drift
}

export function buildCloud(count = CLOUD_COUNT, clusters = CLOUD_CLUSTERS, seed = 42): Cloud {
  const rand = mulberry32(seed)
  const centers = Array.from({ length: clusters }, () => [
    (rand() - 0.5) * 9,
    (rand() - 0.5) * 4.4,
    (rand() - 0.5) * 3,
  ])
  const positions = new Float32Array(count * 3)
  const clusterOf = new Float32Array(count)
  const seeds = new Float32Array(count)

  for (let i = 0; i < count; i++) {
    const noise = rand() < 0.12 // a few loose points between topics
    const c = Math.floor(rand() * clusters)
    const spread = noise ? 2.4 : 0.32 + rand() * 0.3
    const [cx, cy, cz] = noise ? [0, 0, 0] : centers[c]
    positions[i * 3] = cx + gaussian(rand) * spread * (noise ? 1.4 : 1)
    positions[i * 3 + 1] = cy + gaussian(rand) * spread * 0.8
    positions[i * 3 + 2] = cz + gaussian(rand) * spread
    clusterOf[i] = c / (clusters - 1)
    seeds[i] = rand()
  }
  return { positions, clusters: clusterOf, seeds }
}
