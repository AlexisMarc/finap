import { LitElement, html, css } from 'lit';

export class FinapChip extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
    }

    .chip {
      display: inline-flex;
      align-items: center;
      gap: var(--finap-space-1);
      padding: var(--finap-space-1) var(--finap-space-3);
      font-family: var(--finap-font-family);
      font-size: var(--finap-font-size-sm);
      color: var(--finap-color-text);
      background-color: transparent;
      border: 1px solid var(--finap-color-border);
      border-radius: var(--finap-radius-full);
      cursor: inherit;
    }

    .dot {
      width: 8px;
      height: 8px;
      border-radius: var(--finap-radius-full);
      background-color: var(--chip-color, var(--finap-color-accent));
    }

    .dot[hidden] {
      display: none;
    }

    button.chip {
      cursor: pointer;
    }

    :host([selected]) .chip {
      background-color: var(--finap-color-primary);
      border-color: transparent;
      color: var(--finap-color-on-primary);
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

  render() {
    const style = this.color ? `--chip-color: ${this.color}` : '';
    const inner = html`
      <span class="dot" ?hidden=${!this.color} style=${style}></span>
      <slot></slot>
    `;

    if (this.clickable) {
      return html`<button class="chip" type="button" style=${style}>
        ${inner}
      </button>`;
    }
    return html`<span class="chip" style=${style}>${inner}</span>`;
  }
}

customElements.define('finap-chip', FinapChip);

declare global {
  interface HTMLElementTagNameMap {
    'finap-chip': FinapChip;
  }
}
