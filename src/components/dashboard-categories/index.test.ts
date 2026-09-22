import { describe, it, expect } from 'vitest';

import { FinapDashboardCategories } from './index.js';
import { fixture, teardown } from '../../test/fixture.js';

describe('finap-dashboard-categories', () => {
  it('lista las categorías con su porcentaje', async () => {
    const el = new FinapDashboardCategories();
    el.categories = [
      {
        categoryId: 'c1',
        name: 'Vivienda',
        color: '#EB001B',
        amount: 1392,
        percentage: 40,
      },
      {
        categoryId: 'c2',
        name: 'Alimentación',
        color: '#F79E1B',
        amount: 870,
        percentage: 25,
      },
    ];
    await fixture(el);

    const rows = el.shadowRoot?.querySelectorAll('.row');
    expect(rows?.length).toBe(2);
    expect(rows?.[0].textContent).toContain('Vivienda');
    expect(rows?.[0].textContent).toContain('40%');
    teardown(el);
  });

  it('no renderiza filas sin categorías', async () => {
    const el = await fixture(new FinapDashboardCategories());
    expect(el.shadowRoot?.querySelectorAll('.row').length).toBe(0);
    teardown(el);
  });
});
