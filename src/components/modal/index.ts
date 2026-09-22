import { LitElement, html, css, nothing } from 'lit';

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

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
      background-color: rgba(0, 0, 0, 0.5);
    }

    .dialog {
      width: min(480px, 100%);
      max-height: 90vh;
      overflow: auto;
      display: grid;
      gap: var(--finap-space-4);
      padding: var(--finap-space-5);
      background-color: var(--finap-color-surface);
      border: 1px solid var(--finap-color-border);
      border-radius: var(--finap-radius-lg);
      box-shadow: var(--finap-shadow-modal);
    }

    .title {
      margin: 0;
      font-family: var(--finap-font-family-display);
      font-size: var(--finap-font-size-lg);
      font-weight: var(--finap-font-weight-bold);
      color: var(--finap-color-text);
    }

    .actions {
      display: flex;
      justify-content: flex-end;
      gap: var(--finap-space-3);
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
      return;
    }
    if (event.key === 'Tab') {
      this._trapFocus(event);
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

  updated(): void {
    if (this.open) {
      const dialog = this.shadowRoot?.querySelector('.dialog') as HTMLElement | null;
      dialog?.focus();
    }
  }

  private _focusable(): HTMLElement[] {
    const root = this.shadowRoot;
    if (!root) return [];
    return Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE));
  }

  private _trapFocus(event: KeyboardEvent): void {
    const focusable = this._focusable();
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const active = this.shadowRoot?.activeElement;
    if (event.shiftKey && active === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  }

  private _close(): void {
    this.open = false;
    this.dispatchEvent(
      new CustomEvent('finap-close', { bubbles: true, composed: true }),
    );
  }

  private _onOverlayClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this._close();
    }
  }

  render() {
    if (!this.open) return nothing;
    return html`
      <div class="overlay" @click=${this._onOverlayClick}>
        <div
          class="dialog"
          role="dialog"
          aria-modal="true"
          aria-label=${this.heading || 'dialog'}
          tabindex="-1"
        >
          ${this.heading ? html`<h2 class="title">${this.heading}</h2>` : nothing}
          <div class="content"><slot></slot></div>
          <div class="actions"><slot name="actions"></slot></div>
        </div>
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
