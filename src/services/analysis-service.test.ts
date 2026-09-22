import { describe, it, expect, vi } from 'vitest';

import { getSummary, getByCategory, getEvolution } from './analysis-service.js';

function ok(body: unknown) {
  return { ok: true, status: 200, json: async () => body };
}

describe('analysis-service', () => {
  it('obtiene el resumen del periodo', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue(ok({ balance: 1 }));
    await getSummary('2025-05-01', '2025-05-31');
    expect(globalThis.fetch).toHaveBeenCalledWith(
      '/api/v1/analysis/summary?from=2025-05-01&to=2025-05-31',
      expect.anything(),
    );
  });

  it('obtiene el desglose por categoría', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue(ok([]));
    await getByCategory('2025-05-01', '2025-05-31', 'expense');
    expect(globalThis.fetch).toHaveBeenCalledWith(
      '/api/v1/analysis/by-category?from=2025-05-01&to=2025-05-31&type=expense',
      expect.anything(),
    );
  });

  it('obtiene la evolución con intervalo', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue(ok({ points: [] }));
    await getEvolution('2025-01-01', '2025-05-31', 'month');
    expect(globalThis.fetch).toHaveBeenCalledWith(
      '/api/v1/analysis/evolution?from=2025-01-01&to=2025-05-31&interval=month',
      expect.anything(),
    );
  });
});
