const STORAGE_KEY = 'finap-theme';
export function getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
}
export function getStoredTheme() {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === 'light' || stored === 'dark' ? stored : null;
}
export function resolveTheme() {
    return getStoredTheme() ?? getSystemTheme();
}
export function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
}
export function setTheme(theme) {
    localStorage.setItem(STORAGE_KEY, theme);
    applyTheme(theme);
}
export function initTheme() {
    const theme = resolveTheme();
    applyTheme(theme);
    return theme;
}
