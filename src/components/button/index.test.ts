import { describe, it, expect } from 'vitest';

import { FinapButton } from './index.js';

describe('finap-button', () => {
  it('renderiza un <button> nativo con variante primaria por defecto', async () => {
    const el = document.createElement('finap-button') as FinapButton;
    document.body.appendChild(el);
    await el.updateComplete;

    const button = el.shadowRoot?.querySelector('button');
    expect(button).not.toBeNull();
    expect(button?.classList.contains('primary')).toBe(true);
    el.remove();
  });

  it('aplica la variante secundaria cuando se indica', async () => {
    const el = document.createElement('finap-button') as FinapButton;
    el.setAttribute('variant', 'secondary');
    document.body.appendChild(el);
    await el.updateComplete;

    const button = el.shadowRoot?.querySelector('button');
    expect(button?.classList.contains('secondary')).toBe(true);
    el.remove();
  });

  it('marca el botón como deshabilitado', async () => {
    const el = document.createElement('finap-button') as FinapButton;
    el.disabled = true;
    document.body.appendChild(el);
    await el.updateComplete;

    const button = el.shadowRoot?.querySelector('button');
    expect(button?.hasAttribute('disabled')).toBe(true);
    el.remove();
  });

  it('usa tokens de diseño en lugar de valores hardcodeados', () => {
    const cssText = FinapButton.styles.cssText;
    expect(cssText).toContain('var(--finap-');
    expect(cssText).toContain('var(--finap-color-primary)');
  });
});
