import { LitElement, html, css } from 'lit';

import '@spectrum-web-components/avatar/sp-avatar.js';
import type { SessionUser } from '../../state/session.js';

export class FinapSettingsProfile extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .profile {
      display: flex;
      align-items: center;
      gap: var(--finap-space-4);
    }

    .avatar {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border-radius: var(--finap-radius-full);
      background-color: var(--finap-color-accent-2);
      color: #ffffff;
      font-family: var(--finap-font-family);
      font-size: var(--finap-font-size-sm);
      font-weight: var(--finap-font-weight-semibold);
    }

    .info {
      display: grid;
      gap: 2px;
      font-family: var(--finap-font-family);
    }

    .name {
      color: var(--finap-color-text);
      font-weight: var(--finap-font-weight-semibold);
    }

    .email {
      color: var(--finap-color-text-muted);
      font-size: var(--finap-font-size-sm);
    }
  `;

  static properties = {
    user: { type: Object },
  };

  user: SessionUser | null = null;

  private get _initials(): string {
    return (this.user?.name ?? '')
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? '')
      .join('');
  }

  private _avatar() {
    const name = this.user?.name ?? '';
    if (this.user?.avatarUrl) {
      return html`<sp-avatar
        label=${name}
        src=${this.user.avatarUrl}
        size="400"
      ></sp-avatar>`;
    }
    return html`<span class="avatar" role="img" aria-label=${name}
      >${this._initials}</span
    >`;
  }

  render() {
    return html`
      <div class="profile">
        ${this._avatar()}
        <div class="info">
          <span class="name">${this.user?.name ?? ''}</span>
          <span class="email">${this.user?.email ?? ''}</span>
        </div>
      </div>
    `;
  }
}

customElements.define('finap-settings-profile', FinapSettingsProfile);

declare global {
  interface HTMLElementTagNameMap {
    'finap-settings-profile': FinapSettingsProfile;
  }
}
