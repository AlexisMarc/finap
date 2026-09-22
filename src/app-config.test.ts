import { describe, it, expect, beforeEach } from 'vitest';

import { appConfig, sessionGuard } from './app-config.js';
import { setSession, clearSession } from './state/session.js';

describe('app-config', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('apunta al nodo principal #app', () => {
    expect(appConfig.mainNode).toBe('app');
  });

  it('incluye la ruta raíz hacia la landing', () => {
    expect(appConfig.routes?.some((r) => r.name === 'landing')).toBe(true);
  });

  it('el guard intercepta rutas de la app sin sesión', () => {
    clearSession();
    const result = sessionGuard({ to: { page: 'dashboard' } });
    expect(result.intercept).toBe(true);
    expect(result.redirect?.page).toBe('login');
  });

  it('el guard permite rutas de la app con sesión', () => {
    setSession({
      token: 't',
      user: { id: 'u1', name: 'Marcos', email: 'm@finap.app' },
    });
    const result = sessionGuard({ to: { page: 'dashboard' } });
    expect(result.intercept).toBe(false);
  });

  it('el guard redirige al dashboard si hay sesión e intenta login', () => {
    setSession({
      token: 't',
      user: { id: 'u1', name: 'Marcos', email: 'm@finap.app' },
    });
    const result = sessionGuard({ to: { page: 'login' } });
    expect(result.intercept).toBe(true);
    expect(result.redirect?.page).toBe('dashboard');
  });

  it('el guard no intercepta la landing', () => {
    clearSession();
    const result = sessionGuard({ to: { page: 'landing' } });
    expect(result.intercept).toBe(false);
  });
});
