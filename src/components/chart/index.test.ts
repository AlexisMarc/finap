import { describe, it, expect, vi } from 'vitest';

const { destroyMock, ChartMock } = vi.hoisted(() => {
  const destroyMock = vi.fn();
  const ChartMock = vi.fn(() => ({ destroy: destroyMock }));
  return { destroyMock, ChartMock };
});

vi.mock('chart.js/auto', () => ({ Chart: ChartMock }));

import { FinapChart } from './index.js';
import { fixture, teardown } from '../../test/fixture.js';

describe('finap-chart', () => {
  it('crea el gráfico sobre el canvas con el tipo y datos', async () => {
    const el = new FinapChart();
    el.type = 'bar';
    el.data = { labels: ['A'], datasets: [{ data: [1] }] };
    await fixture(el);

    expect(ChartMock).toHaveBeenCalled();
    const [canvas, config] = ChartMock.mock.calls[0] as unknown as [
      HTMLCanvasElement,
      { type: string },
    ];
    expect(canvas.tagName).toBe('CANVAS');
    expect(config.type).toBe('bar');
    teardown(el);
  });

  it('destruye el gráfico al desconectar', async () => {
    const el = new FinapChart();
    el.data = { labels: ['A'], datasets: [{ data: [1] }] };
    await fixture(el);

    teardown(el);
    expect(destroyMock).toHaveBeenCalled();
  });
});
