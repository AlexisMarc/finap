import { describe, it, expect, vi } from 'vitest';

import { getDashboard } from './dashboard-service.js';

describe('dashboard-service', () => {
  it('obtiene el resumen del dashboard', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({
        balance: 24580,
        income: 6200,
        expense: 3480,
        trend: 12.5,
        categories: [],
        debts: [],
        recentTransactions: [],
      }),
    });

    const summary = await getDashboard('2025-05');

    expect(globalThis.fetch).toHaveBeenCalledWith(
      '/api/v1/dashboard?month=2025-05',
      expect.anything(),
    );
    expect(summary.balance).toBe(24580);
  });
});
