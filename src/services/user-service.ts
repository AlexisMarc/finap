import { apiFetch } from './http.js';
import type { User } from './types.js';
import { getSession, setSession } from '../state/session.js';

export function getProfile(): Promise<User> {
  return apiFetch<User>('/me');
}

export function updateProfile(input: Partial<User>): Promise<User> {
  return apiFetch<User>('/me', {
    method: 'PATCH',
    body: JSON.stringify(input),
  });
}

export function updateLocalProfile(input: Partial<User>): void {
  const session = getSession();
  if (!session) return;
  setSession({ ...session, user: { ...session.user, ...input } });
}
