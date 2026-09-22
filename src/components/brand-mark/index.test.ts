import { describe, it, expect } from 'vitest';

import { FinapBrandMark } from './index.js';
import { fixture, teardown } from '../../test/fixture.js';

describe('finap-brand-mark', () => {
  it('renderiza dos rombos de marca', async () => {
    const el = await fixture(new FinapBrandMark());

    const rhombi = el.shadowRoot?.querySelectorAll('.rhombus');
    expect(rhombi?.length).toBe(2);
    teardown(el);
  });

  it('no renderiza círculos', async () => {
    const el = await fixture(new FinapBrandMark());

    expect(el.shadowRoot?.querySelector('.circle')).toBeNull();
    teardown(el);
  });

  it('usa la forma de rombo (cuadrado rotado 45°)', () => {
    const cssText = FinapBrandMark.styles.cssText;
    expect(cssText).toContain('rotate(45deg)');
  });

  it('usa los colores de marca primario y secundario', () => {
    const cssText = FinapBrandMark.styles.cssText;
    expect(cssText).toContain('var(--finap-color-primary)');
    expect(cssText).toContain('var(--finap-color-secondary)');
  });
});
