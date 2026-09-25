import { test, expect } from '@playwright/test';

import { uniqueMarker } from './helpers/data';

test.describe('Categorías', () => {
  test('lista las categorías del seed', async ({ page }) => {
    await page.goto('/categories');
    await expect(page.getByText('Vivienda').first()).toBeVisible();
    await expect(page.getByText('Alimentación').first()).toBeVisible();
  });

  test('crea, edita y elimina una categoría', async ({ page }) => {
    const marker = uniqueMarker();
    const edited = `${marker}-edit`;

    await page.goto('/categories');
    await page.getByRole('button', { name: 'Nueva categoría' }).click();
    let form = page.locator('finap-category-form');
    await form.locator('input[type="text"]').fill(marker);
    await form.getByRole('button', { name: 'Guardar' }).click();
    await expect(form).toHaveCount(0);

    let row = page.locator('categories-page .row', { hasText: marker });
    await expect(row).toBeVisible();

    await row.getByRole('button', { name: 'Editar' }).click();
    form = page.locator('finap-category-form');
    await form.locator('input[type="text"]').fill(edited);
    await form.getByRole('button', { name: 'Guardar' }).click();
    await expect(form).toHaveCount(0);

    row = page.locator('categories-page .row', { hasText: edited });
    await expect(row).toBeVisible();

    await row.getByRole('button', { name: 'Eliminar' }).click();
    await page
      .locator('finap-confirm-dialog')
      .getByRole('button', { name: 'Eliminar' })
      .click();
    await expect(
      page.locator('categories-page .row', { hasText: edited }),
    ).toHaveCount(0);
  });
});
