import { describe, it, expect } from 'vitest';

import { FinapSkeleton } from './index.js';
import { fixture, teardown } from '../../test/fixture.js';

describe('finap-skeleton', () => {
  it('renderiza un skeleton de texto por defecto', async () => {
    const el = await fixture(new FinapSkeleton());
    expect(el.shadowRoot?.querySelector('.skeleton--text')).not.toBeNull();
    teardown(el);
  });

  it('soporta variante rect con tamaño', async () => {
    const el = new FinapSkeleton();
    el.variant = 'rect';
    el.height = '200px';
    await fixture(el);

    const el2 = el.shadowRoot?.querySelector('.skeleton--rect') as HTMLElement;
    expect(el2).not.toBeNull();
    expect(el2.style.height).toBe('200px');
    teardown(el);
  });

  it('soporta variante circle', async () => {
    const el = new FinapSkeleton();
    el.variant = 'circle';
    await fixture(el);
    expect(el.shadowRoot?.querySelector('.skeleton--circle')).not.toBeNull();
    teardown(el);
  });
});
