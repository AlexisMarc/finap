import { test, expect } from '@playwright/test';

test.describe('Ajustes', () => {
  test('muestra las secciones', async ({ page }) => {
    await page.goto('/settings');
    await expect(
      page.getByRole('heading', { name: 'Perfil' }),
    ).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'Preferencias' }),
    ).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Datos' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Sesión' })).toBeVisible();
  });

  test('cambia el idioma a inglés y vuelve', async ({ page }) => {
    await page.goto('/settings');
    const langSelect = page.locator('finap-settings-preferences finap-select').first();
    await langSelect.locator('select').selectOption('en');
    await expect(page.getByText('Preferences')).toBeVisible();

    await langSelect.locator('select').selectOption('es');
    await expect(page.getByText('Preferencias')).toBeVisible();
  });

  test('alterna el tema desde preferencias', async ({ page }) => {
    await page.goto('/settings');
    await page
      .locator('finap-settings-preferences')
      .getByRole('button')
      .first()
      .click();
    await expect(page.locator('html')).toHaveAttribute(
      'data-theme',
      /light|dark/,
    );
  });
});
