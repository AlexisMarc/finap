import { describe, it, expect } from 'vitest';

import { FinapInput } from './index.js';
import { fixture, teardown } from '../../test/fixture.js';

describe('finap-input', () => {
  it('renderiza la etiqueta y un campo numérico de Spectrum', async () => {
    const el = new FinapInput();
    el.label = 'Importe';
    el.type = 'number';
    await fixture(el);

    const root = el.shadowRoot as ShadowRoot;
    expect(root.querySelector('label')?.textContent).toContain('Importe');
    expect(root.querySelector('sp-number-field')).not.toBeNull();
    teardown(el);
  });

  it('renderiza un textarea nativo', async () => {
    const el = new FinapInput();
    el.type = 'textarea';
    await fixture(el);
    expect(el.shadowRoot?.querySelector('textarea')).not.toBeNull();
    teardown(el);
  });

  it('renderiza un campo de texto de Spectrum para texto', async () => {
    const el = await fixture(new FinapInput());
    expect(el.shadowRoot?.querySelector('sp-textfield')).not.toBeNull();
    teardown(el);
  });

  it('muestra el error y lo asocia al campo', async () => {
    const el = new FinapInput();
    el.error = 'Requerido';
    await fixture(el);
    expect(el.shadowRoot?.querySelector('.error')?.textContent).toContain(
      'Requerido',
    );
    teardown(el);
  });

  it('emite finap-input al escribir', async () => {
    const el = await fixture(new FinapInput());
    let received = '';
    el.addEventListener('finap-input', (e) => {
      received = (e as CustomEvent).detail;
    });

    const field = el.shadowRoot?.querySelector('sp-textfield') as HTMLElement & {
      value: string;
    };
    field.value = '42';
    field.dispatchEvent(new Event('input', { bubbles: true, composed: true }));

    expect(received).toBe('42');
    teardown(el);
  });
});
