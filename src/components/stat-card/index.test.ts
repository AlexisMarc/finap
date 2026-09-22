import { describe, it, expect } from 'vitest';

import { FinapStatCard } from './index.js';
import { fixture, teardown } from '../../test/fixture.js';

describe('finap-stat-card', () => {
  it('renderiza etiqueta y valor', async () => {
    const el = new FinapStatCard();
    el.label = 'Ingresos';
    el.value = '+$6,200';
    await fixture(el);

    const root = el.shadowRoot as ShadowRoot;
    expect(root.querySelector('.label')?.textContent).toContain('Ingresos');
    expect(root.querySelector('.value')?.textContent).toContain('+$6,200');
    teardown(el);
  });

  it('aplica el color semántico según la variación', async () => {
    const el = new FinapStatCard();
    el.delta = '+12.5%';
    el.trend = 'up';
    await fixture(el);

    expect(el.shadowRoot?.querySelector('.trend--up')).not.toBeNull();
    teardown(el);
  });

  it('usa tokens de diseño', () => {
    const cssText = FinapStatCard.styles.cssText;
    expect(cssText).toContain('var(--finap-color-surface)');
    expect(cssText).toContain('var(--finap-font-family-display)');
  });
});
