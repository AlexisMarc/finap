import { css } from 'lit';

export const styles = css`
  :host {
    display: block;
  }

  p {
    font-family: var(--finap-font-family);
    line-height: var(--finap-line-height-normal);
    margin: 0 0 var(--finap-space-4);
    color: var(--finap-color-text);
  }

  p.body {
    font-size: var(--finap-font-size-md);
  }

  p.muted {
    font-size: var(--finap-font-size-md);
    color: var(--finap-color-text-muted);
  }

  p.small {
    font-size: var(--finap-font-size-sm);
  }

  p.large {
    font-size: var(--finap-font-size-lg);
  }
`;
