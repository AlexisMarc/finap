import { describe, it, expect, beforeEach } from 'vitest';
import { LitElement, html } from 'lit';

import { LocalizeController } from './localize.js';
import { setLocale } from './i18n.js';
import { fixture, teardown } from '../test/fixture.js';

class LocalizedHost extends LitElement {
  private _localize = new LocalizeController(this);

  render() {
    return html`<span class="text">${this._localize.t('landing.hero.cta')}</span>`;
  }
}

if (!customElements.get('localized-host')) {
  customElements.define('localized-host', LocalizedHost);
}

describe('LocalizeController', () => {
  beforeEach(() => {
    localStorage.clear();
    setLocale('es');
  });

  it('traduce en el idioma activo', async () => {
    const el = await fixture(new LocalizedHost());
    expect(el.shadowRoot?.querySelector('.text')?.textContent).toBe('Empezar');
    teardown(el);
  });

  it('re-renderiza al cambiar el idioma', async () => {
    const el = await fixture(new LocalizedHost());
    setLocale('en');
    await el.updateComplete;
    expect(el.shadowRoot?.querySelector('.text')?.textContent).toBe(
      'Get started',
    );
    teardown(el);
  });
});
