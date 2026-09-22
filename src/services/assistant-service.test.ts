import { describe, it, expect, vi } from 'vitest';

import { ask } from './assistant-service.js';

describe('assistant-service', () => {
  it('envía la pregunta al asistente', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ answer: 'Vivienda (40%).' }),
    });

    const result = await ask('¿En qué gasté más?');

    expect(globalThis.fetch).toHaveBeenCalledWith(
      '/api/v1/assistant/ask',
      expect.objectContaining({ method: 'POST' }),
    );
    expect(result.answer).toBe('Vivienda (40%).');
  });
});
