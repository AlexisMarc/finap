import { describe, it, expect, vi } from 'vitest';

import { normalizeInitialUrl } from './url.js';

function fakeLocation(pathname: string, hash = '', search = '') {
  return { pathname, hash, search } as unknown as Location;
}

describe('normalizeInitialUrl', () => {
  it('convierte un path de ruta en hash', () => {
    const history = { replaceState: vi.fn() } as unknown as History;
    normalizeInitialUrl(fakeLocation('/dashboard'), history);
    expect(history.replaceState).toHaveBeenCalledWith(null, '', '/#/dashboard');
  });

  it('no cambia la raíz', () => {
    const history = { replaceState: vi.fn() } as unknown as History;
    normalizeInitialUrl(fakeLocation('/'), history);
    expect(history.replaceState).not.toHaveBeenCalled();
  });

  it('no cambia si ya hay hash', () => {
    const history = { replaceState: vi.fn() } as unknown as History;
    normalizeInitialUrl(fakeLocation('/dashboard', '#/settings'), history);
    expect(history.replaceState).not.toHaveBeenCalled();
  });

  it('conserva la query', () => {
    const history = { replaceState: vi.fn() } as unknown as History;
    normalizeInitialUrl(fakeLocation('/movements', '', '?type=expense'), history);
    expect(history.replaceState).toHaveBeenCalledWith(
      null,
      '',
      '/#/movements?type=expense',
    );
  });
});
