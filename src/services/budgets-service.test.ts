import { describe, it, expect, vi } from 'vitest';

import {
  list,
  create,
  update,
  remove,
} from './budgets-service.js';

function ok(body: unknown) {
  return { ok: true, status: 200, json: async () => body };
}

describe('budgets-service', () => {
  it('lista presupuestos por mes', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue(ok([]));
    await list('2025-05');
    expect(globalThis.fetch).toHaveBeenCalledWith(
      '/api/v1/budgets?month=2025-05',
      expect.anything(),
    );
  });

  it('crea, actualiza y elimina', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue(ok({ id: 'b1' }));
    await create({ categoryId: 'c1', month: '2025-05', limit: 900 });
    expect(globalThis.fetch).toHaveBeenLastCalledWith(
      '/api/v1/budgets',
      expect.objectContaining({ method: 'POST' }),
    );

    await update('b1', { limit: 1200 });
    expect(globalThis.fetch).toHaveBeenLastCalledWith(
      '/api/v1/budgets/b1',
      expect.objectContaining({ method: 'PATCH' }),
    );

    globalThis.fetch = vi
      .fn()
      .mockResolvedValue({ ok: true, status: 204, statusText: 'No Content' });
    await remove('b1');
    expect(globalThis.fetch).toHaveBeenLastCalledWith(
      '/api/v1/budgets/b1',
      expect.objectContaining({ method: 'DELETE' }),
    );
  });
});
