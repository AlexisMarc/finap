import { describe, it, expect, beforeEach } from 'vitest';

import {
  formatCurrency,
  formatPercent,
  formatDate,
  formatRelativeDate,
} from './format.js';
import { setLocale } from '../i18n/i18n.js';

describe('format', () => {
  beforeEach(() => {
    localStorage.clear();
    setLocale('es');
  });

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
    expect(formatRelativeDate('2025-05-12', undefined, now)).toBe('Hoy');
    expect(formatRelativeDate('2025-05-11', undefined, now)).toBe('Ayer');
  });

  it('traduce las fechas relativas al idioma activo', () => {
    setLocale('en');
    const now = new Date('2025-05-12T10:00:00');
    expect(formatRelativeDate('2025-05-12', undefined, now)).toBe('Today');
    expect(formatRelativeDate('2025-05-11', undefined, now)).toBe('Yesterday');
  });
});

