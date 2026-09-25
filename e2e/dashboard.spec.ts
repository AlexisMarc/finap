import { test, expect } from '@playwright/test';

test.describe('Dashboard', () => {
  test('muestra resumen, secciones y chrome', async ({ page }) => {
    await page.goto('/dashboard');

    await expect(page.getByText('Balance total')).toBeVisible();
    await expect(page.getByText('Gastos por categoría')).toBeVisible();
    await expect(page.getByText('Últimos movimientos')).toBeVisible();
    await expect(page.getByText('Asistente IA')).toBeVisible();

    // Chrome del shell (nav)
    await expect(
      page.getByRole('link', { name: /Inicio|Home/i }).first(),
    ).toBeVisible();
  });

  test('navega a otra sección desde el shell', async ({ page }) => {
    await page.goto('/dashboard');
    await page
      .getByRole('link', { name: /Movimientos|Transactions/i })
      .first()
      .click();
    await expect(page).toHaveURL(/\/movements$/);
  });
});
