/** Porcentaje (0-100) de progreso de un valor sobre un máximo. */
export function progressPercent(value: number, max: number): number {
  if (max <= 0) return 0;
  return Math.min(Math.max((value / max) * 100, 0), 100);
}

/** Indica si el valor supera el máximo. */
export function isOver(value: number, max: number): boolean {
  return max > 0 && value > max;
}

export type ProgressVariant = 'positive' | 'notice' | 'negative';

/** Color del progreso según la cercanía a la meta (verde cerca, ámbar medio, rojo lejos). */
export function progressVariant(percent: number): ProgressVariant {
  if (percent >= 100) return 'positive';
  if (percent >= 50) return 'notice';
  return 'negative';
}
