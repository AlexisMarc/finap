import { describe, it, expect } from 'vitest';

import { FinapButton } from './index.js';
import { fixture, teardown } from '../../test/fixture.js';

describe('finap-button', () => {
  it('renderiza un <sp-button> con variante accent por defecto', async () => {
    const el = await fixture(new FinapButton());

    const button = el.shadowRoot?.querySelector('sp-button');
    expect(button).not.toBeNull();
    expect(button?.getAttribute('variant')).toBe('accent');
    teardown(el);
  });

  it('aplica la variante secundaria cuando se indica', async () => {
    const el = new FinapButton();
    el.variant = 'secondary';
    await fixture(el);

    expect(
      el.shadowRoot?.querySelector('sp-button')?.getAttribute('variant'),
    ).toBe('secondary');
    teardown(el);
  });

  it('usa tratamiento outline para la variante de texto', async () => {
    const el = new FinapButton();
    el.variant = 'text';
    await fixture(el);

    expect(
      el.shadowRoot?.querySelector('sp-button')?.getAttribute('treatment'),
    ).toBe('outline');
    teardown(el);
  });

  it('marca el botón como deshabilitado', async () => {
    const el = new FinapButton();
    el.disabled = true;
    await fixture(el);

    expect(
      el.shadowRoot?.querySelector('sp-button')?.hasAttribute('disabled'),
    ).toBe(true);
    teardown(el);
  });

  it('usa un componente Spectrum, que soporta activación por teclado', async () => {
    const el = await fixture(new FinapButton());
    expect(el.shadowRoot?.querySelector('sp-button')?.tagName).toBe('SP-BUTTON');
    teardown(el);
  });
});
