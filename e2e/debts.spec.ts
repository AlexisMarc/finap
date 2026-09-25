import { test, expect } from '@playwright/test';

import { uniqueMarker } from './helpers/data';

test.describe('Deudas', () => {
  test('lista las deudas del seed', async ({ page }) => {
    await page.goto('/debts');
    await expect(page.getByText('Préstamo auto').first()).toBeVisible();
    await expect(page.getByText('Préstamo personal').first()).toBeVisible();
  });

  test('alterna entre lista y galería', async ({ page }) => {
    await page.goto('/debts');
    await page.getByRole('radio', { name: 'Galería' }).click();
    await expect(page.locator('debts-page .gallery')).toBeVisible();

    await page.getByRole('radio', { name: 'Lista' }).click();
    await expect(page.locator('debts-page .gallery')).toHaveCount(0);
  });

  test('crea una deuda, registra un pago y la elimina', async ({
    page,
    isMobile,
  }) => {
    // La interacción con los diálogos modales de deudas no es fiable bajo la
    // emulación mobile de Chromium (overlay de Spectrum); se cubre en escritorio.
    test.skip(isMobile, 'flujo de diálogos cubierto en escritorio');

    const marker = uniqueMarker();

    await page.goto('/debts');
    await page.getByRole('button', { name: 'Nueva deuda' }).click();
    const form = page.locator('finap-debt-form');
    await form
      .locator('finap-input', { hasText: 'Nombre' })
      .getByRole('textbox')
      .fill(marker);
    await form
      .locator('finap-input', { hasText: 'Importe total' })
      .getByRole('textbox')
      .fill('1000');
    await form.getByRole('button', { name: 'Guardar' }).click();
    await expect(form).toHaveCount(0);

    const item = page.locator('finap-debt-item', { hasText: marker });
    await expect(item).toBeVisible();

    await item
      .getByRole('button', { name: /Acciones|Actions/i })
      .click();
    await page
      .getByRole('menuitem', { name: 'Registrar pago' })
      .click();
    const payModal = page.locator('debts-page .pay-dialog');
    await payModal.locator('finap-input').getByRole('textbox').fill('100');
    await payModal.getByRole('button', { name: 'Registrar pago' }).click();
    await expect(payModal).toBeHidden();

    await item
      .getByRole('button', { name: /Acciones|Actions/i })
      .click();
    await page.getByRole('menuitem', { name: 'Eliminar' }).click();
    await page
      .locator('debts-page .delete-dialog')
      .getByRole('button', { name: 'Eliminar' })
      .click();
    await expect(
      page.locator('finap-debt-item', { hasText: marker }),
    ).toHaveCount(0);
  });
});
