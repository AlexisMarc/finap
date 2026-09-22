import { LitElement, html, css } from 'lit';

export class FinapAssistantMessage extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .bubble {
      max-width: 85%;
      padding: var(--finap-space-3);
      border-radius: var(--finap-radius-lg);
      font-family: var(--finap-font-family);
      font-size: var(--finap-font-size-sm);
      line-height: var(--finap-line-height-normal);
    }

    .bubble--assistant {
      background-color: var(--finap-color-bg-subtle);
      color: var(--finap-color-text);
      border-bottom-left-radius: var(--finap-radius-sm);
    }

    .bubble--user {
      margin-left: auto;
      background-color: var(--finap-color-primary);
      color: var(--finap-color-on-primary);
      border-bottom-right-radius: var(--finap-radius-sm);
    }
  `;

  static properties = {
    role: { type: String },
    text: { type: String },
  };

  role: 'user' | 'assistant' = 'assistant';

  text = '';

  render() {
    return html`<div class="bubble bubble--${this.role}">${this.text}</div>`;
  }
}

customElements.define('finap-assistant-message', FinapAssistantMessage);

declare global {
  interface HTMLElementTagNameMap {
    'finap-assistant-message': FinapAssistantMessage;
  }
}
