import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

const pages = [
  '/en',
  '/en/projects',
  '/en/projects/xo',
  '/en/projects/icu-alarm-fatigue',
  '/en/about',
  '/ar',
  '/de/about',
]

/**
 * Automated WCAG 2.2 AA checks with axe on every kind of page, in light and dark themes.
 * Anything serious or critical fails the build; the full list is attached to the report.
 */
for (const theme of ['light', 'dark'] as const) {
  test.describe(`accessibility (${theme})`, () => {
    test.use({ colorScheme: theme })
    // Long pages are scrolled through first so every section has finished animating in.
    test.describe.configure({ timeout: 120_000 })

    for (const path of pages) {
      test(path, async ({ page }, testInfo) => {
        await page.goto(path)
        // Let entrance animations finish so colours are measured at rest.
        await page.evaluate(async () => {
          for (let y = 0; y < document.body.scrollHeight; y += 600) {
            window.scrollTo(0, y)
            await new Promise((r) => setTimeout(r, 60))
          }
          window.scrollTo(0, 0)
        })
        await page.waitForTimeout(1200)

        const results = await new AxeBuilder({ page })
          .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
          // The WebGL canvas is decorative and hidden from assistive technology.
          .exclude('canvas')
          .analyze()
        await testInfo.attach('axe', {
          body: JSON.stringify(results.violations, null, 2),
          contentType: 'application/json',
        })

        const blocking = results.violations
          .filter((v) => v.impact === 'serious' || v.impact === 'critical')
          .map(
            (v) =>
              `${v.id} (${v.impact}): ${v.help} → ${v.nodes
                .map((n) => n.target.join(' '))
                .slice(0, 5)
                .join(' | ')}`
          )
        expect(blocking, blocking.join('\n')).toEqual([])
      })
    }
  })
}
