import { LitElement, html, nothing, css } from 'lit';

import '@spectrum-web-components/avatar/sp-avatar.js';

export class FinapAvatar extends LitElement {
  static styles = css`
    :host {
      display: inline-flex;
    }

    sp-avatar {
      display: inline-flex;
    }

    .avatar {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      overflow: hidden;
      border-radius: var(--finap-radius-full);
      background-color: var(--finap-color-accent-2);
      color: #ffffff;
      font-family: var(--finap-font-family);
      font-size: var(--finap-font-size-sm);
      font-weight: var(--finap-font-weight-semibold);
    }
  `;

  static properties = {
    name: { type: String },
    src: { type: String },
  };

  name = '';

  src = '';

  private get _initials(): string {
    return this.name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? '')
      .join('');
  }

  render() {
    if (this.src) {
      return html`<sp-avatar
        class="avatar"
        label=${this.name}
        src=${this.src}
        size="400"
      ></sp-avatar>`;
    }
    return html`<span class="avatar" role="img" aria-label=${this.name || nothing}
      >${this._initials}</span
    >`;
  }
}

customElements.define('finap-avatar', FinapAvatar);

declare global {
  interface HTMLElementTagNameMap {
    'finap-avatar': FinapAvatar;
  }
}
