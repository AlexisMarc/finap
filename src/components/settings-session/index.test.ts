import { describe, it, expect, beforeEach } from 'vitest';

import { FinapSettingsSession } from './index.js';
import { fixture, teardown } from '../../test/fixture.js';
import { setSession, hasSession } from '../../state/session.js';

describe('finap-settings-session', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('cierra la sesión', async () => {
    setSession({
      token: 't',
      user: { id: 'u1', name: 'Marcos', email: 'm@finap.app' },
    });
    const el = await fixture(new FinapSettingsSession());

    (el.shadowRoot?.querySelector('finap-button') as HTMLElement).click();

    expect(hasSession()).toBe(false);
    teardown(el);
  });
});
