import { describe, it, expect, beforeEach } from 'vitest';

import { FinapSettingsPreferences } from './index.js';
import { fixture, teardown } from '../../test/fixture.js';
import { setSession, getCurrency } from '../../state/session.js';
import { getLocale } from '../../i18n/i18n.js';

describe('finap-settings-preferences', () => {
  beforeEach(() => {
    localStorage.clear();
    setSession({
      token: 't',
      user: { id: 'u1', name: 'Marcos', email: 'm@finap.app', currency: 'USD' },
    });
  });

  it('renderiza el toggle de tema y los selectores', async () => {
    const el = await fixture(new FinapSettingsPreferences());
    const root = el.shadowRoot as ShadowRoot;
    expect(root.querySelector('finap-theme-toggle')).not.toBeNull();
    expect(root.querySelectorAll('finap-select').length).toBe(2);
    teardown(el);
  });

  it('cambia la moneda', async () => {
    const el = await fixture(new FinapSettingsPreferences());
    const selects = el.shadowRoot?.querySelectorAll('finap-select');
    (selects?.[1] as HTMLElement).dispatchEvent(
      new CustomEvent('finap-change', { detail: 'COP' }),
    );
    await el.updateComplete;

    expect(getCurrency()).toBe('COP');
    teardown(el);
  });

  it('cambia el idioma', async () => {
    const el = await fixture(new FinapSettingsPreferences());
    const selects = el.shadowRoot?.querySelectorAll('finap-select');
    (selects?.[0] as HTMLElement).dispatchEvent(
      new CustomEvent('finap-change', { detail: 'en' }),
    );
    await el.updateComplete;

    expect(getLocale()).toBe('en');
    teardown(el);
  });
});
