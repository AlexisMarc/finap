import { LitElement, html, css } from 'lit';

import '../modal/index.js';
import '../button/index.js';
import { LocalizeController } from '../../i18n/localize.js';

export class FinapConfirmDialog extends LitElement {
  static styles = css`
    :host {
      display: contents;
    }

    .message {
      margin: 0;
      font-family: var(--finap-font-family);
      color: var(--finap-color-text);
    }
  `;

  static properties = {
    open: { type: Boolean },
    heading: { type: String },
    message: { type: String },
    confirmLabel: { type: String },
  };

  open = false;

  heading = '';

  message = '';

  confirmLabel = '';

  private _localize = new LocalizeController(this);

  private _confirm(): void {
    this.dispatchEvent(
      new CustomEvent('finap-confirm', { bubbles: true, composed: true }),
    );
  }

  private _cancel(): void {
    this.dispatchEvent(
      new CustomEvent('finap-cancel', { bubbles: true, composed: true }),
    );
  }

  render() {
    return html`
      <finap-modal
        ?open=${this.open}
        heading=${this.heading || this._localize.t('common.confirm')}
        @finap-close=${this._cancel}
      >
        <p class="message">${this.message}</p>
        <div slot="actions">
          <finap-button variant="secondary" @click=${this._cancel}>
            ${this._localize.t('common.cancel')}
          </finap-button>
          <finap-button @click=${this._confirm}>
            ${this.confirmLabel || this._localize.t('common.confirm')}
          </finap-button>
        </div>
      </finap-modal>
    `;
  }
}

customElements.define('finap-confirm-dialog', FinapConfirmDialog);

declare global {
  interface HTMLElementTagNameMap {
    'finap-confirm-dialog': FinapConfirmDialog;
  }
}
