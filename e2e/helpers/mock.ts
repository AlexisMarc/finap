import type { Page } from '@playwright/test';

/** Fuerza un error de servidor en un endpoint concreto (estado difícil de provocar). */
export async function mockApiError(
  page: Page,
  path: string,
  status = 500,
): Promise<void> {
  await page.route(`**/api/v1/${path}`, (route) =>
    route.fulfill({
      status,
      contentType: 'application/json',
      body: JSON.stringify({
        error: { code: 'server_error', message: 'Error del servidor' },
      }),
    }),
  );
}

/** Simula pérdida de red para toda la API. */
export async function mockOffline(page: Page): Promise<void> {
  await page.route('**/api/v1/**', (route) => route.abort('failed'));
}
