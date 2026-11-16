'use client'

/* The render loop updates three.js buffers, uniforms and materials in place every frame, which is how
   three.js is designed to work (and avoids allocating per frame). React state is never mutated here. */
/* eslint-disable react-hooks/immutability */

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { buildCloud, CLOUD_COUNT } from './cloud'

/** Number of nearest neighbours linked to the cursor "query". */
const K = 7

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uPixelRatio;
  uniform float uSize;
  attribute float aCluster;
  attribute float aSeed;
  attribute float aHighlight;
  varying float vCluster;
  varying float vHighlight;
  varying float vDepth;

  void main() {
    vec3 p = position;
    p.y += sin(uTime * 0.35 + aSeed * 6.2831) * 0.06;
    p.x += cos(uTime * 0.28 + aSeed * 4.0) * 0.05;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    float size = uSize * (0.55 + aSeed * 0.9) * (1.0 + aHighlight * 1.8);
    gl_PointSize = size * uPixelRatio * (6.0 / -mv.z);
    vCluster = aCluster;
    vHighlight = aHighlight;
    vDepth = clamp((-mv.z - 4.0) / 8.0, 0.0, 1.0);
  }
`

const fragmentShader = /* glsl */ `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform float uOpacity;
  uniform float uBoost;
  varying float vCluster;
  varying float vHighlight;
  varying float vDepth;

  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    if (d > 0.5) discard;
    float alpha = smoothstep(0.5, 0.05, d);
    vec3 color = mix(uColorA, uColorB, vCluster);
    float a = alpha * uOpacity * uBoost * (0.4 + 0.6 * (1.0 - vDepth)) * (0.55 + vHighlight * 1.1);
    gl_FragColor = vec4(color, min(a, 1.0));
  }
`

type Palette = { a: THREE.Color; b: THREE.Color; line: THREE.Color; dark: boolean }

function readPalette(): Palette {
  const css = getComputedStyle(document.documentElement)
  const dark = document.documentElement.getAttribute('data-theme') === 'dark'
  return {
    a: new THREE.Color(css.getPropertyValue('--accent').trim() || '#4f46e5'),
    b: new THREE.Color(css.getPropertyValue('--accent-2').trim() || '#0d9488'),
    line: new THREE.Color(css.getPropertyValue('--accent').trim() || '#4f46e5'),
    dark,
  }
}

/** Pointer position over the hero in normalised device coordinates; null when the pointer is elsewhere. */
type PointerRef = React.RefObject<{ x: number; y: number; active: boolean }>

function Field({ pointer }: { pointer: PointerRef }) {
  const cloud = useMemo(() => buildCloud(), [])
  const group = useRef<THREE.Group>(null)
  const points = useRef<THREE.Points>(null)
  const lines = useRef<THREE.LineSegments>(null)
  const query = useRef<THREE.Mesh>(null)
  const { camera, gl } = useThree()

  const highlight = useMemo(() => new Float32Array(CLOUD_COUNT), [])
  const linePositions = useMemo(() => new Float32Array(K * 2 * 3), [])
  const queryLocal = useRef(new THREE.Vector3(1.2, 0.4, 0))
  const queryTarget = useMemo(() => new THREE.Vector3(), [])
  const raycaster = useMemo(() => new THREE.Raycaster(), [])
  const plane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 0, 1), 0), [])
  const ndc = useMemo(() => new THREE.Vector2(), [])
  const inverse = useMemo(() => new THREE.Matrix4(), [])
  const nearest = useMemo(() => ({ idx: new Int32Array(K), dist: new Float32Array(K) }), [])

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPixelRatio: { value: Math.min(gl.getPixelRatio(), 1.5) },
      uSize: { value: 5.2 },
      uColorA: { value: new THREE.Color('#4f46e5') },
      uColorB: { value: new THREE.Color('#0d9488') },
      uOpacity: { value: 0.9 },
      uBoost: { value: 1.2 },
    }),
    [gl]
  )
  const lineMaterial = useMemo(
    () =>
      new THREE.LineBasicMaterial({ color: '#4f46e5', transparent: true, opacity: 0.55, depthWrite: false }),
    []
  )
  const queryMaterial = useMemo(() => new THREE.MeshBasicMaterial({ color: '#0d9488' }), [])

  // Follow the site theme: colours come from the same CSS variables as the rest of the page.
  useEffect(() => {
    const apply = () => {
      const p = readPalette()
      uniforms.uColorA.value.copy(p.a)
      uniforms.uColorB.value.copy(p.b)
      uniforms.uOpacity.value = p.dark ? 1 : 0.9
      uniforms.uBoost.value = p.dark ? 2.1 : 1.25
      uniforms.uSize.value = p.dark ? 6 : 5.4
      lineMaterial.color.copy(p.line)
      lineMaterial.opacity = p.dark ? 0.6 : 0.5
      queryMaterial.color.copy(p.b)
    }
    apply()
    const observer = new MutationObserver(apply)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    return () => observer.disconnect()
  }, [uniforms, lineMaterial, queryMaterial])

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime
    uniforms.uTime.value = t
    const g = group.current
    if (!g) return

    // Gentle drift plus a slight tilt toward the pointer; the camera eases back as the hero scrolls away.
    const p = pointer.current
    const scroll = Math.min(window.scrollY / window.innerHeight, 1)
    g.rotation.y = t * 0.035 + (p.active ? p.x * 0.12 : 0)
    g.rotation.x = (p.active ? -p.y * 0.08 : 0) + scroll * 0.25
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, 8 + scroll * 2.5, 0.08)

    // Query point: follows the pointer on the z=0 plane, or wanders slowly when the pointer is away.
    if (p.active) {
      ndc.set(p.x, p.y)
      raycaster.setFromCamera(ndc, camera)
      if (raycaster.ray.intersectPlane(plane, queryTarget)) {
        g.updateMatrixWorld()
        inverse.copy(g.matrixWorld).invert()
        queryTarget.applyMatrix4(inverse)
      }
    } else {
      queryTarget.set(1.4 + Math.sin(t * 0.21) * 2.2, Math.sin(t * 0.33) * 1.4, Math.cos(t * 0.17) * 0.8)
    }
    queryLocal.current.lerp(queryTarget, 1 - Math.pow(0.0015, delta))
    const q = queryLocal.current
    query.current?.position.copy(q)

    // K nearest neighbours of the query (simple partial selection; 1,400 points is cheap per frame).
    const pos = cloud.positions
    nearest.dist.fill(Infinity)
    nearest.idx.fill(-1)
    for (let i = 0; i < CLOUD_COUNT; i++) {
      const dx = pos[i * 3] - q.x
      const dy = pos[i * 3 + 1] - q.y
      const dz = pos[i * 3 + 2] - q.z
      const d = dx * dx + dy * dy + dz * dz
      if (d < nearest.dist[K - 1]) {
        let j = K - 1
        while (j > 0 && nearest.dist[j - 1] > d) {
          nearest.dist[j] = nearest.dist[j - 1]
          nearest.idx[j] = nearest.idx[j - 1]
          j--
        }
        nearest.dist[j] = d
        nearest.idx[j] = i
      }
      // Highlight fades out smoothly; a soft glow reaches slightly beyond the neighbours.
      const glow = d < 1.2 ? (1 - d / 1.2) * 0.45 : 0
      highlight[i] = Math.max(glow, highlight[i] * Math.pow(0.02, delta))
    }
    for (let k = 0; k < K; k++) {
      const i = nearest.idx[k]
      if (i < 0) continue
      highlight[i] = Math.max(highlight[i], 1)
      linePositions.set([q.x, q.y, q.z, pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2]], k * 6)
    }

    const hAttr = points.current?.geometry.getAttribute('aHighlight') as THREE.BufferAttribute | undefined
    if (hAttr) hAttr.needsUpdate = true
    const lAttr = lines.current?.geometry.getAttribute('position') as THREE.BufferAttribute | undefined
    if (lAttr) lAttr.needsUpdate = true
  })

  return (
    <group ref={group} position={[2.2, 0, 0]}>
      <points ref={points} frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[cloud.positions, 3]} />
          <bufferAttribute attach="attributes-aCluster" args={[cloud.clusters, 1]} />
          <bufferAttribute attach="attributes-aSeed" args={[cloud.seeds, 1]} />
          <bufferAttribute
            attach="attributes-aHighlight"
            args={[highlight, 1]}
            usage={THREE.DynamicDrawUsage}
          />
        </bufferGeometry>
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          transparent
          depthWrite={false}
        />
      </points>
      <lineSegments ref={lines} frustumCulled={false} material={lineMaterial}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
            usage={THREE.DynamicDrawUsage}
          />
        </bufferGeometry>
      </lineSegments>
      <mesh ref={query} material={queryMaterial}>
        <sphereGeometry args={[0.07, 16, 16]} />
      </mesh>
    </group>
  )
}

/**
 * Interactive "embedding space": the cursor acts as a search query and its nearest neighbours light up.
 * Rendering pauses when the hero is off-screen or the tab is hidden.
 */
export default function EmbeddingSpace({ active }: { active: boolean }) {
  const pointer = useRef({ x: 0, y: 0, active: false })
  const wrapper = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const el = wrapper.current
      if (!el || e.pointerType === 'touch') return
      const r = el.getBoundingClientRect()
      const inside =
        e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom
      pointer.current.active = inside
      if (inside) {
        pointer.current.x = ((e.clientX - r.left) / r.width) * 2 - 1
        pointer.current.y = -((e.clientY - r.top) / r.height) * 2 + 1
      }
    }
    const onLeave = () => (pointer.current.active = false)
    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerleave', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <div ref={wrapper} className="absolute inset-0">
      <Canvas
        frameloop={active ? 'always' : 'never'}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
        style={{ pointerEvents: 'none' }}
      >
        <Field pointer={pointer} />
      </Canvas>
    </div>
  )
}
