import { describe, it, expect } from 'vitest';

import {
  FinapOfflineBanner,
  UPDATE_AVAILABLE_EVENT,
} from './index.js';
import { fixture, teardown } from '../../test/fixture.js';

describe('finap-offline-banner', () => {
  it('no muestra nada cuando está online', async () => {
    const el = await fixture(new FinapOfflineBanner());
    el.online = true;
    await el.updateComplete;
    expect(el.shadowRoot?.querySelector('.banner')).toBeNull();
    teardown(el);
  });

  it('muestra el aviso cuando está offline', async () => {
    const el = await fixture(new FinapOfflineBanner());
    el.online = false;
    await el.updateComplete;
    expect(el.shadowRoot?.querySelector('.banner--offline')).not.toBeNull();
    teardown(el);
  });

  it('muestra el aviso de nueva versión', async () => {
    const el = await fixture(new FinapOfflineBanner());

    window.dispatchEvent(new CustomEvent(UPDATE_AVAILABLE_EVENT));
    await el.updateComplete;

    expect(el.shadowRoot?.querySelector('.banner--update')).not.toBeNull();
    teardown(el);
  });
});
