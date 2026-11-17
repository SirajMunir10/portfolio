import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'

/** Unit tests for content, translations and server logic. Browser flows live in e2e/ (Playwright). */
export default defineConfig({
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
})
