import { describe, it, expect } from 'vitest';

import { FinapIcon } from './index.js';

describe('finap-icon', () => {
  it('renderiza un <svg> para un nombre de icono conocido', async () => {
    const el = document.createElement('finap-icon') as FinapIcon;
    el.name = 'home';
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.shadowRoot?.querySelector('svg')).not.toBeNull();
    el.remove();
  });

  it('no renderiza un svg para un nombre desconocido', async () => {
    const el = document.createElement('finap-icon') as FinapIcon;
    el.name = 'no-existe';
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.shadowRoot?.querySelector('svg')).toBeNull();
    el.remove();
  });
});
