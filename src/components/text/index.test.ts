import { describe, it, expect } from 'vitest';

import { FinapText } from './index.js';

describe('finap-text', () => {
  it('renderiza un <p> con variante body por defecto', async () => {
    const el = document.createElement('finap-text') as FinapText;
    el.textContent = 'Texto';
    document.body.appendChild(el);
    await el.updateComplete;

    const p = el.shadowRoot?.querySelector('p');
    expect(p).not.toBeNull();
    expect(p?.classList.contains('body')).toBe(true);
    el.remove();
  });

  it('aplica la variante muted', async () => {
    const el = document.createElement('finap-text') as FinapText;
    el.variant = 'muted';
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.shadowRoot?.querySelector('p')?.classList.contains('muted')).toBe(
      true,
    );
    el.remove();
  });

  it('usa tokens de texto', () => {
    const cssText = FinapText.styles.cssText;
    expect(cssText).toContain('var(--finap-color-text)');
    expect(cssText).toContain('var(--finap-font-size-md)');
  });
});
