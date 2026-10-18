import { expect, test } from '@playwright/test';

import { ROUTES } from '../scripts/routes.mts';

for (const route of ROUTES) {
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
  await page.getByRole('button', { name: 'Кнопка відкриття меню' }).click();
  const menu = page.locator('#mobile-menu');
  await expect(menu).toBeVisible();

  await menu.getByRole('link', { name: 'Бібліотека' }).click();
  await expect(page).toHaveURL('/library');
  await expect(menu).toBeHidden();
});
