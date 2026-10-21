/**
 * Todo o texto da página fica aqui. Para mudar uma frase, um serviço ou uma
 * pergunta do FAQ, edite este arquivo — não é preciso mexer no layout.
 *
 * Regra de escrita: frases curtas, sem siglas soltas e explicando o resultado
 * para o cliente (o "para quê") antes da ferramenta (o "com o quê").
 */

export const company = {
  name: 'JV Data',
  tagline: 'Solução em dados',
  whatsapp: '5571999430604', // 55 + DDD + número, só dígitos
  description:
    'Consultoria que cria painéis em Power BI, automatiza tarefas repetitivas e organiza os dados da sua empresa. Trabalho por projeto, sem mensalidade.',
  founders: [
    { name: 'João Lordelo', role: 'Sócio-fundador', photo: 'joao-lordelo' },
    { name: 'Vitor Mota', role: 'Sócio-fundador', photo: 'vitor-mota' },
  ],
} as const;

export const seo = {
  title: 'JV Data | Painéis em Power BI, Automação e Dados para Empresas',
  description:
    'Painéis em Power BI, automação de tarefas e organização de dados para sua empresa. Menos planilha manual e números claros. Fale com a JV Data no WhatsApp.',
  ogImage: 'assets/og-image.jpg',
  ogImageAlt: 'Logo da JV Data — Solução em dados',
} as const;

/** Mensagens que já chegam escritas no WhatsApp, uma para cada botão. */
export const waMessages = {
  default: 'Olá! Vim pelo site da JV Data e gostaria de mais informações.',
  quote: 'Olá! Vim pelo site da JV Data e gostaria de pedir um orçamento.',
} as const;

export const nav = [
  { href: '#servicos', label: 'O que fazemos' },
  { href: '#como-funciona', label: 'Como funciona' },
  { href: '#sobre', label: 'Quem somos' },
  { href: '#duvidas', label: 'Dúvidas' },
] as const;

export const hero = {
  eyebrow: 'Painéis · Automação · Dados',
  title: 'Os números da sua empresa claros, atualizados e',
  highlight: 'sem planilha manual.',
  lead: 'A JV Data cria painéis e automações para você acompanhar vendas, custos e resultados em poucos cliques — e parar de perder horas montando relatório na mão.',
  primaryCta: 'Conversar no WhatsApp',
  secondaryCta: 'Ver o que fazemos',
  reassurance: ['Conversa sem compromisso', 'Projeto sob medida', 'Sem mensalidade'],
} as const;

export const problems = {
  eyebrow: 'Você se identifica?',
  title: 'Se algum destes problemas parece familiar, podemos ajudar',
  items: [
    {
      icon: 'clock',
      title: 'Horas perdidas copiando dados',
      text: 'Alguém da equipe passa o dia copiando e colando informações entre planilhas e sistemas.',
    },
    {
      icon: 'alert',
      title: 'Relatório atrasado ou com erro',
      text: 'Quando o relatório fica pronto, os números já estão velhos — ou alguém digitou errado.',
    },
    {
      icon: 'split',
      title: 'Cada setor com um número diferente',
      text: 'Vendas, financeiro e operação discutem qual planilha está certa em vez de decidir.',
    },
    {
      icon: 'eye',
      title: 'Decisões no escuro',
      text: 'Fica difícil saber, com segurança, quanto vendeu, quanto gastou e onde está o lucro.',
    },
  ],
} as const;

export const services = {
  eyebrow: 'O que fazemos',
  title: 'Quatro formas de colocar seus dados para trabalhar por você',
  intro: 'Você não precisa saber o nome das ferramentas. Conte o problema e nós indicamos o caminho.',
  items: [
    {
      id: 'paineis',
      icon: 'chart',
      title: 'Painéis e relatórios',
      tools: 'Power BI',
      text: 'Todos os números importantes em uma tela só, atualizados e fáceis de entender — no computador, no celular ou na TV da empresa.',
      examples: [
        'Painel de vendas, metas e faturamento',
        'Relatórios que se atualizam sozinhos',
        'Apresentações para a diretoria',
      ],
      message: 'Olá! Vim pelo site da JV Data e tenho interesse em painéis e relatórios (Power BI).',
    },
    {
      id: 'automacao',
      icon: 'bolt',
      title: 'Automação de tarefas',
      tools: 'Power Automate e Python',
      text: 'Aquelas tarefas repetitivas do dia a dia passam a ser feitas automaticamente, sem erro de digitação e sem depender de alguém lembrar.',
      examples: [
        'Envio automático de relatórios por e-mail',
        'Atualização de planilhas sem copiar e colar',
        'Integração entre sistemas que “não conversam”',
      ],
      message: 'Olá! Vim pelo site da JV Data e tenho interesse em automatizar tarefas da minha empresa.',
    },
    {
      id: 'organizacao',
      icon: 'database',
      title: 'Organização de dados',
      tools: 'Excel avançado e SQL',
      text: 'Juntamos e arrumamos as informações que estão espalhadas em planilhas e sistemas, para que toda a empresa use os mesmos números.',
      examples: [
        'Limpeza de planilhas bagunçadas',
        'Uma base única com dados de vários sistemas',
        'Planilhas de Excel mais rápidas e seguras',
      ],
      message: 'Olá! Vim pelo site da JV Data e preciso organizar os dados da minha empresa.',
    },
    {
      id: 'consultoria',
      icon: 'bulb',
      title: 'Consultoria em dados',
      tools: 'Análise e diagnóstico',
      text: 'Analisamos seus números para mostrar onde há desperdício, o que está dando certo e o que pode melhorar.',
      examples: [
        'Diagnóstico da operação com base em dados',
        'Indicadores certos para acompanhar o negócio',
        'Planejamento para crescer sem bagunça',
      ],
      message: 'Olá! Vim pelo site da JV Data e gostaria de uma consultoria em dados.',
    },
  ],
} as const;

export const projects = {
  eyebrow: 'Na prática',
  title: 'Exemplos do que entregamos',
  intro: 'Cada projeto é adaptado à rotina do cliente. Veja como fica o antes e o depois:',
  note: 'Exemplos ilustrativos do tipo de projeto que fazemos. Em breve, cases reais de clientes.',
  items: [
    {
      tag: 'Financeiro',
      title: 'Fechamento do mês automático',
      before: 'Dias juntando planilhas para fechar o mês.',
      after: 'Relatório pronto sozinho e painel sempre atualizado para a diretoria.',
    },
    {
      tag: 'Comercial',
      title: 'Painel de vendas em tempo real',
      before: 'Vendas espalhadas em sistemas diferentes.',
      after: 'Um painel único, acompanhado pela equipe e exibido na TV da sala.',
    },
    {
      tag: 'Operações',
      title: 'Todos os sistemas em uma base só',
      before: 'Exportar, copiar e colar dados entre arquivos todo dia.',
      after: 'Informações do sistema de gestão e das planilhas unificadas automaticamente.',
    },
  ],
} as const;

export const process = {
  eyebrow: 'Como funciona',
  title: 'Simples, do primeiro contato à entrega',
  intro: 'Sem pacote fechado e sem assinatura. Você sabe o que vai receber, em quanto tempo e por quanto antes de começarmos.',
  steps: [
    {
      title: 'Conversa inicial',
      text: 'Você conta como funciona hoje e onde estão as dores. Nós fazemos as perguntas certas.',
    },
    {
      title: 'Proposta clara',
      text: 'Enviamos o que será entregue, o prazo e o valor — tudo por escrito, sem letra miúda.',
    },
    {
      title: 'Mão na massa',
      text: 'Construímos a solução e mostramos o andamento ao longo do caminho, para ajustar cedo.',
    },
    {
      title: 'Entrega e suporte',
      text: 'Entregamos funcionando, ensinamos a usar e seguimos disponíveis para dúvidas.',
    },
  ],
  quote: {
    title: 'Quanto custa?',
    text: 'Cada empresa tem uma necessidade diferente, por isso o valor é combinado com você depois da conversa inicial.',
    cta: 'Pedir orçamento no WhatsApp',
  },
} as const;

export const about = {
  eyebrow: 'Quem somos',
  title: 'Gente de dados que fala a sua língua',
  paragraphs: [
    'A JV Data ajuda empresas que ainda dependem de planilhas, retrabalho e relatórios desatualizados a ter informação confiável para decidir melhor.',
    'Atendemos pequenas, médias e grandes empresas — de quem está criando o primeiro painel até quem precisa organizar dados de vários sistemas. O ponto de partida é sempre o mesmo: entender o seu processo antes de propor qualquer ferramenta.',
  ],
  pillars: [
    {
      title: 'Primeiro entendemos, depois propomos',
      text: 'Olhamos sua rotina e seus dados antes de sugerir qualquer solução.',
    },
    {
      title: 'Ferramentas que sua equipe já conhece',
      text: 'Power BI, Excel e PowerPoint — sem precisar aprender um sistema novo do zero.',
    },
    {
      title: 'Prazo e escopo combinados',
      text: 'Você sabe exatamente o que vai receber e quando, antes de começar.',
    },
  ],
} as const;

export const faq = {
  eyebrow: 'Dúvidas frequentes',
  title: 'Perguntas que costumamos ouvir',
  items: [
    {
      q: 'Preciso entender de tecnologia para contratar?',
      a: 'Não. Você explica como as coisas funcionam hoje e nós cuidamos de toda a parte técnica. No final, mostramos como usar de um jeito simples.',
    },
    {
      q: 'Quanto custa um projeto?',
      a: 'Depende do tamanho e da complexidade. Depois de uma conversa inicial para entender a sua necessidade, enviamos uma proposta com valor, prazo e tudo o que será entregue.',
    },
    {
      q: 'Vocês cobram mensalidade?',
      a: 'Não. Trabalhamos por projeto, sem pacote fechado e sem assinatura. Você paga pelo que foi combinado na proposta.',
    },
    {
      q: 'Minha empresa é pequena. Faz sentido para mim?',
      a: 'Sim. Atendemos empresas de todos os tamanhos. Muitas vezes, automatizar uma única tarefa ou criar um painel simples já economiza horas de trabalho por semana.',
    },
    {
      q: 'Quanto tempo demora?',
      a: 'Varia conforme o projeto. O prazo é definido na proposta, antes de começarmos, e você acompanha o andamento durante o desenvolvimento.',
    },
    {
      q: 'Quais ferramentas vocês usam?',
      a: 'Principalmente Power BI, Excel, Power Automate, Python e SQL. Sempre que possível, usamos ferramentas que a sua equipe já conhece.',
    },
    {
      q: 'E depois da entrega?',
      a: 'Entregamos a solução funcionando, com documentação, e seguimos disponíveis para tirar dúvidas. Se quiser, o projeto pode evoluir depois.',
    },
  ],
} as const;

export const finalCta = {
  title: 'Vamos tirar sua empresa da planilha manual?',
  text: 'Mande uma mensagem no WhatsApp contando um pouco da sua rotina. A conversa é sem compromisso.',
  cta: 'Conversar no WhatsApp',
} as const;
