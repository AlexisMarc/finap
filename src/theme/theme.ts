export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'finap-theme';

export const THEME_CHANGED_EVENT = 'finap-theme-changed';

export function getSystemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

export function getStoredTheme(): Theme | null {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored === 'light' || stored === 'dark' ? stored : null;
}

export function resolveTheme(): Theme {
  return getStoredTheme() ?? getSystemTheme();
}

export function applyTheme(theme: Theme): void {
  document.documentElement.setAttribute('data-theme', theme);
  document
    .querySelector('sp-theme')
    ?.setAttribute('color', theme === 'dark' ? 'dark' : 'light');
  document.documentElement.dispatchEvent(
    new CustomEvent<Theme>(THEME_CHANGED_EVENT, {
      detail: theme,
    }),
  );
}

export function setTheme(theme: Theme): void {
  localStorage.setItem(STORAGE_KEY, theme);
  applyTheme(theme);
}

export function initTheme(): Theme {
  const theme = resolveTheme();
  applyTheme(theme);
  return theme;
}
