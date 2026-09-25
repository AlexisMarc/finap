import { describe, it, expect } from 'vitest';

import { FinapDebtForm } from './index.js';
import { fixture, teardown } from '../../test/fixture.js';

describe('finap-debt-form', () => {
  it('valida nombre e importe', async () => {
    const el = await fixture(new FinapDebtForm());

    let saved = false;
    el.addEventListener('finap-save', () => {
      saved = true;
    });
    (el.shadowRoot?.querySelectorAll('sp-button')[1] as HTMLElement).click();
    await el.updateComplete;

    expect(saved).toBe(false);
    expect(el.errors.name).toBeTruthy();
    expect(el.errors.total).toBeTruthy();
    teardown(el);
  });

  it('emite finap-save con datos válidos', async () => {
    const el = await fixture(new FinapDebtForm());

    let detail: Record<string, unknown> | null = null;
    el.addEventListener('finap-save', (e) => {
      detail = (e as CustomEvent).detail;
    });

    const inputs = el.shadowRoot?.querySelectorAll('finap-input');
    (inputs?.[0] as HTMLElement).dispatchEvent(
      new CustomEvent('finap-input', { detail: 'Préstamo auto' }),
    );
    (inputs?.[1] as HTMLElement).dispatchEvent(
      new CustomEvent('finap-input', { detail: '2800' }),
    );
    (el.shadowRoot?.querySelectorAll('sp-button')[1] as HTMLElement).click();

    expect(detail).toMatchObject({ name: 'Préstamo auto', total: 2800 });
    teardown(el);
  });

  it('precarga los datos al editar', async () => {
    const el = new FinapDebtForm();
    el.debt = { id: 'd1', name: 'Auto', total: 2800, paid: 1820 };
    await fixture(el);

    expect(el.name).toBe('Auto');
    expect(el.total).toBe('2800');
    expect(el.paid).toBe('1820');
    teardown(el);
  });
});
