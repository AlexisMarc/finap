import { test, expect } from '@playwright/test';

import { uniqueMarker } from './helpers/data';

test.describe('Deudas', () => {
  test('lista las deudas del seed', async ({ page }) => {
    await page.goto('/debts');
    await expect(page.getByText('Préstamo auto').first()).toBeVisible();
    await expect(page.getByText('Préstamo personal').first()).toBeVisible();
  });

  test('crea una deuda, registra un pago y la elimina', async ({ page }) => {
    const marker = uniqueMarker();

    await page.goto('/debts');
    await page.getByRole('button', { name: 'Nueva deuda' }).click();
    const form = page.locator('finap-debt-form');
    await form.locator('input[type="text"]').fill(marker);
    await form.locator('input[type="number"]').first().fill('1000');
    await form.getByRole('button', { name: 'Guardar' }).click();
    await expect(form).toHaveCount(0);

    const item = page.locator('finap-debt-item', { hasText: marker });
    await expect(item).toBeVisible();

    await item.getByRole('button', { name: 'Registrar pago' }).click();
    const payModal = page.locator('finap-modal', { hasText: marker });
    await payModal.locator('input[type="number"]').fill('100');
    await payModal.getByRole('button', { name: 'Registrar pago' }).click();
    await expect(payModal).toHaveCount(0);

    await item.getByRole('button', { name: 'Eliminar' }).click();
    await page
      .locator('finap-confirm-dialog')
      .getByRole('button', { name: 'Eliminar' })
      .click();
    await expect(
      page.locator('finap-debt-item', { hasText: marker }),
    ).toHaveCount(0);
  });
});
