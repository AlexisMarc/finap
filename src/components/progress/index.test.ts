import { describe, it, expect } from 'vitest';

import { FinapProgress } from './index.js';
import { fixture, teardown } from '../../test/fixture.js';

describe('finap-progress', () => {
  it('refleja el porcentaje de progreso', async () => {
    const el = new FinapProgress();
    el.value = 65;
    el.max = 100;
    await fixture(el);

    const fill = el.shadowRoot?.querySelector('.fill') as HTMLElement;
    expect(fill.style.width).toBe('65%');
    teardown(el);
  });

  it('marca el exceso cuando supera el máximo', async () => {
    const el = new FinapProgress();
    el.value = 120;
    el.max = 100;
    await fixture(el);

    expect(el.shadowRoot?.querySelector('.fill--over')).not.toBeNull();
    teardown(el);
  });

  it('expone el rol de accesibilidad', async () => {
    const el = await fixture(new FinapProgress());
    expect(el.shadowRoot?.querySelector('[role="progressbar"]')).not.toBeNull();
    teardown(el);
  });
});
