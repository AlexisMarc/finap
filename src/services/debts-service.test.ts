import { describe, it, expect, vi } from 'vitest';

import {
  list,
  create,
  update,
  remove,
  registerPayment,
} from './debts-service.js';

function ok(body: unknown) {
  return { ok: true, status: 200, json: async () => body };
}

describe('debts-service', () => {
  it('lista deudas', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue(ok([]));
    await list();
    expect(globalThis.fetch).toHaveBeenCalledWith(
      '/api/v1/debts',
      expect.anything(),
    );
  });

  it('crea, actualiza y elimina', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue(ok({ id: 'd1' }));
    await create({ name: 'Auto', total: 2800 });
    expect(globalThis.fetch).toHaveBeenLastCalledWith(
      '/api/v1/debts',
      expect.objectContaining({ method: 'POST' }),
    );

    await update('d1', { total: 3000 });
    expect(globalThis.fetch).toHaveBeenLastCalledWith(
      '/api/v1/debts/d1',
      expect.objectContaining({ method: 'PATCH' }),
    );

    globalThis.fetch = vi
      .fn()
      .mockResolvedValue({ ok: true, status: 204, statusText: 'No Content' });
    await remove('d1');
    expect(globalThis.fetch).toHaveBeenLastCalledWith(
      '/api/v1/debts/d1',
      expect.objectContaining({ method: 'DELETE' }),
    );
  });

  it('registra un pago', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue(ok({ id: 'd1', paid: 200 }));
    await registerPayment('d1', 200);
    expect(globalThis.fetch).toHaveBeenCalledWith(
      '/api/v1/debts/d1/payments',
      expect.objectContaining({ method: 'POST' }),
    );
  });
});
