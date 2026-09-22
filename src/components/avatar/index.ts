import { LitElement, html, css } from 'lit';

export class FinapAvatar extends LitElement {
  static styles = css`
    :host {
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

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
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
    return html`
      <span class="avatar" role="img" aria-label=${this.name}>
        ${this.src
          ? html`<img src=${this.src} alt=${this.name} />`
          : this._initials}
      </span>
    `;
  }
}

customElements.define('finap-avatar', FinapAvatar);

declare global {
  interface HTMLElementTagNameMap {
    'finap-avatar': FinapAvatar;
  }
}
