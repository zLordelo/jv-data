/**
 * Todo o texto da página fica aqui. Para mudar uma frase, um serviço ou uma
 * pergunta do FAQ, edite este arquivo. Não é preciso mexer no layout.
 *
 * Regra de escrita: frases curtas, sem siglas soltas e explicando o resultado
 * para o cliente (o "para quê") antes da ferramenta (o "com o quê").
 * Não use travessões, aspas curvas nem o separador "·" (há teste para isso).
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
  ogImageAlt: 'Logo da JV Data, Solução em dados',
} as const;

/** Mensagens que já chegam escritas no WhatsApp, uma para cada botão. */
export const waMessages = {
  default: 'Olá! Vim pelo site da JV Data e gostaria de mais informações.',
  quote: 'Olá! Vim pelo site da JV Data e gostaria de pedir um orçamento.',
} as const;

export const nav = [
  { href: '#servicos', label: 'Serviços' },
  { href: '#como-funciona', label: 'Como funciona' },
  { href: '#sobre', label: 'Quem somos' },
  { href: '#duvidas', label: 'Dúvidas' },
] as const;

export const hero = {
  eyebrow: 'Consultoria em dados',
  title: 'Os números da sua empresa claros, atualizados e',
  highlight: 'sem planilha manual.',
  lead: 'A JV Data cria painéis e automações para você acompanhar os resultados da empresa em poucos cliques, sem gastar horas montando relatórios manualmente.',
  primaryCta: 'Conversar no WhatsApp',
  secondaryCta: 'Conheça nossos serviços',
  reassurance: ['Conversa sem compromisso', 'Sem mensalidade'],
} as const;

export const problems = {
  eyebrow: 'Problemas comuns',
  title: 'Situações que resolvemos no dia a dia das empresas',
  items: [
    {
      icon: 'clock',
      title: 'Horas perdidas copiando dados',
      text: 'Alguém da equipe passa o dia copiando e colando informações entre planilhas e sistemas.',
    },
    {
      icon: 'alert',
      title: 'Relatório atrasado ou com erro',
      text: 'Quando o relatório fica pronto, os números já estão desatualizados ou têm erros de digitação.',
    },
    {
      icon: 'split',
      title: 'Cada setor com um número diferente',
      text: 'Vendas, financeiro e operação discutem qual planilha está certa em vez de decidir.',
    },
    {
      icon: 'eye',
      title: 'Pouca clareza sobre os resultados',
      text: 'Fica difícil saber com segurança quanto a empresa vendeu, gastou e lucrou no mês.',
    },
  ],
} as const;

export const services = {
  eyebrow: 'Nossos serviços',
  title: 'Como podemos ajudar a sua empresa',
  intro: 'Não é preciso conhecer as ferramentas. Basta explicar a sua necessidade e indicamos a melhor solução.',
  items: [
    {
      id: 'paineis',
      icon: 'chart',
      title: 'Painéis e relatórios',
      tools: 'Power BI',
      text: 'Os números mais importantes reunidos em uma única tela, atualizados e fáceis de entender. Funciona no computador, no celular e na TV da empresa.',
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
      text: 'As tarefas repetitivas do dia a dia passam a ser feitas automaticamente, com menos erros e sem depender de alguém lembrar de fazê-las.',
      examples: [
        'Envio automático de relatórios por e-mail',
        'Atualização de planilhas sem copiar e colar',
        'Integração entre sistemas diferentes',
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
        'Planejamento para o crescimento da empresa',
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
  title: 'Etapas de um projeto',
  intro: 'Trabalhamos por projeto, sem pacote fechado ou assinatura. Antes de começar, você recebe o escopo, o prazo e o valor.',
  steps: [
    {
      title: 'Conversa inicial',
      text: 'Você explica como o processo funciona hoje e quais são as principais dificuldades.',
    },
    {
      title: 'Proposta',
      text: 'Enviamos por escrito o que será entregue, o prazo e o valor do projeto.',
    },
    {
      title: 'Desenvolvimento',
      text: 'Construímos a solução e apresentamos o andamento durante o projeto, para que os ajustes sejam feitos a tempo.',
    },
    {
      title: 'Entrega e suporte',
      text: 'Entregamos a solução funcionando, mostramos como usar e continuamos disponíveis para dúvidas.',
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
  title: 'Sobre a JV Data',
  paragraphs: [
    'A JV Data ajuda empresas que ainda dependem de planilhas, retrabalho e relatórios desatualizados a ter informação confiável para decidir melhor.',
    'Atendemos empresas de pequeno, médio e grande porte, desde quem está criando o primeiro painel até quem precisa organizar dados de vários sistemas. Em todos os casos, começamos entendendo o seu processo antes de propor qualquer ferramenta.',
  ],
  pillars: [
    {
      title: 'Entendimento antes da proposta',
      text: 'Olhamos sua rotina e seus dados antes de sugerir qualquer solução.',
    },
    {
      title: 'Ferramentas que sua equipe já conhece',
      text: 'Usamos Power BI, Excel e PowerPoint, para que a equipe não precise aprender um sistema novo.',
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
  title: 'Quer reduzir o trabalho manual na sua empresa?',
  text: 'Envie uma mensagem pelo WhatsApp contando um pouco sobre a sua rotina. A conversa é sem compromisso.',
  cta: 'Conversar no WhatsApp',
} as const;
