import { describe, it, expect } from 'vitest';

import { FinapAnalysisMetrics } from './index.js';
import { fixture, teardown } from '../../test/fixture.js';

describe('finap-analysis-metrics', () => {
  it('muestra las métricas del periodo', async () => {
    const el = new FinapAnalysisMetrics();
    el.income = 6200;
    el.expense = 3480;
    el.debt = 4280;
    el.balance = 24580;
    el.trend = 12.5;
    await fixture(el);

    expect(el.shadowRoot?.querySelectorAll('finap-stat-card').length).toBe(4);
    teardown(el);
  });
});
