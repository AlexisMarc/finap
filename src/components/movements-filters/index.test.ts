import { describe, it, expect } from 'vitest';

import { FinapMovementsFilters } from './index.js';
import { fixture, teardown } from '../../test/fixture.js';

describe('finap-movements-filters', () => {
  it('emite finap-filter-change al elegir un tipo', async () => {
    const el = await fixture(new FinapMovementsFilters());

    let detail: Record<string, unknown> | null = null;
    el.addEventListener('finap-filter-change', (e) => {
      detail = (e as CustomEvent).detail;
    });

    const chips = el.shadowRoot?.querySelectorAll('finap-chip');
    (chips?.[1] as HTMLElement).click();

    expect(detail).toMatchObject({ type: 'expense' });
    teardown(el);
  });

  it('lista las categorías en el select', async () => {
    const el = new FinapMovementsFilters();
    el.categories = [{ id: 'c1', name: 'Vivienda', color: '#f00', icon: 'home' }];
    await fixture(el);

    const select = el.shadowRoot?.querySelector('finap-select') as HTMLElement & {
      options: Array<{ value: string; label: string }>;
    };
    expect(select.options.length).toBe(2);
    teardown(el);
  });

  it('emite la búsqueda al escribir', async () => {
    const el = await fixture(new FinapMovementsFilters());

    let detail: Record<string, unknown> | null = null;
    el.addEventListener('finap-filter-change', (e) => {
      detail = (e as CustomEvent).detail;
    });

    const inputs = el.shadowRoot?.querySelectorAll('finap-input');
    (inputs?.[2] as HTMLElement).dispatchEvent(
      new CustomEvent('finap-input', { detail: 'renta' }),
    );

    expect(detail).toMatchObject({ search: 'renta' });
    teardown(el);
  });
});
