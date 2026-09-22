import { describe, it, expect } from 'vitest';

import { FinapAssistantMessage } from './index.js';
import { fixture, teardown } from '../../test/fixture.js';

describe('finap-assistant-message', () => {
  it('renderiza la burbuja del asistente', async () => {
    const el = new FinapAssistantMessage();
    el.role = 'assistant';
    el.text = 'Vivienda (40%).';
    await fixture(el);

    expect(el.shadowRoot?.querySelector('.bubble--assistant')?.textContent).toBe(
      'Vivienda (40%).',
    );
    teardown(el);
  });

  it('renderiza la burbuja del usuario', async () => {
    const el = new FinapAssistantMessage();
    el.role = 'user';
    el.text = '¿En qué gasté más?';
    await fixture(el);

    expect(el.shadowRoot?.querySelector('.bubble--user')).not.toBeNull();
    teardown(el);
  });
});
