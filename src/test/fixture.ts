import type { LitElement } from 'lit';

/**
 * Helper para tests unitarios de componentes Lit.
 *
 * En entornos de DOM emulado (happy-dom), el upgrade de custom elements vía
 * `document.createElement` + `appendChild` no dispara de forma fiable el
 * `connectedCallback` de Lit, por lo que `shadowRoot` queda null. Usamos la
 * construcción directa (`new`) y el ciclo de vida manual, que sí renderiza.
 */
export async function fixture<T extends LitElement>(component: T): Promise<T> {
  component.connectedCallback();
  await component.updateComplete;
  return component;
}

export function teardown(component: LitElement): void {
  component.disconnectedCallback();
}
