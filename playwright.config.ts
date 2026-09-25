import { defineConfig, devices } from '@playwright/test';

const API_BASE_URL =
  process.env.E2E_API_BASE_URL ?? 'http://localhost:3000/api/v1';
const PORT = 4173;
const BASE_URL = process.env.E2E_BASE_URL ?? `http://localhost:${PORT}`;

export default defineConfig({
  testDir: './e2e',
  // El backend real comparte estado: ejecutamos en serie para evitar interferencias.
  fullyParallel: false,
  workers: 1,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: BASE_URL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  // Si se apunta a un despliegue (E2E_BASE_URL), no levantamos servidor local.
  webServer: process.env.E2E_BASE_URL
    ? undefined
    : {
        command: `VITE_API_BASE_URL=${API_BASE_URL} npm run build && npm run preview -- --port ${PORT} --strictPort`,
        url: BASE_URL,
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
      },
});
