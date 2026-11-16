import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

/** Home-screen icon for iPhone and iPad: the SM monogram. */
export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#111113',
        fontSize: 84,
        fontWeight: 700,
        letterSpacing: -4,
      }}
    >
      <span style={{ color: '#fafaf9' }}>S</span>
      <span style={{ color: '#2dd4bf' }}>M</span>
    </div>,
    size
  )
}
