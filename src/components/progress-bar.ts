import { html, css } from 'lit';

import type { ProgressVariant } from '../utils/progress.js';

const VARIANT_COLOR: Record<ProgressVariant, string> = {
  positive: 'var(--finap-color-positive)',
  notice: 'var(--finap-color-accent)',
  negative: 'var(--finap-color-negative)',
};

/** Estilos compartidos de la barra de progreso Finap. */
export const progressBarStyles = css`
  .finap-progress {
    display: block;
    inline-size: 100%;
    block-size: 10px;
    border-radius: var(--finap-radius-full);
    background-color: var(--finap-color-track);
    overflow: hidden;
  }

  .finap-progress__fill {
    display: block;
    block-size: 100%;
    inline-size: var(--progress-value, 0%);
    max-inline-size: 100%;
    border-radius: inherit;
    background-color: var(--progress-color, var(--finap-color-accent));
    transition: inline-size var(--finap-motion-duration-normal)
      var(--finap-motion-easing-standard);
  }
`;

export interface ProgressBarOptions {
  percent: number;
  variant?: ProgressVariant;
  color?: string;
  label?: string;
}

/** Renderiza una barra de progreso accesible con color por variante o explícito. */
export function renderProgressBar(options: ProgressBarOptions) {
  const { percent, variant = 'positive', color, label } = options;
  const value = Math.min(Math.max(percent, 0), 100);
  const fill = color ?? VARIANT_COLOR[variant];
  return html`
    <span
      class="finap-progress"
      role="progressbar"
      aria-label=${label ?? ''}
      aria-valuenow=${Math.round(value)}
      aria-valuemin="0"
      aria-valuemax="100"
    >
      <span
        class="finap-progress__fill"
        style="--progress-value: ${value}%; --progress-color: ${fill}"
      ></span>
    </span>
  `;
}
