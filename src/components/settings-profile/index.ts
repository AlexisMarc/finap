import { LitElement, html, css } from 'lit';

import '../avatar/index.js';
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

  render() {
    return html`
      <div class="profile">
        <finap-avatar
          name=${this.user?.name ?? ''}
          src=${this.user?.avatarUrl ?? ''}
        ></finap-avatar>
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
