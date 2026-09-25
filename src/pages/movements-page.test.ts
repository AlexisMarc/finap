import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../services/transactions-service.js', () => ({ list: vi.fn() }));
vi.mock('../services/categories-service.js', () => ({ list: vi.fn() }));

import { MovementsPage } from './movements-page.js';
import { fixture, teardown } from '../test/fixture.js';
import { list as listTransactions } from '../services/transactions-service.js';
import { list as listCategories } from '../services/categories-service.js';
import { setPendingSearch, consumePendingSearch } from '../state/search.js';

const mockedList = vi.mocked(listTransactions);
const mockedCategories = vi.mocked(listCategories);

async function flush(): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 0));
}

const TRANSACTION = {
  id: 't1',
  type: 'expense' as const,
  amount: 980,
  categoryId: 'c_vivienda',
  date: '2025-05-12',
  note: 'Renta',
};

describe('movements-page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockedCategories.mockResolvedValue([]);
    consumePendingSearch();
  });

  it('lista los movimientos', async () => {
    mockedList.mockResolvedValue({
      items: [TRANSACTION],
      total: 1,
      page: 1,
      pageSize: 20,
    });
    const el = await fixture(new MovementsPage());
    await flush();
    await el.updateComplete;

    expect(el.shadowRoot?.querySelector('finap-movements-list')).not.toBeNull();
    teardown(el);
  });

  it('muestra el estado vacío', async () => {
    mockedList.mockResolvedValue({
      items: [],
      total: 0,
      page: 1,
      pageSize: 20,
    });
    const el = await fixture(new MovementsPage());
    await flush();
    await el.updateComplete;

    expect(el.transactions.length).toBe(0);
    expect(
      el.shadowRoot?.querySelector('sp-illustrated-message')?.getAttribute(
        'heading',
      ),
    ).toContain('No hay movimientos');
    teardown(el);
  });

  it('muestra el error con opción de reintentar', async () => {
    mockedList.mockRejectedValue(new Error('Fallo de red'));
    const el = await fixture(new MovementsPage());
    await flush();
    await el.updateComplete;

    expect(el.error).toBe('Fallo de red');
    expect(el.shadowRoot?.querySelector('sp-button')).not.toBeNull();
    teardown(el);
  });

  it('siembra la búsqueda pendiente en el primer fetch', async () => {
    setPendingSearch('alquiler');
    mockedList.mockResolvedValue({
      items: [],
      total: 0,
      page: 1,
      pageSize: 20,
    });
    const el = await fixture(new MovementsPage());
    await flush();
    await el.updateComplete;

    expect(el.filters.search).toBe('alquiler');
    expect(mockedList).toHaveBeenCalledWith(
      expect.objectContaining({ search: 'alquiler' }),
    );
    expect(consumePendingSearch()).toBe('');
    teardown(el);
  });

  it('recarga al cambiar los filtros', async () => {
    mockedList.mockResolvedValue({
      items: [],
      total: 0,
      page: 1,
      pageSize: 20,
    });
    const el = await fixture(new MovementsPage());
    await flush();
    await el.updateComplete;
    mockedList.mockClear();

    const filters = el.shadowRoot?.querySelector(
      'finap-movements-filters',
    ) as HTMLElement;
    filters.dispatchEvent(
      new CustomEvent('finap-filter-change', {
        detail: { type: 'expense', categoryId: '', from: '', to: '', search: '' },
        bubbles: true,
        composed: true,
      }),
    );
    await flush();
    await el.updateComplete;

    expect(mockedList).toHaveBeenCalled();
    teardown(el);
  });
});
