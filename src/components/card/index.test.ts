import { describe, it, expect } from 'vitest';

import { FinapCard } from './index.js';

describe('finap-card', () => {
  it('proyecta el contenido en el slot', async () => {
    const el = document.createElement('finap-card') as FinapCard;
    el.textContent = 'Contenido';
    document.body.appendChild(el);
    await el.updateComplete;

    const slot = el.shadowRoot?.querySelector('slot');
    expect(slot).not.toBeNull();
    el.remove();
  });

  it('usa tokens de diseño para superficie y elevación', () => {
    const cssText = FinapCard.styles.cssText;
    expect(cssText).toContain('var(--finap-color-surface)');
    expect(cssText).toContain('var(--finap-shadow-md)');
    expect(cssText).toContain('var(--finap-radius-lg)');
  });
});
