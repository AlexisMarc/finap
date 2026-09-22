import { describe, it, expect, beforeEach, vi } from 'vitest';

import {
  getSession,
  hasSession,
  setSession,
  clearSession,
  SESSION_CHANGED_EVENT,
} from './session.js';

describe('session', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('no hay sesión por defecto', () => {
    expect(getSession()).toBeNull();
    expect(hasSession()).toBe(false);
  });

  it('guarda y recupera la sesión', () => {
    setSession({
      token: 't',
      user: { id: 'u_1', name: 'Marcos', email: 'm@finap.app' },
    });
    expect(hasSession()).toBe(true);
    expect(getSession()?.user.name).toBe('Marcos');
  });

  it('emite el evento al cambiar la sesión', () => {
    const listener = vi.fn();
    document.documentElement.addEventListener(SESSION_CHANGED_EVENT, listener);

    setSession({
      token: 't',
      user: { id: 'u_1', name: 'Marcos', email: 'm@finap.app' },
    });
    clearSession();

    expect(listener).toHaveBeenCalledTimes(2);
    document.documentElement.removeEventListener(
      SESSION_CHANGED_EVENT,
      listener,
    );
  });
});
