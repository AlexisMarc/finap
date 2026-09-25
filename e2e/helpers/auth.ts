import { expect, type Page } from '@playwright/test';

export const E2E_EMAIL = process.env.E2E_EMAIL ?? 'marcos@finap.app';
export const E2E_PASSWORD = process.env.E2E_PASSWORD ?? 'secret123';

/** Inicia sesión por la UI (flujo real) y espera a llegar al dashboard. */
export async function loginViaUI(page: Page): Promise<void> {
  await page.goto('/login');
  await page.locator('input[type="email"]').fill(E2E_EMAIL);
  await page.locator('input[type="password"]').fill(E2E_PASSWORD);
  await page.getByRole('button', { name: /Entrar|Sign in/ }).click();
  await expect(page).toHaveURL(/\/dashboard/);
}

/**
 * Atajo: siembra la sesión en localStorage (evita el formulario).
 * Útil en pruebas que no dependen de la API real (p. ej. tema/idioma).
 */
export async function seedSession(
  page: Page,
  user: { id: string; name: string; email: string; currency?: string } = {
    id: 'u_1',
    name: 'E2E User',
    email: E2E_EMAIL,
    currency: 'USD',
  },
): Promise<void> {
  await page.addInitScript(
    (session) => {
      window.localStorage.setItem('finap-session', JSON.stringify(session));
    },
    { token: 'e2e-token', user },
  );
}
