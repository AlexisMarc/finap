export const CONNECTION_CHANGED_EVENT = 'finap-connection-changed';

export function isOnline(): boolean {
  return typeof navigator === 'undefined' ? true : navigator.onLine;
}

function emit(online: boolean): void {
  window.dispatchEvent(
    new CustomEvent<boolean>(CONNECTION_CHANGED_EVENT, { detail: online }),
  );
}

export function initConnectionStatus(): void {
  window.addEventListener('online', () => emit(true));
  window.addEventListener('offline', () => emit(false));
}
