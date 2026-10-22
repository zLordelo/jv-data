import { defineConfig, devices } from '@playwright/test';

const PORT = 4321;
const BASE_PATH = process.env.BASE_PATH || '/';
// Domínio usado nas URLs absolutas (canonical, sitemap) durante os testes.
const SITE_URL = process.env.SITE_URL || 'https://www.exemplo.com.br';

/**
 * Testes ponta a ponta no site já compilado (npm run build + astro preview),
 * em perfis de desktop, tablet e celular.
 */
export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['list'], ['html', { open: 'never' }]] : [['list']],
  use: {
    baseURL: `http://localhost:${PORT}${BASE_PATH.replace(/\/?$/, '/')}`,
    trace: 'retain-on-failure',
    locale: 'pt-BR',
    launchOptions: process.env.PW_CHROMIUM_PATH ? { executablePath: process.env.PW_CHROMIUM_PATH } : {},
  },
  projects: [
    {
      name: 'desktop',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } },
    },
    {
      name: 'tablet',
      use: { ...devices['iPad Mini'], browserName: 'chromium' },
    },
    {
      name: 'mobile',
      use: { ...devices['Pixel 7'] },
    },
    {
      name: 'mobile-small',
      use: { ...devices['iPhone SE'], browserName: 'chromium' },
    },
  ],
  webServer: {
    command: `npm run build && npx astro preview --port ${PORT} --ignore-lock`,
    url: `http://localhost:${PORT}${BASE_PATH.replace(/\/?$/, '/')}`,
    env: { SITE_URL, BASE_PATH },
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
