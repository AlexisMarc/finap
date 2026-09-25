import { describe, it, expect } from 'vitest';

import { FinapDashboardDebts } from './index.js';
import { fixture, teardown } from '../../test/fixture.js';

describe('finap-dashboard-debts', () => {
  it('muestra las deudas con su progreso y el pendiente total', async () => {
    const el = new FinapDashboardDebts();
    el.debts = [
      { id: 'd1', name: 'Préstamo auto', total: 2800, paid: 1820 },
      { id: 'd2', name: 'Préstamo personal', total: 640, paid: 576 },
    ];
    await fixture(el);

    const root = el.shadowRoot as ShadowRoot;
    expect(root.querySelector('.pending')?.textContent).toContain('$1,044.00');
    expect(root.querySelectorAll('.finap-progress').length).toBe(2);
    expect(root.querySelector('.debt')).not.toBeNull();
    teardown(el);
  });
});
