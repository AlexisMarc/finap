import { describe, it, expect } from 'vitest';

import { FinapContainer } from './index.js';
import { fixture, teardown } from '../../test/fixture.js';

describe('finap-container', () => {
  it('renderiza un contenedor con ancho máximo por token', async () => {
    const el = await fixture(new FinapContainer());
    expect(el.shadowRoot?.querySelector('.container')).not.toBeNull();
    teardown(el);
  });

  it('usa el token de ancho máximo', () => {
    expect(FinapContainer.styles.cssText).toContain(
      'var(--finap-container-max-width)',
    );
  });
});
