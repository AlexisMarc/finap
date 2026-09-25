import { describe, it, expect } from 'vitest';

import { FinapModal } from './index.js';
import { fixture, teardown } from '../../test/fixture.js';

describe('finap-modal', () => {
  it('no renderiza nada cuando está cerrado', async () => {
    const el = await fixture(new FinapModal());
    expect(el.shadowRoot?.querySelector('.overlay')).toBeNull();
    teardown(el);
  });

  it('renderiza el diálogo de Spectrum cuando está abierto', async () => {
    const el = new FinapModal();
    el.open = true;
    el.heading = 'Nuevo registro';
    await fixture(el);

    const root = el.shadowRoot as ShadowRoot;
    expect(root.querySelector('.overlay')).not.toBeNull();
    expect(root.querySelector('sp-dialog')).not.toBeNull();
    expect(root.querySelector('[slot="heading"]')?.textContent).toBe(
      'Nuevo registro',
    );
    teardown(el);
  });

  it('cierra con Escape y emite finap-close', async () => {
    const el = new FinapModal();
    el.open = true;
    await fixture(el);

    let closed = false;
    el.addEventListener('finap-close', () => {
      closed = true;
    });

    document.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }),
    );

    expect(el.open).toBe(false);
    expect(closed).toBe(true);
    teardown(el);
  });
});
