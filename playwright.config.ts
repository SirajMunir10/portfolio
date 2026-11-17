import { defineConfig, devices } from '@playwright/test'

const PORT = 3200
const ci = !!process.env.CI
// Locally you can test in an installed browser instead of downloading one: PLAYWRIGHT_CHANNEL=msedge
const channel = process.env.PLAYWRIGHT_CHANNEL

/**
 * End-to-end tests against the production build (`npm run build` first).
 * Runs on a desktop and a phone viewport.
 */
export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: ci,
  retries: ci ? 2 : 0,
  // Every page runs a WebGL scene, so a few browsers at a time keeps timings realistic.
  workers: 2,
  timeout: 60_000,
  expect: { timeout: 10_000 },
  reporter: ci ? [['github'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: 'on-first-retry',
    ...(channel ? { channel } : {}),
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } } },
    { name: 'mobile', use: { ...devices['Pixel 7'] } },
  ],
  webServer: {
    command: `npm run start -- --port ${PORT}`,
    url: `http://localhost:${PORT}/en`,
    reuseExistingServer: !ci,
    timeout: 120_000,
  },
})
