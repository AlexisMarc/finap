import { LitElement, html } from 'lit';

import { styles } from './styles.js';

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export class FinapHeading extends LitElement {
  static styles = styles;

  static properties = {
    level: { type: Number },
  };

  level: HeadingLevel = 1;

  render() {
    const level = Math.min(Math.max(this.level, 1), 6) as HeadingLevel;
    switch (level) {
      case 2:
        return html`<h2><slot></slot></h2>`;
      case 3:
        return html`<h3><slot></slot></h3>`;
      case 4:
        return html`<h4><slot></slot></h4>`;
      case 5:
        return html`<h5><slot></slot></h5>`;
      case 6:
        return html`<h6><slot></slot></h6>`;
      default:
        return html`<h1><slot></slot></h1>`;
    }
  }
}

customElements.define('finap-heading', FinapHeading);

declare global {
  interface HTMLElementTagNameMap {
    'finap-heading': FinapHeading;
  }
}
