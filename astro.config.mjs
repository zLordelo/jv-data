// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Endereço público do site, usado no canonical, no sitemap, no robots.txt e no Open Graph.
// Na publicação (Hostinger), SITE_URL vem da variável SITE_URL do repositório no GitHub.
// Sem ela, o build usa localhost, que só serve para desenvolvimento.
const SITE_URL = process.env.SITE_URL || 'http://localhost:4321';
// O site fica na raiz do domínio (public_html). Só mude se ele for para uma subpasta.
const BASE_PATH = process.env.BASE_PATH || '/';

export default defineConfig({
  site: SITE_URL,
  base: BASE_PATH,
  trailingSlash: 'always',
  compressHTML: true,
  build: {
    // Página única: CSS embutido no HTML elimina uma requisição que bloqueia a renderização.
    inlineStylesheets: 'always',
  },
  integrations: [sitemap()],
  fonts: [
    {
      provider: fontProviders.local(),
      name: 'Inter',
      cssVariable: '--font-body',
      fallbacks: ['Arial', 'sans-serif'],
      options: {
        variants: [
          {
            src: ['@fontsource-variable/inter/files/inter-latin-wght-normal.woff2'],
            weight: '100 900',
            style: 'normal',
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: 'Space Grotesk',
      cssVariable: '--font-display',
      fallbacks: ['Arial', 'sans-serif'],
      options: {
        variants: [
          {
            src: ['@fontsource-variable/space-grotesk/files/space-grotesk-latin-wght-normal.woff2'],
            weight: '300 700',
            style: 'normal',
          },
        ],
      },
    },
  ],
});
