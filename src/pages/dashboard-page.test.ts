import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../services/dashboard-service.js', () => ({
  getDashboard: vi.fn(),
}));

import { DashboardPage } from './dashboard-page.js';
import { fixture, teardown } from '../test/fixture.js';
import { getDashboard } from '../services/dashboard-service.js';

const mockedGetDashboard = vi.mocked(getDashboard);

const SUMMARY = {
  balance: 24580,
  income: 6200,
  expense: 3480,
  trend: 12.5,
  categories: [
    {
      categoryId: 'c1',
      name: 'Vivienda',
      color: '#EB001B',
      amount: 1392,
      percentage: 40,
    },
  ],
  debts: [{ id: 'd1', name: 'Préstamo auto', total: 2800, paid: 1820 }],
  recentTransactions: [
    {
      id: 't1',
      type: 'income' as const,
      amount: 2800,
      categoryId: 'c_nomina',
      date: '2025-05-12',
      note: 'Salario',
    },
  ],
};

async function flush(): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 0));
}

describe('dashboard-page', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('carga y renderiza las secciones', async () => {
    mockedGetDashboard.mockResolvedValue(SUMMARY);
    const el = await fixture(new DashboardPage());
    await flush();
    await el.updateComplete;

    const root = el.shadowRoot as ShadowRoot;
    expect(root.querySelector('finap-dashboard-summary')).not.toBeNull();
    expect(root.querySelector('finap-dashboard-categories')).not.toBeNull();
    expect(root.querySelector('finap-dashboard-debts')).not.toBeNull();
    expect(root.querySelector('finap-dashboard-recent')).not.toBeNull();
    teardown(el);
  });

  it('muestra el estado de error con reintento', async () => {
    mockedGetDashboard.mockRejectedValue(new Error('Fallo de red'));
    const el = await fixture(new DashboardPage());
    await flush();
    await el.updateComplete;

    expect(el.error).toBe('Fallo de red');
    expect(el.shadowRoot?.querySelector('finap-button')).not.toBeNull();
    teardown(el);
  });
});
