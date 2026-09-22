/**
 * Open Cells usa routing por hash (`#!/ruta`). Si el usuario entra por una ruta
 * de path (p. ej. `/dashboard`), la normalizamos a hash antes de arrancar.
 */
export function normalizeInitialUrl(
  location: Location = window.location,
  history: History = window.history,
): void {
  const { pathname, hash, search } = location;
  if (pathname && pathname !== '/' && !hash) {
    history.replaceState(null, '', `/#${pathname}${search}`);
  }
}
