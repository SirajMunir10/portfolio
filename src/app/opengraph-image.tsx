import { ImageResponse } from 'next/og'
import { profile } from '@/content/profile'

export const alt = `${profile.name}, ${profile.role} in ${profile.location}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/** Social preview card (LinkedIn, WhatsApp, X, Slack): name, role, headline and focus areas. */
export default async function OpengraphImage() {
  const dots = Array.from({ length: 140 }, (_, i) => {
    const a = i * 2.39996
    const r = 230 * Math.sqrt((i + 0.5) / 140)
    return { x: 900 + Math.cos(a) * r, y: 315 + Math.sin(a) * r, s: 3 + (i % 4), teal: i % 3 === 0 }
  })

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        position: 'relative',
        background: '#0a0a0b',
        color: '#f4f4f5',
        fontFamily: 'sans-serif',
      }}
    >
      {dots.map((d, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: d.x,
            top: d.y,
            width: d.s,
            height: d.s,
            borderRadius: 999,
            background: d.teal ? '#2dd4bf' : '#818cf8',
            opacity: 0.75,
          }}
        />
      ))}
      <div style={{ display: 'flex', flexDirection: 'column', padding: '72px 80px', width: 720 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: '#f4f4f5',
              color: '#0a0a0b',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 26,
              fontWeight: 700,
            }}
          >
            SM
          </div>
          <div style={{ fontSize: 24, color: '#a1a1aa' }}>{profile.location}</div>
        </div>
        <div style={{ fontSize: 84, fontWeight: 700, marginTop: 56, letterSpacing: -2 }}>{profile.name}</div>
        <div style={{ fontSize: 34, color: '#818cf8', marginTop: 8 }}>{profile.role}</div>
        <div style={{ fontSize: 30, lineHeight: 1.35, marginTop: 36, color: '#d4d4d8' }}>
          {profile.headline}
        </div>
        <div style={{ display: 'flex', gap: 12, marginTop: 40 }}>
          {['LLM apps', 'RAG', 'Voice AI', 'ML research'].map((t) => (
            <div
              key={t}
              style={{
                fontSize: 22,
                padding: '8px 18px',
                borderRadius: 999,
                border: '1px solid #3f3f46',
                color: '#e4e4e7',
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    </div>,
    size
  )
}
