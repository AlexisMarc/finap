import { LitElement, html, css } from 'lit';

import '../components/container/index.js';
import '../components/heading/index.js';
import '../components/text/index.js';

/**
 * Página "Análisis" (placeholder).
 * La implementación completa corresponde al change `analysis`.
 */
export class AnalysisPage extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
  `;

  render() {
    return html`
      <finap-container>
        <finap-heading level="1">Análisis</finap-heading>
        <finap-text>
          Vista pendiente de implementación (change analysis).
        </finap-text>
      </finap-container>
    `;
  }
}

customElements.define('analysis-page', AnalysisPage);

declare global {
  interface HTMLElementTagNameMap {
    'analysis-page': AnalysisPage;
  }
}
