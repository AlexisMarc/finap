import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../services/auth-service.js', () => ({
  login: vi.fn(),
}));

import { LoginPage } from './login-page.js';
import { fixture, teardown } from '../test/fixture.js';
import { login } from '../services/auth-service.js';
import { setLocale } from '../i18n/i18n.js';

const mockedLogin = vi.mocked(login);

describe('login-page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    setLocale('es');
  });

  it('renderiza el formulario de login', async () => {
    const el = await fixture(new LoginPage());
    expect(el.shadowRoot?.querySelector('finap-login-form')).not.toBeNull();
    teardown(el);
  });

  it('traduce el contenido al cambiar de idioma', async () => {
    const el = await fixture(new LoginPage());

    setLocale('en');
    await el.updateComplete;

    expect(el.shadowRoot?.textContent).toContain('Sign in to manage');
    teardown(el);
  });

  it('inicia sesión al recibir finap-login', async () => {
    mockedLogin.mockResolvedValue({
      token: 't',
      user: { id: 'u', name: 'Marcos', email: 'm@finap.app' },
    });
    const el = await fixture(new LoginPage());

    const form = el.shadowRoot?.querySelector(
      'finap-login-form',
    ) as HTMLElement;
    form.dispatchEvent(
      new CustomEvent('finap-login', {
        detail: { email: 'm@finap.app', password: 'secret' },
        bubbles: true,
        composed: true,
      }),
    );
    await el.updateComplete;

    expect(mockedLogin).toHaveBeenCalledWith('m@finap.app', 'secret');
    teardown(el);
  });

  it('muestra el error si falla el login', async () => {
    mockedLogin.mockRejectedValue(new Error('Credenciales inválidas'));
    const el = await fixture(new LoginPage());

    const form = el.shadowRoot?.querySelector(
      'finap-login-form',
    ) as HTMLElement;
    form.dispatchEvent(
      new CustomEvent('finap-login', {
        detail: { email: 'm@finap.app', password: 'bad' },
        bubbles: true,
        composed: true,
      }),
    );
    await el.updateComplete;

    expect(el.error).toBe('Credenciales inválidas');
    teardown(el);
  });
});
