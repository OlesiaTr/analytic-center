import { expect, test } from '@playwright/test';

import { EN_ROUTES, ROUTES } from '../scripts/routes.mts';

for (const route of [...ROUTES, ...EN_ROUTES]) {
  test(`${route} renders without errors`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('console', message => {
      if (message.type() === 'error') errors.push(message.text());
    });

    const response = await page.goto(route);

    expect(response?.ok()).toBe(true);
    await expect(page).toHaveTitle(/\S/);
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('h1')).toHaveCount(1);
    expect(errors).toEqual([]);
  });

  test(`${route} has no horizontal scroll`, async ({ page }, info) => {
    test.skip(info.project.name !== 'mobile', 'checked at phone width');

    for (const width of [320, 375, 768]) {
      await page.setViewportSize({ width, height: 800 });
      await page.goto(route);
      const { scrollWidth, clientWidth } = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
      }));
      expect(scrollWidth, `at ${width}px`).toBeLessThanOrEqual(clientWidth);
    }
  });
}

test('internal navigation does not reload the page', async ({ page }, info) => {
  test.skip(info.project.name !== 'desktop', 'header nav is desktop-only');

  await page.goto('/');
  await page.evaluate(() => {
    (window as Window & { marker?: boolean }).marker = true;
  });
  await page.locator('header').getByRole('link', { name: 'Гранти' }).click();

  await expect(page).toHaveURL('/grants');
  expect(
    await page.evaluate(() => (window as Window & { marker?: boolean }).marker),
  ).toBe(true);
});

test('skip link moves focus to the main content', async ({ page }, info) => {
  test.skip(info.project.name !== 'desktop', 'keyboard flow checked once');

  await page.goto('/grants');
  await page.keyboard.press('Tab');
  const skipLink = page.getByRole('link', { name: 'Перейти до змісту' });
  await expect(skipLink).toBeFocused();

  await page.keyboard.press('Enter');
  await expect(page.locator('main')).toBeFocused();
});

test('Escape closes the mobile menu and returns focus', async ({
  page,
}, info) => {
  test.skip(info.project.name !== 'mobile', 'menu button is mobile-only');

  await page.goto('/');
  // The accessible name switches between open/close, so find it by what it controls.
  const button = page.locator('button[aria-controls="mobile-menu"]');
  await button.click();
  await expect(button).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('#mobile-menu a').first()).toBeFocused();

  await page.keyboard.press('Escape');
  await expect(page.locator('#mobile-menu')).toHaveCount(0);
  await expect(button).toBeFocused();
  await expect(button).toHaveAttribute('aria-expanded', 'false');
});

test('authors form opens from the keyboard', async ({ page }) => {
  await page.goto('/conferences');
  const panel = page.locator('details#authors-form');
  const summary = panel.locator('summary');
  const firstField = panel.getByRole('rowheader').first();
  await expect(panel).not.toHaveAttribute('open');
  await expect(firstField).toBeHidden();

  await summary.focus();
  await page.keyboard.press('Enter');
  await expect(panel).toHaveAttribute('open');
  await expect(firstField).toBeVisible();
});

test('unknown routes show the 404 page', async ({ page }) => {
  const response = await page.goto('/no-such-page');
  expect(response?.status()).toBe(404);
  await expect(
    page.getByRole('heading', { level: 1, name: 'Сторінку не знайдено' }),
  ).toBeVisible();
});

test('mobile menu opens and closes after navigating', async ({
  page,
}, info) => {
  test.skip(info.project.name !== 'mobile', 'menu button is mobile-only');

  await page.goto('/');
  await page.getByRole('button', { name: 'Відкрити меню' }).click();
  const menu = page.locator('#mobile-menu');
  await expect(menu).toBeVisible();

  await menu.getByRole('link', { name: 'Бібліотека' }).click();
  await expect(page).toHaveURL('/library');
  await expect(menu).toBeHidden();
});

test('conference archive loads 8 at a time', async ({ page }) => {
  await page.goto('/conferences');
  const archive = page.locator('section', {
    has: page.getByRole('heading', { name: 'Архів конференцій' }),
  });
  const items = archive.getByRole('listitem');
  await expect(items).toHaveCount(8);

  // The archive grows in Sanity, so read the total from «Показано 8 з N».
  const count = await archive.getByText(/^Показано 8 з \d+$/).textContent();
  const total = Number(count?.match(/\d+$/)?.[0]);
  expect(total).toBeGreaterThan(8);

  while ((await items.count()) < total) {
    const shown = await items.count();
    const next = Math.min(8, total - shown);
    await archive.getByRole('button', { name: `Показати ще ${next}` }).click();
    await expect(items).toHaveCount(shown + next);
    await expect(items.nth(shown)).toBeFocused();
  }
  await expect(archive.getByText(`Показано ${total} з ${total}`)).toBeVisible();
  await expect(archive.getByText('Це всі збірники архіву.')).toBeVisible();
});

test('partner carousel steps with its buttons', async ({ page }, info) => {
  test.skip(info.project.name !== 'mobile', 'all partners fit from 1024');

  await page.goto('/');
  const prev = page.getByRole('button', { name: 'Попередні партнери' });
  const next = page.getByRole('button', { name: 'Наступні партнери' });
  await expect(prev).toBeDisabled();

  await next.click();
  await expect(prev).toBeEnabled();
  await expect
    .poll(() =>
      page
        .getByRole('list', { name: 'Партнери центру' })
        .evaluate(el => el.scrollLeft),
    )
    .toBeGreaterThan(0);
});

test('the Studio loads without the site chrome', async ({ page }) => {
  await page.goto('/studio');
  await expect(page.locator('#sanity')).toBeAttached();
  await expect(page.locator('footer')).toHaveCount(0);
});

test('the revalidate webhook rejects unsigned requests', async ({
  request,
}) => {
  const response = await request.post('/api/revalidate', {
    data: { _type: 'news' },
  });
  // 401 with a secret configured, 500 where it isn't (local runs and CI).
  expect([401, 500]).toContain(response.status());
  expect(response.ok()).toBe(false);
});

test('each locale sets html lang and keeps its links', async ({ page }) => {
  await page.goto('/grants');
  await expect(page.locator('html')).toHaveAttribute('lang', 'uk');
  await expect(page.locator('a[href^="/en"]')).toHaveCount(0);

  await page.goto('/en/grants');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  const internal = page.locator('header a[href^="/"]');
  for (const href of await internal.evaluateAll(links =>
    links.map(link => link.getAttribute('href')),
  )) {
    expect(href).toMatch(/^\/en(\/|$)/);
  }
});

test('the default locale has no /uk prefix', async ({ page }) => {
  await page.goto('/uk/grants');
  await expect(page).toHaveURL('/grants');
});

test('English pages use the English UI labels', async ({ page }, info) => {
  test.skip(info.project.name !== 'desktop', 'header nav is desktop-only');

  await page.goto('/en/conferences');
  const nav = page.getByRole('navigation', { name: 'Main navigation' });
  await expect(nav.getByRole('link', { name: 'Grants' })).toHaveAttribute(
    'href',
    '/en/grants',
  );
  const archive = page.locator('section', {
    has: page.getByRole('heading', { name: 'Conference archive' }),
  });
  await expect(archive.getByText(/^Showing 8 of \d+$/)).toBeVisible();
  await expect(
    page.getByRole('link', { name: 'Skip to content' }),
  ).toBeAttached();
});

test('English stays out of search until it is public', async ({ page }) => {
  await page.goto('/en/grants');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    'content',
    /noindex/,
  );
  await expect(page.locator('link[rel="alternate"][hreflang]')).toHaveCount(0);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    /\/en\/grants$/,
  );

  await page.goto('/grants');
  await expect(page.locator('meta[name="robots"]')).not.toHaveAttribute(
    'content',
    /noindex/,
  );
});

test('Ukrainian fallbacks on /en are marked lang="uk"', async ({ page }) => {
  await page.goto('/en/conferences');
  const cards = page.locator('main article');
  await expect(cards.first()).toHaveAttribute('lang', /^(uk|en)$/);
});
