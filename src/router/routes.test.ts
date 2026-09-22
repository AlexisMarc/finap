import { describe, it, expect } from 'vitest';

import { routes } from './routes.js';

describe('routes', () => {
  it('define la ruta landing como raíz', () => {
    const landing = routes.find((route) => route.name === 'landing');
    expect(landing?.path).toBe('/');
    expect(landing?.component).toBe('landing-page');
  });

  it('define las rutas de la aplicación', () => {
    const names = routes.map((route) => route.name);
    expect(names).toEqual(
      expect.arrayContaining([
        'dashboard',
        'analysis',
        'debts',
        'movements',
        'settings',
      ]),
    );
  });

  it('cada ruta tiene componente y action', () => {
    for (const route of routes) {
      expect(route.component).toBeTruthy();
      expect(typeof route.action).toBe('function');
    }
  });
});
