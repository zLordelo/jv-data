# JV Data

Site institucional da JV Data — consultoria em Business Intelligence, automação de processos (Power Automate e Python) e tratamento de dados.

## Estrutura

- `index.html` — landing page completa (HTML/CSS/JS em um único arquivo, sem build necessário).

## Como visualizar localmente

Basta abrir `index.html` diretamente no navegador, ou servir a pasta:

```bash
python3 -m http.server 8000
```

e acessar `http://localhost:8000`.

## Pendências (TODO)

- [ ] **Número de WhatsApp real** — hoje está com um número placeholder (`5511999999999`) na constante `WHATSAPP_NUMBER` em `index.html` (perto do fim do arquivo). Precisa ser substituído pelo número real da empresa.
- [ ] **Confirmar nome final da marca** — o site está usando "JV Data" (baseado no nome do repositório). Se o nome definitivo for outro, ajustar título, cabeçalho, texto do hero e rodapé.
- [ ] **Fotos da equipe** — as fotos de João Lordelo e Vitor Mota já estão embutidas no HTML; substituir se quiserem fotos mais atuais/profissionais.
- [ ] **Textos de "Sobre" e experiência** — revisar o resumo da experiência da empresa na seção "Quem somos".
- [ ] **Pacotes e preços** — a seção "Pacotes" tem descrições de escopo (Starter/Pro/Enterprise) mas sem preços; definir se os valores serão exibidos publicamente.
- [ ] **Hospedagem** — ainda não publicado. Pode ser hospedado via GitHub Pages (ativar em Settings → Pages, branch `main`, pasta raiz) ou outro provedor.

## Deploy sugerido (GitHub Pages)

1. Nas configurações do repositório, ir em **Settings → Pages**.
2. Selecionar branch `main` e pasta `/ (root)`.
3. O site ficará disponível em `https://zlordelo.github.io/jv-data/`.
