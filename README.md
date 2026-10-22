# JV Data

Site institucional da JV Data: painéis em Power BI, automação de tarefas (Power Automate e Python) e organização de dados. Trabalho por projeto, sem mensalidade.

A análise do site anterior e a lista do que mudou estão em [`docs/analise.md`](docs/analise.md).

## Tecnologia

- **[Astro 7](https://astro.build)**: gera HTML estático, sem framework JavaScript no navegador. A página inteira usa cerca de 1 KB de JS.
- **Imagens otimizadas no build:** AVIF/WebP no tamanho exato, com carregamento sob demanda.
- **Fontes no próprio site** (Fonts API do Astro): Inter e Space Grotesk, com pré-carregamento e fontes reserva ajustadas para o layout não "pular".
- **CSS embutido no HTML:** nenhuma requisição bloqueia a primeira pintura.
- **SEO:** meta tags, Open Graph, JSON-LD (`ProfessionalService`, `WebSite`, `FAQPage`), sitemap, robots.txt e manifest.
- **Servidor:** `.htaccess` para a Hostinger com HTTPS obrigatório, página 404, cache e cabeçalhos de segurança.
- **Testes:** Vitest (unitários) e Playwright + axe-core (navegador, em desktop, tablet e dois celulares).

Lighthouse (local): **100** em Desempenho, Acessibilidade, Boas práticas e SEO, no celular e no desktop.

## Estrutura

```
src/
  data/site.ts          ← todo o texto da página (edite aqui)
  components/           ← seções da página (Header, Hero, Services, Faq…)
  layouts/Base.astro    ← <head>: SEO, Open Graph, fontes
  lib/whatsapp.ts       ← monta os links do WhatsApp
  scripts/page.ts       ← menu do celular, botão flutuante, animações
  pages/                ← index, 404 e robots.txt
  assets/               ← logo e fotos (otimizadas no build)
public/                 ← favicons, imagem de compartilhamento, manifest, .htaccess
tests/unit/             ← testes de lógica e de regras de conteúdo
tests/e2e/              ← testes no navegador (SEO, CTA, acessibilidade, responsividade, desempenho)
```

## Como rodar

Requer **Node.js 24** (ou 22.23.4 e superiores). Com o `nvm`: `nvm use`.

```bash
npm install
npm run dev        # servidor de desenvolvimento em http://localhost:4321/
npm run build      # gera o site final em dist/
npm run preview    # serve o dist/ localmente
```

Para gerar o site com o domínio certo (canonical, sitemap e Open Graph):

```bash
SITE_URL=https://www.seudominio.com.br npm run build
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

- **SEO e indexação:** título, descrição, canonical, Open Graph, um único H1, hierarquia de títulos, `alt` nas imagens, JSON-LD, robots.txt, sitemap, manifest e 404 com `noindex`.
- **Texto:** sem travessões, aspas curvas ou o separador "·", e frases de até 35 palavras.
- **CTA:** todos os botões apontam para o WhatsApp certo, com mensagem, em nova aba. Também funcionam com o JavaScript desligado.
- **Acessibilidade:** axe-core (WCAG 2.2 AA) sem violações, link "pular para o conteúdo" e respeito a "reduzir movimento".
- **Responsividade:** sem rolagem horizontal em 12 larguras (320 a 1920 px), áreas de toque de 44 px ou mais, texto de 14 px ou mais e menu do celular (abrir, fechar com Esc, navegar).
- **Desempenho:** sem requisições a terceiros, JS abaixo de 10 KB, página abaixo de 300 KB, LCP abaixo de 2,5 s e CLS abaixo de 0,1.

No GitHub Actions, o relatório com as capturas de tela de cada perfil fica disponível como artefato `playwright-report`.

## Publicação na Hostinger

O workflow `.github/workflows/ci-deploy.yml` roda os testes em todo push e pull request. Em `main`, se tudo passar, ele gera o site com o seu domínio e envia por FTP para a pasta `public_html` da Hostinger.

### Configuração (uma vez só)

No GitHub, vá em **Settings → Secrets and variables → Actions**.

1. Na aba **Variables**, crie:
   - `SITE_URL`: o endereço do site, com `https://` e sem barra no final. Exemplo: `https://www.seudominio.com.br`.
2. Na aba **Secrets**, crie com os dados de **hPanel → Arquivos → Contas FTP**:
   - `FTP_SERVER`: o host FTP (por exemplo `ftp.seudominio.com.br` ou o IP mostrado no hPanel).
   - `FTP_USERNAME`: o usuário FTP.
   - `FTP_PASSWORD`: a senha FTP.
3. Opcionais (aba **Variables**), só se o padrão não funcionar:
   - `FTP_SERVER_DIR`: pasta de destino no FTP. Padrão: `public_html/`. Se a conta FTP já abrir dentro do `public_html`, use `./`.
   - `FTP_PROTOCOL`: padrão `ftps` (conexão criptografada). Use `ftp` apenas se a Hostinger recusar o `ftps`.

Na Hostinger, ative o SSL do domínio em **hPanel → Segurança → SSL** antes da primeira publicação. O `.htaccess` redireciona tudo para HTTPS.

Sem `SITE_URL`, a publicação é pulada com um aviso. Com `SITE_URL` e sem os dados de FTP, o site é gerado e fica disponível para download como artefato **site-hostinger** na execução do workflow (aba **Actions**).

### Envio manual (alternativa ao FTP)

1. Baixe o artefato **site-hostinger** da última execução do workflow, ou rode `SITE_URL=https://www.seudominio.com.br npm run build` e use a pasta `dist/`.
2. No **hPanel → Arquivos → Gerenciador de Arquivos**, abra `public_html`.
3. Envie todo o conteúdo da pasta (não a pasta em si), incluindo os arquivos `.htaccess` da raiz e de `_astro/`.

### Depois de publicar

- Cadastre o domínio no [Google Search Console](https://search.google.com/search-console) e envie `sitemap-index.xml`.
- Desative a versão antiga no GitHub Pages (**Settings → Pages**), para o Google não encontrar duas cópias do site.

## Pendências

- [ ] **Cases reais:** a seção "Exemplos do que entregamos" usa exemplos ilustrativos. Trocar em `src/data/site.ts` quando houver cases autorizados.
- [ ] **Revisar os textos** de problemas, FAQ e etapas para confirmar que refletem como vocês trabalham.
- [ ] **Perfil da Empresa no Google:** ajuda a aparecer em buscas locais.
- [ ] **Métricas (opcional):** cada botão tem `data-cta`, para medir qual gera mais conversas.
