import { describe, it, expect, vi } from 'vitest';

import { getProfile, updateProfile, updateLocalProfile } from './user-service.js';
import { setSession, getUser } from '../state/session.js';

function ok(body: unknown) {
  return { ok: true, status: 200, json: async () => body };
}

describe('user-service', () => {
  it('obtiene el perfil', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue(ok({ id: 'u1' }));
    await getProfile();
    expect(globalThis.fetch).toHaveBeenCalledWith(
      '/api/v1/me',
      expect.anything(),
    );
  });

  it('actualiza el perfil', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue(ok({ id: 'u1' }));
    await updateProfile({ currency: 'COP' });
    expect(globalThis.fetch).toHaveBeenCalledWith(
      '/api/v1/me',
      expect.objectContaining({ method: 'PATCH' }),
    );
  });

  it('actualiza el perfil local', () => {
    localStorage.clear();
    setSession({
      token: 't',
      user: { id: 'u1', name: 'Marcos', email: 'm@finap.app' },
    });
    updateLocalProfile({ name: 'Marcos G.' });
    expect(getUser()?.name).toBe('Marcos G.');
  });
});
