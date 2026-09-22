import { describe, it, expect } from 'vitest';

import { contrastRatio, meetsAA } from './contrast.js';

describe('contrastRatio', () => {
  it('devuelve 21:1 para negro sobre blanco', () => {
    expect(contrastRatio('#000000', '#ffffff')).toBeCloseTo(21, 1);
  });

  it('devuelve 1:1 para colores idénticos', () => {
    expect(contrastRatio('#1a1a1a', '#1a1a1a')).toBeCloseTo(1, 3);
  });
});

describe('contraste AA de la paleta', () => {
  it.each([
    ['texto sobre fondo (claro)', '#1a1a1a', '#ffffff'],
    ['texto muted sobre fondo (claro)', '#5c5c5c', '#ffffff'],
    ['texto sobre fondo (oscuro)', '#ffffff', '#0d0d12'],
    ['texto muted sobre fondo (oscuro)', '#9b9ba8', '#0d0d12'],
    ['texto sobre superficie (oscuro)', '#ffffff', '#1e1e26'],
    ['ingreso sobre superficie (oscuro)', '#2fc78a', '#1e1e26'],
    ['acento-2 sobre superficie (oscuro)', '#9b7cff', '#1e1e26'],
    ['texto sobre primario', '#ffffff', '#eb001b'],
  ])('%s cumple WCAG AA', (_name, fg, bg) => {
    expect(meetsAA(fg, bg)).toBe(true);
  });
});
