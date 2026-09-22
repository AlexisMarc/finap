import { describe, it, expect } from 'vitest';

import { FinapListItem } from './index.js';
import { fixture, teardown } from '../../test/fixture.js';

describe('finap-list-item', () => {
  it('muestra título, subtítulo y valor', async () => {
    const el = new FinapListItem();
    el.title = 'Salario';
    el.subtitle = 'Nómina';
    el.value = '+$2,800.00';
    await fixture(el);

    const root = el.shadowRoot as ShadowRoot;
    expect(root.querySelector('.title')?.textContent).toContain('Salario');
    expect(root.querySelector('.subtitle')?.textContent).toContain('Nómina');
    expect(root.querySelector('.value')?.textContent).toContain('+$2,800.00');
    teardown(el);
  });

  it('aplica el tono semántico al valor', async () => {
    const el = new FinapListItem();
    el.tone = 'income';
    await fixture(el);
    expect(el.shadowRoot?.querySelector('.value--income')).not.toBeNull();
    teardown(el);
  });
});
