import { describe, it, expect, beforeEach } from 'vitest';

import { setPendingSearch, consumePendingSearch } from './search.js';

describe('pending search', () => {
  beforeEach(() => {
    consumePendingSearch();
  });

  it('guarda el término y lo limpia al consumirlo', () => {
    setPendingSearch('  alquiler  ');
    expect(consumePendingSearch()).toBe('alquiler');
    expect(consumePendingSearch()).toBe('');
  });

  it('sin término pendiente devuelve vacío', () => {
    expect(consumePendingSearch()).toBe('');
  });
});
