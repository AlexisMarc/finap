import { test, expect } from '@playwright/test';

/**
 * Recorrido guiado por las vistas principales. Pensado para generar los videos
 * de portafolio: mantiene pausas breves para que cada pantalla sea legible.
 */
test.describe('Recorrido de la app', () => {
  test('tour por las vistas principales', async ({ page }) => {
    test.setTimeout(150_000);
    const pause = (ms = 900) => page.waitForTimeout(ms);

    // Landing pública
    await page.goto('/');
    await expect(page.getByText(/Tu dinero, en orden/).first()).toBeVisible();
    await pause(1200);

    // Dashboard
    await page.goto('/dashboard');
    await expect(page.getByText('Balance total')).toBeVisible();
    await expect(page.locator('dashboard-page .greeting')).toContainText(
      'Marcos García',
    );
    await pause(1400);

    // Asistente IA
    await page.locator('finap-assistant-chat .fab').click();
    const chat = page.locator('finap-assistant-chat');
    await chat.getByRole('button', { name: /gasté|spend/i }).first().click();
    await expect(chat.locator('finap-assistant-message').nth(1)).toBeVisible();
    await pause(1400);
    await page.locator('finap-assistant-chat .fab').click();
    await pause(400);

    // Movimientos
    await page.goto('/movements');
    await expect(page.getByText('Salario').first()).toBeVisible();
    await pause(1400);

    // Análisis
    await page.goto('/analysis');
    await expect(page.locator('finap-chart')).toHaveCount(2);
    await pause(1400);

    // Deudas
    await page.goto('/debts');
    await expect(page.getByText('Préstamo auto').first()).toBeVisible();
    await pause(1200);

    // Ajustes
    await page.goto('/settings');
    await expect(page.getByRole('heading', { name: 'Perfil' })).toBeVisible();
    await pause(1200);
  });
});
