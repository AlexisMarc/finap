import { describe, it, expect } from 'vitest';

import { FinapCard } from './index.js';
import { fixture, teardown } from '../../test/fixture.js';

describe('finap-card', () => {
  it('proyecta el contenido en el slot', async () => {
    const el = await fixture(new FinapCard());
    expect(el.shadowRoot?.querySelector('slot')).not.toBeNull();
    teardown(el);
  });

  it('usa tokens de diseño para superficie y elevación', () => {
    const cssText = FinapCard.styles.cssText;
    expect(cssText).toContain('var(--finap-color-surface)');
    expect(cssText).toContain('var(--finap-shadow-sm)');
    expect(cssText).toContain('var(--finap-radius-lg)');
  });
});
