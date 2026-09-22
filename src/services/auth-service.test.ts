import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

import { login, logout, fetchSession } from './auth-service.js';
import { hasSession, getSession } from '../state/session.js';
import { ApiError } from './http.js';

function jsonResponse(status: number, body: unknown) {
  return {
    ok: status >= 200 && status < 300,
    status,
    statusText: 'OK',
    json: async () => body,
  };
}

describe('auth-service', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('login guarda la sesión', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue(
      jsonResponse(200, {
        token: 't_1',
        user: { id: 'u_1', name: 'Marcos', email: 'm@finap.app' },
      }),
    );

    const session = await login('m@finap.app', 'secret');

    expect(session.token).toBe('t_1');
    expect(hasSession()).toBe(true);
    expect(getSession()?.user.name).toBe('Marcos');
  });

  it('login lanza ApiError con credenciales inválidas', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue(
      jsonResponse(401, {
        error: { code: 'unauthorized', message: 'Credenciales inválidas' },
      }),
    );

    await expect(login('m@finap.app', 'bad')).rejects.toBeInstanceOf(ApiError);
    expect(hasSession()).toBe(false);
  });

  it('logout limpia la sesión', async () => {
    localStorage.setItem(
      'finap-session',
      JSON.stringify({ token: 't', user: { id: 'u', name: 'A', email: 'a@a' } }),
    );
    globalThis.fetch = vi
      .fn()
      .mockResolvedValue({ ok: true, status: 204, statusText: 'No Content' });

    await logout();

    expect(hasSession()).toBe(false);
  });

  it('fetchSession devuelve el usuario', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue(
      jsonResponse(200, {
        user: { id: 'u_1', name: 'Marcos', email: 'm@finap.app' },
      }),
    );

    const user = await fetchSession();
    expect(user.name).toBe('Marcos');
  });
});
