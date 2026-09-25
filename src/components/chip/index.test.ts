import { describe, it, expect } from 'vitest';

import { FinapChip } from './index.js';
import { fixture, teardown } from '../../test/fixture.js';

describe('finap-chip', () => {
  it('renderiza su contenido', async () => {
    const el = new FinapChip();
    el.textContent = 'Vivienda';
    await fixture(el);

    expect(el.shadowRoot?.querySelector('sp-tag')).not.toBeNull();
    teardown(el);
  });

  it('refleja el estado seleccionado', async () => {
    const el = new FinapChip();
    el.selected = true;
    await fixture(el);

    expect(el.hasAttribute('selected')).toBe(true);
    expect(
      el.shadowRoot?.querySelector('sp-tag')?.hasAttribute('selected'),
    ).toBe(true);
    teardown(el);
  });

  it('expone rol de botón cuando es interactivo', async () => {
    const el = new FinapChip();
    el.clickable = true;
    await fixture(el);

    const tag = el.shadowRoot?.querySelector('sp-tag');
    expect(tag?.getAttribute('role')).toBe('button');
    expect(tag?.getAttribute('tabindex')).toBe('0');
    teardown(el);
  });

  it('muestra el punto de color cuando se indica', async () => {
    const el = new FinapChip();
    el.color = '#EB001B';
    await fixture(el);

    expect(el.shadowRoot?.querySelector('.dot')).not.toBeNull();
    teardown(el);
  });
});
