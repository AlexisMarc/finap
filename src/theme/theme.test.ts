import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

import {
  initTheme,
  setTheme,
  resolveTheme,
  applyTheme,
  THEME_CHANGED_EVENT,
} from './theme.js';

function mockMatchMedia(dark: boolean) {
  const mql = {
    matches: dark,
    media: '(prefers-color-scheme: dark)',
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  };
  window.matchMedia = vi
    .fn()
    .mockReturnValue(mql) as unknown as typeof window.matchMedia;
  return mql;
}

describe('theme', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it('aplica el tema claro por defecto cuando no hay preferencia', () => {
    mockMatchMedia(false);
    expect(resolveTheme()).toBe('light');
    expect(initTheme()).toBe('light');
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });

  it('cambia al tema oscuro y persiste la elección', () => {
    mockMatchMedia(false);
    setTheme('dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(localStorage.getItem('finap-theme')).toBe('dark');
  });

  it('respeta la preferencia del sistema (modo oscuro)', () => {
    mockMatchMedia(true);
    expect(resolveTheme()).toBe('dark');
    expect(initTheme()).toBe('dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('la elección guardada prevalece sobre la del sistema', () => {
    mockMatchMedia(true);
    localStorage.setItem('finap-theme', 'light');
    expect(resolveTheme()).toBe('light');
  });

  it('applyTheme establece el atributo data-theme', () => {
    applyTheme('dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('emite el evento finap-theme-changed al aplicar el tema', () => {
    const listener = vi.fn();
    document.documentElement.addEventListener(THEME_CHANGED_EVENT, listener);

    setTheme('dark');

    expect(listener).toHaveBeenCalledTimes(1);
    expect((listener.mock.calls[0][0] as CustomEvent).detail).toBe('dark');
    document.documentElement.removeEventListener(THEME_CHANGED_EVENT, listener);
  });
});
