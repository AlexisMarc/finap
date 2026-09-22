import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../services/categories-service.js', () => ({
  list: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  remove: vi.fn(),
}));

import { CategoriesPage } from './categories-page.js';
import { fixture, teardown } from '../test/fixture.js';
import { list } from '../services/categories-service.js';

const mockedList = vi.mocked(list);

async function flush(): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 0));
}

describe('categories-page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('lista las categorías', async () => {
    mockedList.mockResolvedValue([
      { id: 'c1', name: 'Vivienda', color: '#EB001B', icon: 'home' },
      { id: 'c2', name: 'Ocio', color: '#7C4DFF', icon: 'list' },
    ]);
    const el = await fixture(new CategoriesPage());
    await flush();
    await el.updateComplete;

    expect(el.shadowRoot?.querySelectorAll('.row').length).toBe(2);
    teardown(el);
  });

  it('abre el formulario de nueva categoría', async () => {
    mockedList.mockResolvedValue([]);
    const el = await fixture(new CategoriesPage());
    await flush();
    await el.updateComplete;

    (el.shadowRoot?.querySelector('finap-button') as HTMLElement).click();
    await el.updateComplete;

    expect(el.formOpen).toBe(true);
    teardown(el);
  });
});
