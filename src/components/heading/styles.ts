import { css } from 'lit';

export const styles = css`
  :host {
    display: block;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: var(--finap-font-family-display);
    font-weight: var(--finap-font-weight-bold);
    line-height: var(--finap-line-height-tight);
    letter-spacing: var(--finap-letter-spacing-tight);
    margin: 0 0 var(--finap-space-3);
    color: var(--finap-color-text);
  }

  h1 {
    font-size: var(--finap-font-size-3xl);
  }

  h2 {
    font-size: var(--finap-font-size-2xl);
  }

  h3 {
    font-size: var(--finap-font-size-xl);
  }

  h4 {
    font-size: var(--finap-font-size-lg);
  }

  h5 {
    font-size: var(--finap-font-size-md);
  }

  h6 {
    font-size: var(--finap-font-size-sm);
  }
`;
