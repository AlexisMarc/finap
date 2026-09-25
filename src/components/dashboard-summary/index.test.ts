import { describe, it, expect } from 'vitest';

import { FinapDashboardSummary } from './index.js';
import { fixture, teardown } from '../../test/fixture.js';

describe('finap-dashboard-summary', () => {
  it('muestra el balance sin repetir el saludo del header', async () => {
    const el = new FinapDashboardSummary();
    el.name = 'Marcos';
    el.balance = 24580;
    await fixture(el);

    const root = el.shadowRoot as ShadowRoot;
    expect(root.querySelector('.hello')).toBeNull();
    expect(root.querySelector('.balance')?.textContent).toContain('$24,580.00');
    teardown(el);
  });

  it('muestra las tarjetas de estadística', async () => {
    const el = new FinapDashboardSummary();
    await fixture(el);

    expect(el.shadowRoot?.querySelectorAll('.stat').length).toBe(3);
    teardown(el);
  });
});
