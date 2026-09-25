import { describe, it, expect } from 'vitest';

import { FinapTransactionForm } from './index.js';
import { fixture, teardown } from '../../test/fixture.js';

const CATEGORIES = [
  { id: 'c_vivienda', name: 'Vivienda', color: '#f00', icon: 'home' },
  { id: 'c_alim', name: 'Alimentación', color: '#f90', icon: 'shopping' },
];

describe('finap-transaction-form', () => {
  it('valida campos obligatorios', async () => {
    const el = new FinapTransactionForm();
    el.categories = CATEGORIES;
    await fixture(el);

    let saved = false;
    el.addEventListener('finap-save', () => {
      saved = true;
    });

    (el.shadowRoot?.querySelectorAll('sp-button')[1] as HTMLElement).click();
    await el.updateComplete;

    expect(saved).toBe(false);
    expect(el.errors.amount).toBeTruthy();
    expect(el.errors.categoryId).toBeTruthy();
    teardown(el);
  });

  it('emite finap-save con datos válidos', async () => {
    const el = new FinapTransactionForm();
    el.categories = CATEGORIES;
    await fixture(el);

    let detail: Record<string, unknown> | null = null;
    el.addEventListener('finap-save', (e) => {
      detail = (e as CustomEvent).detail;
    });

    const inputs = el.shadowRoot?.querySelectorAll('finap-input');
    (inputs?.[0] as HTMLElement).dispatchEvent(
      new CustomEvent('finap-input', { detail: '86.4' }),
    );
    (el.shadowRoot?.querySelector('finap-select') as HTMLElement).dispatchEvent(
      new CustomEvent('finap-change', { detail: 'c_alim' }),
    );
    (el.shadowRoot?.querySelectorAll('sp-button')[1] as HTMLElement).click();

    expect(detail).toMatchObject({
      type: 'expense',
      amount: 86.4,
      categoryId: 'c_alim',
    });
    teardown(el);
  });

  it('precarga los datos al editar', async () => {
    const el = new FinapTransactionForm();
    el.categories = CATEGORIES;
    el.transaction = {
      id: 't1',
      type: 'income',
      amount: 2800,
      categoryId: 'c_vivienda',
      date: '2025-05-12',
      note: 'Salario',
    };
    await fixture(el);

    expect(el.type).toBe('income');
    expect(el.amount).toBe('2800');
    expect(el.categoryId).toBe('c_vivienda');
    expect(el.note).toBe('Salario');
    teardown(el);
  });
});
