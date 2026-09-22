import { describe, it, expect, beforeEach, vi } from 'vitest';

import { FinapAppShell } from './index.js';
import { fixture, teardown } from '../../test/fixture.js';
import { setSession } from '../../state/session.js';
import { setLocale } from '../../i18n/i18n.js';

describe('finap-app-shell', () => {
  beforeEach(() => {
    localStorage.clear();
    setLocale('es');
  });

  it('en modo público solo renderiza el slot (sin chrome)', async () => {
    const el = new FinapAppShell();
    el.currentPage = 'landing-page';
    await fixture(el);

    expect(el.shadowRoot?.querySelector('.sidebar')).toBeNull();
    expect(el.shadowRoot?.querySelector('.bottom-nav')).toBeNull();
    expect(el.shadowRoot?.querySelector('slot')).not.toBeNull();
    teardown(el);
  });

  it('en modo app renderiza sidebar, header y bottom nav', async () => {
    const el = new FinapAppShell();
    el.currentPage = 'dashboard-page';
    await fixture(el);

    expect(el.shadowRoot?.querySelector('.sidebar')).not.toBeNull();
    expect(el.shadowRoot?.querySelector('.topbar')).not.toBeNull();
    expect(el.shadowRoot?.querySelector('.bottom-nav')).not.toBeNull();
    teardown(el);
  });

  it('marca la sección activa con aria-current', async () => {
    const el = new FinapAppShell();
    el.currentPage = 'movements-page';
    await fixture(el);

    const active = el.shadowRoot?.querySelector('[aria-current="page"]');
    expect(active?.textContent).toContain('Movimientos');
    teardown(el);
  });

  it('traduce la navegación al cambiar de idioma', async () => {
    const el = new FinapAppShell();
    el.currentPage = 'dashboard-page';
    await fixture(el);

    setLocale('en');
    await el.updateComplete;

    expect(el.shadowRoot?.querySelector('.sidebar')?.textContent).toContain(
      'Home',
    );
    teardown(el);
  });

  it('detecta la página actual desde #app', async () => {
    const el = new FinapAppShell();
    const app = document.createElement('div');
    app.id = 'app';
    el.appendChild(app);
    await fixture(el);

    app.innerHTML = '<dashboard-page></dashboard-page>';
    await new Promise((resolve) => setTimeout(resolve, 0));
    await el.updateComplete;

    expect(el.currentSection).toBe('dashboard');
    teardown(el);
  });

  it('cerrar sesión limpia la sesión', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 204,
      statusText: 'No Content',
    });
    setSession({
      token: 't',
      user: { id: 'u1', name: 'Marcos', email: 'm@finap.app' },
    });
    const el = new FinapAppShell();
    el.currentPage = 'dashboard-page';
    await fixture(el);

    el.dispatchEvent(
      new CustomEvent('finap-logout', { bubbles: true, composed: true }),
    );

    expect(localStorage.getItem('finap-session')).toBeNull();
    teardown(el);
  });
});
