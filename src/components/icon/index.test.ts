import { describe, it, expect } from 'vitest';

import { FinapIcon } from './index.js';
import { fixture, teardown } from '../../test/fixture.js';

describe('finap-icon', () => {
  it('renderiza un icono de Spectrum para un nombre conocido', async () => {
    const el = new FinapIcon();
    el.name = 'home';
    await fixture(el);

    expect(el.shadowRoot?.querySelector('sp-icon')).not.toBeNull();
    teardown(el);
  });

  it('no renderiza icono para un nombre desconocido', async () => {
    const el = new FinapIcon();
    el.name = 'no-existe';
    await fixture(el);

    expect(el.shadowRoot?.querySelector('sp-icon')).toBeNull();
    expect(el.shadowRoot?.querySelector('.icon-empty')).not.toBeNull();
    teardown(el);
  });
});
