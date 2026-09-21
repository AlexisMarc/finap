import { LitElement, html } from 'lit';
import { styles } from './styles.js';
export class FinapHeading extends LitElement {
    constructor() {
        super(...arguments);
        this.level = 1;
    }
    static { this.styles = styles; }
    static { this.properties = {
        level: { type: Number },
    }; }
    render() {
        const level = Math.min(Math.max(this.level, 1), 6);
        switch (level) {
            case 2:
                return html `<h2><slot></slot></h2>`;
            case 3:
                return html `<h3><slot></slot></h3>`;
            case 4:
                return html `<h4><slot></slot></h4>`;
            case 5:
                return html `<h5><slot></slot></h5>`;
            case 6:
                return html `<h6><slot></slot></h6>`;
            default:
                return html `<h1><slot></slot></h1>`;
        }
    }
}
customElements.define('finap-heading', FinapHeading);
