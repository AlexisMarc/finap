import { html, nothing, css } from 'lit';

/** Estilos de fila de datos (estilo Spectrum). */
export const dataRowStyles = css`
  .item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--finap-space-3);
    padding: var(--finap-space-3) 0;
    border-top: 1px solid var(--finap-color-border);
  }

  .item__body {
    display: grid;
    gap: 2px;
    min-width: 0;
  }

  .item__title {
    font-family: var(--finap-font-family);
    font-weight: var(--finap-font-weight-semibold);
    color: var(--finap-color-text);
  }

  .item__subtitle {
    font-family: var(--finap-font-family);
    font-size: var(--finap-font-size-sm);
    color: var(--finap-color-text-muted);
  }

  .item__value {
    font-family: var(--finap-font-family);
    font-weight: var(--finap-font-weight-semibold);
    color: var(--finap-color-text);
    white-space: nowrap;
  }

  .item__value--income {
    color: var(--finap-color-income);
  }

  .item__value--expense {
    color: var(--finap-color-expense);
  }
`;

export interface DataRowOptions {
  title: string;
  subtitle?: string;
  value?: string;
  tone?: 'neutral' | 'income' | 'expense';
}

/** Renderiza una fila de datos (título/subtítulo a la izquierda, valor a la derecha). */
export function renderDataRow(options: DataRowOptions) {
  const { title, subtitle, value, tone = 'neutral' } = options;
  return html`
    <div class="item">
      <span class="item__body">
        <span class="item__title">${title}</span>
        ${subtitle ? html`<span class="item__subtitle">${subtitle}</span>` : nothing}
      </span>
      ${value
        ? html`<span class="item__value item__value--${tone}">${value}</span>`
        : nothing}
    </div>
  `;
}
