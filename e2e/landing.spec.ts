import { test, expect } from '@playwright/test';

// La landing es pública: se prueba sin sesión.
test.use({ storageState: { cookies: [], origins: [] } });

test.describe('Landing', () => {
  test('carga con hero y navegación', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText(/Tu dinero, en orden/).first()).toBeVisible();
    await expect(
      page.getByRole('link', { name: /Iniciar sesión|Sign in/i }).first(),
    ).toBeVisible();
  });

  test('cambia de idioma ES↔EN', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText(/Tu dinero, en orden/).first()).toBeVisible();
    await page.locator('sp-picker').first().click();
    await page.getByRole('option', { name: 'English' }).click();
    await expect(page.getByText(/Your money, in order/).first()).toBeVisible();
  });

  test('alterna el tema y navega a login', async ({ page }) => {
    await page.goto('/');
    await page.locator('sp-switch').first().click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    await page.getByRole('link', { name: /Iniciar sesión|Sign in/i }).first().click();
    await expect(page).toHaveURL(/\/login$/);
  });
});
