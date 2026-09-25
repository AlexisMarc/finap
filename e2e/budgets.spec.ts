import { test, expect } from '@playwright/test';

test.describe('Presupuestos', () => {
  test('muestra la página del mes actual', async ({ page }) => {
    await page.goto('/budgets');
    await expect(
      page.getByText('Presupuestos', { exact: true }).first(),
    ).toBeVisible();
  });

  test('valida el formulario antes de guardar', async ({ page }) => {
    await page.goto('/budgets');
    await page
      .getByRole('button', { name: 'Definir presupuesto' })
      .click();

    const modal = page.locator('finap-modal', {
      hasText: 'Definir presupuesto',
    });
    await modal.getByRole('button', { name: 'Guardar' }).click();

    await expect(page.getByText('Selecciona una categoría')).toBeVisible();
  });
});
