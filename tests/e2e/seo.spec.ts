import { expect, test } from '@playwright/test';

test.describe('SEO e indexação', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('./');
  });

  test('meta tags essenciais', async ({ page }) => {
    await expect(page).toHaveTitle(/JV Data/);
    expect(await page.getAttribute('html', 'lang')).toBe('pt-BR');

    const description = await page.getAttribute('meta[name="description"]', 'content');
    expect(description?.length).toBeGreaterThanOrEqual(120);
    expect(description?.length).toBeLessThanOrEqual(160);

    expect(await page.getAttribute('meta[name="robots"]', 'content')).toContain('index, follow');
    expect(await page.getAttribute('link[rel="canonical"]', 'href')).toMatch(/^https:\/\/.+\/$/);
    expect(await page.getAttribute('meta[name="viewport"]', 'content')).toContain('width=device-width');
  });

  test('Open Graph e Twitter Card para compartilhamento', async ({ page }) => {
    for (const prop of ['og:title', 'og:description', 'og:url', 'og:image', 'og:locale']) {
      expect(await page.getAttribute(`meta[property="${prop}"]`, 'content'), prop).toBeTruthy();
    }
    expect(await page.getAttribute('meta[property="og:image"]', 'content')).toMatch(/^https:\/\/.+og-image\.jpg$/);
    expect(await page.getAttribute('meta[name="twitter:card"]', 'content')).toBe('summary_large_image');
  });

  test('um único H1 e hierarquia de títulos sem saltos', async ({ page }) => {
    await expect(page.locator('h1')).toHaveCount(1);
    const levels = await page.$$eval('h1, h2, h3, h4, h5, h6', (els) => els.map((el) => Number(el.tagName[1])));
    expect(levels[0]).toBe(1);
    for (let i = 1; i < levels.length; i++) {
      expect(levels[i] - levels[i - 1], `salto de h${levels[i - 1]} para h${levels[i]}`).toBeLessThanOrEqual(1);
    }
  });

  test('todas as imagens têm texto alternativo e dimensões', async ({ page }) => {
    const imgs = await page.$$eval('img', (els) =>
      els.map((el) => ({ src: el.currentSrc || el.src, alt: el.getAttribute('alt'), w: el.getAttribute('width'), h: el.getAttribute('height') })),
    );
    expect(imgs.length).toBeGreaterThan(0);
    for (const img of imgs) {
      expect(img.alt, img.src).toBeTruthy();
      expect(img.w && img.h, `${img.src} sem width/height (causa salto de layout)`).toBeTruthy();
    }
  });

  test('dados estruturados schema.org válidos', async ({ page }) => {
    const raw = await page.locator('script[type="application/ld+json"]').textContent();
    const data = JSON.parse(raw ?? '{}');
    const types = data['@graph'].map((n: { '@type': string }) => n['@type']);
    expect(types).toEqual(expect.arrayContaining(['ProfessionalService', 'WebSite', 'FAQPage']));

    const org = data['@graph'].find((n: { '@type': string }) => n['@type'] === 'ProfessionalService');
    expect(org.name).toBe('JV Data');
    expect(org.telephone).toBe('+5571999430604');
    expect(org.hasOfferCatalog.itemListElement).toHaveLength(4);

    // As perguntas do schema precisam ser as mesmas visíveis na página.
    const faq = data['@graph'].find((n: { '@type': string }) => n['@type'] === 'FAQPage');
    const visible = await page.locator('#duvidas summary h3').allTextContents();
    expect(faq.mainEntity.map((q: { name: string }) => q.name)).toEqual(visible.map((t) => t.trim()));
  });

  test('texto da página sem travessão, aspas curvas ou separador "·"', async ({ page }) => {
    const texts = await page.evaluate(() => [
      document.title,
      document.body.innerText,
      ...[...document.querySelectorAll('meta[content]')].map((m) => m.getAttribute('content') ?? ''),
      ...[...document.querySelectorAll('[alt], [aria-label]')].map((el) => `${el.getAttribute('alt') ?? ''} ${el.getAttribute('aria-label') ?? ''}`),
    ]);
    const found = texts.flatMap((t) => t.match(/.{0,30}[\u2013\u2014\u201C\u201D\u2018\u2019\u00B7].{0,30}/g) ?? []);
    expect(found).toEqual([]);
  });

  test('links internos do menu apontam para seções existentes', async ({ page }) => {
    const hrefs = await page.$$eval('a[href^="#"]', (els) => els.map((el) => el.getAttribute('href')!));
    for (const href of new Set(hrefs)) {
      await expect(page.locator(href), href).toHaveCount(1);
    }
  });
});

test.describe('arquivos de indexação', () => {
  test('robots.txt libera o site e aponta o sitemap', async ({ request }) => {
    const res = await request.get('robots.txt');
    expect(res.ok()).toBe(true);
    const body = await res.text();
    expect(body).toContain('Allow: /');
    expect(body).toMatch(/Sitemap: https:\/\/.+sitemap-index\.xml/);
  });

  test('sitemap lista a página inicial e não a 404', async ({ request }) => {
    const index = await request.get('sitemap-index.xml');
    expect(index.ok()).toBe(true);
    const sitemap = await (await request.get('sitemap-0.xml')).text();
    expect(sitemap).toMatch(/<loc>https:\/\/[^<]+\/<\/loc>/);
    expect(sitemap).not.toContain('404');
  });

  test('manifest e ícones existem', async ({ request }) => {
    const manifest = await (await request.get('manifest.webmanifest')).json();
    expect(manifest.name).toContain('JV Data');
    for (const icon of manifest.icons) {
      expect((await request.get(icon.src)).ok(), icon.src).toBe(true);
    }
    expect((await request.get('assets/og-image.jpg')).ok()).toBe(true);
    expect((await request.get('assets/favicon.ico')).ok()).toBe(true);
  });

  test('página 404 não é indexada e oferece caminho de volta', async ({ page }) => {
    await page.goto('404.html');
    expect(await page.getAttribute('meta[name="robots"]', 'content')).toContain('noindex');
    await expect(page.getByRole('link', { name: 'Voltar para o início' })).toBeVisible();
  });
});
