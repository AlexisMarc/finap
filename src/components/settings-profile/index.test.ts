import { describe, it, expect } from 'vitest';

import { FinapSettingsProfile } from './index.js';
import { fixture, teardown } from '../../test/fixture.js';

describe('finap-settings-profile', () => {
  it('muestra el nombre y el email', async () => {
    const el = new FinapSettingsProfile();
    el.user = {
      id: 'u1',
      name: 'Marcos García',
      email: 'marcos@finap.app',
    };
    await fixture(el);

    const root = el.shadowRoot as ShadowRoot;
    expect(root.querySelector('.name')?.textContent).toContain('Marcos García');
    expect(root.querySelector('.email')?.textContent).toContain(
      'marcos@finap.app',
    );
    teardown(el);
  });
});
