// Módulo interno de Open Cells (sin tipos propios); el shim está en
// `src/types/open-cells-internal.d.ts`.
import { Router } from '@open-cells/core/src/router.js';

let patched = false;

function patchHistoryEvents(): void {
  if (patched) return;
  patched = true;

  const push = history.pushState.bind(history);
  const replace = history.replaceState.bind(history);

  history.pushState = (...args: Parameters<History['pushState']>) => {
    push(...args);
    window.dispatchEvent(new Event('pushstate'));
  };
  history.replaceState = (...args: Parameters<History['replaceState']>) => {
    replace(...args);
    window.dispatchEvent(new Event('pushstate'));
  };
}

/**
 * Activa el routing por history (URLs limpias, sin `#`) en Open Cells.
 *
 * Open Cells soporta `useHistory`, pero su implementación tiene dos carencias
 * que aquí cubrimos:
 * - `pushState`/`replaceState` no emiten evento: lo sintetizamos.
 * - La comparación interna de `go()` usa el hash: en history mode debe usar el path.
 *
 * Debe llamarse antes de `startApp`.
 */
export function enableHistoryRouting(): void {
  const router = new Router() as Router & {
    _getHashPath: () => string;
    _getURLPath: () => string;
  };
  router.useHistory = true;
  patchHistoryEvents();
  router._getHashPath = () => router._getURLPath();
}
