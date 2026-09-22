import { LitElement, html, css } from 'lit';

import '../theme-toggle/index.js';
import '../select/index.js';
import { setLocale, type Locale } from '../../i18n/i18n.js';
import { getCurrency, setCurrency } from '../../state/session.js';

const LOCALE_OPTIONS = [
  { value: 'es', label: 'Español' },
  { value: 'en', label: 'English' },
];

const CURRENCY_OPTIONS = [
  { value: 'USD', label: 'USD' },
  { value: 'COP', label: 'COP' },
  { value: 'EUR', label: 'EUR' },
];

export class FinapSettingsPreferences extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .prefs {
      display: grid;
      gap: var(--finap-space-4);
    }

    .row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--finap-space-4);
      font-family: var(--finap-font-family);
      color: var(--finap-color-text);
    }

    .row finap-select {
      width: 180px;
    }
  `;

  static properties = {
    locale: { type: String },
    currency: { type: String },
  };

  locale: Locale = 'es';

  currency = 'USD';

  private _onLocale(event: Event): void {
    const locale = (event as CustomEvent<Locale>).detail;
    setLocale(locale);
    this.locale = locale;
    this.dispatchEvent(
      new CustomEvent('finap-locale-change', {
        detail: locale,
        bubbles: true,
        composed: true,
      }),
    );
  }

  private _onCurrency(event: Event): void {
    const currency = (event as CustomEvent<string>).detail;
    setCurrency(currency);
    this.currency = getCurrency();
  }

  render() {
    return html`
      <div class="prefs">
        <div class="row">
          <span>Tema</span>
          <finap-theme-toggle></finap-theme-toggle>
        </div>
        <div class="row">
          <span>Idioma</span>
          <finap-select
            .value=${this.locale}
            .options=${LOCALE_OPTIONS}
            @finap-change=${this._onLocale}
          ></finap-select>
        </div>
        <div class="row">
          <span>Moneda</span>
          <finap-select
            .value=${this.currency}
            .options=${CURRENCY_OPTIONS}
            @finap-change=${this._onCurrency}
          ></finap-select>
        </div>
      </div>
    `;
  }
}

customElements.define('finap-settings-preferences', FinapSettingsPreferences);

declare global {
  interface HTMLElementTagNameMap {
    'finap-settings-preferences': FinapSettingsPreferences;
  }
}
