import { describe, it, expect } from 'vitest';

import { FinapCategoryForm } from './index.js';
import { fixture, teardown } from '../../test/fixture.js';

describe('finap-category-form', () => {
  it('valida el nombre obligatorio', async () => {
    const el = await fixture(new FinapCategoryForm());

    let saved = false;
    el.addEventListener('finap-save', () => {
      saved = true;
    });

    (el.shadowRoot?.querySelectorAll('sp-button')[1] as HTMLElement).click();
    await el.updateComplete;

    expect(saved).toBe(false);
    expect(el.errors.name).toBeTruthy();
    teardown(el);
  });

  it('emite finap-save con nombre, color e icono', async () => {
    const el = await fixture(new FinapCategoryForm());

    let detail: Record<string, unknown> | null = null;
    el.addEventListener('finap-save', (e) => {
      detail = (e as CustomEvent).detail;
    });

    (el.shadowRoot?.querySelector('finap-input') as HTMLElement).dispatchEvent(
      new CustomEvent('finap-input', { detail: 'Ocio' }),
    );
    const swatches = el.shadowRoot?.querySelectorAll('.swatch');
    (swatches?.[2] as HTMLElement).click();
    (el.shadowRoot?.querySelectorAll('sp-button')[1] as HTMLElement).click();

    expect(detail).toMatchObject({ name: 'Ocio', color: '#F79E1B' });
    teardown(el);
  });

  it('precarga los datos al editar', async () => {
    const el = new FinapCategoryForm();
    el.category = { id: 'c1', name: 'Vivienda', color: '#EB001B', icon: 'home' };
    await fixture(el);

    expect(el.name).toBe('Vivienda');
    expect(el.color).toBe('#EB001B');
    expect(el.icon).toBe('home');
    teardown(el);
  });
});
