import { LitElement, html, css } from 'lit';

import { setLocale } from '../../i18n/i18n.js';
import { LocalizeController } from '../../i18n/localize.js';

export class FinapLanguageToggle extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
    }

    button {
      height: 40px;
      padding: 0 var(--finap-space-3);
      border: 1px solid var(--finap-color-border);
      border-radius: var(--finap-radius-full);
      background-color: transparent;
      color: var(--finap-color-text);
      font-family: var(--finap-font-family);
      font-size: var(--finap-font-size-sm);
      font-weight: var(--finap-font-weight-semibold);
      cursor: pointer;
    }

    button:hover {
      background-color: var(--finap-color-bg-subtle);
    }
  `;

  private _localize = new LocalizeController(this);

  private _toggle(): void {
    setLocale(this._localize.locale === 'es' ? 'en' : 'es');
  }

  render() {
    return html`
      <button
        type="button"
        class="toggle"
        aria-label=${this._localize.t('language.toggle')}
        @click=${this._toggle}
      >
        ${this._localize.locale.toUpperCase()}
      </button>
    `;
  }
}

customElements.define('finap-language-toggle', FinapLanguageToggle);

declare global {
  interface HTMLElementTagNameMap {
    'finap-language-toggle': FinapLanguageToggle;
  }
}
