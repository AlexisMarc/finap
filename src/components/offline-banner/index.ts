import { LitElement, html, css } from 'lit';

import {
  isOnline,
  CONNECTION_CHANGED_EVENT,
} from '../../pwa/connection-status.js';
import { flush } from '../../pwa/offline-queue.js';
import { LocalizeController } from '../../i18n/localize.js';

export const UPDATE_AVAILABLE_EVENT = 'finap-update-available';
export const APPLY_UPDATE_EVENT = 'finap-apply-update';

export class FinapOfflineBanner extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .banner {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--finap-space-3);
      padding: var(--finap-space-2) var(--finap-space-4);
      font-family: var(--finap-font-family);
      font-size: var(--finap-font-size-sm);
      text-align: center;
    }

    .banner--offline {
      background-color: var(--finap-color-expense);
      color: #ffffff;
    }

    .banner--update {
      background-color: var(--finap-color-accent-2);
      color: #ffffff;
    }

    button {
      padding: var(--finap-space-1) var(--finap-space-3);
      border: 1px solid currentColor;
      border-radius: var(--finap-radius-full);
      background-color: transparent;
      color: inherit;
      font-family: var(--finap-font-family);
      font-size: var(--finap-font-size-sm);
      cursor: pointer;
    }
  `;

  private _localize = new LocalizeController(this);

  static properties = {
    online: { type: Boolean },
    updateAvailable: { type: Boolean },
  };

  online = true;

  updateAvailable = false;

  private _onConnection = (event: Event): void => {
    this.online = (event as CustomEvent<boolean>).detail;
  };

  private _onUpdate = (): void => {
    this.updateAvailable = true;
  };

  connectedCallback(): void {
    super.connectedCallback();
    this.online = isOnline();
    window.addEventListener(CONNECTION_CHANGED_EVENT, this._onConnection);
    window.addEventListener(UPDATE_AVAILABLE_EVENT, this._onUpdate);
  }

  disconnectedCallback(): void {
    window.removeEventListener(CONNECTION_CHANGED_EVENT, this._onConnection);
    window.removeEventListener(UPDATE_AVAILABLE_EVENT, this._onUpdate);
    super.disconnectedCallback();
  }

  private _applyUpdate(): void {
    window.dispatchEvent(new CustomEvent(APPLY_UPDATE_EVENT));
  }

  private async _sync(): Promise<void> {
    await flush();
  }

  render() {
    if (!this.online) {
      return html`
        <div class="banner banner--offline" role="status">
          <span>${this._localize.t('offline.message')}</span>
          <button type="button" @click=${this._sync}>
            ${this._localize.t('offline.sync')}
          </button>
        </div>
      `;
    }

    if (this.updateAvailable) {
      return html`
        <div class="banner banner--update" role="status">
          <span>${this._localize.t('update.message')}</span>
          <button type="button" @click=${this._applyUpdate}>
            ${this._localize.t('update.apply')}
          </button>
        </div>
      `;
    }

    return html``;
  }
}

customElements.define('finap-offline-banner', FinapOfflineBanner);

declare global {
  interface HTMLElementTagNameMap {
    'finap-offline-banner': FinapOfflineBanner;
  }
}
