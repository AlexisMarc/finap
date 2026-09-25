import { LitElement, html, css } from 'lit';

import '@spectrum-web-components/switch/sp-switch.js';
import '@spectrum-web-components/field-group/sp-field-group.js';
import '@spectrum-web-components/contextual-help/sp-contextual-help.js';
import '../select/index.js';
import { setLocale, type Locale } from '../../i18n/i18n.js';
import { LocalizeController } from '../../i18n/localize.js';
import { getCurrency, setCurrency } from '../../state/session.js';
import { resolveTheme, setTheme, type Theme } from '../../theme/theme.js';

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
    theme: { type: String },
  };

  locale: Locale = 'es';

  currency = 'USD';

  theme: Theme = resolveTheme();

  private _localize = new LocalizeController(this);

  private _onTheme(event: Event): void {
    const checked = (event.target as { checked?: boolean }).checked ?? false;
    const theme: Theme = checked ? 'dark' : 'light';
    setTheme(theme);
    this.theme = theme;
  }

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
    const t = (key: string) => this._localize.t(key);
    return html`
      <div class="prefs">
        <sp-field-group horizontal label=${t('settings.theme')}>
          <sp-switch
            .checked=${this.theme === 'dark'}
            @change=${this._onTheme}
          ></sp-switch>
          <sp-contextual-help label=${t('settings.themeHelp')}>
            <span slot="heading">${t('settings.theme')}</span>
            ${t('settings.themeHelp')}
          </sp-contextual-help>
        </sp-field-group>
        <sp-field-group horizontal label=${t('settings.language')}>
          <finap-select
            .value=${this.locale}
            .options=${LOCALE_OPTIONS}
            @finap-change=${this._onLocale}
          ></finap-select>
          <sp-contextual-help label=${t('settings.languageHelp')}>
            <span slot="heading">${t('settings.language')}</span>
            ${t('settings.languageHelp')}
          </sp-contextual-help>
        </sp-field-group>
        <sp-field-group horizontal label=${t('settings.currency')}>
          <finap-select
            .value=${this.currency}
            .options=${CURRENCY_OPTIONS}
            @finap-change=${this._onCurrency}
          ></finap-select>
          <sp-contextual-help label=${t('settings.currencyHelp')}>
            <span slot="heading">${t('settings.currency')}</span>
            ${t('settings.currencyHelp')}
          </sp-contextual-help>
        </sp-field-group>
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
