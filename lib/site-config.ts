export type PracticeArea = {
  id: string
  title: string
  summary: string
  highlights: string[]
  audience: string
  seoTitle: string
  seoDescription: string
  faq: Array<{ question: string; answer: string }>
  relatedArticleSlugs: string[]
}

export const siteConfig = {
  brand: {
    name: 'ADVDourado',
    legalName: 'Bruna Dourado Advocacia & Consultoria',
    shortName: 'ADVDourado',
    title: 'Advocacia e Consultoria Estratégica',
    oab: 'OAB/BA 71507',
  },
  contact: {
    phoneDisplay: '+55 71 99236-3943',
    phoneRaw: '5571992363943',
    email: 'bruna@advdourado.com.br',
    address: 'Rua Mandiguaçun, nº 50, Piatã - Salvador/BA',
    city: 'Salvador/BA',
    siteUrl: 'https://advdourado.com.br',
    calendarUrl: 'https://calendar.app.google/UtDZPPL7XNTS4qGZA',
  },
  social: {
    instagram: 'https://www.instagram.com/brunadouradoadv/',
    linkedin: 'https://www.linkedin.com/in/bruna-dourado-3638901b5/',
  },
  seo: {
    title: 'ADVDourado | Advocacia em Salvador - Trabalhista, Educacional, Família, Consumidor, Imóveis e Saúde',
    description:
      'ADVDourado oferece assessoria jurídica em Salvador/BA em Direito Trabalhista (empresa e trabalhador), Educacional para instituições, Família e acordos, Consumidor com foco patrimonial, Imóveis e Inventário consensual e Planos de Saúde para beneficiários. Atendimento estratégico, humanizado e conforme as normas da OAB.',
    keywords: [
      'advogado em salvador',
      'advocacia em salvador ba',
      'advogado trabalhista salvador',
      'consultoria trabalhista empresa e trabalhador',
      'advogado plano de saude salvador',
      'advogado consumidor salvador',
      'advogado inventario consensual salvador',
      'advogado educacional instituicoes salvador',
      'advogado direito de familia salvador',
      'advogado divórcio e herança',
      'ADVDourado',
    ],
  },
  positioning: {
    headline: 'Estratégia jurídica integrada para pessoas, famílias e empresas.',
    subheadline:
      'A ADVDourado centraliza atendimento em múltiplas frentes do Direito, com gestão próxima, linguagem clara e condução técnica orientada a prevenção e solução de conflitos.',
    description:
      'A estrutura institucional foi desenvolvida para reunir em um único ambiente digital as demandas mais recorrentes do público, sem pulverização de marca e com uma jornada objetiva de captação e triagem.',
  },
  about: {
    title: 'Sobre a ADVDourado',
    text: [
      'A ADVDourado nasce com proposta de advocacia contemporânea: atuação técnica, comunicação acessível e acompanhamento próximo de cada cliente.',
      'Com gestão conduzida por Bruna Dourado, o escritório organiza equipes e especialistas parceiros conforme o tema de cada demanda, mantendo unidade institucional e padrão de qualidade no atendimento.',
      'A atuação combina experiência prática, visão preventiva e compromisso com o tratamento humano dos conflitos, sempre em conformidade com as diretrizes éticas da advocacia.',
    ],
  },
  areas: [
    {
      id: 'trabalhista',
      title: 'Direito Trabalhista',
      summary: 'Atuação para empresas e empregados em conflitos, prevenção de passivo e cálculos trabalhistas.',
      highlights: [
        'Defesa de empresas e empregados',
        'Rescisão, verbas e horas extras',
        'Cálculos trabalhistas e estratégia processual',
      ],
      audience: 'Empresas, gestores e trabalhadores que precisam de orientação técnica na esfera laboral.',
      seoTitle: 'Direito Trabalhista em Salvador | ADVDourado',
      seoDescription: 'Atendimento trabalhista para empresas e empregados em Salvador/BA, com foco em cálculos, rescisões e prevenção de passivo.',
      faq: [
        {
          question: 'Horas extras não pagas podem ser cobradas?',
          answer: 'Sim. Cada caso exige análise da jornada efetiva, documentos e prazo legal para definição da estratégia adequada.',
        },
        {
          question: 'A empresa pode parcelar verbas rescisórias sem acordo formal?',
          answer: 'A regularidade depende do tipo de rescisão e da formalização correta. A avaliação técnica é essencial para evitar nulidades.',
        },
        {
          question: 'Empresas também podem buscar consultoria trabalhista preventiva?',
          answer: 'Sim. A orientação preventiva reduz risco de passivo e melhora segurança nas rotinas de gestão de pessoas.',
        },
        {
          question: 'Qual o prazo para receber verbas rescisórias?',
          answer: 'Em regra, o pagamento deve observar o prazo legal contado do encerramento do contrato. O caso concreto pode exigir análise de documentos e modalidade de rescisão.',
        },
        {
          question: 'O que é estabilidade no emprego e quem tem direito?',
          answer: 'A estabilidade protege o trabalhador contra dispensa sem justa causa em hipóteses previstas em lei, como gestação e acidente de trabalho, entre outras situações específicas.',
        },
        {
          question: 'Como funciona o aviso prévio indenizado e trabalhado?',
          answer: 'No aviso trabalhado, o empregado cumpre o período em atividade. No indenizado, a parte que rescinde paga o período correspondente sem prestação de serviço.',
        },
      ],
      relatedArticleSlugs: [
        'calculo-horas-extras-guia-completo',
        'rescisao-contrato-trabalho-tipos-calculos-prazos',
        'fgts-multa-40-saque-rescisao-guia-completo',
      ],
    },
    {
      id: 'empresarial',
      title: 'Direito Empresarial',
      summary: 'Consultoria para estruturação jurídica de negócios, contratos e relações comerciais.',
      highlights: [
        'Lavratura e revisão contratual',
        'Intermediação de contratos entre pessoas físicas e jurídicas',
        'Suporte preventivo para redução de riscos',
      ],
      audience: 'Empresas, empreendedores e sócios em fase de estruturação ou crescimento.',
      seoTitle: 'Direito Empresarial em Salvador | ADVDourado',
      seoDescription: 'Assessoria empresarial em Salvador/BA para contratos, negociações e proteção jurídica do negócio.',
      faq: [
        {
          question: 'Quando revisar contratos empresariais?',
          answer: 'A revisão deve ocorrer antes da assinatura, em renegociações e sempre que houver mudança relevante no risco do negócio.',
        },
        {
          question: 'A intermediação contratual entre pessoas físicas também é possível?',
          answer: 'Sim. O escritório atua na estruturação e mediação de instrumentos para dar segurança jurídica às partes.',
        },
        {
          question: 'Consultoria empresarial preventiva vale para empresas pequenas?',
          answer: 'Sim. A prevenção jurídica costuma reduzir custos e conflitos, independentemente do porte da operação.',
        },
      ],
      relatedArticleSlugs: ['juros-abusivos-como-identificar', 'fraude-bancaria-recuperar-dinheiro'],
    },
    {
      id: 'imoveis-inventario',
      title: 'Imóveis e Inventário Consensual',
      summary: 'Atuação em contratos imobiliários e inventários extrajudiciais, com foco em acordos consensuais.',
      highlights: [
        'Inventário consensual em cartório',
        'Partilha amigável e organização documental',
        'Contratos imobiliários com segurança jurídica',
      ],
      audience: 'Famílias e proprietários que buscam resolução consensual e extrajudicial.',
      seoTitle: 'Imóveis e Inventário Consensual em Salvador | ADVDourado',
      seoDescription: 'Atendimento em Salvador/BA para inventário consensual, partilha amigável e contratos imobiliários com condução técnica.',
      faq: [
        {
          question: 'Inventário pode ser feito em cartório?',
          answer: 'Sim, quando os requisitos legais para via extrajudicial são atendidos e há consenso entre os envolvidos.',
        },
        {
          question: 'Quando a partilha amigável é recomendada?',
          answer: 'Quando as partes concordam com os termos e desejam solução mais célere, segura e com menor desgaste.',
        },
        {
          question: 'É possível revisar contratos de compra e venda de imóvel?',
          answer: 'Sim. A revisão preventiva ajuda a reduzir risco de litígio e proteger o patrimônio.',
        },
      ],
      relatedArticleSlugs: ['produto-nao-entregue-solucao', 'nome-negativado-injustamente'],
    },
    {
      id: 'familia',
      title: 'Direito de Família',
      summary: 'Suporte jurídico humanizado em divórcio, guarda, alimentos e organização familiar patrimonial.',
      highlights: [
        'Divórcio consensual e litigioso',
        'Guarda, convivência e pensão alimentícia',
        'Inventário e planejamento sucessório familiar',
      ],
      audience: 'Famílias que buscam segurança jurídica em momentos sensíveis.',
      seoTitle: 'Direito de Família em Salvador | ADVDourado',
      seoDescription: 'Assessoria em Direito de Família em Salvador/BA para divórcio, guarda, alimentos e inventário.',
      faq: [
        {
          question: 'Guarda compartilhada é automática em todo divórcio?',
          answer: 'Não. A decisão depende do melhor interesse da criança e das condições concretas de cada família.',
        },
        {
          question: 'Pensão alimentícia pode ser revisada?',
          answer: 'Sim, quando há mudança relevante na necessidade de quem recebe ou na capacidade de quem paga.',
        },
        {
          question: 'Inventário precisa sempre ir para via judicial?',
          answer: 'Nem sempre. Em casos específicos, pode haver soluções extrajudiciais, conforme requisitos legais.',
        },
      ],
      relatedArticleSlugs: ['arrependimento-compra-direito-voltar', 'garantia-produto-vicio-oculto'],
    },
    {
      id: 'tributario',
      title: 'Direito Tributário',
      summary: 'Análise de carga tributária, defesa em cobranças e planejamento para redução de custos fiscais.',
      highlights: [
        'Planejamento tributário estratégico',
        'Defesa administrativa e judicial em tributos',
        'Revisão de custos e oportunidades de economia',
      ],
      audience: 'Empresas e pessoas com demandas fiscais e tributárias.',
      seoTitle: 'Direito Tributário em Salvador | ADVDourado',
      seoDescription: 'Consultoria tributária em Salvador/BA para planejamento fiscal, revisão de custos e defesa em cobranças.',
      faq: [
        {
          question: 'Planejamento tributário é só para grandes empresas?',
          answer: 'Não. Pequenos e médios negócios também podem se beneficiar de planejamento e revisão de carga tributária.',
        },
        {
          question: 'É possível discutir cobranças fiscais indevidas?',
          answer: 'Sim. A depender do caso, há caminhos administrativos e judiciais para revisão e defesa.',
        },
        {
          question: 'Revisão tributária ajuda na redução de custos?',
          answer: 'Pode ajudar, desde que conduzida com base técnica e em conformidade com a legislação aplicável.',
        },
      ],
      relatedArticleSlugs: ['juros-abusivos-como-identificar', 'nome-negativado-injustamente'],
    },
    {
      id: 'planos-saude',
      title: 'Planos de Saúde',
      summary: 'Atuação focada em tratativas para liberação de atendimentos, procedimentos e tratamentos médicos.',
      highlights: [
        'Negativa de cobertura e urgência médica',
        'Liberação de procedimentos e exames',
        'Negociação e medidas para garantir atendimento',
      ],
      audience: 'Pacientes e famílias com conflitos em saúde suplementar.',
      seoTitle: 'Advogado de Planos de Saúde em Salvador | ADVDourado',
      seoDescription: 'Suporte jurídico para negativas de planos de saúde e liberação de tratamentos em Salvador/BA.',
      faq: [
        {
          question: 'Negativa de procedimento pode ser contestada?',
          answer: 'Sim. A viabilidade depende da documentação médica, do contrato e da urgência do atendimento.',
        },
        {
          question: 'Reajuste alto no plano de saúde é sempre legal?',
          answer: 'Não necessariamente. É preciso avaliar tipo de contrato, faixa etária e critérios regulatórios aplicáveis.',
        },
        {
          question: 'Carência se aplica a qualquer situação?',
          answer: 'Não. Há hipóteses específicas em que a discussão jurídica pode afastar negativa baseada em carência.',
        },
        {
          question: 'Posso ser cobrado por procedimento de urgência?',
          answer: 'Situações de urgência e emergência possuem regras próprias de cobertura. A regularidade da cobrança deve ser verificada com base no contrato e nas normas da ANS.',
        },
        {
          question: 'O que fazer em caso de cancelamento unilateral do plano?',
          answer: 'O primeiro passo é reunir contrato, comunicados e histórico de pagamentos. Com esses elementos, é possível avaliar medidas administrativas e judiciais para restabelecer a cobertura.',
        },
        {
          question: 'Como funciona a portabilidade de carências?',
          answer: 'A portabilidade permite migração entre planos com aproveitamento de carências quando os requisitos regulatórios são atendidos, evitando reinício integral dos prazos.',
        },
      ],
      relatedArticleSlugs: [
        'negativa-procedimento-5-passos',
        'reajuste-abusivo-plano-saude',
        'carencia-plano-saude',
      ],
    },
    {
      id: 'consumidor',
      title: 'Direito do Consumidor',
      summary: 'Defesa em relações de consumo com atuação em cobranças indevidas, contratos e falhas de serviço.',
      highlights: [
        'Cobrança indevida e negativação irregular',
        'Revisão de contratos e cláusulas abusivas',
        'Responsabilização por falhas de produtos e serviços',
      ],
      audience: 'Consumidores e famílias em conflitos com fornecedores e prestadores de serviço.',
      seoTitle: 'Direito do Consumidor em Salvador | ADVDourado',
      seoDescription: 'Defesa do consumidor em Salvador/BA para cobranças indevidas, contratos abusivos e conflitos de consumo.',
      faq: [
        {
          question: 'Cobrança indevida gera direito à devolução?',
          answer: 'Pode gerar, conforme o contexto da cobrança e os elementos de prova disponíveis no caso concreto.',
        },
        {
          question: 'Produto com defeito fora da garantia ainda pode ser discutido?',
          answer: 'Sim. Dependendo da situação, a análise jurídica pode indicar medidas mesmo após o prazo contratual.',
        },
        {
          question: 'Nome negativado de forma injusta pode ser revisto?',
          answer: 'Sim. É possível buscar correção e medidas cabíveis quando houver irregularidade comprovada.',
        },
        {
          question: 'O que fazer se o produto atrasar para entregar?',
          answer: 'Registre todas as tentativas de contato e solicite solução formal ao fornecedor. Dependendo do caso, é possível exigir cumprimento, cancelamento com reembolso e eventuais perdas e danos.',
        },
        {
          question: 'Como cancelar compra pela internet dentro de 7 dias?',
          answer: 'No arrependimento em compras fora do estabelecimento comercial, a solicitação deve ser feita dentro do prazo legal com prova do pedido de cancelamento e devolução.',
        },
        {
          question: 'Quais os direitos em caso de vício oculto no produto?',
          answer: 'Quando o defeito aparece depois do uso e não era detectável no ato da compra, o prazo para reclamar conta da descoberta do problema, com possibilidade de reparo, troca ou restituição.',
        },
      ],
      relatedArticleSlugs: [
        'nome-negativado-injustamente',
        'fraude-bancaria-recuperar-dinheiro',
        'produto-nao-entregue-solucao',
      ],
    },
    {
      id: 'educacional',
      title: 'Direito Educacional',
      summary:
        'Assessoria para instituições de ensino com foco em governança acadêmica, formação de equipes, adequação regulatória e integração com LGPD e Direito Digital.',
      highlights: [
        'Atualização normativa e implementação da RN-1 com plano aplicado por setores',
        'Revisão de contratos, regimentos e fluxos acadêmico-administrativos',
        'Formação de equipes e trilhas de compliance educacional com proteção de dados',
      ],
      audience:
        'Mantenedoras, diretorias, coordenações pedagógicas e administrativas, além de instituições privadas e filantrópicas de ensino que precisam treinar equipes e reduzir riscos.',
      seoTitle: 'Direito Educacional em Salvador | ADVDourado',
      seoDescription:
        'Assessoria em Direito Educacional para instituições de ensino em Salvador/BA com foco em RN-1, formação de equipes, compliance, LGPD e atualização de procedimentos jurídicos.',
      faq: [
        {
          question: 'O que muda com a RN-1 para instituições de ensino?',
          answer:
            'A RN-1 ampliou deveres de governança, rastreabilidade e formalização de procedimentos, exigindo revisão de políticas internas, fluxos de resposta e capacitação contínua das equipes.',
        },
        {
          question: 'A adequação à LGPD no ambiente escolar vai além do aviso de privacidade?',
          answer:
            'Sim. A conformidade envolve base legal para tratamento de dados, gestão de consentimento quando aplicável, controle de acesso, retenção documental e protocolos de incidentes.',
        },
        {
          question: 'É necessário treinar a equipe para as novas exigências regulatórias?',
          answer:
            'Sim. Treinamentos periódicos reduzem falhas operacionais, padronizam condutas e demonstram diligência institucional em auditorias e fiscalizações.',
        },
        {
          question: 'Quais documentos merecem revisão prioritária após a RN-1?',
          answer:
            'Regimento interno, contratos de prestação de serviços educacionais, políticas de privacidade, termos de uso de imagem, protocolos disciplinares e fluxos de atendimento a titulares de dados.',
        },
        {
          question: 'Direito Digital e LGPD podem ser trabalhados dentro da rotina educacional?',
          answer:
            'Sim. A integração de Direito Digital com Direito Educacional permite criar protocolos de tratamento de dados, conduta em ambientes virtuais e respostas a incidentes, com treinamento contínuo para equipes.',
        },
      ],
      relatedArticleSlugs: ['fraude-bancaria-recuperar-dinheiro', 'nome-negativado-injustamente'],
    },
    {
      id: 'digital',
      title: 'Direito Digital',
      summary: 'Suporte em proteção de dados, LGPD, incidentes digitais e contratos em ambiente online, com aplicação prática para empresas e instituições de ensino.',
      highlights: [
        'Diagnóstico e plano de adequação em LGPD com trilha de implementação',
        'Protocolos para incidentes digitais, segurança da informação e resposta a titulares',
        'Formação de equipes para cultura de proteção de dados e governança digital',
      ],
      audience:
        'Empresas, instituições de ensino e profissionais com demandas ligadas ao ambiente digital, proteção de dados e compliance operativo.',
      seoTitle: 'Direito Digital e LGPD em Salvador | ADVDourado',
      seoDescription:
        'Consultoria em Direito Digital e LGPD em Salvador/BA para proteção de dados, incidentes, contratos eletrônicos e formação prática de equipes.',
      faq: [
        {
          question: 'LGPD se aplica a empresas de pequeno porte?',
          answer: 'Sim. A aplicação pode variar em complexidade, mas regras de proteção de dados devem ser observadas.',
        },
        {
          question: 'Vazamento de dados pode gerar responsabilidade jurídica?',
          answer: 'Sim. O caso exige avaliação técnica sobre obrigação de segurança, comunicação e reparação.',
        },
        {
          question: 'Contratos digitais têm validade jurídica?',
          answer: 'Sim, desde que respeitados requisitos legais de forma e prova da manifestação de vontade.',
        },
        {
          question: 'É possível capacitar equipes para prevenir incidentes de dados?',
          answer:
            'Sim. A formação contínua de equipes reduz falhas operacionais, melhora governança e fortalece a documentação de conformidade para auditorias e fiscalizações.',
        },
      ],
      relatedArticleSlugs: ['fraude-bancaria-recuperar-dinheiro', 'juros-abusivos-como-identificar'],
    },
    {
      id: 'previdenciario',
      title: 'Direito Previdenciário',
      summary: 'Planejamento, concessão, revisão e defesa de benefícios do INSS e regimes próprios.',
      highlights: [
        'Aposentadoria por tempo de contribuição',
        'Aposentadoria especial e por invalidez',
        'Revisão de benefícios',
        'INSS e outros regimes',
      ],
      audience: 'Segurados, aposentados e pensionistas que buscam segurança em benefícios previdenciários.',
      seoTitle: 'Direito Previdenciário em Salvador | ADVDourado',
      seoDescription: 'Atendimento previdenciário em Salvador/BA para INSS, aposentadoria, revisão e defesa de benefícios.',
      faq: [
        {
          question: 'Vale a pena calcular a aposentadoria antes do pedido?',
          answer: 'Sim. O cálculo prévio ajuda na estratégia e reduz risco de erro no requerimento.',
        },
        {
          question: 'Benefício negado pelo INSS pode ser contestado?',
          answer: 'Sim. A contestação pode ocorrer por vias administrativas e, quando necessário, pela via judicial.',
        },
        {
          question: 'Tempo de contribuição pode ser revisado?',
          answer: 'Em muitos casos, sim. A revisão depende de documentos e histórico contributivo.',
        },
      ],
      relatedArticleSlugs: ['juros-abusivos-como-identificar', 'nome-negativado-injustamente'],
    },
  ] as PracticeArea[],
  differentiators: [
    {
      title: 'Gestão centralizada',
      description: 'Bruna Dourado conduz a estratégia institucional e articula especialistas parceiros conforme a demanda.',
    },
    {
      title: 'Visão ampla de negócio e vida real',
      description: 'Atendimento pensado para contexto empresarial, familiar e patrimonial, com comunicação objetiva.',
    },
    {
      title: 'Captação com responsabilidade',
      description: 'Jornada digital orientada a triagem e consulta formal, sem promessas de resultado.',
    },
    {
      title: 'Conformidade OAB',
      description: 'Conteúdo institucional e informativo, respeitando Estatuto da Advocacia e Provimento 205/2021.',
    },
  ],
  steps: [
    {
      title: 'Triagem inicial',
      description: 'Você envia a demanda e o escritório identifica o melhor encaminhamento.',
    },
    {
      title: 'Levantamento técnico',
      description: 'Documentos e contexto do caso são avaliados para definição de viabilidade e prioridade.',
    },
    {
      title: 'Consulta e estratégia',
      description: 'A orientação personalizada é formalizada com plano de ação e escopo de atuação.',
    },
    {
      title: 'Execução jurídica',
      description: 'Atuação consultiva, negocial ou contenciosa conforme as particularidades do caso.',
    },
  ],
  faqs: [
    {
      question: 'A ADVDourado atende somente casos em Salvador?',
      answer:
        'O escritório está sediado em Salvador/BA, mas o atendimento inicial e diversas frentes de consultoria podem ser conduzidos de forma remota.',
    },
    {
      question: 'O escritório atua apenas em uma área do Direito?',
      answer:
        'Não. A proposta é atendimento integrado em áreas estratégicas, com coordenação central e especialistas parceiros quando necessário.',
    },
    {
      question: 'Como funciona a análise inicial do caso?',
      answer:
        'A triagem pode começar pelo formulário ou WhatsApp. A orientação jurídica individualizada depende de consulta formal.',
    },
    {
      question: 'Há promessa de resultado no site?',
      answer:
        'Não. O conteúdo é informativo e institucional. Toda estratégia depende da análise técnica do caso concreto.',
    },
  ],
  compliance: {
    informational:
      'As informações deste site têm finalidade exclusivamente institucional e informativa, não substituindo consulta jurídica formal e individualizada.',
    privacy:
      'Dados enviados pelos canais de contato são tratados para organização do atendimento e retorno ao interessado, observando sigilo profissional.',
    ethics:
      'Comunicação em conformidade com Estatuto da Advocacia (Lei 8.906/94), Código de Ética e Disciplina da OAB e Provimento 205/2021.',
  },
}

export function createWhatsAppLink(message: string) {
  return `https://wa.me/${siteConfig.contact.phoneRaw}?text=${encodeURIComponent(message)}`
}

export function getAreaById(areaId: string) {
  return siteConfig.areas.find((area) => area.id === areaId)
}
