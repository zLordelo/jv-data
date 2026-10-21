# JV Data

Site institucional da JV Data: painéis em Power BI, automação de tarefas (Power Automate e Python) e organização de dados. Trabalho por projeto, sem mensalidade.

Análise do site anterior e a lista do que mudou: [`docs/analise.md`](docs/analise.md).

## Tecnologia

- **[Astro 7](https://astro.build)**: gera HTML estático, sem framework JavaScript no navegador. A página inteira usa cerca de 1 KB de JS.
- **Imagens otimizadas no build:** AVIF/WebP no tamanho exato, com carregamento sob demanda.
- **Fontes no próprio site** (Fonts API do Astro): Inter e Space Grotesk, com pré-carregamento e fontes reserva ajustadas para não "pular" o layout.
- **CSS embutido no HTML:** nenhuma requisição bloqueia a primeira pintura.
- **SEO:** meta tags, Open Graph, JSON-LD (`ProfessionalService`, `WebSite`, `FAQPage`), sitemap, robots.txt e manifest.
- **Testes:** Vitest (unitários) e Playwright + axe-core (ponta a ponta, em desktop, tablet e dois celulares).

Lighthouse (local): **100** em Desempenho, Acessibilidade, Boas práticas e SEO, no celular e no desktop.

## Estrutura

```
src/
  data/site.ts          ← TODO o texto da página (edite aqui)
  components/           ← seções da página (Header, Hero, Services, Faq…)
  layouts/Base.astro    ← <head>: SEO, Open Graph, fontes
  lib/whatsapp.ts       ← monta os links do WhatsApp
  scripts/page.ts       ← menu do celular, botão flutuante, animações
  pages/                ← index, 404 e robots.txt
  assets/               ← logo e fotos (otimizadas no build)
public/                 ← favicons, imagem de compartilhamento, manifest
tests/unit/             ← testes de lógica e de regras de conteúdo
tests/e2e/              ← testes no navegador (SEO, CTA, acessibilidade, responsividade, desempenho)
```

## Como rodar

Requer **Node.js 24** (ou 22.23.4 e superiores). Com o `nvm`: `nvm use`.

```bash
npm install
npm run dev        # servidor de desenvolvimento em http://localhost:4321/jv-data/
npm run build      # gera o site final em dist/
npm run preview    # serve o dist/ localmente
```

## Testes

```bash
npx playwright install chromium   # só na primeira vez
npm test                          # unitários + navegador
npm run test:unit                 # só unitários (rápido)
npm run test:e2e                  # só navegador (compila o site antes)
npm run check                     # checagem de tipos
```

Os testes de navegador rodam em 4 perfis: **desktop** (1440 px), **tablet** (iPad Mini), **celular** (Pixel 7) e **celular pequeno** (iPhone SE, 320 px). Eles verificam:

- **SEO e indexação:** título, descrição, canonical, Open Graph, um único H1, hierarquia de títulos, `alt` nas imagens, JSON-LD, robots.txt, sitemap, manifest, 404 com `noindex`.
- **CTA:** todos os botões apontam para o WhatsApp certo, com mensagem, em nova aba. Também funcionam com o JavaScript desligado.
- **Acessibilidade:** axe-core (WCAG 2.2 AA) sem violações, link "pular para o conteúdo", respeito a "reduzir movimento".
- **Responsividade:** sem rolagem horizontal em 12 larguras (320 a 1920 px), áreas de toque de 44 px ou mais, texto de 14 px ou mais, menu do celular (abrir, fechar com Esc, navegar).
- **Desempenho:** sem requisições a terceiros, JS abaixo de 10 KB, página abaixo de 300 KB, LCP abaixo de 2,5 s, CLS abaixo de 0,1.

No GitHub Actions, o relatório com as capturas de tela de cada perfil fica disponível como artefato `playwright-report`.

## Publicação (GitHub Pages)

O workflow `.github/workflows/ci-deploy.yml` roda os testes em todo push e pull request. Em `main`, se tudo passar, ele publica o site.

**Configuração única:** em **Settings → Pages → Build and deployment → Source**, selecione **GitHub Actions** (antes era "Deploy from a branch").

O site fica em `https://zlordelo.github.io/jv-data/`.

### Domínio próprio

1. Crie o arquivo `public/CNAME` com o domínio (ex.: `jvdata.com.br`).
2. No workflow, no passo `npm run build` do job `deploy`, adicione as variáveis `SITE_URL: https://jvdata.com.br` e `BASE_PATH: /`.
3. Configure o DNS conforme a [documentação do GitHub Pages](https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site).

Com domínio próprio, o `robots.txt` passa a ser lido pelos buscadores (em subpasta ele é ignorado).

## Pendências

- [ ] **Cases reais:** a seção "Exemplos do que entregamos" usa exemplos ilustrativos. Trocar em `src/data/site.ts` quando houver cases autorizados.
- [ ] **Revisar os textos novos** (dores, FAQ, passos) para confirmar que refletem como vocês trabalham.
- [ ] **Google Search Console:** cadastrar o site e enviar `sitemap-index.xml`.
- [ ] **Perfil da Empresa no Google:** ajuda a aparecer em buscas locais.
- [ ] **Métricas (opcional):** cada botão tem `data-cta`, para medir qual gera mais conversas.
