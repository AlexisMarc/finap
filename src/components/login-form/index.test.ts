import { describe, it, expect } from 'vitest';

import { FinapLoginForm } from './index.js';
import { fixture, teardown } from '../../test/fixture.js';

describe('finap-login-form', () => {
  it('valida campos vacíos y no emite finap-login', async () => {
    const el = await fixture(new FinapLoginForm());

    let emitted = false;
    el.addEventListener('finap-login', () => {
      emitted = true;
    });

    (el.shadowRoot?.querySelector('finap-button') as HTMLElement).click();
    await el.updateComplete;

    expect(emitted).toBe(false);
    expect(el.emailError).not.toBe('');
    expect(el.passwordError).not.toBe('');
    teardown(el);
  });

  it('valida el formato del email', async () => {
    const el = new FinapLoginForm();
    await fixture(el);

    (el.shadowRoot?.querySelector('finap-button') as HTMLElement).click();
    await el.updateComplete;

    // Setea email inválido y contraseña, vuelve a enviar
    const inputs = el.shadowRoot?.querySelectorAll('finap-input');
    (inputs?.[0] as HTMLElement).dispatchEvent(
      new CustomEvent('finap-input', { detail: 'no-es-email' }),
    );
    (inputs?.[1] as HTMLElement).dispatchEvent(
      new CustomEvent('finap-input', { detail: 'secret' }),
    );
    (el.shadowRoot?.querySelector('finap-button') as HTMLElement).click();
    await el.updateComplete;

    expect(el.emailError).toContain('válido');
    teardown(el);
  });

  it('emite finap-login con credenciales válidas', async () => {
    const el = new FinapLoginForm();
    await fixture(el);

    let detail: { email: string; password: string } | null = null;
    el.addEventListener('finap-login', (e) => {
      detail = (e as CustomEvent).detail;
    });

    const inputs = el.shadowRoot?.querySelectorAll('finap-input');
    (inputs?.[0] as HTMLElement).dispatchEvent(
      new CustomEvent('finap-input', { detail: 'm@finap.app' }),
    );
    (inputs?.[1] as HTMLElement).dispatchEvent(
      new CustomEvent('finap-input', { detail: 'secret' }),
    );
    (el.shadowRoot?.querySelector('finap-button') as HTMLElement).click();

    expect(detail).toEqual({ email: 'm@finap.app', password: 'secret' });
    teardown(el);
  });
});
