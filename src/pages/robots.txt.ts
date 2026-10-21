import type { APIRoute } from 'astro';

/**
 * Observação: robôs de busca só leem o robots.txt na raiz do domínio.
 * No GitHub Pages em subpasta (/jv-data/) este arquivo não é lido; ele passa
 * a valer quando o site estiver em domínio próprio.
 */
export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL(`${import.meta.env.BASE_URL.replace(/\/?$/, '/')}sitemap-index.xml`, site);
  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${sitemap.href}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
