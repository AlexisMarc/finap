import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../../services/assistant-service.js', () => ({ ask: vi.fn() }));

import { FinapAssistantChat } from './index.js';
import { fixture, teardown } from '../../test/fixture.js';
import { ask } from '../../services/assistant-service.js';

const mockedAsk = vi.mocked(ask);

async function flush(): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 0));
}

describe('finap-assistant-chat', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('envía una pregunta y muestra la respuesta', async () => {
    mockedAsk.mockResolvedValue({ answer: 'Vivienda (40%).' });
    const el = await fixture(new FinapAssistantChat());

    (el.shadowRoot?.querySelector('finap-input') as HTMLElement).dispatchEvent(
      new CustomEvent('finap-input', { detail: '¿En qué gasté más?' }),
    );
    (el.shadowRoot?.querySelector('finap-button') as HTMLElement).click();
    await flush();
    await el.updateComplete;

    expect(mockedAsk).toHaveBeenCalledWith('¿En qué gasté más?');
    expect(el.messages.length).toBe(2);
    expect(el.messages[1].text).toBe('Vivienda (40%).');
    teardown(el);
  });

  it('envía una pregunta rápida', async () => {
    mockedAsk.mockResolvedValue({ answer: 'ok' });
    const el = await fixture(new FinapAssistantChat());

    (el.shadowRoot?.querySelector('finap-chip') as HTMLElement).click();
    await flush();
    await el.updateComplete;

    expect(mockedAsk).toHaveBeenCalled();
    teardown(el);
  });

  it('muestra error sin perder la pregunta', async () => {
    mockedAsk.mockRejectedValue(new Error('fail'));
    const el = await fixture(new FinapAssistantChat());

    (el.shadowRoot?.querySelector('finap-input') as HTMLElement).dispatchEvent(
      new CustomEvent('finap-input', { detail: 'Hola' }),
    );
    (el.shadowRoot?.querySelector('finap-button') as HTMLElement).click();
    await flush();
    await el.updateComplete;

    expect(el.error).toBeTruthy();
    expect(el.messages[0].text).toBe('Hola');
    teardown(el);
  });
});
