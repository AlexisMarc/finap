import { describe, it, expect } from 'vitest';

import { FinapAvatar } from './index.js';
import { fixture, teardown } from '../../test/fixture.js';

describe('finap-avatar', () => {
  it('muestra las iniciales del nombre', async () => {
    const el = new FinapAvatar();
    el.name = 'Marcos García';
    await fixture(el);

    expect(el.shadowRoot?.querySelector('.avatar')?.textContent?.trim()).toBe(
      'MG',
    );
    teardown(el);
  });

  it('usa un avatar de Spectrum cuando se indica src', async () => {
    const el = new FinapAvatar();
    el.name = 'Marcos';
    el.src = 'https://example.com/a.png';
    await fixture(el);

    const avatar = el.shadowRoot?.querySelector('sp-avatar');
    expect(avatar?.getAttribute('src')).toBe('https://example.com/a.png');
    teardown(el);
  });
});
