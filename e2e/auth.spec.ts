import { test, expect } from '@playwright/test';

import { loginViaUI } from './helpers/auth';

// Estos tests validan el propio login/guard: parten sin sesión.
test.use({ storageState: { cookies: [], origins: [] } });

test.describe('Autenticación', () => {
  test('login válido, acceso al dashboard y logout', async ({ page }) => {
    await loginViaUI(page);
    await expect(page).toHaveURL(/\/dashboard$/);

    // Menú de usuario → cerrar sesión
    await page.getByRole('button', { name: /Cuenta|Account/i }).click();
    await page.getByRole('menuitem', { name: /Cerrar sesión|Sign out/i }).click();
    await expect(page).toHaveURL(/\/$/);
  });

  test('credenciales inválidas muestran error', async ({ page }) => {
    await page.goto('/login');
    await page.locator('input[type="email"]').fill('nadie@finap.app');
    await page.locator('input[type="password"]').fill('incorrecta');
    await page.getByRole('button', { name: /Entrar|Sign in/i }).click();

    await expect(page.locator('.error')).toContainText(
      /Credenciales inválidas|Could not sign in/i,
    );
    await expect(page).toHaveURL(/\/login/);
  });

  test('guard: sin sesión redirige a login', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page).toHaveURL(/\/login$/);
  });
});
