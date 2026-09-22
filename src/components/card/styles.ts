import { css } from 'lit';

export const styles = css`
  :host {
    display: block;
  }

  .card {
    background-color: var(--finap-color-surface);
    border: 1px solid var(--finap-color-border);
    border-radius: var(--finap-radius-lg);
    box-shadow: var(--finap-shadow-sm);
    padding: var(--finap-space-5);
  }
`;
