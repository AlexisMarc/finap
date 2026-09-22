export interface SessionUser {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

export interface Session {
  token: string;
  user: SessionUser;
}

const STORAGE_KEY = 'finap-session';

export const SESSION_CHANGED_EVENT = 'finap-session-changed';

function emit(session: Session | null): void {
  document.documentElement.dispatchEvent(
    new CustomEvent<Session | null>(SESSION_CHANGED_EVENT, { detail: session }),
  );
}

export function getSession(): Session | null {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as Session;
  } catch {
    return null;
  }
}

export function hasSession(): boolean {
  return getSession() !== null;
}

export function setSession(session: Session): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  emit(session);
}

export function clearSession(): void {
  localStorage.removeItem(STORAGE_KEY);
  emit(null);
}
