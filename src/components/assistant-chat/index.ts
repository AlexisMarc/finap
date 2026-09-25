import { LitElement, html, css } from 'lit';

import '../heading/index.js';
import '../input/index.js';
import '../assistant-message/index.js';
import '@spectrum-web-components/action-button/sp-action-button.js';
import '@spectrum-web-components/button/sp-button.js';

import { ask } from '../../services/assistant-service.js';
import { LocalizeController } from '../../i18n/localize.js';
import { finapIcon } from '../icons.js';

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

    .fab {
      position: fixed;
      right: var(--finap-space-5);
      bottom: var(--finap-space-5);
      z-index: 400;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 48px;
      height: 48px;
      border: none;
      border-radius: var(--finap-radius-full);
      background-color: var(--finap-color-primary);
      color: var(--finap-color-on-primary);
      cursor: pointer;
      box-shadow: var(--finap-shadow-md);
      transition: background-color var(--finap-motion-duration-fast)
        var(--finap-motion-easing-standard);
    }

    .fab:hover {
      background-color: var(--finap-color-primary-hover);
    }

    .panel {
      position: fixed;
      right: var(--finap-space-5);
      bottom: calc(var(--finap-space-5) + 60px);
      z-index: 400;
      display: grid;
      grid-template-rows: auto 1fr;
      gap: var(--finap-space-4);
      width: min(400px, calc(100vw - 2 * var(--finap-space-5)));
      max-height: min(560px, 80vh);
      padding: var(--finap-space-5);
      background-color: var(--finap-color-surface);
      border: 1px solid var(--finap-color-border);
      border-radius: var(--finap-radius-lg);
      box-shadow: var(--finap-shadow-lg);
    }

    .panel[hidden] {
      display: none;
    }

    .panel-head {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: var(--finap-space-2);
      padding-bottom: var(--finap-space-3);
      border-bottom: 1px solid var(--finap-color-border);
    }

    .panel-title {
      display: grid;
      gap: 2px;
    }

    .panel-subtitle {
      font-family: var(--finap-font-family);
      font-size: var(--finap-font-size-sm);
      color: var(--finap-color-text-muted);
    }

    .chat {
      display: grid;
      gap: var(--finap-space-4);
      min-height: 0;
      overflow: auto;
    }

    .messages {
      display: flex;
      flex-direction: column;
      gap: var(--finap-space-2);
      min-height: 120px;
      max-height: 300px;
      overflow: auto;
      padding: var(--finap-space-3);
      background-color: var(--finap-color-bg-subtle);
      border-radius: var(--finap-radius-md);
    }

    .empty {
      margin: auto;
      text-align: center;
      font-family: var(--finap-font-family);
      font-size: var(--finap-font-size-sm);
      color: var(--finap-color-text-muted);
    }

    .quick-wrap {
      display: grid;
      gap: var(--finap-space-2);
    }

    .quick-label {
      font-family: var(--finap-font-family);
      font-size: var(--finap-font-size-xs);
      font-weight: var(--finap-font-weight-semibold);
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: var(--finap-color-text-muted);
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
    open: { type: Boolean },
  };

  messages: ChatMessage[] = [];

  thinking = false;

  error = '';

  draft = '';

  open = false;

  private _toggle(): void {
    this.open = !this.open;
  }

  private _onInput(event: Event): void {
    this.draft = (event as CustomEvent<string>).detail;
  }

  private _onKeydown = (event: KeyboardEvent): void => {
    if (event.key !== 'Enter' || event.shiftKey) return;
    event.preventDefault();
    void this._send();
  };

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
      <button
        class="fab"
        type="button"
        aria-label=${t('assistant.title')}
        @click=${this._toggle}
      >
        ${finapIcon('chat', 24)}
      </button>
      <div class="panel" ?hidden=${!this.open}>
        <div class="panel-head">
          <div class="panel-title">
            <finap-heading level="3">${t('assistant.title')}</finap-heading>
            <span class="panel-subtitle">${t('assistant.subtitle')}</span>
          </div>
          <sp-action-button label=${t('common.close')} @click=${this._toggle}>
            ${finapIcon('close', 18, 'icon')}
          </sp-action-button>
        </div>
        <div class="chat">
          <div class="messages">
            ${this.messages.length === 0 && !this.thinking
              ? html`<p class="empty">${t('assistant.empty')}</p>`
              : ''}
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
          <div class="quick-wrap">
            <span class="quick-label">${t('assistant.quickTitle')}</span>
            <div class="quick">
              ${QUICK_KEYS.map(
                (key) => html`
                  <sp-button
                    size="s"
                    treatment="outline"
                    variant="secondary"
                    @click=${this._quick(key)}
                  >
                    ${t(key)}
                  </sp-button>
                `,
              )}
            </div>
          </div>
          <p class="error" ?hidden=${!this.error}>${this.error}</p>
          <div class="input-row">
            <finap-input
              type="text"
              placeholder=${t('assistant.placeholder')}
              .value=${this.draft}
              @finap-input=${this._onInput}
              @keydown=${this._onKeydown}
            ></finap-input>
            <sp-button variant="accent" @click=${() => this._send()}>
              ${t('assistant.send')}
            </sp-button>
          </div>
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
