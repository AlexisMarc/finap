import { describe, it, expect } from 'vitest';

import { translations } from './translations.js';

describe('translations', () => {
  it('es y en tienen exactamente las mismas claves', () => {
    expect(Object.keys(translations.es).sort()).toEqual(
      Object.keys(translations.en).sort(),
    );
  });

  it('todas las traducciones son no vacías', () => {
    for (const value of Object.values(translations.es)) {
      expect(value.length).toBeGreaterThan(0);
    }
    for (const value of Object.values(translations.en)) {
      expect(value.length).toBeGreaterThan(0);
    }
  });
});
