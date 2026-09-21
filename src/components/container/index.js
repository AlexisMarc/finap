import { LitElement, html } from 'lit';
import { styles } from './styles.js';
export class FinapContainer extends LitElement {
    static { this.styles = styles; }
    render() {
        return html `<div class="container"><slot></slot></div>`;
    }
}
customElements.define('finap-container', FinapContainer);
