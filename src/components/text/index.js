import { LitElement, html } from 'lit';
import { styles } from './styles.js';
export class FinapText extends LitElement {
    constructor() {
        super(...arguments);
        this.variant = 'body';
    }
    static { this.styles = styles; }
    static { this.properties = {
        variant: { type: String },
    }; }
    render() {
        return html `<p class=${this.variant}><slot></slot></p>`;
    }
}
customElements.define('finap-text', FinapText);
