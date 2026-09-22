import { describe, it, expect } from 'vitest';

import { FinapHeading, type HeadingLevel } from './index.js';
import { fixture, teardown } from '../../test/fixture.js';

describe('finap-heading', () => {
  it('renderiza un h2 cuando level=2', async () => {
    const el = new FinapHeading();
    el.level = 2;
    await fixture(el);

    expect(el.shadowRoot?.querySelector('h2')).not.toBeNull();
    teardown(el);
  });

  it('usa h1 por defecto', async () => {
    const el = await fixture(new FinapHeading());
    expect(el.shadowRoot?.querySelector('h1')).not.toBeNull();
    teardown(el);
  });

  it('limita el nivel al rango 1-6', async () => {
    const el = new FinapHeading();
    el.level = 99 as HeadingLevel;
    await fixture(el);

    expect(el.shadowRoot?.querySelector('h6')).not.toBeNull();
    teardown(el);
  });

  it('usa tokens tipográficos', () => {
    const cssText = FinapHeading.styles.cssText;
    expect(cssText).toContain('var(--finap-font-family-display)');
    expect(cssText).toContain('var(--finap-color-text)');
  });
});
