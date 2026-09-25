import { LitElement, html, nothing, css } from 'lit';

import '@spectrum-web-components/tags/sp-tag.js';

export class FinapChip extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
    }

    sp-tag {
      cursor: inherit;
    }

    :host([clickable]) sp-tag {
      cursor: pointer;
    }

    :host([selected]) sp-tag {
      --spectrum-tag-background-color: var(--finap-color-primary);
      --spectrum-tag-border-color: transparent;
      --spectrum-tag-content-color: var(--finap-color-on-primary);
    }

    .dot {
      width: 8px;
      height: 8px;
      margin-inline-end: var(--finap-space-1);
      border-radius: var(--finap-radius-full);
      background-color: var(--chip-color, var(--finap-color-accent));
    }

    .dot[hidden] {
      display: none;
    }
  `;

  static properties = {
    selected: { type: Boolean, reflect: true },
    clickable: { type: Boolean },
    color: { type: String },
  };

  selected = false;

  clickable = false;

  color = '';

  private _onKeydown(event: KeyboardEvent): void {
    if (!this.clickable) return;
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    this.dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true }));
  }

  render() {
    return html`
      <sp-tag
        ?selected=${this.selected}
        role=${this.clickable ? 'button' : nothing}
        tabindex=${this.clickable ? '0' : nothing}
        @keydown=${this._onKeydown}
      >
        <span
          class="dot"
          ?hidden=${!this.color}
          style=${this.color ? `--chip-color: ${this.color}` : ''}
        ></span>
        <slot></slot>
      </sp-tag>
    `;
  }
}

customElements.define('finap-chip', FinapChip);

declare global {
  interface HTMLElementTagNameMap {
    'finap-chip': FinapChip;
  }
}
