import { describe, it, expect } from 'vitest';

import { FinapDebtItem } from './index.js';
import { fixture, teardown } from '../../test/fixture.js';

describe('finap-debt-item', () => {
  it('muestra la deuda con su progreso', async () => {
    const el = new FinapDebtItem();
    el.debt = { id: 'd1', name: 'Préstamo auto', total: 2800, paid: 1820 };
    await fixture(el);

    expect(el.shadowRoot?.querySelector('.name')?.textContent).toContain(
      'Préstamo auto',
    );
    expect(el.shadowRoot?.querySelector('sp-progress-bar')).not.toBeNull();
    teardown(el);
  });

  it('marca la deuda como pagada', async () => {
    const el = new FinapDebtItem();
    el.debt = { id: 'd1', name: 'X', total: 100, paid: 100 };
    await fixture(el);
    expect(el.shadowRoot?.querySelector('sp-badge')).not.toBeNull();
    teardown(el);
  });

  it('emite finap-pay al pulsar registrar pago', async () => {
    const el = new FinapDebtItem();
    el.debt = { id: 'd1', name: 'X', total: 100, paid: 0 };
    await fixture(el);

    let paid = false;
    el.addEventListener('finap-pay', () => {
      paid = true;
    });
    (el.shadowRoot?.querySelector('sp-button') as HTMLElement).click();

    expect(paid).toBe(true);
    teardown(el);
  });
});
