import { describe, it, expect } from 'vitest';

import { FinapContainer } from './index.js';

describe('finap-container', () => {
  it('renderiza un contenedor con ancho máximo por token', async () => {
    const el = document.createElement('finap-container') as FinapContainer;
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.shadowRoot?.querySelector('.container')).not.toBeNull();
    el.remove();
  });

  it('usa el token de ancho máximo', () => {
    expect(FinapContainer.styles.cssText).toContain(
      'var(--finap-container-max-width)',
    );
  });
});
