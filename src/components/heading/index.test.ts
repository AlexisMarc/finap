import { describe, it, expect } from 'vitest';

import { FinapHeading } from './index.js';

describe('finap-heading', () => {
  it('renderiza un h2 cuando level=2', async () => {
    const el = document.createElement('finap-heading') as FinapHeading;
    el.level = 2;
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.shadowRoot?.querySelector('h2')).not.toBeNull();
    el.remove();
  });

  it('usa h1 por defecto', async () => {
    const el = document.createElement('finap-heading') as FinapHeading;
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.shadowRoot?.querySelector('h1')).not.toBeNull();
    el.remove();
  });

  it('limita el nivel al rango 1-6', async () => {
    const el = document.createElement('finap-heading') as FinapHeading;
    el.level = 99;
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.shadowRoot?.querySelector('h6')).not.toBeNull();
    el.remove();
  });

  it('usa tokens tipográficos', () => {
    const cssText = FinapHeading.styles.cssText;
    expect(cssText).toContain('var(--finap-font-family)');
    expect(cssText).toContain('var(--finap-color-text)');
  });
});
