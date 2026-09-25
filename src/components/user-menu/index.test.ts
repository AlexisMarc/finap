import { describe, it, expect } from 'vitest';

import { FinapUserMenu } from './index.js';
import { fixture, teardown } from '../../test/fixture.js';

describe('finap-user-menu', () => {
  it('muestra el nombre del usuario', async () => {
    const el = new FinapUserMenu();
    el.name = 'Marcos García';
    el.email = 'marcos@finap.app';
    await fixture(el);

    expect(el.shadowRoot?.querySelector('.name')?.textContent).toContain(
      'Marcos García',
    );
    teardown(el);
  });

  it('no duplica el nombre accesible del trigger (avatar aria-hidden)', async () => {
    const el = new FinapUserMenu();
    el.name = 'Marcos García';
    el.email = 'marcos@finap.app';
    await fixture(el);

    const avatar = el.shadowRoot?.querySelector('finap-avatar');
    expect(avatar?.getAttribute('aria-hidden')).toBe('true');

    const trigger = el.shadowRoot?.querySelector('.trigger')?.textContent ?? '';
    expect((trigger.match(/Marcos García/g) ?? []).length).toBe(1);
    teardown(el);
  });

  it('abre el menú al pulsar y emite finap-logout', async () => {
    const el = new FinapUserMenu();
    el.name = 'Marcos';
    await fixture(el);

    (el.shadowRoot?.querySelector('.trigger') as HTMLButtonElement).click();
    await el.updateComplete;
    expect(el.shadowRoot?.querySelector('.menu')).not.toBeNull();

    let loggedOut = false;
    el.addEventListener('finap-logout', () => {
      loggedOut = true;
    });
    (el.shadowRoot?.querySelector('.menu button') as HTMLButtonElement).click();

    expect(loggedOut).toBe(true);
    teardown(el);
  });
});
