import { describe, it, expect, vi } from 'vitest';

import { list, getById, create, update, remove } from './transactions-service.js';

function ok(body: unknown) {
  return { ok: true, status: 200, json: async () => body };
}

describe('transactions-service', () => {
  it('lista con filtros en la query', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue(
      ok({ items: [], total: 0, page: 1, pageSize: 20 }),
    );

    await list({ type: 'expense', categoryId: 'c1', search: 'renta', page: 1, pageSize: 20 });

    expect(globalThis.fetch).toHaveBeenCalledWith(
      '/api/v1/transactions?type=expense&categoryId=c1&search=renta&page=1&pageSize=20',
      expect.anything(),
    );
  });

  it('omite filtros vacíos', async () => {
    globalThis.fetch = vi
      .fn()
      .mockResolvedValue(ok({ items: [], total: 0, page: 1, pageSize: 20 }));

    await list({ type: '', categoryId: '' });

    expect(globalThis.fetch).toHaveBeenCalledWith(
      '/api/v1/transactions',
      expect.anything(),
    );
  });

  it('obtiene un movimiento por id', async () => {
    globalThis.fetch = vi
      .fn()
      .mockResolvedValue(ok({ id: 't1', amount: 10 }));

    const transaction = await getById('t1');
    expect(transaction.id).toBe('t1');
  });

  it('crea un movimiento', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue(ok({ id: 't9' }));

    await create({
      type: 'expense',
      amount: 86.4,
      categoryId: 'c_alim',
      date: '2025-05-11',
      note: 'Mercado',
    });

    expect(globalThis.fetch).toHaveBeenCalledWith(
      '/api/v1/transactions',
      expect.objectContaining({ method: 'POST' }),
    );
  });

  it('actualiza un movimiento', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue(ok({ id: 't1' }));

    await update('t1', { amount: 100 });

    expect(globalThis.fetch).toHaveBeenCalledWith(
      '/api/v1/transactions/t1',
      expect.objectContaining({ method: 'PATCH' }),
    );
  });

  it('elimina un movimiento', async () => {
    globalThis.fetch = vi
      .fn()
      .mockResolvedValue({ ok: true, status: 204, statusText: 'No Content' });

    await remove('t1');

    expect(globalThis.fetch).toHaveBeenCalledWith(
      '/api/v1/transactions/t1',
      expect.objectContaining({ method: 'DELETE' }),
    );
  });
});
