import { test, expect } from '@playwright/test';

test.describe('Análisis', () => {
  test('muestra métricas y gráficas', async ({ page }) => {
    await page.goto('/analysis');
    await expect(
      page.getByText('Análisis', { exact: true }).first(),
    ).toBeVisible();
    await expect(page.locator('finap-analysis-metrics')).toBeVisible();
    await expect(page.locator('finap-chart')).toHaveCount(2);
  });

  test('cambia el periodo', async ({ page }) => {
    await page.goto('/analysis');
    await expect(page.locator('finap-analysis-metrics')).toBeVisible();

    await page.getByRole('radio', { name: 'Trimestre' }).click();
    await expect(page.locator('finap-analysis-metrics')).toBeVisible();

    await page.getByRole('radio', { name: 'Año' }).click();
    await expect(page.locator('finap-analysis-metrics')).toBeVisible();
  });
});
