import { describe, it, expect } from 'vitest';

import { FinapSelect } from './index.js';
import { fixture, teardown } from '../../test/fixture.js';

describe('finap-select', () => {
  it('renderiza las opciones', async () => {
    const el = new FinapSelect();
    el.label = 'Categoría';
    el.options = [
      { value: 'c_vivienda', label: 'Vivienda' },
      { value: 'c_alim', label: 'Alimentación' },
    ];
    await fixture(el);

    const options = el.shadowRoot?.querySelectorAll('option');
    expect(options?.length).toBe(2);
    expect(options?.[0].textContent).toContain('Vivienda');
    teardown(el);
  });

  it('emite finap-change al seleccionar', async () => {
    const el = new FinapSelect();
    el.options = [{ value: 'c_alim', label: 'Alimentación' }];
    await fixture(el);

    let received = '';
    el.addEventListener('finap-change', (e) => {
      received = (e as CustomEvent).detail;
    });

    const select = el.shadowRoot?.querySelector('select') as HTMLSelectElement;
    select.value = 'c_alim';
    select.dispatchEvent(new Event('change', { bubbles: true, composed: true }));

    expect(received).toBe('c_alim');
    teardown(el);
  });
});
