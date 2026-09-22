import { describe, it, expect, beforeEach, vi } from 'vitest';

import {
  getLocale,
  setLocale,
  resolveLocale,
  initLocale,
  t,
  LOCALE_CHANGED_EVENT,
} from './i18n.js';

describe('i18n (locale)', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('lang');
  });

  it('el idioma por defecto es español', () => {
    expect(resolveLocale()).toBe('es');
    expect(getLocale()).toBe('es');
  });

  it('guarda el idioma y actualiza lang', () => {
    setLocale('en');
    expect(getLocale()).toBe('en');
    expect(localStorage.getItem('finap-locale')).toBe('en');
    expect(document.documentElement.getAttribute('lang')).toBe('en');
  });

  it('emite el evento al cambiar', () => {
    const listener = vi.fn();
    document.documentElement.addEventListener(LOCALE_CHANGED_EVENT, listener);
    setLocale('en');
    expect(listener).toHaveBeenCalledTimes(1);
    expect((listener.mock.calls[0][0] as CustomEvent).detail).toBe('en');
    document.documentElement.removeEventListener(LOCALE_CHANGED_EVENT, listener);
  });

  it('initLocale fija lang al valor resuelto', () => {
    localStorage.setItem('finap-locale', 'en');
    expect(initLocale()).toBe('en');
    expect(document.documentElement.getAttribute('lang')).toBe('en');
  });

  it('traduce según el idioma activo', () => {
    setLocale('es');
    expect(t('landing.hero.cta')).toBe('Empezar');
    setLocale('en');
    expect(t('landing.hero.cta')).toBe('Get started');
  });

  it('devuelve la clave si no existe traducción', () => {
    expect(t('clave.inexistente')).toBe('clave.inexistente');
  });
});
