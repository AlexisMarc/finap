import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../services/debts-service.js', () => ({
  list: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  remove: vi.fn(),
  registerPayment: vi.fn(),
}));

import { DebtsPage } from './debts-page.js';
import { fixture, teardown } from '../test/fixture.js';
import { list } from '../services/debts-service.js';

const mockedList = vi.mocked(list);

async function flush(): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 0));
}

describe('debts-page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('lista las deudas y el total pendiente', async () => {
    mockedList.mockResolvedValue([
      { id: 'd1', name: 'Auto', total: 2800, paid: 1820 },
      { id: 'd2', name: 'Personal', total: 640, paid: 576 },
    ]);
    const el = await fixture(new DebtsPage());
    await flush();
    await el.updateComplete;

    expect(el.shadowRoot?.querySelectorAll('finap-debt-item').length).toBe(2);
    expect(el.shadowRoot?.querySelector('.total')?.textContent).toContain(
      '$1,044.00',
    );
    teardown(el);
  });
});
