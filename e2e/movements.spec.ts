import { test, expect } from '@playwright/test';

test.describe('Movimientos', () => {
  test('lista los movimientos del seed', async ({ page }) => {
    await page.goto('/movements');
    await expect(page.getByText('Salario').first()).toBeVisible();
    await expect(page.getByText('Renta').first()).toBeVisible();
  });

  test('filtra por tipo', async ({ page }) => {
    await page.goto('/movements');
    await expect(page.getByText('Salario').first()).toBeVisible();

    await page.getByRole('radio', { name: 'Gasto' }).click();
    await expect(page.getByText('Salario')).toHaveCount(0);
    await expect(page.getByText('Renta').first()).toBeVisible();
  });

  test('busca por texto', async ({ page }) => {
    await page.goto('/movements');
    await page.locator('input[placeholder="Buscar"]').fill('Netflix');
    await expect(page.getByText('Netflix').first()).toBeVisible();
    await expect(page.getByText('Salario')).toHaveCount(0);
  });
});
