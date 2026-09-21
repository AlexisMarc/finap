import { LitElement, html } from 'lit';
import { styles } from './styles.js';
export class FinapCard extends LitElement {
    static { this.styles = styles; }
    render() {
        return html `<div class="card"><slot></slot></div>`;
    }
}
customElements.define('finap-card', FinapCard);
