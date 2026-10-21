import { expect, test } from '@playwright/test';

const WA = /^https:\/\/wa\.me\/5571999430604\?text=.+/;

test.describe('chamadas para ação (WhatsApp)', () => {
  test('todo CTA aponta para o WhatsApp certo, com mensagem e abrindo em nova aba', async ({ page }) => {
    await page.goto('./');
    const ctas = page.locator('[data-cta]');
    const count = await ctas.count();
    expect(count).toBeGreaterThanOrEqual(9);

    for (let i = 0; i < count; i++) {
      const cta = ctas.nth(i);
      const name = await cta.getAttribute('data-cta');
      const href = await cta.getAttribute('href');
      expect(href, name!).toMatch(WA);
      expect(await cta.getAttribute('target'), name!).toBe('_blank');
      expect(await cta.getAttribute('rel'), name!).toContain('noopener');
      const text = new URL(href!).searchParams.get('text');
      expect(text, name!).toMatch(/JV Data/);
    }
  });

  test('cada serviço leva uma mensagem específica', async ({ page }) => {
    await page.goto('./');
    const hrefs = await page.$$eval('[data-cta^="servico-"]', (els) => els.map((el) => el.getAttribute('href')));
    expect(hrefs).toHaveLength(4);
    expect(new Set(hrefs).size).toBe(4);
  });

  test('o CTA principal aparece logo na primeira tela, sem rolar', async ({ page }) => {
    await page.goto('./');
    const heroCta = page.locator('[data-cta="hero"]');
    await expect(heroCta).toBeInViewport();
    await expect(page.locator('[data-cta="header"]')).toBeInViewport();
  });

  test('botão flutuante aparece depois de rolar a página', async ({ page }) => {
    await page.goto('./');
    const float = page.locator('[data-wa-float]');
    await expect(float).toBeHidden();
    await page.locator('#como-funciona').scrollIntoViewIfNeeded();
    await expect(float).toBeVisible();
    await expect(float).toHaveAttribute('aria-label', /WhatsApp/);
  });
});

test.describe('sem JavaScript', () => {
  test.use({ javaScriptEnabled: false });

  test('conteúdo e CTAs continuam funcionando', async ({ page }) => {
    await page.goto('./');
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('[data-cta="hero"]')).toHaveAttribute('href', WA);
    // Seções com animação de entrada não podem ficar invisíveis sem JS.
    const hidden = await page.$$eval('.reveal', (els) => els.filter((el) => getComputedStyle(el).opacity === '0').length);
    expect(hidden).toBe(0);
    // FAQ abre sem JS (elemento <details> nativo).
    const second = page.locator('#duvidas details').nth(1);
    await second.locator('summary').click();
    await expect(second).toHaveAttribute('open', '');
  });
});
