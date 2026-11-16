import type { MetadataRoute } from 'next'
import { profile } from '@/content/profile'
import { en } from '@/i18n/dictionaries/en'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${profile.name} · ${profile.role}`,
    short_name: profile.name,
    description: en.meta.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#f6f4f1',
    theme_color: '#6a45ff',
    icons: [
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' },
      { src: '/apple-icon', sizes: '180x180', type: 'image/png' },
    ],
  }
}
