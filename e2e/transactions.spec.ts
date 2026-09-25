import { test, expect } from '@playwright/test';

import { uniqueMarker } from './helpers/data';

test.describe('Transacciones', () => {
  test('crea un movimiento desde Agregar y lo elimina', async ({ page }) => {
    const marker = uniqueMarker();

    await page.goto('/dashboard');
    await page.getByRole('button', { name: 'Agregar' }).click();
    await expect(
      page.getByRole('heading', { name: 'Nuevo registro' }),
    ).toBeVisible();

    const form = page.locator('finap-transaction-form');
    await form.locator('input[type="number"]').fill('12.34');
    await form.locator('select').selectOption({ index: 0 });
    await form.locator('textarea').fill(marker);
    await form.getByRole('button', { name: 'Guardar' }).click();

    await expect(form).toHaveCount(0);

    await page.goto('/movements');
    const row = page.locator('finap-movements-list .row', { hasText: marker });
    await expect(row).toBeVisible();

    await row.getByRole('button', { name: 'Eliminar' }).click();
    await page
      .locator('finap-confirm-dialog')
      .getByRole('button', { name: 'Eliminar' })
      .click();
    await expect(
      page.locator('finap-movements-list .row', { hasText: marker }),
    ).toHaveCount(0);
  });

  test('valida el importe antes de guardar', async ({ page }) => {
    await page.goto('/dashboard');
    await page.getByRole('button', { name: 'Agregar' }).click();

    const form = page.locator('finap-transaction-form');
    await form.getByRole('button', { name: 'Guardar' }).click();

    await expect(page.getByText('Introduce un importe válido')).toBeVisible();
    await expect(form).toBeVisible();
  });
});
