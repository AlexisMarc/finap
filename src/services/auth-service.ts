import { apiFetch } from './http.js';
import type { AuthSession, User } from './types.js';
import { setSession, clearSession, type Session } from '../state/session.js';

export async function login(email: string, password: string): Promise<Session> {
  const data = await apiFetch<AuthSession>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  const session: Session = { token: data.token, user: data.user };
  setSession(session);
  return session;
}

export async function fetchSession(): Promise<User> {
  const data = await apiFetch<{ user: User }>('/auth/session');
  return data.user;
}

export async function logout(): Promise<void> {
  clearSession();
  try {
    await apiFetch('/auth/logout', { method: 'POST' });
  } catch {
    // la sesión local ya está limpia; el error del servidor no es bloqueante
  }
}
