/** Marcador único para datos de prueba, de forma que sean identificables y limpiables. */
export function uniqueMarker(prefix = 'E2E'): string {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
}
