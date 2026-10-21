import { expect, test } from '@playwright/test';

test.describe('desempenho', () => {
  test('carregamento leve: poucos bytes, pouco JS e nada de terceiros', async ({ page, baseURL }) => {
    const responses: { url: string; type: string; bytes: number }[] = [];
    page.on('response', async (res) => {
      const body = await res.body().catch(() => Buffer.alloc(0));
      responses.push({ url: res.url(), type: res.request().resourceType(), bytes: body.length });
    });
    await page.goto('./', { waitUntil: 'networkidle' });

    const origin = new URL(baseURL!).origin;
    const thirdParty = responses.filter((r) => !r.url.startsWith(origin) && !r.url.startsWith('data:'));
    expect(thirdParty.map((r) => r.url), 'requisições a outros domínios atrasam a página').toEqual([]);

    const js = responses.filter((r) => r.type === 'script');
    const jsBytes = js.reduce((s, r) => s + r.bytes, 0);
    expect(jsBytes, 'JavaScript total (sem compressão)').toBeLessThan(10_000);

    const css = responses.filter((r) => r.type === 'stylesheet');
    expect(css, 'CSS deve estar embutido no HTML').toHaveLength(0);

    const total = responses.reduce((s, r) => s + r.bytes, 0);
    expect(total, 'peso total da primeira visita (sem compressão)').toBeLessThan(300_000);
  });

  test('maior elemento visível (LCP) carrega rápido e sem salto de layout', async ({ page }) => {
    await page.goto('./');
    const metrics = await page.evaluate(
      () =>
        new Promise<{ lcp: number; cls: number }>((resolve) => {
          let lcp = 0;
          let cls = 0;
          new PerformanceObserver((list) => {
            for (const e of list.getEntries()) lcp = e.startTime;
          }).observe({ type: 'largest-contentful-paint', buffered: true });
          new PerformanceObserver((list) => {
            for (const e of list.getEntries() as (PerformanceEntry & { value: number; hadRecentInput: boolean })[]) {
              if (!e.hadRecentInput) cls += e.value;
            }
          }).observe({ type: 'layout-shift', buffered: true });
          setTimeout(() => resolve({ lcp, cls }), 1500);
        }),
    );
    expect(metrics.lcp).toBeGreaterThan(0);
    expect(metrics.lcp, 'LCP em ms').toBeLessThan(2500);
    expect(metrics.cls, 'CLS').toBeLessThan(0.1);
  });

  test('imagens abaixo da dobra carregam sob demanda e em formatos modernos', async ({ page }) => {
    await page.goto('./');
    const team = page.locator('#sobre img');
    await expect(team.first()).toHaveAttribute('loading', 'lazy');
    const sources = await page.$$eval('#sobre picture source', (els) => els.map((el) => el.getAttribute('type')));
    expect(sources).toEqual(expect.arrayContaining(['image/avif', 'image/webp']));
  });
});
