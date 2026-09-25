import { LitElement, html, nothing, css } from 'lit';

import '@spectrum-web-components/dialog/sp-dialog.js';

export class FinapModal extends LitElement {
  static styles = css`
    :host {
      display: contents;
    }

    .overlay {
      position: fixed;
      inset: 0;
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: var(--finap-space-4);
      background-color: var(--spectrum-alias-background-color-modal-overlay);
    }

    sp-dialog {
      width: min(480px, 100%);
      max-height: 90vh;
      overflow: auto;
    }

    .heading {
      margin: 0;
      font-family: var(--finap-font-family-display);
      font-size: var(--finap-font-size-lg);
      font-weight: var(--finap-font-weight-bold);
      color: var(--finap-color-text);
    }
  `;

  static properties = {
    open: { type: Boolean, reflect: true },
    heading: { type: String },
  };

  open = false;

  heading = '';

  private _onKeydown = (event: KeyboardEvent) => {
    if (!this.open) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      this._close();
    }
  };

  connectedCallback(): void {
    super.connectedCallback();
    document.addEventListener('keydown', this._onKeydown);
  }

  disconnectedCallback(): void {
    document.removeEventListener('keydown', this._onKeydown);
    super.disconnectedCallback();
  }

  private _close = (): void => {
    if (!this.open) return;
    this.open = false;
    this.dispatchEvent(
      new CustomEvent('finap-close', { bubbles: true, composed: true }),
    );
  };

  private _onOverlayClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this._close();
    }
  }

  render() {
    if (!this.open) return nothing;
    return html`
      <div class="overlay" @click=${this._onOverlayClick}>
        <sp-dialog
          mode="default"
          size="m"
          ?dismissable=${true}
          @close=${this._close}
        >
          ${this.heading
            ? html`<h2 slot="heading" class="heading">${this.heading}</h2>`
            : nothing}
          <slot></slot>
          <div slot="button"><slot name="actions"></slot></div>
        </sp-dialog>
      </div>
    `;
  }
}

customElements.define('finap-modal', FinapModal);

declare global {
  interface HTMLElementTagNameMap {
    'finap-modal': FinapModal;
  }
}
