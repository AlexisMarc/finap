import { LitElement, html, css } from 'lit';

import '../heading/index.js';
import '../input/index.js';
import '../assistant-message/index.js';

import { ask } from '../../services/assistant-service.js';
import { LocalizeController } from '../../i18n/localize.js';

interface ChatMessage {
  role: 'user' | 'assistant';
  text: string;
}

const QUICK_KEYS = ['assistant.quick.spend', 'assistant.quick.debt'];

export class FinapAssistantChat extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .chat {
      display: grid;
      gap: var(--finap-space-3);
    }

    .messages {
      display: grid;
      gap: var(--finap-space-2);
      max-height: 260px;
      overflow: auto;
    }

    .quick {
      display: flex;
      flex-wrap: wrap;
      gap: var(--finap-space-2);
    }

    .error {
      margin: 0;
      font-family: var(--finap-font-family);
      font-size: var(--finap-font-size-sm);
      color: var(--finap-color-expense);
    }

    .error[hidden] {
      display: none;
    }

    .input-row {
      display: flex;
      align-items: flex-end;
      gap: var(--finap-space-3);
    }

    .input-row finap-input {
      flex: 1;
    }
  `;

  private _localize = new LocalizeController(this);

  static properties = {
    messages: { type: Array },
    thinking: { type: Boolean },
    error: { type: String },
    draft: { type: String },
  };

  messages: ChatMessage[] = [];

  thinking = false;

  error = '';

  draft = '';

  private _onInput(event: Event): void {
    this.draft = (event as CustomEvent<string>).detail;
  }

  private async _send(question?: string): Promise<void> {
    const text = (question ?? this.draft).trim();
    if (!text || this.thinking) return;

    this.messages = [...this.messages, { role: 'user', text }];
    this.draft = '';
    this.error = '';
    this.thinking = true;
    try {
      const { answer } = await ask(text);
      this.messages = [...this.messages, { role: 'assistant', text: answer }];
    } catch {
      this.error = this._localize.t('assistant.error');
    } finally {
      this.thinking = false;
    }
  }

  private _quick(key: string) {
    return () => {
      void this._send(this._localize.t(key));
    };
  }

  render() {
    const t = (key: string) => this._localize.t(key);
    return html`
      <div class="chat">
        <finap-heading level="3">${t('assistant.title')}</finap-heading>
        <div class="messages">
          ${this.messages.map(
            (message) => html`
              <finap-assistant-message
                role=${message.role}
                text=${message.text}
              ></finap-assistant-message>
            `,
          )}
          ${this.thinking
            ? html`
                <finap-assistant-message
                  role="assistant"
                  text=${t('assistant.typing')}
                ></finap-assistant-message>
              `
            : ''}
        </div>
        <div class="quick">
          ${QUICK_KEYS.map(
            (key) => html`
              <sp-tag role="button" tabindex="0" @click=${this._quick(key)}>
                ${t(key)}
              </sp-tag>
            `,
          )}
        </div>
        <p class="error" ?hidden=${!this.error}>${this.error}</p>
        <div class="input-row">
          <finap-input
            type="text"
            placeholder=${t('assistant.placeholder')}
            .value=${this.draft}
            @finap-input=${this._onInput}
          ></finap-input>
          <sp-button variant="accent" @click=${() => this._send()}>
            ${t('assistant.send')}
          </sp-button>
        </div>
      </div>
    `;
  }
}

customElements.define('finap-assistant-chat', FinapAssistantChat);

declare global {
  interface HTMLElementTagNameMap {
    'finap-assistant-chat': FinapAssistantChat;
  }
}
