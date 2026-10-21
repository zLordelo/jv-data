# Análise do site anterior e o que mudou

Análise feita sobre a versão anterior (`index.html` único, commit `7ead75c`). As notas de Lighthouse foram medidas no mesmo computador, com o site servido localmente.

| Lighthouse | Antes (celular) | Depois (celular) | Antes (desktop) | Depois (desktop) |
| --- | --- | --- | --- | --- |
| Desempenho | 82 | **100** | 100 | **100** |
| Acessibilidade | 93 | **100** | 93 | **100** |
| Boas práticas | 100 | 100 | 100 | 100 |
| SEO | 100 | 100 | 100 | 100 |
| LCP (maior elemento visível) | 3,4 s | **1,7 s** | 0,6 s | **0,4 s** |
| Peso total da página | 299 KB | **95 KB** | 299 KB | **90 KB** |

## UI/UX

| Problema encontrado | Correção |
| --- | --- |
| Botão principal com texto branco sobre ciano: contraste de ~2,3:1 (o mínimo WCAG é 4,5:1). Difícil de ler ao sol, no celular. | Texto azul-marinho sobre o ciano (~9:1). |
| Texto pequeno em ciano (`#0A8A96`) sobre fundo claro abaixo do contraste mínimo. | Tom mais escuro (`#06707A`). |
| Menu do celular sem `aria-expanded`, sem fechar com Esc ou ao clicar fora, e o ícone não virava "X". | Menu acessível, testado automaticamente. |
| Ordem do menu (Serviços, Como funciona, Sobre…) diferente da ordem das seções na página. | Menu e página seguem a mesma ordem. |
| Sem link "pular para o conteúdo", sem `<main>` e sem estilo de foco para quem navega pelo teclado. | Os três adicionados. |
| Conteúdo com `opacity: 0` até o JavaScript rodar: sem JS (ou se o script falhasse), seções inteiras ficavam invisíveis. | As animações só escondem conteúdo quando o JS está ativo. |
| A animação de entrada ignorava a configuração de "reduzir movimento" do sistema. | A configuração agora é respeitada. |
| Fotos da equipe embutidas em base64 (~75 KB dentro do HTML, sem cache). | Fotos em AVIF/WebP de ~1 KB, carregadas só quando aparecem na tela. |
| Logo PNG de 90 KB exibida em 100 × 40 px. | WebP de 4 KB (versão 2x de 9 KB). |
| Áreas de toque menores que 44 px em links do rodapé. | Todos os botões e links com 44 px ou mais. |

## Textos (clareza para o cliente médio)

O site anterior falava a língua de quem já trabalha com dados: "Business Intelligence", "Stack de dados", "Power Query, DAX, VBA", "análise preditiva e diagnóstica de eficiência operacional", "arquitetura de dados robusta".

A nova versão:

- Começa pelo **problema do cliente** (seção "Você se identifica?") e só depois fala de solução.
- Explica **o resultado** antes da ferramenta: "Painéis e relatórios" vem antes de "Power BI".
- Mostra **antes e depois** nos exemplos de projeto.
- Ganhou um **FAQ** com as dúvidas que travam a decisão: preço, mensalidade, prazo, "preciso entender de tecnologia?".
- Tem um teste automatizado que impede frases com mais de 35 palavras.

Todo o texto fica em `src/data/site.ts`. Para mudar uma frase não é preciso mexer no layout.

## SEO

| Antes | Depois |
| --- | --- |
| Meta description com ~210 caracteres (o Google corta em ~155). | 155 caracteres, com a ação no final. |
| `meta keywords` (o Google ignora desde 2009). | Removido. |
| JSON-LD só com `ProfessionalService` básico. | `@graph` com `ProfessionalService` (serviços, fundadores, contato), `WebSite` e `FAQPage`, gerados a partir do conteúdo da própria página. |
| Hierarquia de títulos com `<h2>` estilizado inline. | Um H1 e títulos sem pular níveis (verificado por teste). |
| Google Fonts bloqueando a renderização (3 famílias). | Fontes no próprio site, só as variações usadas, com fontes reserva ajustadas (sem "pulo" de layout). |
| Sem página 404. | 404 com `noindex` e link de volta. |

## Indexação

- **Adicionados:** `sitemap-index.xml`, `robots.txt`, `manifest.webmanifest`, `canonical` com barra final consistente.
- **Atenção:** no GitHub Pages em subpasta (`zlordelo.github.io/jv-data/`), os robôs de busca **não leem** o `robots.txt`, porque ele precisa estar na raiz do domínio. O sitemap continua funcionando quando enviado pelo Google Search Console. Com um domínio próprio, tudo passa a valer automaticamente.
- **Recomendado:** cadastrar o site no [Google Search Console](https://search.google.com/search-console), enviar o sitemap e criar o Perfil da Empresa no Google (Google Business Profile).

## CTA (chamadas para ação)

| Antes | Depois |
| --- | --- |
| Links de WhatsApp com `href="#"` preenchidos por JavaScript: sem JS, ou para robôs, os botões não levavam a lugar nenhum. | Links prontos no HTML, gerados no build e testados. |
| A mesma mensagem para todos os botões ("Oi, bom dia!…", estranho à noite). | Mensagem neutra ("Olá! Vim pelo site…") e **uma mensagem específica por serviço**, para vocês já saberem o assunto quando a conversa chega. |
| Nenhum CTA nos cards de serviço. | "Quero saber mais sobre…" em cada serviço. |
| No celular, o CTA do cabeçalho ficava escondido dentro do menu. | Botão "WhatsApp" sempre visível no cabeçalho do celular. |
| Nada que reduzisse a insegurança de chamar. | Frases de apoio: "Conversa sem compromisso", "Sem mensalidade", "Projeto sob medida". |
| Número de telefone em nenhum lugar visível. | Número visível no CTA final e no rodapé. |

Cada CTA tem um atributo `data-cta` (`hero`, `header`, `orcamento`, `servico-paineis`…). Ao instalar uma ferramenta de métricas (GA4, Plausible etc.), dá para medir qual botão gera mais conversas.
