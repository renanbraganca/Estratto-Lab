import {
  MethodStep,
  PortfolioCase,
  ProposalConfig,
  ServicePillar,
  TeamMember,
} from '../types/proposal';

export const ESTRATTO_BRAND = {
  name: 'ESTRATTO',
  descriptor: 'Estúdio Colaborativo',
  origin: 'Goiânia · Brasil',
  phoneDisplay: '+55 62 98232-2842',
  whatsappNumber: '5562982322842',
  website: 'estrattolab.com.br',
  instagram: '@estratto.lab',
  closingQuote: 'A essência já está lá. A gente extrai.',
};

export const METHOD_STEPS: MethodStep[] = [
  {
    code: '01',
    title: 'Imersão',
    description:
      'Leitura profunda da marca, do mercado e de quem ela quer alcançar. O resultado é um diagnóstico, um mapa do que fazer.',
  },
  {
    code: '02',
    title: 'Construção Estratégica',
    description:
      'Posicionamento, proposta de valor, tom de voz e manifesto. A marca ganha estrutura antes de ganhar forma.',
  },
  {
    code: '03',
    title: 'Produção Criativa',
    description:
      'A estratégia se torna visual. Identidade, sistema, materiais e manual. Tudo pronto para uso imediato.',
  },
  {
    code: '04',
    title: 'Implementação Digital',
    description:
      'Site, perfis e banco de conteúdo. A marca entra no mundo com coerência de origem.',
  },
];

export const SERVICE_PILLARS: ServicePillar[] = [
  {
    id: 'branding',
    title: 'Branding Estratégico',
    headline: 'Posicionamento, identidade e percepção de valor.',
    description:
      'Construção de posicionamento, identidade e percepção de valor para marcas que precisam de direção, clareza e presença consistente no mercado.',
    tiers: [
      {
        id: 'essencial',
        name: 'Essencial',
        summary: 'Identidade completa para quem está construindo ou reconstruindo sua marca.',
        focus: [
          'Diagnóstico inicial e território de marca',
          'Sistema de identidade visual e tipografia',
          'Manual prático de aplicação imediata',
        ],
      },
      {
        id: 'completo',
        name: 'Completo',
        summary: 'Identidade e presença digital no mesmo movimento.',
        focus: [
          'Posicionamento e sistema visual completo',
          'Desdobramentos digitais e papelaria institucional',
          'Kit de implantação para redes e apresentações',
        ],
      },
      {
        id: 'estrategico',
        name: 'Estratégico',
        summary: 'Direção e posicionamento para negócios estabelecidos.',
        focus: [
          'Arquitetura de marca e portfólio de produtos',
          'Manifesto, tom de voz e narrativa executiva',
          'Governança visual para expansão comercial',
        ],
      },
    ],
  },
  {
    id: 'consultoria',
    title: 'Consultoria de Marca',
    headline: 'Reorganização estratégica com foco comercial.',
    description:
      'Análise estratégica para empresas do mercado imobiliário que precisam reorganizar posicionamento, comunicação, presença digital e estrutura comercial.',
    tiers: [
      {
        id: 'essencial',
        name: 'Essencial',
        summary: 'Diagnóstico, direcionamento e plano de implementação.',
        focus: [
          'Auditoria de pontos de contato e percepção',
          'Mapeamento de gargalos na comunicação comercial',
          'Plano tático priorizado por impacto',
        ],
      },
      {
        id: 'estrategico',
        name: 'Estratégico',
        summary: 'Aprofundamento institucional com governança de marca e expansão controlada.',
        focus: [
          'Acompanhamento quinzenal com diretoria',
          'Alinhamento entre branding, endomarketing e vendas',
          'Padronização de entregas internas e externas',
        ],
      },
    ],
  },
  {
    id: 'trafego',
    title: 'Tráfego Pago',
    headline: 'Performance para revenda, remanescentes e lançamentos.',
    description:
      'Estratégias de mídia voltadas para revenda, remanescentes e lançamentos imobiliários. Planejamento, segmentação e otimização com foco em performance comercial.',
    tiers: [
      {
        id: 'essencial',
        name: 'Essencial',
        summary: 'Estrutura de aquisição com gestão mensal recorrente.',
        focus: [
          'Configuração de funil e rastreamento de leads',
          'Campanhas segmentadas por perfil de imóvel',
          'Otimização contínua e relatório executivo',
        ],
      },
      {
        id: 'estrategico',
        name: 'Estratégico',
        summary: 'Planejamento ampliado, multiplataforma e otimização intensiva.',
        focus: [
          'Estratégia integrada para lançamentos e estoque',
          'Testes criativos contínuos e qualificação de demanda',
          'Sincronia semanal com equipe comercial',
        ],
      },
    ],
  },
];

export const PORTFOLIO_CASES: PortfolioCase[] = [
  {
    id: 'axil',
    client: 'Axil Construtora',
    city: 'Rio de Janeiro/RJ',
    date: 'Fev. 2025',
    segment: 'Construção Civil & Incorporação',
    summary:
      'Sistema visual geométrico construído sob malha técnica para transmitir precisão estrutural, proximidade humana e presença marcante em canteiros, papelaria e kits de obra.',
    deliverables: [
      'Identidade visual e malha construtiva do símbolo',
      'Sinalização de obra, capacetes e crachás executivos',
      'Papelaria institucional, envelopes e pastas técnicas',
    ],
    palette: ['#FF421C', '#0E2E4D', '#FAF2DF'],
    tagline: 'Construindo o futuro.',
    imageSrc: '/assets/portfolio/axil.jpg',
  },
  {
    id: 'grs',
    client: 'GRS Inc',
    city: 'Recife/PE',
    date: 'Out. 2025',
    segment: 'Incorporação Imobiliária',
    summary:
      'Identidade institucional de alto padrão desenhada para elevar a percepção de valor da incorporadora em pontos de contato arquitetônicos, brindes sensoriais e ambiente digital.',
    deliverables: [
      'Arquitetura da marca e símbolo em relevo',
      'Aplicação em fachada, app corporativo e uniformes',
      'Kit institucional de relacionamento e cadernos',
    ],
    palette: ['#7C1232', '#103554', '#ECE8DF'],
    tagline: 'Criamos lugares que merecem ser vividos.',
    imageSrc: '/assets/portfolio/grs.jpg',
  },
  {
    id: 'influence',
    client: 'Influence',
    city: 'Goiânia/GO',
    date: 'Jun. 2025',
    collab: 'Collab: Agência Confluir',
    segment: 'Móveis Planejados de Alto Padrão',
    summary:
      'Linguagem visual modular inspirada em encaixes arquitetônicos, unindo tons terrosos e verde mineral em impressos, frota, showroom e embalagens exclusivas.',
    deliverables: [
      'Identidade visual e grafismo geométrico modular',
      'Envelopamento de frota e fachada de showroom',
      'Kits de boas-vindas, difusores e papelaria texturizada',
    ],
    palette: ['#243E27', '#8C583A', '#1B1B1A'],
    tagline: 'Planejando & influenciando espaços.',
    imageSrc: '/assets/portfolio/influence.jpg',
  },
  {
    id: 'vb-studios',
    client: 'VB Studios',
    city: 'Goiânia/GO',
    date: 'Mar. 2026',
    segment: 'Brands and People · Mercado Imobiliário',
    summary:
      'Identidade contemporânea com estética industrial refinada para posicionar marcas e pessoas no mercado imobiliário por meio de direção visual autoral e objetos proprietários.',
    deliverables: [
      'Sistema de marca e selos tipográficos proprietários',
      'Embalagens especiais, vestuário e kits de mesa',
      'Direção de arte para posicionamento digital',
    ],
    palette: ['#183B2E', '#D8B467', '#191A19'],
    tagline: 'Posicionando marcas & pessoas no mercado imobiliário.',
    imageSrc: '/assets/portfolio/vb-studios.jpg',
  },
  {
    id: 'facilita',
    client: 'Facilita',
    city: 'Iporá/GO',
    date: 'Mar. 2026',
    segment: 'Assessoria e Consultoria',
    summary:
      'Marca construída sobre fluidez e clareza institucional, traduzindo assessoria técnica em uma presença visual confiável para ambientes digitais, credenciais e relacionamento.',
    deliverables: [
      'Identidade visual, ícone e universo 3D corporativo',
      'Interface de aplicativo e presença mobile',
      'Uniformes, crachás, papelaria e brindes executivos',
    ],
    palette: ['#10326B', '#C9A875', '#F3EFE6'],
    tagline: 'Facilitando o futuro da sua cidade.',
    imageSrc: '/assets/portfolio/facilita.jpg',
  },
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'jessica-moreira',
    name: 'Jéssica Moreira',
    initials: 'JM',
    roleTitle: 'Direção Estratégica',
    specialty: 'Gestão & Estrutura',
    bio: 'Gestão de projetos, processos e estrutura de marca.',
    avatarSrc: '/assets/team/jessica-moreira.jpg',
  },
  {
    id: 'renan-braganca',
    name: 'Renan Bragança',
    initials: 'RB',
    roleTitle: 'Direção de Branding',
    specialty: 'Conceito & Território',
    bio: 'Conceito, posicionamento e território criativo da marca.',
    avatarSrc: '/assets/team/renan-braganca.jpg',
  },
  {
    id: 'jessica-stein',
    name: 'Jéssica Stein',
    initials: 'JS',
    roleTitle: 'Estrategista de Design',
    specialty: 'Sistema Gráfico',
    bio: 'Arquitetura visual e execução do sistema gráfico.',
    avatarSrc: '/assets/team/jessica-stein.jpg',
  },
  {
    id: 'carol-albuquerque',
    name: 'Carol Albuquerque',
    initials: 'CA',
    roleTitle: 'Estrategista de Performance',
    specialty: 'Mídia & Dados',
    bio: 'Mídia, conteúdo e crescimento orientado a dados.',
    avatarSrc: '/assets/team/carol-albuquerque.jpg',
  },
];

export const DEFAULT_DINAMICA_PROPOSAL: ProposalConfig = {
  id: 'dinamica-2026',
  clientName: 'Dinâmica',
  clientSegment: 'Comunicação Visual Contínua & Endomarketing',
  location: 'Goiânia · Brasil',
  validUntil: '15 dias corridos',
  objectiveParagraphs: [
    'Nosso objetivo é dar continuidade à comunicação visual da Dinâmica, garantindo consistência, qualidade e unidade em todos os seus pontos de contato, tanto na comunicação interna, por meio do endomarketing, quanto na presença externa da empresa, especialmente nas redes sociais e materiais institucionais.',
    'Mais do que desenvolver peças isoladas, a proposta busca estabelecer um fluxo contínuo de criação, alinhado às necessidades da Dinâmica e às prioridades de cada período, garantindo maior organização, agilidade e assertividade nas entregas.',
  ],
  stagesIntro:
    'Estruturar um fluxo de comunicação contínuo, organizado e consistente, garantindo suporte criativo às demandas da Dinâmica e unidade em seus diferentes pontos de contato.',
  deliverables: [
    {
      id: 'del-1',
      code: '01',
      title: 'Planejamento mensal',
      description: 'Organização das demandas, prioridades e prazos de cada período.',
    },
    {
      id: 'del-2',
      code: '02',
      title: 'Apresentações',
      description:
        'Criação e estruturação visual de apresentações institucionais, comerciais e internas.',
    },
    {
      id: 'del-3',
      code: '03',
      title: 'Endomarketing',
      description:
        'Desenvolvimento de campanhas, comunicados, informativos e ações internas.',
    },
    {
      id: 'del-4',
      code: '04',
      title: 'Edição simples de vídeo',
      description:
        'Cortes, organização de conteúdo, aplicação de textos e adequação de formatos a partir de materiais fornecidos pelo cliente.',
    },
  ],
  stages: [
    {
      id: 'stg-1',
      code: '01',
      title: 'Imersão e Alinhamento',
      description:
        'Reuniões quinzenais para levantamento das demandas, definição de prioridades e organização das entregas.',
    },
    {
      id: 'stg-2',
      code: '02',
      title: 'Criação e desenvolvimento',
      description:
        'Produção dos materiais conforme os direcionamentos, identidade visual e prazos definidos.',
    },
    {
      id: 'stg-3',
      code: '03',
      title: 'Revisão e refinamento',
      description:
        'Realizados de forma organizada, reduzindo retrabalhos e mudanças durante o processo de criação.',
    },
  ],
  includedSummaryItems: [
    { id: 'inc-1', label: 'Endomarketing', status: 'Incluso' },
    { id: 'inc-2', label: 'Redes sociais (criação visual)', status: 'Incluso' },
    { id: 'inc-3', label: 'Apresentações', status: 'Incluso' },
    { id: 'inc-4', label: 'Edição simples/vídeo', status: 'Incluso' },
  ],
  basePrice: 7500,
  billingCycleLabel: 'Fee mensal',
  deliveryNote: 'Combinar plataforma e prazos de entrega de acordo com demandas.',
  fixedExclusions: [
    'Produção fotográfica, ilustrações complexas e Renders e imagens 3D.',
    'Impressão e acompanhamento de fornecedores gráficos.',
  ],
  optionalAddons: [
    {
      id: 'opt-video',
      title: 'Captação de vídeos & Motion design',
      description:
        'Diária de captação local ou animações dedicadas para campanhas de lançamento e institucional.',
      price: 2400,
      billingType: 'mensal',
      exclusionCounterpart: 'Captação de vídeos, Motion design.',
    },
    {
      id: 'opt-social',
      title: 'Gestão e publicação em redes sociais',
      description:
        'Agendamento, copywriting estratégico, calendário editorial publicado e monitoramento de canais.',
      price: 1800,
      billingType: 'mensal',
      exclusionCounterpart: 'Gestão e publicação em redes sociais.',
    },
    {
      id: 'opt-lp',
      title: 'Landing page institucional ou de campanha',
      description:
        'Design e desenvolvimento de página de conversão alinhada ao posicionamento visual da marca.',
      price: 4200,
      billingType: 'unico',
      exclusionCounterpart: 'Websites, landing pages ou sistemas.',
    },
  ],
  paymentOptions: [
    {
      id: 'pay-mensal',
      label: 'Fee mensal recorrente',
      description: 'Faturamento mensal contínuo com vencimento em data fixa definida abaixo.',
    },
    {
      id: 'pay-trimestral',
      label: 'Trimestral antecipado (-5%)',
      description: 'Compromisso de 3 meses com 5% de redução aplicada sobre o pacote mensal.',
      discountPercent: 5,
    },
    {
      id: 'pay-semestral',
      label: 'Semestral programado (-8%)',
      description: 'Contrato de 6 meses com 8% de condição especial e prioridade de pauta.',
      discountPercent: 8,
    },
  ],
  dueDates: ['Dia 05', 'Dia 10', 'Dia 15', 'Dia 20'],
  whatsappNumber: '5562982322842',
};

export const BLANK_CLIENT_TEMPLATE: ProposalConfig = {
  ...DEFAULT_DINAMICA_PROPOSAL,
  id: 'novo-cliente',
  clientName: 'Nome do Cliente',
  clientSegment: 'Posicionamento & Comunicação Contínua',
  objectiveParagraphs: [
    'Nosso objetivo é estruturar e dar continuidade à comunicação visual da marca, garantindo consistência, qualidade e unidade em todos os seus pontos de contato internos e externos.',
    'Mais do que desenvolver peças isoladas, a proposta estabelece um fluxo contínuo de criação alinhado às prioridades estratégicas de cada período.',
  ],
  stagesIntro:
    'Estruturar um fluxo de comunicação contínuo, organizado e consistente, garantindo suporte criativo às demandas da marca e unidade em seus diferentes pontos de contato.',
};
