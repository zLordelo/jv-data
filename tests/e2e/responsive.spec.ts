import { expect, test } from '@playwright/test';

/** Larguras reais de aparelhos: celulares pequenos até monitores grandes. */
const WIDTHS = [320, 360, 375, 390, 414, 600, 768, 820, 1024, 1280, 1440, 1920];

test.describe('responsividade', () => {
  test('nenhuma largura de tela gera rolagem horizontal', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop', 'varredura de larguras roda uma vez só');
    await page.goto('./');
    for (const width of WIDTHS) {
      await page.setViewportSize({ width, height: 900 });
      const overflow = await page.evaluate(() => {
        const doc = document.documentElement;
        const offenders = [...document.querySelectorAll<HTMLElement>('body *')]
          .filter((el) => {
            const r = el.getBoundingClientRect();
            return r.width > 0 && (r.right > doc.clientWidth + 1 || r.left < -1);
          })
          .filter((el) => !el.closest('[aria-hidden="true"]') && getComputedStyle(el).position !== 'fixed')
          .slice(0, 5)
          .map((el) => `${el.tagName.toLowerCase()}.${el.className}`);
        return { scroll: doc.scrollWidth - doc.clientWidth, offenders };
      });
      expect(overflow.scroll, `largura ${width}px: ${overflow.offenders.join(', ')}`).toBeLessThanOrEqual(0);
      expect(overflow.offenders, `largura ${width}px`).toEqual([]);
    }
  });

  test('valores do painel ilustrativo cabem nos cartões em qualquer largura', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop', 'varredura de larguras roda uma vez só');
    await page.goto('./');
    for (const width of WIDTHS) {
      await page.setViewportSize({ width, height: 900 });
      const overflowing = await page.$$eval('.kpi', (els) =>
        els
          .filter((el) => el.offsetParent !== null)
          .filter((el) => [...el.children].some((c) => c.scrollWidth > c.clientWidth))
          .map((el) => el.textContent!.trim()),
      );
      expect(overflowing, `largura ${width}px`).toEqual([]);
    }
  });

  test('textos legíveis: corpo com pelo menos 14px', async ({ page }) => {
    await page.goto('./');
    const small = await page.$$eval('main p, main li, main dd', (els) =>
      els
        // .eyebrow é um rótulo curto em caixa alta, não texto corrido.
        .filter((el) => el.closest('[aria-hidden="true"]') === null && !el.matches('.eyebrow'))
        .filter((el) => el.textContent!.trim().length > 20)
        .filter((el) => parseFloat(getComputedStyle(el).fontSize) < 14)
        .map((el) => el.textContent!.trim().slice(0, 40)),
    );
    expect(small).toEqual([]);
  });

  test('botões e links principais têm área de toque de pelo menos 44px', async ({ page }) => {
    await page.goto('./');
    const targets = page.locator('.btn, [data-cta], [data-menu-toggle]:visible, #duvidas summary');
    const count = await targets.count();
    for (let i = 0; i < count; i++) {
      const el = targets.nth(i);
      if (!(await el.isVisible())) continue;
      const box = await el.boundingBox();
      const label = (await el.textContent())?.trim() || (await el.getAttribute('aria-label'));
      expect(box!.height, `"${label}" muito baixo`).toBeGreaterThanOrEqual(44);
    }
  });

  test('captura de tela da página inteira', async ({ page }, testInfo) => {
    await page.goto('./');
    // Força as animações de entrada a terminarem antes do print.
    await page.evaluate(() => document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible')));
    await page.waitForTimeout(700);
    await testInfo.attach(`pagina-${testInfo.project.name}`, {
      body: await page.screenshot({ fullPage: true }),
      contentType: 'image/png',
    });
  });
});

test.describe('menu', () => {
  test('desktop mostra o menu completo; celular mostra o botão de menu', async ({ page, isMobile }, testInfo) => {
    await page.goto('./');
    const toggle = page.locator('[data-menu-toggle]');
    const navLink = page.locator('#menu-principal a').first();
    const width = page.viewportSize()!.width;
    if (width >= 900) {
      await expect(toggle).toBeHidden();
      await expect(navLink).toBeVisible();
    } else {
      await expect(toggle).toBeVisible();
      await expect(navLink).toBeHidden();
    }
    expect(isMobile || width >= 900 || testInfo.project.name === 'tablet').toBe(true);
  });

  test('menu do celular abre, fecha com Esc e fecha ao escolher uma seção', async ({ page }) => {
    await page.goto('./');
    const toggle = page.locator('[data-menu-toggle]');
    test.skip(!(await toggle.isVisible()), 'menu recolhido só existe em telas menores');

    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await expect(toggle).toHaveAttribute('aria-label', 'Fechar menu');
    await expect(page.locator('#menu-principal')).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await expect(page.locator('#menu-principal')).toBeHidden();
    await expect(toggle).toBeFocused();

    await toggle.click();
    await page.locator('#menu-principal').getByRole('link', { name: 'Como funciona' }).click();
    await expect(page.locator('#menu-principal')).toBeHidden();
    await expect(page).toHaveURL(/#como-funciona$/);
    await expect(page.locator('#como-funciona-title')).toBeInViewport();
  });

  test('o cabeçalho fixo não cobre o título da seção ao navegar pelo menu', async ({ page }) => {
    await page.goto('./#servicos');
    await page.waitForTimeout(400);
    const header = await page.locator('[data-header]').boundingBox();
    const title = await page.locator('#servicos-title').boundingBox();
    expect(title!.y).toBeGreaterThanOrEqual(header!.y + header!.height);
  });
});
