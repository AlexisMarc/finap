import { describe, it, expect } from 'vitest';

import {
  formatCurrency,
  formatPercent,
  formatDate,
  formatRelativeDate,
} from './format.js';

describe('format', () => {
  it('formatea moneda', () => {
    expect(formatCurrency(24580)).toBe('$24,580.00');
    expect(formatCurrency(6200)).toBe('$6,200.00');
  });

  it('formatea porcentajes', () => {
    expect(formatPercent(12.5)).toBe('12.5%');
    expect(formatPercent(40)).toBe('40%');
  });

  it('formatea fechas cortas', () => {
    expect(formatDate('2025-05-12')).toContain('12');
  });

  it('formatea fechas relativas', () => {
    const now = new Date('2025-05-12T10:00:00');
    expect(formatRelativeDate('2025-05-12', 'es-CO', now)).toBe('Hoy');
    expect(formatRelativeDate('2025-05-11', 'es-CO', now)).toBe('Ayer');
  });
});
