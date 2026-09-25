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
    const langPicker = page
      .locator('finap-settings-preferences finap-select sp-picker')
      .first();

    await langPicker.click();
    await page.getByRole('option', { name: 'English' }).click();
    await expect(page.getByText('Preferences').first()).toBeVisible();

    await langPicker.click();
    await page.getByRole('option', { name: 'Español' }).click();
    await expect(page.getByText('Preferencias').first()).toBeVisible();
  });

  test('alterna el tema desde preferencias', async ({ page }) => {
    await page.goto('/settings');
    await page.locator('finap-settings-preferences sp-switch').click();
    await expect(page.locator('html')).toHaveAttribute(
      'data-theme',
      /light|dark/,
    );
  });
});
