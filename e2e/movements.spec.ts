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

    await page.getByRole('button', { name: 'Gasto', exact: true }).click();
    await expect(page.getByText('Salario')).toHaveCount(0);
    await expect(page.getByText('Renta').first()).toBeVisible();
  });

  test('busca por texto', async ({ page }) => {
    await page.goto('/movements');
    await page.locator('input[placeholder="Buscar"]').fill('Netflix');
    await expect(page.getByText('Netflix').first()).toBeVisible();
    await expect(page.getByText('Salario')).toHaveCount(0);
  });

  test('busca desde el header del shell', async ({ page }) => {
    await page.goto('/dashboard');
    const headerSearch = page.locator('input[placeholder="Buscar..."]');
    await headerSearch.fill('Netflix');
    await headerSearch.press('Enter');

    await expect(page).toHaveURL(/\/movements$/);
    await expect(page.getByText('Netflix').first()).toBeVisible();
    await expect(page.getByText('Salario')).toHaveCount(0);
  });
});
