import { describe, it, expect, vi, beforeEach } from 'vitest';

const { ChartMock } = vi.hoisted(() => ({
  ChartMock: vi.fn(() => ({ destroy: vi.fn() })),
}));
vi.mock('chart.js/auto', () => ({ Chart: ChartMock }));
vi.mock('../services/analysis-service.js', () => ({
  getSummary: vi.fn(),
  getByCategory: vi.fn(),
  getEvolution: vi.fn(),
}));

import { AnalysisPage } from './analysis-page.js';
import { fixture, teardown } from '../test/fixture.js';
import {
  getSummary,
  getByCategory,
  getEvolution,
} from '../services/analysis-service.js';

const mockedSummary = vi.mocked(getSummary);
const mockedCategories = vi.mocked(getByCategory);
const mockedEvolution = vi.mocked(getEvolution);

async function flush(): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 0));
}

describe('analysis-page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockedSummary.mockResolvedValue({
      income: 6200,
      expense: 3480,
      debt: 4280,
      balance: 24580,
      trend: 12.5,
      categories: [],
    });
    mockedEvolution.mockResolvedValue({
      points: [{ label: 'May', income: 6200, expense: 3480 }],
    });
    mockedCategories.mockResolvedValue([
      {
        categoryId: 'c1',
        name: 'Vivienda',
        color: '#EB001B',
        amount: 1392,
        percentage: 40,
      },
    ]);
  });

  it('renderiza métricas y gráficas', async () => {
    const el = await fixture(new AnalysisPage());
    await flush();
    await el.updateComplete;

    const root = el.shadowRoot as ShadowRoot;
    expect(root.querySelector('finap-analysis-metrics')).not.toBeNull();
    expect(root.querySelectorAll('finap-chart').length).toBe(2);
    teardown(el);
  });

  it('recarga al cambiar de periodo', async () => {
    const el = await fixture(new AnalysisPage());
    await flush();
    await el.updateComplete;
    mockedSummary.mockClear();

    const chips = el.shadowRoot?.querySelectorAll('finap-chip');
    (chips?.[2] as HTMLElement).click();
    await flush();
    await el.updateComplete;

    expect(el.period).toBe('year');
    expect(mockedSummary).toHaveBeenCalled();
    teardown(el);
  });
});
