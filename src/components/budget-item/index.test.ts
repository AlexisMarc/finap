import { describe, it, expect } from 'vitest';

import { FinapBudgetItem } from './index.js';
import { fixture, teardown } from '../../test/fixture.js';

describe('finap-budget-item', () => {
  it('muestra el gasto frente al límite', async () => {
    const el = new FinapBudgetItem();
    el.budget = {
      id: 'b1',
      categoryId: 'c1',
      month: '2025-05',
      limit: 900,
      spent: 870,
    };
    el.category = { id: 'c1', name: 'Alimentación', color: '#F79E1B', icon: 'list' };
    await fixture(el);

    const root = el.shadowRoot as ShadowRoot;
    expect(root.querySelector('.name')?.textContent).toContain('Alimentación');
    expect(root.querySelector('finap-progress')).not.toBeNull();
    teardown(el);
  });

  it('avisa cuando se excede el límite', async () => {
    const el = new FinapBudgetItem();
    el.budget = {
      id: 'b1',
      categoryId: 'c1',
      month: '2025-05',
      limit: 500,
      spent: 600,
    };
    await fixture(el);

    expect(el.shadowRoot?.querySelector('.over')).not.toBeNull();
    teardown(el);
  });
});
