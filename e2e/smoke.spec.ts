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

test('mobile menu opens and closes after navigating', async ({
  page,
}, info) => {
  test.skip(info.project.name !== 'mobile', 'menu button is mobile-only');

  await page.goto('/');
  await page.getByRole('button', { name: 'Кнопка відкриття меню' }).click();
  const menu = page.locator('header .fixed');
  await expect(menu).toBeVisible();

  await menu.getByRole('link', { name: 'Бібліотека' }).click();
  await expect(page).toHaveURL('/library');
  await expect(menu).toBeHidden();
});
