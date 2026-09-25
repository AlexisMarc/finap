import { describe, it, expect } from 'vitest';

import { FinapMovementsList } from './index.js';
import { fixture, teardown } from '../../test/fixture.js';

describe('finap-movements-list', () => {
  it('renderiza una fila por movimiento', async () => {
    const el = new FinapMovementsList();
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

    expect(el.shadowRoot?.querySelectorAll('sp-table-row').length).toBe(2);
    teardown(el);
  });

  it('emite finap-edit y finap-delete', async () => {
    const el = new FinapMovementsList();
    const transaction = {
      id: 't1',
      type: 'expense' as const,
      amount: 980,
      categoryId: 'c_vivienda',
      date: '2025-05-12',
      note: 'Renta',
    };
    el.transactions = [transaction];
    await fixture(el);

    const events: string[] = [];
    el.addEventListener('finap-edit', () => events.push('edit'));
    el.addEventListener('finap-delete', () => events.push('delete'));

    const buttons = el.shadowRoot?.querySelectorAll('sp-button');
    (buttons?.[0] as HTMLElement).click();
    (buttons?.[1] as HTMLElement).click();

    expect(events).toEqual(['edit', 'delete']);
    teardown(el);
  });
});
