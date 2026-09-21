import { LitElement, html } from 'lit';
import { styles } from './styles.js';
export class FinapButton extends LitElement {
    constructor() {
        super(...arguments);
        this.variant = 'primary';
        this.disabled = false;
    }
    static { this.styles = styles; }
    static { this.properties = {
        variant: { type: String },
        disabled: { type: Boolean, reflect: true },
    }; }
    render() {
        return html `
      <button class=${this.variant} ?disabled=${this.disabled}>
        <slot></slot>
      </button>
    `;
    }
}
customElements.define('finap-button', FinapButton);
