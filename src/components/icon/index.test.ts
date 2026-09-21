import { describe, it, expect } from 'vitest';

import { FinapIcon } from './index.js';
import { fixture, teardown } from '../../test/fixture.js';

describe('finap-icon', () => {
  it('renderiza un <svg> para un nombre de icono conocido', async () => {
    const el = new FinapIcon();
    el.name = 'home';
    await fixture(el);

    expect(el.shadowRoot?.querySelector('svg')).not.toBeNull();
    teardown(el);
  });

  it('no renderiza un svg para un nombre desconocido', async () => {
    const el = new FinapIcon();
    el.name = 'no-existe';
    await fixture(el);

    expect(el.shadowRoot?.querySelector('svg')).toBeNull();
    teardown(el);
  });
});
