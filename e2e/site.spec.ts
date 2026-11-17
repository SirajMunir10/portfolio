import { expect, test, type Page } from '@playwright/test'

const isMobile = (page: Page) => (page.viewportSize()?.width ?? 0) < 1024

/** Opens the main navigation for the viewport: the header links on desktop, the menu dialog on phones. */
async function nav(page: Page) {
  if (!isMobile(page)) return page.getByRole('navigation', { name: 'Main' })
  await page.getByRole('button', { name: 'Open menu' }).click()
  return page.getByRole('dialog')
}

test.describe('language routing', () => {
  test('sends visitors to their browser language', async ({ request }) => {
    for (const [header, target] of [
      ['de-DE,de;q=0.9', '/de'],
      ['ar-AE,ar;q=0.9', '/ar'],
      ['fr-FR', '/en'],
    ]) {
      const res = await request.get('/', { headers: { 'accept-language': header }, maxRedirects: 0 })
      expect(res.status()).toBe(307)
      expect(new URL(res.headers().location, 'http://x').pathname).toBe(target)
    }
  })

  test('remembers a chosen language and keeps the current page', async ({ page, context }) => {
    test.skip(isMobile(page), 'the header switcher is covered on desktop; the menu list on mobile below')
    await page.goto('/en/about')
    await page
      .locator('header')
      .getByRole('button', { name: /^Language/ })
      .click()
    await page.getByRole('menuitem', { name: 'Deutsch' }).click()
    await expect(page).toHaveURL(/\/de\/about$/)
    await expect(page.locator('html')).toHaveAttribute('lang', 'de')
    expect((await context.cookies()).find((c) => c.name === 'NEXT_LOCALE')?.value).toBe('de')

    await page.goto('/')
    await expect(page).toHaveURL(/\/de$/)
  })

  test('switches language from the mobile menu', async ({ page }) => {
    test.skip(!isMobile(page), 'mobile only')
    await page.goto('/en/projects')
    const menu = await nav(page)
    await menu.getByRole('link', { name: 'Nederlands' }).click()
    await expect(page).toHaveURL(/\/nl\/projects$/)
  })

  test('renders Arabic right to left', async ({ page }) => {
    await page.goto('/ar')
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl')
    await expect(page.locator('html')).toHaveAttribute('lang', 'ar')
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Siraj Munir')
  })
})

test.describe('home page', () => {
  test('tells the short story in order', async ({ page }) => {
    await page.goto('/en')
    await expect(page).toHaveTitle(/Siraj Munir/)
    const ids = await page.locator('main > section[id]').evaluateAll((els) => els.map((e) => e.id))
    expect(ids).toEqual(['projects', 'experience', 'about', 'availability', 'contact'])
    await expect(page.locator('#projects').getByRole('link', { name: /Read the case study/ })).toHaveCount(3)
  })

  test('shows where Siraj is open to work', async ({ page }) => {
    await page.goto('/en')
    const section = page.locator('#availability')
    for (const country of ['United Arab Emirates', 'United States', 'Germany', 'Netherlands']) {
      await expect(section.getByText(country, { exact: true })).toBeVisible()
    }
    await expect(section.getByText('Remote', { exact: true })).toBeVisible()
    await expect(section.getByText('On-site', { exact: true })).toBeVisible()
  })

  test('never scrolls sideways', async ({ page }) => {
    for (const path of ['/en', '/ar', '/en/projects', '/en/about', '/de/projects/xo']) {
      await page.goto(path)
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
      expect(overflow, path).toBeLessThanOrEqual(0)
    }
  })
})

test.describe('navigation between pages', () => {
  test('opens a case study and moves on to the next one', async ({ page }) => {
    await page.goto('/en')
    await page.locator('#projects').getByRole('link').first().click()
    await expect(page).toHaveURL(/\/en\/projects\/xo$/)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('XO')
    await expect(page.getByRole('heading', { name: 'The problem' })).toBeVisible()

    await page.getByRole('link', { name: /Next project/ }).click()
    await expect(page).toHaveURL(/\/en\/projects\/avaguard$/)
  })

  test('comes back home from any page, at the top', async ({ page }) => {
    await page.goto('/en/projects')
    const menu = await nav(page)
    await menu.getByRole('link', { name: 'Home', exact: true }).click()
    await expect(page).toHaveURL(/\/en$/)
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0)
  })

  test('jumps to a home section from another page', async ({ page }) => {
    await page.goto('/en/about')
    const menu = await nav(page)
    await menu.getByRole('link', { name: 'Contact', exact: true }).click()
    await expect(page).toHaveURL(/\/en#contact$/)
    await expect(page.locator('#contact')).toBeInViewport()
  })

  test('shows a translated page for unknown addresses', async ({ page }) => {
    const res = await page.goto('/de/gibt-es-nicht')
    expect(res?.status()).toBe(404)
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    await expect(page.locator('html')).toHaveAttribute('lang', 'de')
  })
})

// The form is submitted from the keyboard: images loading above it can shift the layout
// between a mouse click being aimed and landing, which a keypress is immune to.
test.describe('contact form', () => {
  test('explains what is missing in the visitor language', async ({ page }) => {
    await page.goto('/de#contact')
    await page.waitForLoadState('networkidle')
    await page.locator('#contact').getByRole('button', { name: 'Nachricht senden' }).press('Enter')
    await expect(page.locator('#contact [id$="-error"]')).toHaveCount(4)
    await expect(page.getByLabel(/Ihr Name/)).toBeFocused()
  })

  test('sends a complete message', async ({ page }) => {
    let sent: Record<string, unknown> | undefined
    // The real endpoint emails Siraj, so the test answers in its place.
    await page.route('**/api/contact', async (route) => {
      sent = route.request().postDataJSON()
      await route.fulfill({ json: { ok: true } })
    })
    await page.goto('/en#contact')
    // Type only once React has taken over the page, as a person would.
    await page.waitForLoadState('networkidle')
    const form = page.locator('#contact form')
    await form.getByLabel('Your name').fill('Jane Doe')
    await form.getByLabel('Email').fill('jane@company.com')
    await form.getByText('Job opportunity').click()
    await form.getByLabel('Message').fill('We are hiring an AI Engineer and would like to talk to you.')
    await form.getByRole('button', { name: 'Send message' }).press('Enter')

    await expect(page.getByRole('status')).toContainText('Message sent')
    expect(sent).toMatchObject({ name: 'Jane Doe', reason: 'job', locale: 'en', company: '' })
  })
})
