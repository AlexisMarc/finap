import { describe, it, expect } from 'vitest';

import { FinapDashboardRecent } from './index.js';
import { fixture, teardown } from '../../test/fixture.js';

describe('finap-dashboard-recent', () => {
  it('lista los últimos movimientos', async () => {
    const el = new FinapDashboardRecent();
    el.transactions = [
      {
        id: 't1',
        type: 'income',
        amount: 2800,
        categoryId: 'c_nomina',
        date: '2025-05-12',
        note: 'Salario',
      },
      {
        id: 't2',
        type: 'expense',
        amount: 980,
        categoryId: 'c_vivienda',
        date: '2025-05-11',
        note: 'Renta',
      },
    ];
    await fixture(el);

    const items = el.shadowRoot?.querySelectorAll('sp-table-row');
    expect(items?.length).toBe(2);
    expect(el.shadowRoot?.querySelector('.more')).not.toBeNull();
    teardown(el);
  });
});
