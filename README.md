# JV Data

Site institucional da JV Data — consultoria em Business Intelligence, automação de processos (Power Automate e Python) e tratamento de dados. Trabalho feito por projeto, sem pacotes fechados.

## Estrutura

- `index.html` — landing page completa (HTML/CSS/JS em um único arquivo, sem build necessário).
- `assets/` — logo, favicons e imagem de compartilhamento (Open Graph):
  - `jv-data-logo.png` — logo completa (ícone + wordmark), usada no cabeçalho.
  - `jv-data-icon.png` — apenas o ícone `{{JV}}`, recortado da logo original.
  - `favicon-*.png`, `favicon.ico`, `apple-touch-icon.png` — gerados a partir do ícone.
  - `og-image.jpg` — imagem 1200×630 para pré-visualização ao compartilhar o link (WhatsApp, LinkedIn, etc.).
  - `logo-source.jpg` — arquivo original da logo enviado, mantido como referência caso precise regenerar os outros assets.

## Como visualizar localmente

```bash
python3 -m http.server 8000
```

e acessar `http://localhost:8000`.

## O que já está pronto

- Paleta de cores alinhada à logo (azul-marinho + ciano/teal), tema claro.
- Botão de WhatsApp (header, hero, seção "Como funciona", CTA final e botão flutuante) apontando para `+55 71 99943-0604`.
- Seção "Como funciona" com o processo por projeto (diagnóstico → proposta → desenvolvimento → entrega) e CTA "Faça seu orçamento via WhatsApp" — sem pacotes/assinatura, valores a combinar.
- SEO: title/description otimizados, Open Graph e Twitter Card, dados estruturados (JSON-LD `ProfessionalService`), favicons e `robots`/`canonical`.
- Animações: grafo de dados animado no hero, revelação em cascata ao rolar a página, sombra no header ao rolar, pulso no botão flutuante do WhatsApp, hover nos cards. Tudo respeita `prefers-reduced-motion`.

## Pendências (TODO)

- [ ] **Revisar o texto da seção "Sobre"** — hoje é um texto genérico de consultoria de dados; ajustar se quiser algo mais específico da JV Data.
- [ ] **Exemplos de projeto** — a seção "Tipos de projeto que entregamos" tem exemplos ilustrativos; substituir por cases reais quando tiverem.
- [ ] **Domínio próprio** — se for usar um domínio customizado em vez do GitHub Pages, atualizar as URLs em `index.html` (meta `canonical`, `og:url`, `og:image`, `twitter:image` e o JSON-LD) e configurar o arquivo `CNAME`.

## Deploy sugerido (GitHub Pages)

1. Nas configurações do repositório, ir em **Settings → Pages**.
2. Selecionar branch `main` e pasta `/ (root)`.
3. O site ficará disponível em `https://zlordelo.github.io/jv-data/`.
