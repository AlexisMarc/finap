import { css } from 'lit';

export const styles = css`
  :host {
    display: inline-block;
  }

  button {
    font-family: var(--finap-font-family);
    font-size: var(--finap-font-size-md);
    font-weight: var(--finap-font-weight-semibold);
    line-height: var(--finap-line-height-normal);
    padding: var(--finap-space-3) var(--finap-space-5);
    border-radius: var(--finap-radius-md);
    border: 1px solid transparent;
    cursor: pointer;
    transition:
      background-color var(--finap-motion-duration-fast)
        var(--finap-motion-easing-standard),
      color var(--finap-motion-duration-fast) var(--finap-motion-easing-standard),
      border-color var(--finap-motion-duration-fast)
        var(--finap-motion-easing-standard);
  }

  button.primary {
    background-color: var(--finap-color-primary);
    color: var(--finap-color-on-primary);
  }

  button.primary:hover {
    background-color: var(--finap-color-primary-hover);
  }

  button.secondary {
    background-color: transparent;
    color: var(--finap-color-secondary);
    border-color: var(--finap-color-secondary);
  }

  button.secondary:hover {
    background-color: var(--finap-color-secondary);
    color: var(--finap-color-on-secondary);
  }

  button.text {
    background-color: transparent;
    color: var(--finap-color-primary);
    padding: var(--finap-space-2) var(--finap-space-3);
  }

  button:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  button:focus-visible {
    outline: 2px solid var(--finap-color-secondary);
    outline-offset: 2px;
  }

  @media (prefers-reduced-motion: reduce) {
    button {
      transition: none;
    }
  }
`;
