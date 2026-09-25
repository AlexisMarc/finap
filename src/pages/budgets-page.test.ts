import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../services/budgets-service.js', () => ({
  list: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  remove: vi.fn(),
}));
vi.mock('../services/categories-service.js', () => ({ list: vi.fn() }));

import { BudgetsPage } from './budgets-page.js';
import { fixture, teardown } from '../test/fixture.js';
import { list as listBudgets } from '../services/budgets-service.js';
import { list as listCategories } from '../services/categories-service.js';

const mockedBudgets = vi.mocked(listBudgets);
const mockedCategories = vi.mocked(listCategories);

async function flush(): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 0));
}

describe('budgets-page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockedCategories.mockResolvedValue([
      { id: 'c1', name: 'Alimentación', color: '#F79E1B', icon: 'list' },
    ]);
  });

  it('lista los presupuestos con progreso', async () => {
    mockedBudgets.mockResolvedValue([
      { id: 'b1', categoryId: 'c1', month: '2025-05', limit: 900, spent: 870 },
    ]);
    const el = await fixture(new BudgetsPage());
    await flush();
    await el.updateComplete;

    expect(el.shadowRoot?.querySelector('finap-budget-item')).not.toBeNull();
    teardown(el);
  });

  it('valida el formulario de presupuesto', async () => {
    mockedBudgets.mockResolvedValue([]);
    const el = await fixture(new BudgetsPage());
    await flush();
    await el.updateComplete;

    await el.updateComplete;
    const buttons = el.shadowRoot?.querySelectorAll('sp-button');
    // botón "Definir presupuesto"
    (buttons?.[0] as HTMLElement).click();
    await el.updateComplete;

    // botón "Guardar" del modal
    const modalButtons = el.shadowRoot?.querySelectorAll('sp-button');
    (modalButtons?.[2] as HTMLElement).click();
    await el.updateComplete;

    expect(el.formError).toBeTruthy();
    teardown(el);
  });
});
