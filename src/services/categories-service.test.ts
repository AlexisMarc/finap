import { describe, it, expect, vi } from 'vitest';

import {
  list,
  create,
  update,
  remove,
} from './categories-service.js';

function ok(body: unknown) {
  return { ok: true, status: 200, json: async () => body };
}

describe('categories-service', () => {
  it('lista categorías', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue(ok([]));
    await list();
    expect(globalThis.fetch).toHaveBeenCalledWith(
      '/api/v1/categories',
      expect.anything(),
    );
  });

  it('crea, actualiza y elimina', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue(ok({ id: 'c1' }));
    await create({ name: 'Ocio', color: '#fff', icon: 'list' });
    expect(globalThis.fetch).toHaveBeenLastCalledWith(
      '/api/v1/categories',
      expect.objectContaining({ method: 'POST' }),
    );

    await update('c1', { name: 'Ocio' });
    expect(globalThis.fetch).toHaveBeenLastCalledWith(
      '/api/v1/categories/c1',
      expect.objectContaining({ method: 'PATCH' }),
    );

    globalThis.fetch = vi
      .fn()
      .mockResolvedValue({ ok: true, status: 204, statusText: 'No Content' });
    await remove('c1');
    expect(globalThis.fetch).toHaveBeenLastCalledWith(
      '/api/v1/categories/c1',
      expect.objectContaining({ method: 'DELETE' }),
    );
  });
});
