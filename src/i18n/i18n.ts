export type Locale = 'es' | 'en';

import { translations } from './translations.js';

const STORAGE_KEY = 'finap-locale';

export const LOCALE_CHANGED_EVENT = 'finap-locale-changed';

export const SUPPORTED_LOCALES: Locale[] = ['es', 'en'];

function isLocale(value: string | null): value is Locale {
  return value === 'es' || value === 'en';
}

function emit(locale: Locale): void {
  document.documentElement.dispatchEvent(
    new CustomEvent<Locale>(LOCALE_CHANGED_EVENT, { detail: locale }),
  );
}

export function resolveLocale(): Locale {
  const stored = localStorage.getItem(STORAGE_KEY);
  return isLocale(stored) ? stored : 'es';
}

export function getLocale(): Locale {
  return resolveLocale();
}

export function setLocale(locale: Locale): void {
  localStorage.setItem(STORAGE_KEY, locale);
  document.documentElement.setAttribute('lang', locale);
  emit(locale);
}

export function initLocale(): Locale {
  const locale = resolveLocale();
  document.documentElement.setAttribute('lang', locale);
  return locale;
}

export function t(key: string): string {
  return translations[getLocale()][key] ?? key;
}
