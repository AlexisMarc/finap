import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

import { FinapThemeToggle } from './index.js';
import { fixture, teardown } from '../../test/fixture.js';
import { THEME_CHANGED_EVENT } from '../../theme/theme.js';

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
}

describe('finap-theme-toggle', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
    mockMatchMedia(false);
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it('refleja el tema actual', async () => {
    const el = await fixture(new FinapThemeToggle());
    expect(el.theme).toBe('light');
    teardown(el);
  });

  it('alterna al tema oscuro y persiste la elección', async () => {
    const el = await fixture(new FinapThemeToggle());

    el.shadowRoot?.querySelector('button')?.click();
    await el.updateComplete;

    expect(el.theme).toBe('dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(localStorage.getItem('finap-theme')).toBe('dark');
    teardown(el);
  });

  it('reacciona al evento finap-theme-changed', async () => {
    const el = await fixture(new FinapThemeToggle());

    document.documentElement.dispatchEvent(
      new CustomEvent(THEME_CHANGED_EVENT, { detail: 'dark' }),
    );
    await el.updateComplete;

    expect(el.theme).toBe('dark');
    teardown(el);
  });
});
