'use client'

/* The render loop updates three.js uniforms and materials in place every frame, which is how
   three.js is designed to work (and avoids allocating per frame). React state is never mutated here. */
/* eslint-disable react-hooks/immutability */

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { particleCallouts } from '@/content/callouts'
import { clusters, knot, particleAttributes, sphere, wave } from './formations'

const MORPH_SECONDS = 2.2
const HOLD_SECONDS = 4.2

// 3D simplex noise by Ashima Arts / Stefan Gustavson (MIT licence).
const noise = /* glsl */ `
  vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
  vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
  vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
  float snoise(vec3 v){
    const vec2 C=vec2(1.0/6.0,1.0/3.0);const vec4 D=vec4(0.0,0.5,1.0,2.0);
    vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);
    vec3 g=step(x0.yzx,x0.xyz);vec3 l=1.0-g;vec3 i1=min(g.xyz,l.zxy);vec3 i2=max(g.xyz,l.zxy);
    vec3 x1=x0-i1+C.xxx;vec3 x2=x0-i2+C.yyy;vec3 x3=x0-D.yyy;
    i=mod289(i);
    vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
    float n_=0.142857142857;vec3 ns=n_*D.wyz-D.xzx;
    vec4 j=p-49.0*floor(p*ns.z*ns.z);vec4 x_=floor(j*ns.z);vec4 y_=floor(j-7.0*x_);
    vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.yyyy;vec4 h=1.0-abs(x)-abs(y);
    vec4 b0=vec4(x.xy,y.xy);vec4 b1=vec4(x.zw,y.zw);
    vec4 s0=floor(b0)*2.0+1.0;vec4 s1=floor(b1)*2.0+1.0;vec4 sh=-step(h,vec4(0.0));
    vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
    vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);
    vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
    p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
    vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);m=m*m;
    return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
  }
`

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uProgress;
  uniform float uPixelRatio;
  uniform float uSize;
  uniform float uScroll;
  uniform float uPointerStrength;
  uniform vec3 uPointer;
  uniform vec3 uFocus;
  uniform float uFocusStrength;
  uniform vec4 uFrom;
  uniform vec4 uTo;
  attribute vec3 aP1;
  attribute vec3 aP2;
  attribute vec3 aP3;
  attribute float aRand;
  attribute float aDelay;
  varying float vRand;
  varying float vGlow;
  varying float vDepth;
  ${noise}

  vec3 shape(vec4 w) { return position * w.x + aP1 * w.y + aP2 * w.z + aP3 * w.w; }

  void main() {
    // Each particle starts its journey slightly later than its neighbour on the left: a sweep.
    float t = clamp((uProgress - aDelay * 0.35) / 0.65, 0.0, 1.0);
    t = t * t * (3.0 - 2.0 * t);
    vec3 p = mix(shape(uFrom), shape(uTo), t);

    // Organic drift, much stronger mid-flight so the morph swirls.
    float flight = sin(t * 3.14159);
    vec3 q = p * 0.65 + uTime * 0.12;
    vec3 n = vec3(snoise(q), snoise(q + 17.0), snoise(q + 41.0));
    p += n * (0.045 + flight * 0.6);
    p *= 1.0 + uScroll * 0.55;

    // The cursor pushes particles away and makes them glow.
    vec3 d = p - uPointer;
    float f = smoothstep(1.5, 0.0, length(d)) * uPointerStrength;
    p += normalize(d + 0.0001) * f * 0.75;
    // A highlighted particle (and its close neighbours) flares up while its callout is shown.
    float ff = smoothstep(0.32, 0.0, length(p - uFocus)) * uFocusStrength;
    vGlow = max(f, ff * 1.3);

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * (0.45 + aRand * 0.95) * (1.0 + f * 1.4 + ff * 2.4) * uPixelRatio * (5.0 / -mv.z);
    vRand = aRand;
    vDepth = clamp((-mv.z - 4.0) / 6.0, 0.0, 1.0);
  }
`

const fragmentShader = /* glsl */ `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform float uOpacity;
  varying float vRand;
  varying float vGlow;
  varying float vDepth;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float core = smoothstep(0.5, 0.0, d);
    // Mostly pure indigo or pure teal (a narrow blend band), so colours stay vivid instead of averaging out.
    vec3 color = mix(uColorA, uColorB, smoothstep(0.5, 0.7, vRand));
    color = mix(color, uColorB, vGlow * 0.6);
    float a = core * core * uOpacity * (0.3 + 0.7 * (1.0 - vDepth)) * (0.75 + vGlow);
    gl_FragColor = vec4(color, a);
  }
`

const oneHot = (i: number) =>
  new THREE.Vector4(i === 0 ? 1 : 0, i === 1 ? 1 : 0, i === 2 ? 1 : 0, i === 3 ? 1 : 0)

type PointerRef = React.RefObject<{ x: number; y: number; active: boolean; clicks: number }>

/** DOM nodes of the floating callout, updated directly each frame (no React re-render). */
type CalloutRefs = {
  anchor: React.RefObject<HTMLDivElement | null>
  label: React.RefObject<HTMLSpanElement | null>
  detail: React.RefObject<HTMLSpanElement | null>
}

const CALLOUT_SECONDS = 3.4
const CALLOUT_GAP_SECONDS = 1.2
const FIRST_CALLOUT_AFTER = 2.5

function Particles({
  pointer,
  onFormation,
  callout,
}: {
  pointer: PointerRef
  onFormation: (i: number) => void
  callout: CalloutRefs
}) {
  const { camera, gl, size } = useThree()
  const group = useRef<THREE.Group>(null)
  const shapes = useMemo(() => [sphere(), clusters(), wave(), knot()], [])
  const attrs = useMemo(() => particleAttributes(), [])
  const state = useRef({
    from: 0,
    to: 0,
    progress: 1,
    hold: 0,
    clicks: 0,
    strength: 0,
    callout: { active: false, index: 0, shape: 0, t: 0, wait: FIRST_CALLOUT_AFTER, fact: 0 },
  })
  const tmp = useMemo(
    () => ({
      ndc: new THREE.Vector2(),
      hit: new THREE.Vector3(),
      ray: new THREE.Raycaster(),
      inv: new THREE.Matrix4(),
      focus: new THREE.Vector3(),
      screen: new THREE.Vector3(),
    }),
    []
  )
  const plane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 0, 1), 0), [])

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        transparent: true,
        depthWrite: false,
        uniforms: {
          uTime: { value: 0 },
          uProgress: { value: 1 },
          uPixelRatio: { value: Math.min(gl.getPixelRatio(), 1.5) },
          uSize: { value: 4.2 },
          uScroll: { value: 0 },
          uPointerStrength: { value: 0 },
          uPointer: { value: new THREE.Vector3(99, 99, 0) },
          uFocus: { value: new THREE.Vector3(99, 99, 99) },
          uFocusStrength: { value: 0 },
          uFrom: { value: oneHot(0) },
          uTo: { value: oneHot(0) },
          uColorA: { value: new THREE.Color('#6a45ff') },
          uColorB: { value: new THREE.Color('#ff7d5c') },
          uOpacity: { value: 0.9 },
        },
      }),
    [gl]
  )

  // Follow the site theme: glowing additive light on dark, crisp normal blending on light.
  useEffect(() => {
    const apply = () => {
      const css = getComputedStyle(document.documentElement)
      const dark = document.documentElement.getAttribute('data-theme') === 'dark'
      material.uniforms.uColorA.value.set(css.getPropertyValue('--accent').trim() || '#6a45ff')
      material.uniforms.uColorB.value.set(css.getPropertyValue('--accent-2').trim() || '#ff7d5c')
      // Additive light needs less opacity on dark; on light, particles need more to stay vivid.
      material.uniforms.uOpacity.value = dark ? 0.95 : 1.6
      material.uniforms.uSize.value = dark ? 7.5 : 6.5
      material.blending = dark ? THREE.AdditiveBlending : THREE.NormalBlending
      material.needsUpdate = true
    }
    apply()
    const observer = new MutationObserver(apply)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    return () => observer.disconnect()
  }, [material])

  useEffect(() => () => material.dispose(), [material])

  useFrame((frame, delta) => {
    const s = state.current
    const u = material.uniforms
    const dt = Math.min(delta, 0.05)
    u.uTime.value = frame.clock.elapsedTime

    // Morph cycle: hold a shape, then morph to the next. A click skips ahead.
    const p = pointer.current
    const clicked = p.clicks !== s.clicks
    s.clicks = p.clicks
    if (s.progress < 1) {
      s.progress = Math.min(1, s.progress + dt / MORPH_SECONDS)
    } else {
      s.hold += dt
      if (s.hold > HOLD_SECONDS || clicked) {
        s.from = s.to
        s.to = (s.to + 1) % shapes.length
        s.progress = 0
        s.hold = 0
        u.uFrom.value.copy(oneHot(s.from))
        u.uTo.value.copy(oneHot(s.to))
        onFormation(s.to)
      }
    }
    u.uProgress.value = s.progress

    const g = group.current
    if (!g) return
    // Sit to the right of the text on wide screens; gentle rotation and pointer parallax.
    g.position.x = THREE.MathUtils.lerp(g.position.x, size.width / size.height > 1.25 ? 2.35 : 0, 0.1)
    g.rotation.y += dt * 0.12
    g.rotation.x = THREE.MathUtils.lerp(
      g.rotation.x,
      p.active ? -p.y * 0.25 : Math.sin(frame.clock.elapsedTime * 0.2) * 0.15,
      0.05
    )
    u.uScroll.value = Math.min(window.scrollY / window.innerHeight, 1)

    // Pointer position in the group's own space, so the push follows the rotating shape.
    s.strength = THREE.MathUtils.lerp(s.strength, p.active ? 1 : 0, 0.08)
    u.uPointerStrength.value = s.strength
    g.updateMatrixWorld()
    if (p.active) {
      tmp.ndc.set(p.x, p.y)
      tmp.ray.setFromCamera(tmp.ndc, camera)
      if (tmp.ray.ray.intersectPlane(plane, tmp.hit)) {
        tmp.inv.copy(g.matrixWorld).invert()
        u.uPointer.value.copy(tmp.hit.applyMatrix4(tmp.inv))
      }
    }

    // Callouts: while a shape holds still, a particle on its visible front flares and shows a short fact
    // that follows it as the shape turns. Morphs cut the current callout short.
    const c = s.callout
    const scrollScale = 1 + u.uScroll.value * 0.55
    const toScreen = (shape: Float32Array, i: number) => {
      tmp.focus.set(shape[i * 3], shape[i * 3 + 1], shape[i * 3 + 2]).multiplyScalar(scrollScale)
      tmp.screen.copy(tmp.focus).applyMatrix4(g.matrixWorld)
      const front = tmp.screen.z
      tmp.screen.project(camera)
      return {
        x: ((tmp.screen.x + 1) / 2) * size.width,
        y: ((1 - tmp.screen.y) / 2) * size.height,
        front,
      }
    }
    const el = callout.anchor.current
    if (c.active) {
      c.t += dt
      if (s.progress < 1) c.t = Math.max(c.t, CALLOUT_SECONDS - 0.35)
      const pos = toScreen(shapes[c.shape], c.index)
      u.uFocus.value.copy(tmp.focus)
      const k = Math.max(0, Math.min(c.t / 0.35, (CALLOUT_SECONDS - c.t) / 0.4, 1))
      u.uFocusStrength.value = k
      if (el) {
        el.style.transform = `translate3d(${pos.x.toFixed(1)}px, ${pos.y.toFixed(1)}px, 0)`
        el.style.opacity = k.toFixed(3)
        el.style.setProperty('--k', k.toFixed(3))
        el.dataset.side = pos.x > size.width - 300 ? 'left' : 'right'
      }
      if (c.t >= CALLOUT_SECONDS) {
        c.active = false
        c.wait = CALLOUT_GAP_SECONDS
        u.uFocusStrength.value = 0
        if (el) el.style.opacity = '0'
      }
    } else {
      c.wait -= dt
      if (c.wait <= 0 && s.progress >= 1 && s.hold > 0.6) {
        const shape = shapes[s.to]
        const count = shape.length / 3
        for (let attempt = 0; attempt < 30 && !c.active; attempt++) {
          const i = Math.floor(Math.random() * count)
          const pos = toScreen(shape, i)
          const visible =
            pos.front > 0.25 &&
            pos.x > size.width * 0.6 &&
            pos.x < size.width - 60 &&
            pos.y > size.height * 0.16 &&
            pos.y < size.height * 0.76
          if (!visible) continue
          c.active = true
          c.index = i
          c.shape = s.to
          c.t = 0
          const fact = particleCallouts[c.fact % particleCallouts.length]
          c.fact++
          if (callout.label.current) callout.label.current.textContent = fact.label
          if (callout.detail.current) callout.detail.current.textContent = fact.detail
        }
        if (!c.active) c.wait = 0.4
      }
    }
  })

  return (
    <group ref={group} scale={0.72}>
      <points frustumCulled={false} material={material}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[shapes[0], 3]} />
          <bufferAttribute attach="attributes-aP1" args={[shapes[1], 3]} />
          <bufferAttribute attach="attributes-aP2" args={[shapes[2], 3]} />
          <bufferAttribute attach="attributes-aP3" args={[shapes[3], 3]} />
          <bufferAttribute attach="attributes-aRand" args={[attrs.random, 1]} />
          <bufferAttribute attach="attributes-aDelay" args={[attrs.delay, 1]} />
        </bufferGeometry>
      </points>
    </group>
  )
}

type Props = { active: boolean; onFormation: (index: number) => void }

/**
 * 9,000 particles morphing between four shapes that stand for the work: knowledge, retrieval,
 * voice and reasoning. The cursor pushes particles away; a click morphs to the next shape.
 */
export default function MorphField({ active, onFormation }: Props) {
  const pointer = useRef({ x: 0, y: 0, active: false, clicks: 0 })
  const wrapper = useRef<HTMLDivElement>(null)
  const anchor = useRef<HTMLDivElement>(null)
  const label = useRef<HTMLSpanElement>(null)
  const detail = useRef<HTMLSpanElement>(null)
  const callout = useMemo(() => ({ anchor, label, detail }), [])

  useEffect(() => {
    const inside = (e: PointerEvent) => {
      const r = wrapper.current?.getBoundingClientRect()
      if (!r) return null
      const ok = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom
      return ok ? r : null
    }
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return
      const r = inside(e)
      pointer.current.active = !!r
      if (r) {
        pointer.current.x = ((e.clientX - r.left) / r.width) * 2 - 1
        pointer.current.y = -((e.clientY - r.top) / r.height) * 2 + 1
      }
    }
    // Clicks on the empty right-hand side of the hero morph the shape; links and buttons keep working.
    const onDown = (e: PointerEvent) => {
      const r = inside(e)
      if (!r || (e.target as Element).closest('a, button, input, textarea')) return
      if (e.clientX < r.left + r.width * 0.45) return
      pointer.current.clicks++
    }
    const onLeave = () => (pointer.current.active = false)
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerdown', onDown)
    document.addEventListener('pointerleave', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onDown)
      document.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <div ref={wrapper} className="absolute inset-0">
      <Canvas
        frameloop={active ? 'always' : 'never'}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 7.5], fov: 45 }}
        gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
        style={{ pointerEvents: 'none' }}
      >
        <Particles pointer={pointer} onFormation={onFormation} callout={callout} />
      </Canvas>

      {/* Callout that pops out of a particle: a pulsing ring on the particle, a thin leader line and a glass label.
          Positioned every frame by the scene; decorative, as every fact also appears in the page content. */}
      <div
        ref={anchor}
        aria-hidden
        data-side="right"
        className="group/callout pointer-events-none absolute top-0 left-0 opacity-0 will-change-transform"
      >
        <span className="absolute -top-2 -left-2 size-4 rounded-full border border-accent-2/80 motion-safe:animate-ping" />
        <span className="absolute -top-1 -left-1 size-2 rounded-full bg-accent-2 shadow-[0_0_12px_var(--accent-2)]" />
        <svg
          width="34"
          height="34"
          viewBox="0 0 34 34"
          className="absolute -top-[34px] left-0 overflow-visible group-data-[side=left]/callout:-left-[34px] group-data-[side=left]/callout:-scale-x-100"
        >
          <path
            d="M0 34 L22 12 H34"
            fill="none"
            stroke="var(--accent-2)"
            strokeWidth="1.2"
            strokeOpacity="0.8"
          />
        </svg>
        <span
          className="absolute -top-[54px] left-[38px] flex origin-left flex-col rounded-2xl border border-border bg-surface-solid/90 px-3.5 py-2 whitespace-nowrap shadow-lift backdrop-blur-md group-data-[side=left]/callout:right-[38px] group-data-[side=left]/callout:left-auto group-data-[side=left]/callout:origin-right"
          style={{ transform: 'scale(calc(0.86 + 0.14 * var(--k, 0)))' }}
        >
          <span ref={label} className="text-sm font-semibold text-text" />
          <span ref={detail} className="text-xs text-muted" />
        </span>
      </div>
    </div>
  )
}
