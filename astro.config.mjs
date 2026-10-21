// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Endereço público do site. Ao usar um domínio próprio (ex.: https://jvdata.com.br),
// defina SITE_URL com o domínio e BASE_PATH como "/" no ambiente de build.
const SITE_URL = process.env.SITE_URL ?? 'https://zlordelo.github.io';
const BASE_PATH = process.env.BASE_PATH ?? '/jv-data';

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
