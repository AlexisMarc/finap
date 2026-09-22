import { describe, it, expect } from 'vitest';

import { routes } from './routes.js';

describe('routes', () => {
  it('define la ruta landing como raíz', () => {
    expect(routes).toHaveLength(1);
    expect(routes[0].name).toBe('landing');
    expect(routes[0].path).toBe('/');
    expect(routes[0].component).toBe('landing-page');
  });
});
