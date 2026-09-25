import { describe, it, expect } from 'vitest';

import { FinapProgress } from './index.js';
import { fixture, teardown } from '../../test/fixture.js';

describe('finap-progress', () => {
  it('refleja el porcentaje de progreso', async () => {
    const el = new FinapProgress();
    el.value = 65;
    el.max = 100;
    await fixture(el);

    const bar = el.shadowRoot?.querySelector('sp-progress-bar') as HTMLElement & {
      progress: number;
    };
    expect(bar.progress).toBe(65);
    teardown(el);
  });

  it('marca el exceso cuando supera el máximo', async () => {
    const el = new FinapProgress();
    el.value = 120;
    el.max = 100;
    await fixture(el);

    expect(
      el.shadowRoot?.querySelector('sp-progress-bar')?.hasAttribute('over'),
    ).toBe(true);
    teardown(el);
  });

  it('usa la primitiva de progreso de Spectrum', async () => {
    const el = await fixture(new FinapProgress());
    expect(el.shadowRoot?.querySelector('sp-progress-bar')).not.toBeNull();
    teardown(el);
  });
});
