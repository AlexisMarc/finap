import { describe, it, expect } from 'vitest';

import { FinapBrandMark } from './index.js';
import { fixture, teardown } from '../../test/fixture.js';

describe('finap-brand-mark', () => {
  it('renderiza dos círculos de marca', async () => {
    const el = await fixture(new FinapBrandMark());

    const circles = el.shadowRoot?.querySelectorAll('.circle');
    expect(circles?.length).toBe(2);
    teardown(el);
  });

  it('usa los colores de marca primario y secundario', () => {
    const cssText = FinapBrandMark.styles.cssText;
    expect(cssText).toContain('var(--finap-color-primary)');
    expect(cssText).toContain('var(--finap-color-secondary)');
  });
});
