import { describe, it, expect } from 'vitest';

import { FinapConfirmDialog } from './index.js';
import { fixture, teardown } from '../../test/fixture.js';

describe('finap-confirm-dialog', () => {
  it('no renderiza el modal cuando está cerrado', async () => {
    const el = await fixture(new FinapConfirmDialog());
    const modal = el.shadowRoot?.querySelector('finap-modal') as HTMLElement & {
      open: boolean;
    };
    expect(modal.open).toBe(false);
    teardown(el);
  });

  it('emite finap-confirm al confirmar', async () => {
    const el = new FinapConfirmDialog();
    el.open = true;
    el.message = '¿Eliminar el movimiento?';
    await fixture(el);

    let confirmed = false;
    el.addEventListener('finap-confirm', () => {
      confirmed = true;
    });

    const buttons = el.shadowRoot?.querySelectorAll('finap-button');
    (buttons?.[1] as HTMLElement).click();

    expect(confirmed).toBe(true);
    teardown(el);
  });

  it('emite finap-cancel al cancelar', async () => {
    const el = new FinapConfirmDialog();
    el.open = true;
    await fixture(el);

    let cancelled = false;
    el.addEventListener('finap-cancel', () => {
      cancelled = true;
    });

    const buttons = el.shadowRoot?.querySelectorAll('finap-button');
    (buttons?.[0] as HTMLElement).click();

    expect(cancelled).toBe(true);
    teardown(el);
  });
});
