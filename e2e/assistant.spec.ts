import { test, expect } from '@playwright/test';

test.describe('Asistente IA', () => {
  test('responde a una pregunta', async ({ page }) => {
    await page.goto('/dashboard');

    const chat = page.locator('finap-assistant-chat');
    await chat.locator('input[type="text"]').fill('¿En qué gasté más?');
    await chat.getByRole('button', { name: /Enviar|Send/i }).click();

    // Aparecen el mensaje del usuario y la respuesta del asistente
    await expect(chat.locator('finap-assistant-message').first()).toBeVisible();
    await expect(chat.locator('finap-assistant-message').nth(1)).toBeVisible();
  });

  test('usa una pregunta rápida', async ({ page }) => {
    await page.goto('/dashboard');
    const chat = page.locator('finap-assistant-chat');
    await chat.getByRole('button', { name: /gasté|spend|debo|owe/i }).first().click();
    await expect(chat.locator('finap-assistant-message').first()).toBeVisible();
  });
});
