import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];

async function revealAll(page: import('@playwright/test').Page) {
  await page.evaluate(() => document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible')));
  await page.waitForTimeout(700);
}

test.describe('acessibilidade (axe / WCAG 2.2 AA)', () => {
  test('página inicial sem violações', async ({ page }) => {
    await page.goto('./');
    await revealAll(page);
    const results = await new AxeBuilder({ page }).withTags(TAGS).analyze();
    const summary = results.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(' | ')}`);
    expect(summary).toEqual([]);
  });

  test('menu aberto no celular sem violações', async ({ page }) => {
    await page.goto('./');
    const toggle = page.locator('[data-menu-toggle]');
    test.skip(!(await toggle.isVisible()), 'só em telas menores');
    await toggle.click();
    const results = await new AxeBuilder({ page }).include('header').withTags(TAGS).analyze();
    expect(results.violations.map((v) => v.id)).toEqual([]);
  });

  test('link "pular para o conteúdo" é o primeiro item do teclado', async ({ page, isMobile }) => {
    test.skip(isMobile, 'navegação por Tab é cenário de teclado/desktop');
    await page.goto('./');
    await page.keyboard.press('Tab');
    const skip = page.getByRole('link', { name: 'Pular para o conteúdo' });
    await expect(skip).toBeFocused();
    await expect(skip).toBeInViewport();
    await page.keyboard.press('Enter');
    await expect(page.locator('#conteudo')).toBeFocused();
  });

  test('respeita "reduzir movimento" do sistema', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('./');
    const opacity = await page.locator('.reveal').last().evaluate((el) => getComputedStyle(el).opacity);
    expect(opacity).toBe('1');
  });
});
