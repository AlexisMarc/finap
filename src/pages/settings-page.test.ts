import { describe, it, expect, beforeEach } from 'vitest';

import { SettingsPage } from './settings-page.js';
import { fixture, teardown } from '../test/fixture.js';
import { setSession } from '../state/session.js';

describe('settings-page', () => {
  beforeEach(() => {
    localStorage.clear();
    setSession({
      token: 't',
      user: { id: 'u1', name: 'Marcos', email: 'm@finap.app', currency: 'USD' },
    });
  });

  it('renderiza las secciones', async () => {
    const el = await fixture(new SettingsPage());
    const root = el.shadowRoot as ShadowRoot;

    expect(root.querySelector('finap-settings-profile')).not.toBeNull();
    expect(root.querySelector('finap-settings-preferences')).not.toBeNull();
    expect(root.querySelector('finap-settings-session')).not.toBeNull();
    teardown(el);
  });
});
