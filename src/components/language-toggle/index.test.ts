import { describe, it, expect, beforeEach } from 'vitest';

import { FinapLanguageToggle } from './index.js';
import { fixture, teardown } from '../../test/fixture.js';
import { getLocale } from '../../i18n/i18n.js';

describe('finap-language-toggle', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('alterna el idioma al pulsar', async () => {
    const el = await fixture(new FinapLanguageToggle());

    (el.shadowRoot?.querySelector('button') as HTMLButtonElement).click();
    await el.updateComplete;

    expect(getLocale()).toBe('en');
    teardown(el);
  });
});
