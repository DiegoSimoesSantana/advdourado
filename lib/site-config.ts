export type ScopePillar = {
  title: string
  subtitle: string
  profileBadge?: 'PF' | 'PJ' | 'PF & PJ'
  items: string[]
}

export type InteractiveScenario = {
  profile: 'PF' | 'PJ'
  label: string
}

export type PracticeArea = {
  id: string
  slug: string
  route: string
  legacySlugs?: string[]
  title: string
  shortTitle: string
  eyebrow: string
  targetAudienceBadge: 'PF & PJ' | 'Exclusivo PJ (B2B)' | 'PF & Planejamento Societário' | 'PF & Planos Empresariais'
  scopeBadge: string
  summary: string
  scopeExplanation: string[]
  scopePillars: ScopePillar[]
  interactiveScenarios: InteractiveScenario[]
  highlights: string[]
  audience: string
  rights: string[]
  duties: string[]
  deadlinesTitle: string
  deadlinesAndRules: string[]
  firstAppointmentDeliverables: Array<{
    title: string
    description: string
  }>
  seoTitle: string
  seoDescription: string
  faq: Array<{ question: string; answer: string }>
  relatedArticleSlugs: string[]
}

export const siteConfig = {
  brand: {
    name: 'Dra. Bruna Dourado',
    legalName: 'Dra. Bruna Dourado — Advocacia e Assessoria Jurídica',
    shortName: 'Dra. Bruna Dourado',
    title: 'Advocacia Boutique e Assessoria Jurídica Estratégica',
    oab: 'OAB/BA 71507',
    oabNumber: '71507',
    oabState: 'BA',
  },
  contact: {
    phoneDisplay: '+55 (71) 99236-3943',
    phoneShort: '(71) 99236-3943',
    phoneRaw: '5571992363943',
    email: 'contato@advdourado.com.br',
    address: 'Rua Mandiguaçun, nº 50, Piatã — Salvador/BA',
    city: 'Salvador e Região Metropolitana, Bahia, Brasil',
    locality: 'Salvador',
    region: 'BA',
    country: 'BR',
    siteUrl: 'https://advdourado.com.br',
  },
  social: {
    instagram: 'https://www.instagram.com/brunadouradoadv/',
    linkedin: 'https://www.linkedin.com/in/bruna-dourado-3638901b5/',
  },
  seo: {
    title:
      'Dra. Bruna Dourado (OAB/BA 71507) | Advocacia Boutique em Salvador e Região Metropolitana',
    description:
      'Escritório de advocacia boutique sediado em Salvador/BA (OAB/BA 71507). Atendimento direto com a Dra. Bruna Dourado e banca associada para Pessoas Físicas (PF) e Empresas/Instituições (PJ) em Direito Trabalhista, Educacional B2B, Família Consensual, Consumidor Patrimonial, Imóveis/Inventário e Planos de Saúde.',
    keywords: [
      'advogada em salvador',
      'advocacia boutique salvador ba',
      'dra bruna dourado oab ba 71507',
      'advogado trabalhista salvador empresas e trabalhadores',
      'direito educacional salvador escolas b2b',
      'divorcio extrajudicial cartorio salvador',
      'advogado plano de saude salvador',
      'inventario extrajudicial salvador',
      'direito do consumidor fraude bancaria salvador',
    ],
  },
  positioning: {
    badge: 'Atendimento Direto com a Doutora • Sem Triagem Robótica',
    headline: 'Advocacia boutique para Pessoas, Famílias, Empresas e Instituições de Ensino.',
    subheadline:
      'Em Salvador e Região Metropolitana (presencial e digital), seu primeiro contato não passa por robôs: a análise inicial é conduzida pessoalmente pela Dra. Bruna Dourado (OAB/BA 71507), que coordena sua banca de especialistas associados.',
    description:
      'Unimos rigor técnico, didática e postura ética para orientar tanto demandas individuais e familiares (PF) quanto a governança preventiva de empresas e instituições de ensino (PJ).',
  },
  about: {
    title: 'Sobre a Dra. Bruna Dourado e a Banca Associada',
    subtitle: 'Banca Boutique Especializada • Salvador e Região Metropolitana',
    credentials: [
      {
        label: 'Formação Jurídica',
        value: 'Graduada em Direito pela Universidade do Estado da Bahia (UNEB)',
      },
      {
        label: 'Especialização',
        value: 'Pós-Graduada em Direito e Processo do Trabalho',
      },
      {
        label: 'Diferencial Humanístico',
        value: 'Docente de Filosofia e Sociologia em instituições tradicionais de Salvador/BA',
      },
      {
        label: 'Inscrição OAB',
        value: 'OAB/BA 71507 — Coordenação de Banca Associada Especializada',
      },
    ],
    text: [
      'O escritório Dra. Bruna Dourado — Advocacia e Assessoria Jurídica (OAB/BA 71507) atua no modelo de Banca Boutique Especializada em Salvador e Região Metropolitana, unindo atendimento artesanal, visão estratégica e comunicação clara.',
      'Graduada em Direito pela Universidade do Estado da Bahia (UNEB) e Pós-Graduada em Direito e Processo do Trabalho, a Dra. Bruna Dourado construiu também sólida trajetória como docente de Filosofia e Sociologia em instituições tradicionais de ensino de Salvador. Essa vivência acadêmica e humanística reflete-se diretamente na advocacia: traz didática para traduzir termos jurídicos complexos, empatia na escuta e rigor analítico na mediação e prevenção de conflitos.',
      'Diferente de estruturas massificadas com triagem automatizada, a Dra. Bruna Dourado conduz pessoalmente o atendimento inicial e o desenho estratégico de cada demanda, contando com uma banca de advogados associados especialistas para atuar de forma coordenada nas seis frentes do escritório.',
    ],
    bancaExplanation:
      'No modelo de Banca Associada sob coordenação direta, você sempre sabe com quem está falando: a Dra. Bruna realiza a escuta inicial, analisa a viabilidade técnica e articula os especialistas associados conforme a especificidade de cada caso, mantendo unidade institucional, sigilo e acompanhamento próximo.',
  },
  areas: [
    {
      id: 'trabalhista',
      slug: 'trabalhista',
      route: '/trabalhista',
      title: 'Direito Trabalhista',
      shortTitle: 'Direito Trabalhista',
      eyebrow: 'Empresas/RH (PJ) & Trabalhadores (PF)',
      targetAudienceBadge: 'PF & PJ',
      scopeBadge: 'Consultoria Preventiva B2B e Defesa do Trabalhador',
      summary:
        'Consultoria preventiva e Compliance para empresas/RH; defesa técnica dos direitos do trabalhador em rescisões, horas extras, assédio moral e desvio de função.',
      scopeExplanation: [
        'Nossa atuação trabalhista em Salvador e Região Metropolitana é estruturada em duas frentes complementares e bem delimitadas: a assessoria preventiva e contenciosa para Empresas e setores de RH (PJ), e a defesa técnica de Trabalhadores (PF).',
        'Cada demanda passa por análise documental minuciosa e cálculo prévio de cenários, evitando aventuras jurídicas e priorizando segurança técnica.',
      ],
      scopePillars: [
        {
          title: 'Para Empresas e RH (Preventivo e Compliance)',
          subtitle: 'Redução de passivo oculto, segurança em desligamentos e governança laboral',
          profileBadge: 'PJ',
          items: [
            'Auditoria preventiva de rotinas de folha, banco de horas e controle de jornada',
            'Estruturação de regimentos internos, códigos de conduta e aplicação graduada de penalidades',
            'Orientação técnica em desligamentos, acordos extrajudiciais (Art. 855-B da CLT) e prevenção de riscos',
            'Defesa estratégica de reclamadas em ações trabalhistas e procedimentos perante o MPT',
          ],
        },
        {
          title: 'Para Trabalhadores (Defesa de Direitos)',
          subtitle: 'Reconstrução da realidade contratual e reparação de violações trabalhistas',
          profileBadge: 'PF',
          items: [
            'Conferência e cobrança de verbas rescisórias, FGTS, multa de 40% e rescisão indireta (falta grave do empregador)',
            'Apuração de horas extras não pagas, supressão de intervalo intrajornada e adicional noturno',
            'Atuação em casos de assédio moral organizacional ou interpessoal e indenizações correlatas',
            'Reconhecimento de vínculo empregatício (pejotização fraudulenta), desvio e acúmulo de função',
          ],
        },
      ],
      interactiveScenarios: [
        { profile: 'PF', label: 'Fui desligado(a) e tenho dúvidas sobre o valor ou prazo das verbas rescisórias' },
        { profile: 'PF', label: 'Realizo horas extras ou tenho FGTS em atraso e quero avaliar rescisão indireta' },
        { profile: 'PF', label: 'Sofro desvio/acúmulo de função, assédio moral ou trabalho sem registro (PJ/CLT)' },
        { profile: 'PJ', label: 'Sou empresa/RH e preciso auditar jornada, banco de horas e contratos preventivamente' },
        { profile: 'PJ', label: 'Preciso conduzir um desligamento sensível ou acordo extrajudicial com segurança' },
        { profile: 'PJ', label: 'Minha empresa recebeu notificação ou reclamação trabalhista e precisa de defesa técnica' },
      ],
      highlights: [
        'Consultoria preventiva e Compliance para empresas e RH (PJ)',
        'Defesa do trabalhador (PF): rescisão, horas extras, assédio moral e desvio de função',
        'Atenção rigorosa aos prazos de 2 anos após desligamento e 5 anos retroativos',
      ],
      audience:
        'Empresas e gestores de RH (PJ) que buscam segurança jurídica preventiva, e trabalhadores (PF) que necessitam resguardar direitos violados na relação de emprego.',
      rights: [
        'Trabalhador (PF): receber integralmente as verbas rescisórias no prazo legal de até 10 dias corridos após o término do contrato (Art. 477, § 6º da CLT).',
        'Trabalhador (PF): remuneração correta de horas extraordinárias (mínimo de 50%), adicional de insalubridade/periculosidade e respeito à dignidade no ambiente laboral.',
        'Empresa (PJ): exercer o poder diretivo, regulamentar e disciplinar dentro dos limites legais, prevenindo contingências financeiras com documentação idônea.',
      ],
      duties: [
        'Trabalhador (PF): preservar provas documentais e digitais (contracheques, extrato de FGTS, registros de ponto, mensagens e testemunhas) e observar o prazo prescricional.',
        'Empresa (PJ): manter controle fidedigno de jornada (acima de 20 empregados, ou preventivamente), recolher encargos em dia e formalizar alterações contratuais por escrito.',
      ],
      deadlinesTitle: 'Prazos Legais Trabalhistas (Prescrição Bienal e Quinquenal)',
      deadlinesAndRules: [
        'Prazo de 2 anos após o desligamento (Prescrição Bienal — Art. 7º, XXIX da CF): O trabalhador tem até 2 (dois) anos contados da data de encerramento do contrato de trabalho para ingressar com ação trabalhista.',
        'Alcance de 5 anos retroativos (Prescrição Quinquenal): Ao ingressar com a ação, é possível cobrar direitos e diferenças salariais referentes aos últimos 5 (cinco) anos contados retroativamente da data do protocolo do processo.',
        'Prazo de pagamento da rescisão: A empresa deve quitar as verbas rescisórias e entregar os documentos de saque do FGTS/seguro-desemprego em até 10 dias corridos do término do contrato.',
      ],
      firstAppointmentDeliverables: [
        {
          title: 'Análise Direta pela Dra. Bruna Dourado',
          description:
            'Escuta individualizada do relato (sem robôs) para compreender a cronologia do contrato de trabalho ou a rotina empresarial.',
        },
        {
          title: 'Verificação de Prazos e Riscos Prescricionais',
          description:
            'Conferência imediata do marco prescricional (2 anos do desligamento e 5 anos retroativos) para evitar perda de direitos.',
        },
        {
          title: 'Checklist Documental e Mapa de Viabilidade',
          description:
            'Indicação clara dos documentos necessários e definição transparente sobre o cabimento de atuação preventiva, acordo ou via judicial.',
        },
      ],
      seoTitle:
        'Advogada Trabalhista em Salvador/BA | Empresas, RH e Trabalhadores — Dra. Bruna Dourado',
      seoDescription:
        'Assessoria em Direito Trabalhista em Salvador e Região Metropolitana (OAB/BA 71507). Compliance e consultoria preventiva para empresas/RH e defesa de trabalhadores em rescisão, horas extras, assédio e desvio de função.',
      faq: [
        {
          question: 'Qual é o prazo máximo para entrar com uma ação trabalhista após sair da empresa?',
          answer:
            'Pelo Art. 7º, XXIX da Constituição Federal e Art. 11 da CLT, o prazo (prescrição bienal) é de até 2 anos após o encerramento do contrato de trabalho, podendo ser cobrados os direitos dos últimos 5 anos contados do início da ação.',
        },
        {
          question: 'Quando cabe a rescisão indireta do contrato de trabalho?',
          answer:
            'A rescisão indireta (Art. 483 da CLT) ocorre quando o empregador comete falta grave — como atraso reiterado de salários, ausência de recolhimento de FGTS, rigor excessivo ou assédio moral — permitindo que o trabalhador encerre o vínculo preservando todos os direitos de uma demissão sem justa causa.',
        },
        {
          question: 'Como funciona a consultoria trabalhista preventiva para empresas?',
          answer:
            'Realizamos diagnóstico das práticas de RH, revisão de contratos, controle de jornada e protocolos disciplinares, prevenindo reclamações trabalhistas e estruturando defesas técnicas sólidas.',
        },
      ],
      relatedArticleSlugs: [
        'compliance-trabalhista-empresas-salvador',
        'calculo-horas-extras-guia-completo',
        'rescisao-contrato-trabalho-tipos-calculos-prazos',
        'fgts-multa-40-saque-rescisao-guia-completo',
      ],
    },
    {
      id: 'educacional',
      slug: 'educacional',
      route: '/educacional',
      title: 'Direito Educacional Institucional',
      shortTitle: 'Direito Educacional (B2B)',
      eyebrow: 'Exclusivo B2B para Instituições de Ensino (PJ)',
      targetAudienceBadge: 'Exclusivo PJ (B2B)',
      scopeBadge: 'Atuação Exclusiva para Escolas, Faculdades e Cursos (Não atende alunos)',
      summary:
        'Assessoria jurídica exclusiva B2B para instituições de ensino: contratos educacionais anuais, inclusão PcD (LBI), regimentos antibullying, LGPD escolar e formação de equipes.',
      scopeExplanation: [
        'Nosso eixo de Direito Educacional é dedicado exclusivamente à assessoria jurídica institucional (B2B) para escolas privadas, colégios confessionais, faculdades, cursos livres e mantenedoras em Salvador e na Bahia. Por coerência ética e posicionamento institucional, não atuamos contra instituições de ensino (não atendemos demandas de alunos ou responsáveis contra escolas).',
        'Unindo a expertise jurídica da Dra. Bruna Dourado à sua vivência real em sala de aula e gestão pedagógica, entregamos soluções que protegem a instituição juridicamente sem engessar a rotina escolar.',
      ],
      scopePillars: [
        {
          title: 'Blindagem Contratual, LBI (PcD) e Regimento Escolar',
          subtitle: 'Segurança normativa para matrículas, inclusão e relação com as famílias',
          profileBadge: 'PJ',
          items: [
            'Elaboração e atualização anual de Contratos de Prestação de Serviços Educacionais e aditivos',
            'Adequação jurídica e pedagógica à Lei Brasileira de Inclusão — LBI (Lei 13.146/2015) para atendimento de alunos PcD e neurodivergentes, vedação de taxas extras e protocolos de Plano de Desenvolvimento Individual (PDI/PEI)',
            'Revisão de Regimento Escolar, normas disciplinares e protocolos formais de comunicação com famílias',
          ],
        },
        {
          title: 'Políticas Antibullying, LGPD e Formação de Equipes',
          subtitle: 'Prevenção de responsabilidade civil institucional e conformidade regulatória',
          profileBadge: 'PJ',
          items: [
            'Implantação de Programas de Prevenção e Combate ao Bullying e Cyberbullying (Lei 13.185/2015 e Lei 14.811/2024) com atas e fluxos de resposta rastreáveis',
            'Adequação à LGPD no ambiente escolar: tratamento de dados de crianças e adolescentes (Art. 14 da LGPD) e termos de uso de imagem e voz',
            'Palestras, workshops e formação continuada para direção, coordenação pedagógica, corpo docente e secretaria',
          ],
        },
      ],
      interactiveScenarios: [
        { profile: 'PJ', label: 'Precisamos revisar o Contrato de Prestação de Serviços Educacionais e o Regimento Escolar' },
        { profile: 'PJ', label: 'Necessitamos estruturar protocolos de inclusão (LBI / alunos PcD) e modelos de PDI/PEI' },
        { profile: 'PJ', label: 'Queremos implantar o Programa Antibullying (Lei 14.811/24) e protocolos de atas disciplinares' },
        { profile: 'PJ', label: 'Buscamos palestra ou treinamento jurídico para equipe pedagógica, professores e secretaria' },
      ],
      highlights: [
        'Atuação exclusiva B2B para escolas, faculdades e cursos (não atende alunos)',
        'Contratos educacionais anuais, regimento interno e inadimplência escolar',
        'Adequação à LBI (Inclusão PcD), Políticas Antibullying e LGPD Escolar',
      ],
      audience:
        'Mantenedoras, diretores escolares, gestores educacionais e coordenações pedagógicas de escolas, faculdades e cursos.',
      rights: [
        'Direito da instituição de estabelecer seu projeto pedagógico, regimento interno e cláusulas contratuais claras dentro das normas do MEC, CEE/BA e legislação consumerista aplicável.',
        'Direito de exigir corresponsabilidade das famílias no acompanhamento pedagógico e disciplinar e de cobrar mensalidades inadimplidas pelos meios legais cabíveis.',
        'Direito de documentar tecnicamente limites operacionais e medidas de adaptação razoável na educação inclusiva.',
      ],
      duties: [
        'Garantir atendimento educacional inclusivo sem cobrança de valores adicionais em mensalidades (Art. 28, § 1º da LBI — Lei 13.146/2015).',
        'Manter protocolos ativos e documentados de prevenção e apuração de intimidação sistemática (bullying e cyberbullying) e proteção integral de crianças e adolescentes.',
        'Observar o melhor interesse do menor e obter consentimento específico dos responsáveis para tratamento de dados pessoais e uso de imagem (LGPD).',
      ],
      deadlinesTitle: 'Calendário Regulatório e Prazos Institucionais Escolares',
      deadlinesAndRules: [
        'Antecedência do Edital e Contrato de Matrícula (Lei 9.870/1999): As instituições devem divulgar a proposta de contrato, valor das anuidades e número de vagas no mínimo 45 (quarenta e cinco) dias antes da data final para matrícula.',
        'Retenção de Documentos e Medidas Pedagógicas: A Lei 9.870/99 veda a retenção de documentos de transferência ou aplicação de penalidades pedagógicas no curso do semestre/ano letivo por motivo de inadimplemento, devendo a renovação de matrícula e cobrança seguir rito jurídico próprio.',
        'Rastreabilidade de Incidentes Escolares: Ocorrências disciplinares, situações de bullying ou demandas de adaptação curricular (PcD) exigem registro imediato em ata formal para resguardar a instituição.',
      ],
      firstAppointmentDeliverables: [
        {
          title: 'Diagnóstico Institucional com a Dra. Bruna Dourado',
          description:
            'Reunião estratégica com a direção ou mantenedora para mapear vulnerabilidades nos contratos, regimento e rotinas de atendimento às famílias.',
        },
        {
          title: 'Análise de Prioridades (Contratos, LBI e Antibullying)',
          description:
            'Identificação dos pontos críticos que exigem blindagem documental imediata antes ou durante o período letivo.',
        },
        {
          title: 'Proposta de Escopo Consultivo ou Formativo',
          description:
            'Apresentação de plano de trabalho sob medida (assessoria mensal, revisão documental pontual ou treinamento in company para equipe escolar).',
        },
      ],
      seoTitle:
        'Direito Educacional em Salvador/BA | Assessoria B2B para Escolas e Faculdades — Dra. Bruna Dourado',
      seoDescription:
        'Assessoria jurídica exclusiva para Instituições de Ensino (escolas, faculdades e cursos) em Salvador/BA. Contratos educacionais, inclusão PcD (LBI), políticas antibullying e LGPD escolar.',
      faq: [
        {
          question: 'O escritório atende alunos ou pais contra escolas?',
          answer:
            'Não. Nossa atuação em Direito Educacional é 100% institucional (B2B), dedicada exclusivamente à defesa, consultoria preventiva e formação de equipes de escolas, faculdades, cursos e mantenedoras.',
        },
        {
          question: 'Como a assessoria auxilia a escola nas demandas de inclusão (LBI / alunos PcD)?',
          answer:
            'Estruturamos os protocolos jurídicos e pedagógicos de acolhimento, atas de reunião com famílias e equipe multidisciplinar, elaboração de PDI/PEI documentado e definição técnica das adaptações razoáveis conforme a Lei 13.146/2015.',
        },
        {
          question: 'Quando a escola deve revisar o contrato de prestação de serviços educacionais?',
          answer:
            'O ideal é iniciar a revisão no segundo semestre de cada ano, garantindo que a minuta atualizada (com cláusulas de LGPD, convivência, inclusão e inadimplência) esteja pronta antes do prazo legal de 45 dias que antecede o período de matrículas.',
        },
      ],
      relatedArticleSlugs: [
        'contratos-educacionais-inadimplencia-escolas-b2b',
        'educacao-inclusiva-lbi-protocolos-escolas',
        'politicas-antibullying-lgpd-escolar-instituicoes',
      ],
    },
    {
      id: 'familia',
      slug: 'familia',
      route: '/familia',
      title: 'Direito de Família Consensual',
      shortTitle: 'Família e Divórcios',
      eyebrow: 'Vias Consensuais, Cartório & Proteção Societária',
      targetAudienceBadge: 'PF & Planejamento Societário',
      scopeBadge: 'Atuação Exclusiva em Acordos, Cartório e Planejamento Familiar',
      summary:
        'Atuação exclusiva em divórcio consensual extrajudicial (cartório) ou judicial amigável, pactos antenupciais, proteção patrimonial societária e acordos de guarda e pensão.',
      scopeExplanation: [
        'No eixo de Direito de Família, o escritório atua exclusivamente em demandas consensuais e extrajudiciais. Acreditamos que a reorganização familiar exige maturidade técnica, discrição e redação contratual impecável para evitar litígios futuros.',
        'Conduzimos divórcios em cartório, dissoluções consensuais de união estável, pactos antenupciais (inclusive para proteção de quotas empresariais de sócios) e acordos amigáveis de guarda, convivência e alimentos com celeridade e previsibilidade.',
      ],
      scopePillars: [
        {
          title: 'Divórcio Consensual em Cartório e União Estável',
          subtitle: 'Celeridade e discrição pela via extrajudicial (Tabelionato de Notas)',
          profileBadge: 'PF',
          items: [
            'Divórcio consensual extrajudicial em cartório (presencial em Salvador/BA ou 100% digital via e-Notariado)',
            'Reconhecimento e dissolução consensual de união estável com partilha amigável de bens',
            'Homologação de acordos consensuais quando há necessidade de chancela rápida e segura',
          ],
        },
        {
          title: 'Pactos Antenupciais, Proteção Societária e Acordos Parentais',
          subtitle: 'Prevenção patrimonial para casais/empresários e proteção dos filhos',
          profileBadge: 'PF & PJ',
          items: [
            'Elaboração personalizada de Pactos Antenupciais e Contratos de Convivência (escolha de regime de bens e blindagem de quotas empresariais)',
            'Estruturação de acordos amigáveis de guarda compartilhada, regime de convivência detalhado e pensão alimentícia',
            'Revisão consensual de cláusulas de alimentos e convivência para evitar desgaste familiar',
          ],
        },
      ],
      interactiveScenarios: [
        { profile: 'PF', label: 'Queremos fazer o divórcio consensual em cartório (presencial ou online) de forma rápida' },
        { profile: 'PF', label: 'Desejamos formalizar um acordo amigável de guarda compartilhada, convivência e pensão' },
        { profile: 'PF', label: 'Precisamos formalizar ou dissolver amigavelmente uma União Estável em cartório' },
        { profile: 'PJ', label: 'Sou sócio(a) de empresa e quero elaborar Pacto Antenupcial para proteger quotas societárias' },
      ],
      highlights: [
        'Foco exclusivo em vias consensuais e extrajudiciais (divórcio em cartório)',
        'Elaboração de pactos antenupciais e proteção patrimonial de sócios',
        'Acordos amigáveis de guarda, convivência e pensão alimentícia',
      ],
      audience:
        'Casais, famílias e sócios empresariais que priorizam o diálogo, a discrição e a resolução amigável em cartório ou por acordo estruturado.',
      rights: [
        'Realizar o divórcio diretamente em Cartório de Notas quando há consenso entre o casal, inclusive por videoconferência (e-Notariado).',
        'Definir livremente o regime patrimonial antes do casamento por meio de Pacto Antenupcial por escritura pública.',
        'Formalizar acordos equilibrados de partilha de bens, pensão e convivência com plena validade jurídica.',
      ],
      duties: [
        'Contar obrigatoriamente com a assistência técnica de advogado(a) para lavratura de escritura de divórcio ou dissolução de união estável em cartório (Art. 733, § 2º do CPC).',
        'Apresentar relação transparente de bens, direitos e eventuais dívidas do casal para que a partilha seja definitiva e segura.',
        'Resguardar prioritariamente o melhor interesse de filhos menores ou incapazes na definição de guarda e alimentos.',
      ],
      deadlinesTitle: 'Requisitos e Prazos na Via Extrajudicial (Cartório)',
      deadlinesAndRules: [
        'Sem prazo mínimo de casamento: Após a Emenda Constitucional nº 66/2010, o divórcio pode ser realizado a qualquer tempo, sem necessidade de separação prévia.',
        'Celeridade do Cartório (Extrajudicial): Enquanto processos litigiosos podem durar anos, o divórcio consensual em cartório costuma ser concluído em poucos dias ou semanas após a reunião das certidões e pagamento de eventuais tributos (ITIV/ITCMD, se houver partilha desigual).',
        'Resolução CNJ nº 571/2024: Permite a realização de divórcio consensual em cartório mesmo havendo filhos menores, desde que as questões de guarda, convivência e alimentos já estejam previamente resolvidas judicialmente ou atendam aos requisitos normativos.',
      ],
      firstAppointmentDeliverables: [
        {
          title: 'Escuta Reservada e Mediação Técnica pela Dra. Bruna',
          description:
            'Atendimento sigiloso para alinhar as expectativas das partes e verificar os requisitos para a via extrajudicial.',
        },
        {
          title: 'Planejamento da Partilha e Custos Cartorários',
          description:
            'Levantamento claro dos emolumentos de cartório, tributos incidentes sobre os bens e documentação necessária.',
        },
        {
          title: 'Roteiro Completo da Minuta de Acordo / Escritura',
          description:
            'Definição das cláusulas essenciais (bens, mudança de nome, alimentos e convivência) para assinatura rápida presencial ou digital.',
        },
      ],
      seoTitle:
        'Advogada de Família em Salvador/BA | Divórcio em Cartório e Acordos — Dra. Bruna Dourado',
      seoDescription:
        'Atuação exclusiva em Direito de Família consensual e extrajudicial em Salvador/BA (OAB/BA 71507). Divórcio em cartório, pactos antenupciais, união estável e acordos de guarda e pensão.',
      faq: [
        {
          question: 'O escritório atende divórcios litigiosos com disputa judicial?',
          answer:
            'Não. Nossa atuação em Direito de Família é focada exclusivamente em vias consensuais e extrajudiciais (divórcio amigável em cartório, pactos antenupciais e acordos consensuais), garantindo celeridade e preservação emocional e patrimonial.',
        },
        {
          question: 'É possível fazer o divórcio em cartório de forma 100% online?',
          answer:
            'Sim. Por meio da plataforma oficial e-Notariado (provimento do CNJ), o casal e a advogada podem assinar a escritura pública de divórcio digitalmente e realizar a videoconferência com o tabelião sem precisar comparecer fisicamente ao cartório.',
        },
        {
          question: 'Quando é recomendado fazer um pacto antenupcial?',
          answer:
            'Sempre que os noivos desejarem adotar regime diverso da comunhão parcial de bens (como separação convencional ou comunhão universal) ou estabelecer regras claras sobre patrimônio particular, cotas empresariais e administração de bens antes do casamento.',
        },
      ],
      relatedArticleSlugs: [
        'divorcio-consensual-extrajudicial-cartorio-guia',
        'pacto-antenupcial-protecao-patrimonial-empresarial',
        'acordo-amigavel-guarda-convivencia-pensao',
      ],
    },
    {
      id: 'consumidor',
      slug: 'consumidor',
      route: '/consumidor',
      title: 'Direito do Consumidor e Patrimonial',
      shortTitle: 'Consumidor e Patrimonial',
      eyebrow: 'Proteção Patrimonial (PF) & Compliance (PJ)',
      targetAudienceBadge: 'PF & PJ',
      scopeBadge: 'Defesa Patrimonial contra Fraudes Bancárias e Compliance Empresarial',
      summary:
        'Defesa técnica contra fraudes bancárias/PIX, juros e contratos abusivos e negativações indevidas (CPF/CNPJ), além de compliance consumerista preventivo para empresas.',
      scopeExplanation: [
        'Nossa atuação em Direito do Consumidor tem recorte estritamente patrimonial: concentramo-nos em lesões que afetam de maneira relevante o patrimônio financeiro, o crédito e a estabilidade econômica de pessoas físicas (PF) e empresas (PJ) em Salvador e Região Metropolitana.',
        'Atuamos com rigor técnico e probatório — sem promessas irreais de ganhos fáceis — na responsabilização de instituições financeiras e grandes fornecedores, bem como na consultoria preventiva para empresas que desejam adequar seus contratos ao Código de Defesa do Consumidor.',
      ],
      scopePillars: [
        {
          title: 'Defesa Patrimonial e Direito Bancário (PF e Contas PJ)',
          subtitle: 'Responsabilização objetiva de bancos e proteção do patrimônio e do crédito',
          profileBadge: 'PF & PJ',
          items: [
            'Atuação em fraudes bancárias, golpes do PIX/boleto falso, invasão de aplicativo bancário e empréstimos não reconhecidos (Súmula 479 do STJ)',
            'Revisão técnica de contratos bancários, capital de giro, tarifas ocultas, venda casada e abusividades contratuais',
            'Defesa contra negativação ou protesto indevido de CPF ou CNPJ (SPC/Serasa/Cartório) e manutenção irregular após quitação',
            'Reparação por falhas graves em serviços essenciais e contratos de alto impacto financeiro',
          ],
        },
        {
          title: 'Compliance Consumerista Preventivo para Empresas',
          subtitle: 'Adequação de contratos com clientes, termos de garantia e defesa no Procon',
          profileBadge: 'PJ',
          items: [
            'Revisão de contratos de adesão, termos de serviço e políticas de troca/reembolso conforme o CDC',
            'Estruturação de respostas jurídicas em notificações do Procon, Codecon, Senacon e Ministério Público',
            'Prevenção de passivo consumerista e treinamento de equipes de atendimento e pós-venda',
          ],
        },
      ],
      interactiveScenarios: [
        { profile: 'PF', label: 'Fui vítima de fraude bancária, golpe via PIX ou empréstimo/débito que não reconheço' },
        { profile: 'PF', label: 'Meu CPF foi negativado indevidamente no SPC/Serasa (ou mantido após pagamento)' },
        { profile: 'PF', label: 'Quero revisar cláusulas e juros abusivos de contrato bancário ou financiamento' },
        { profile: 'PJ', label: 'Minha empresa sofreu fraude na conta PJ, protesto indevido no CNPJ ou juros abusivos em capital de giro' },
        { profile: 'PJ', label: 'Quero adequar os contratos da minha empresa ao CDC ou responder notificação do Procon' },
      ],
      highlights: [
        'Defesa contra fraudes bancárias, golpes via PIX e operações não reconhecidas (PF/PJ)',
        'Revisão de cláusulas e juros abusivos e exclusão de negativações indevidas (CPF/CNPJ)',
        'Compliance consumerista preventivo e defesa administrativa para empresas',
      ],
      audience:
        'Pessoas físicas que sofreram lesão patrimonial bancária ou consumerista relevante, e empresas que buscam proteção bancária ou conformidade preventiva com o CDC.',
      rights: [
        'Direito à segurança nas operações bancárias (Súmula 479 do STJ: instituições financeiras respondem objetivamente por fraudes e delitos praticados por terceiros no âmbito de operações bancárias).',
        'Direito à informação prévia, clara e adequada sobre taxas, encargos e cláusulas contratuais (Art. 6º, III e V do CDC).',
        'Direito à imediata exclusão de apontamentos restritivos nos órgãos de proteção ao crédito após quitação ou quando indevidos (Súmulas 548 e 227 do STJ).',
      ],
      duties: [
        'Em caso de fraude bancária ou golpe via PIX: comunicar imediatamente a instituição financeira, acionar o Mecanismo Especial de Devolução (MED) e registrar Boletim de Ocorrência.',
        'Preservar extratos bancários, protocolos de atendimento, prints de conversas, contratos e comprovantes da operação.',
        'Agir com boa-fé objetiva e fornecer histórico fiel das tratativas realizadas com a instituição ou fornecedor.',
      ],
      deadlinesTitle: 'Prazos Legais de Ação e Prescrição no Direito do Consumidor',
      deadlinesAndRules: [
        'Abertura de MED (Fraudes PIX — Resolução BCB): A comunicação ao banco deve ser imediata (preferencialmente nas primeiras horas e em até 80 dias da transação) para bloqueio cautelar de valores.',
        'Prazo para Baixa de Negativação (Súmula 548 do STJ): Após o pagamento do débito, incumbe ao credor excluir o registro no SPC/Serasa no prazo máximo de 5 (cinco) dias úteis.',
        'Prazos de Decadência e Prescrição (Arts. 26 e 27 do CDC): 30 dias para reclamar de vícios em produtos/serviços não duráveis; 90 dias para duráveis (contados da ciência no vício oculto); e 5 (cinco) anos de prescrição para reparação de danos por fato do produto ou serviço.',
      ],
      firstAppointmentDeliverables: [
        {
          title: 'Triagem Patrimonial Direta pela Dra. Bruna Dourado',
          description:
            'Avaliação criteriosa da documentação e da extensão da lesão patrimonial, sem triagem automatizada.',
        },
        {
          title: 'Orientação de Medidas de Contenção Imediata',
          description:
            'Direcionamento sobre protocolos bancários, contestação formal, Bacen/MED e preservação de provas digitais.',
        },
        {
          title: 'Parecer de Viabilidade Técnica e Ética',
          description:
            'Análise realista dos caminhos extrajudiciais e judiciais cabíveis ao caso concreto, sem promessas de valores pré-fixados.',
        },
      ],
      seoTitle:
        'Advogada Direito do Consumidor e Bancário em Salvador/BA | Fraudes PIX e Patrimonial — Dra. Bruna Dourado',
      seoDescription:
        'Atuação em Direito do Consumidor com foco patrimonial em Salvador/BA (OAB/BA 71507). Defesa contra fraudes bancárias/PIX, contratos e juros abusivos, negativação indevida e compliance para empresas.',
      faq: [
        {
          question: 'Sofri uma fraude bancária ou golpe via PIX. O banco pode ser responsabilizado?',
          answer:
            'A viabilidade depende da análise técnica do caso concreto. Quando há falha no dever de segurança da instituição financeira (como movimentações atípicas fora do perfil do correntista, abertura de conta fraudulenta ou invasão de sistema), a jurisprudência (Súmula 479 do STJ) reconhece a responsabilidade objetiva do banco.',
        },
        {
          question: 'Paguei a dívida e meu nome (ou CNPJ) continua no SPC/Serasa. Qual é o prazo legal?',
          answer:
            'Conforme a Súmula 548 do STJ, o credor tem o prazo de até 5 (cinco) dias úteis após o efetivo pagamento para providenciar a exclusão do registro nos órgãos de proteção ao crédito.',
        },
        {
          question: 'O escritório promete um valor médio de indenização antes de analisar o caso?',
          answer:
            'Não. Em estrito respeito ao Código de Ética da OAB (Provimento 205/2021) e à boa técnica jurídica, não divulgamos nem prometemos valores médios de ganho. Cada caso possui particularidades probatórias que são avaliadas individualmente em consulta formal.',
        },
      ],
      relatedArticleSlugs: [
        'cobranca-indevida-como-contestar',
        'compliance-consumerista-preventivo-empresas',
        'nome-negativado-injustamente',
        'juros-abusivos-emprestimos',
      ],
    },
    {
      id: 'imobiliario',
      slug: 'imobiliario',
      route: '/imobiliario',
      legacySlugs: ['imoveis-inventario'],
      title: 'Imóveis e Inventário Consensual',
      shortTitle: 'Imóveis e Inventário',
      eyebrow: 'Inventário em Cartório (PF) & Contratos / Due Diligence (PF/PJ)',
      targetAudienceBadge: 'PF & PJ',
      scopeBadge: 'Atuação Exclusiva em Vias Consensuais, Cartório e Due Diligence',
      summary:
        'Atuação exclusiva em inventários consensuais extrajudiciais (cartório), partilha amigável, due diligence imobiliária para compra segura e contratos residenciais/comerciais.',
      scopeExplanation: [
        'No eixo de Direito Imobiliário e Sucessório, nossa atuação concentra-se exclusivamente em procedimentos consensuais e extrajudiciais. Ajudamos famílias (PF), investidores e empresas (PJ) em Salvador e Região Metropolitana a regularizar heranças e negócios imobiliários com agilidade, economia tributária lícita e segurança documental.',
        'Atuamos desde o inventário amigável em Tabelionato de Notas até a auditoria jurídica prévia (due diligence) na aquisição de imóveis e redação de contratos de compra e venda e locação comercial.',
      ],
      scopePillars: [
        {
          title: 'Inventário Consensual Extrajudicial (Cartório)',
          subtitle: 'Regularização ágil da herança sem a morosidade do processo judicial',
          profileBadge: 'PF',
          items: [
            'Condução completa de Inventário Extrajudicial em Cartório de Notas (Lei 11.441/2007 e Resolução CNJ 571/2024)',
            'Levantamento de acervo hereditário, apuração e declaração de ITCMD (SEFAZ/BA) e plano de partilha amigável',
            'Sobrepartilha consensual, adjudicação (herdeiro único) e averbação nas matrículas do Registro de Imóveis',
          ],
        },
        {
          title: 'Due Diligence e Contratos Imobiliários (Residencial e Comercial)',
          subtitle: 'Blindagem patrimonial antes de assinar ou transferir valores',
          profileBadge: 'PF & PJ',
          items: [
            'Due Diligence Imobiliária: auditoria completa de certidões do imóvel e dos vendedores (ônus reais, penhoras, execuções fiscais e trabalhistas) para prevenir fraude à execução',
            'Elaboração e revisão de Contratos de Promessa de Compra e Venda, Permuta, Dação em Pagamento e Locação Comercial/Residencial',
            'Acompanhamento técnico de escrituras públicas e regularização registral',
          ],
        },
      ],
      interactiveScenarios: [
        { profile: 'PF', label: 'Os herdeiros estão em consenso e queremos fazer o Inventário Extrajudicial em Cartório' },
        { profile: 'PF', label: 'Vou comprar ou vender um imóvel residencial e preciso de Due Diligence + Contrato seguro' },
        { profile: 'PJ', label: 'Minha empresa vai alugar ou adquirir ponto/imóvel comercial e precisa auditar o contrato' },
        { profile: 'PJ', label: 'Sou investidor(a) ou imobiliária e busco assessoria jurídica em negócios imobiliários' },
      ],
      highlights: [
        'Inventário consensual extrajudicial em cartório com plano de partilha amigável',
        'Due diligence imobiliária para compra e venda segura de imóveis (PF e PJ)',
        'Elaboração e revisão técnica de contratos de locação comercial e compra e venda',
      ],
      audience:
        'Herdeiros em consenso que buscam concluir o inventário rapidamente em cartório, e compradores, vendedores ou empresas locatárias que exigem segurança patrimonial.',
      rights: [
        'Realizar o inventário e a partilha por escritura pública em Cartório de Notas sempre que houver consenso entre os herdeiros, reduzindo drasticamente o tempo de conclusão.',
        'Utilizar recursos do próprio espólio (contas bancárias deixadas pelo falecido) para pagamento de emolumentos e imposto (ITCMD), conforme autorização normativa do CNJ.',
        'Exigir a apresentação prévia de todas as certidões negativas reais e pessoais antes de pagar sinal ou assinar contrato de compra de imóvel.',
      ],
      duties: [
        'Contar obrigatoriamente com a assistência de advogado(a) na escritura pública de inventário e partilha (Art. 610, § 2º do CPC).',
        'Observar o prazo legal de abertura do inventário para evitar a incidência de multa sobre o imposto estadual de transmissão (ITCMD).',
        'Declarar integralmente os bens, direitos e eventuais dívidas do espólio com transparência entre todos os sucessores.',
      ],
      deadlinesTitle: 'Prazos de Inventário e Regras Cartorárias Essenciais',
      deadlinesAndRules: [
        'Prazo Legal de 2 Meses (60 dias — Art. 611 do CPC): O processo ou escritura de inventário deve ser instaurado dentro de 2 (dois) meses a contar da abertura da sucessão (data do óbito), evitando multas fiscais sobre o ITCMD estadual.',
        'Inventário em Cartório com Menores ou Testamento (Resolução CNJ nº 571/2024): O CNJ autoriza a realização de inventário extrajudicial em cartório mesmo quando houver herdeiros menores/incapazes (desde que garantida a quota-parte ideal e com manifestação favorável do MP) ou testamento (com autorização judicial prévia).',
        'Segurança na Compra de Imóvel (Lei 13.097/2015 e Súmula 375 do STJ): A realização de due diligence documentada antes da assinatura comprova a boa-fé do adquirente e protege o imóvel contra constrições ocultas.',
      ],
      firstAppointmentDeliverables: [
        {
          title: 'Análise Patrimonial e Sucessória com a Dra. Bruna',
          description:
            'Reunião com os herdeiros ou contratantes para mapear os bens imóveis/móveis e confirmar os requisitos do cartório.',
        },
        {
          title: 'Cronograma Documental e Estimativa de Custos Oficiais',
          description:
            'Orientação transparente sobre certidões necessárias, alíquotas de ITCMD/ITIV e emolumentos cartorários.',
        },
        {
          title: 'Plano de Partilha ou Parecer de Risco Imobiliário',
          description:
            'Desenho técnico da divisão amigável dos bens ou do roteiro de auditoria (due diligence) do negócio imobiliário.',
        },
      ],
      seoTitle:
        'Advogada Imobiliária e Inventário em Cartório em Salvador/BA — Dra. Bruna Dourado',
      seoDescription:
        'Atuação exclusiva em Inventário Consensual Extrajudicial (cartório), partilha amigável, due diligence imobiliária e contratos em Salvador e Região Metropolitana (OAB/BA 71507).',
      faq: [
        {
          question: 'Quanto tempo leva um inventário extrajudicial em cartório?',
          answer:
            'Havendo consenso entre os herdeiros e documentação regular dos bens, o inventário em cartório costuma ser finalizado em poucas semanas após o recolhimento do ITCMD, sendo muito mais célere que a via judicial.',
        },
        {
          question: 'O que é a Due Diligence Imobiliária e por que fazer antes de comprar um imóvel?',
          answer:
            'É a auditoria jurídica completa da matrícula do imóvel e do histórico judicial/fiscal dos vendedores e antecessores. Ela evita que o comprador descubra, após pagar pelo imóvel, a existência de penhoras trabalhistas, dívidas condominiais, fraudes à execução ou irregularidades registrais.',
        },
        {
          question: 'Todos os herdeiros podem ser representados pela mesma advogada no inventário em cartório?',
          answer:
            'Sim. Como o inventário extrajudicial pressupõe consenso entre todos os herdeiros e o cônjuge/companheiro sobrevivente, uma única advogada pode assistir e assinar a escritura pública representando toda a família.',
        },
      ],
      relatedArticleSlugs: [
        'inventario-extrajudicial-cartorio-salvador-guia',
        'due-diligence-imobiliaria-compra-segura-imovel',
        'contratos-imobiliarios-locacao-comercial-compra-venda',
      ],
    },
    {
      id: 'saude',
      slug: 'saude',
      route: '/saude',
      legacySlugs: ['planos-saude'],
      title: 'Direito à Saúde e Planos de Saúde',
      shortTitle: 'Planos de Saúde',
      eyebrow: 'Defesa Exclusiva de Beneficiários (PF & Planos PME)',
      targetAudienceBadge: 'PF & Planos Empresariais',
      scopeBadge: 'Atuação Exclusiva em Favor do Paciente / Beneficiário',
      summary:
        'Defesa exclusiva de beneficiários e pacientes (planos individuais, coletivos por adesão ou empresariais PME) contra negativas de cobertura, cirurgias, medicamentos de alto custo e reajustes abusivos.',
      scopeExplanation: [
        'No eixo de Direito à Saúde Suplementar, nossa atuação é dedicada exclusivamente à defesa de pacientes, beneficiários e pequenas empresas estipulantes de planos coletivos (MEI/PME). Não representamos operadoras de planos de saúde.',
        'Compreendemos que demandas de saúde envolvem urgência clínica e vulnerabilidade. Por isso, a triagem de negativas médicas recebe atenção imediata da Dra. Bruna Dourado e de sua banca associada para análise de medidas administrativas e judiciais cabíveis (incluindo pedidos de tutela de urgência/liminar quando presentes os requisitos legais).',
      ],
      scopePillars: [
        {
          title: 'Negativas de Cobertura, Cirurgias e Medicamentos de Alto Custo',
          subtitle: 'Atuação célere para garantir a continuidade do tratamento prescrito pelo médico',
          profileBadge: 'PF',
          items: [
            'Contestação de negativas de cirurgias, internações hospitalares, próteses/órteses (OPME) e exames de alta complexidade',
            'Ações para fornecimento de medicamentos de alto custo (quimioterápicos orais/antineoplásicos, imunobiológicos e tratamentos com respaldo científico — Lei 14.454/2022)',
            'Garantia de cobertura para Home Care (internação domiciliar) e terapias multidisciplinares (TEA / neurodesenvolvimento sem limitação abusiva de sessões)',
          ],
        },
        {
          title: 'Reajustes Abusivos, Carências e Planos Coletivos Empresariais (PME)',
          subtitle: 'Equilíbrio contratual para famílias e empresas estipulantes contra cancelamento',
          profileBadge: 'PF & PJ',
          items: [
            'Revisão de reajustes abusivos por mudança de faixa etária (Estatuto do Idoso e Tema 952 do STJ) ou falsos coletivos/sinistralidade em planos empresariais (PME/MEI)',
            'Afastamento de carências abusivas em situações de urgência e emergência médica (Art. 35-C da Lei 9.656/98 — limite de 24 horas)',
            'Defesa contra rescisão ou cancelamento unilateral imotivado de apólice individual ou empresarial durante tratamento médico em curso (Tema 1082 do STJ)',
          ],
        },
      ],
      interactiveScenarios: [
        { profile: 'PF', label: 'O plano de saúde negou cirurgia, internação, exame, Home Care ou material cirúrgico (OPME)' },
        { profile: 'PF', label: 'O plano recusou medicamento de alto custo ou limitou terapias multidisciplinares (TEA/autismo)' },
        { profile: 'PF', label: 'Sofri reajuste abusivo por faixa etária ou negativa de urgência sob alegação de carência' },
        { profile: 'PJ', label: 'Minha empresa possui plano coletivo (PME/MEI) que sofreu reajuste abusivo ou ameaça de cancelamento' },
      ],
      highlights: [
        'Defesa exclusiva de pacientes e beneficiários de planos de saúde',
        'Atuação contra negativas de cirurgias, exames, home care e medicamentos de alto custo',
        'Revisão de reajustes abusivos e proteção de planos coletivos empresariais (PME)',
      ],
      audience:
        'Pacientes, beneficiários, familiares e empresas estipulantes (PME/MEI) que enfrentam negativas de cobertura médica, cancelamentos indevidos ou reajustes abusivos.',
      rights: [
        'Cobertura obrigatória de atendimentos de urgência e emergência após 24 horas da contratação (Art. 35-C da Lei 9.656/98 e Súmula 597 do STJ).',
        'Direito de receber por escrito, em até 24 horas (ou imediatamente em urgências), o motivo detalhado de qualquer negativa de cobertura da operadora (RN 623/395 da ANS).',
        'Impossibilidade de cancelamento unilateral do plano enquanto o beneficiário estiver internado ou em tratamento médico garantidor de sua sobrevivência ou incolumidade (Tema 1082 do STJ).',
      ],
      duties: [
        'Solicitar ao médico assistente um Relatório Médico circunstanciado indicando o diagnóstico (CID), os tratamentos anteriores, a imprescindibilidade do procedimento/medicamento e a urgência clínica.',
        'Exigir da operadora do plano o número de protocolo e a negativa formal por escrito (ou registrar a recusa de fornecimento).',
        'Manter em dia o pagamento das mensalidades regulares e guardar o contrato, carteirinha e histórico de faturas.',
      ],
      deadlinesTitle: 'Prazos Regulatórios da ANS e Urgências Médicas',
      deadlinesAndRules: [
        'Urgência e Emergência (Imediato): Casos que impliquem risco imediato de vida ou de lesões irreparáveis exigem autorização imediata, cabendo análise jurídica urgente de tutela provisória (Art. 300 do CPC) em caso de recusa.',
        'Prazos Máximos de Atendimento da ANS (RN 566/2022): Consultas básicas em até 7 dias úteis; especialistas em até 14 dias úteis; exames de diagnóstico em laboratório em até 3 dias úteis; cirurgias eletivas e internações em até 21 dias úteis; procedimentos de alta complexidade (PAC) em até 21 dias úteis.',
        'Superação do Rol Taxativo (Lei 14.454/2022): O Rol da ANS serve como referência básica, devendo o plano cobrir tratamentos fora do rol quando houver prescrição médica e eficácia científica comprovada conforme os critérios legais.',
      ],
      firstAppointmentDeliverables: [
        {
          title: 'Triagem Prioritária com a Dra. Bruna Dourado',
          description:
            'Escuta acolhedora e imediata do paciente ou familiar para avaliar o grau de urgência médica da demanda.',
        },
        {
          title: 'Orientação sobre o Relatório Médico e a Negativa',
          description:
            'Análise técnica do laudo médico e da justificativa da operadora, orientando se algum elemento clínico precisa ser complementado pelo médico.',
        },
        {
          title: 'Definição da Estratégia de Urgência ou Revisão',
          description:
            'Explicação clara sobre o cabimento de pedido judicial de tutela de urgência (liminar), notificação extrajudicial/ANS ou revisão contratual.',
        },
      ],
      seoTitle:
        'Advogada de Planos de Saúde em Salvador/BA | Negativas, Cirurgias e Reajustes — Dra. Bruna Dourado',
      seoDescription:
        'Defesa exclusiva de pacientes e beneficiários de Planos de Saúde em Salvador/BA (OAB/BA 71507). Atuação contra negativas de cirurgias, exames, medicamentos de alto custo, home care e reajustes abusivos.',
      faq: [
        {
          question: 'O plano de saúde negou uma cirurgia ou medicamento alegando que não está no Rol da ANS. É possível contestar?',
          answer:
            'Sim. Com a vigência da Lei nº 14.454/2022, a ausência de um tratamento no Rol da ANS não autoriza a negativa automática quando houver prescrição fundamentada pelo médico assistente, inexistência de substituto terapêutico eficaz no rol e comprovação científica de eficácia.',
        },
        {
          question: 'Quais documentos são essenciais para analisar uma negativa do plano de saúde?',
          answer:
            'Os três documentos principais são: (1) Relatório médico detalhado indicando o diagnóstico (CID), a necessidade do tratamento e a urgência; (2) A negativa formal do plano por escrito (ou o número do protocolo e prints do pedido); e (3) Cópia da carteirinha do plano, documentos pessoais e último comprovante de pagamento.',
        },
        {
          question: 'A operadora pode cancelar o plano de saúde durante o tratamento de câncer, autismo ou doença grave?',
          answer:
            'Não. O Superior Tribunal de Justiça (Tema Repetitivo 1082) firmou entendimento de que, mesmo nos planos coletivos, a operadora não pode rescindir unilateralmente o contrato enquanto o beneficiário estiver submetido a tratamento médico garantidor de sua sobrevivência ou incolumidade física.',
        },
      ],
      relatedArticleSlugs: [
        'negativa-procedimento-5-passos',
        'reajuste-abusivo-plano-saude',
        'carencia-plano-saude',
      ],
    },
  ] as PracticeArea[],
  differentiators: [
    {
      title: 'Atendimento Direto com a Doutora',
      description:
        'Seu primeiro contato não passa por robôs nem filtros frios: a Dra. Bruna Dourado analisa pessoalmente seu relato e coordena a estratégia.',
    },
    {
      title: 'Soluções para PF e PJ',
      description:
        'Atuação integrada tanto na defesa de trabalhadores, pacientes e famílias (PF) quanto no compliance preventivo de empresas e escolas (PJ).',
    },
    {
      title: 'Didática e Rigor Humanístico',
      description:
        'Formação jurídica pela UNEB aliada à vivência como docente de Filosofia e Sociologia: clareza na explicação e empatia na condução.',
    },
    {
      title: 'Ética OAB e Sigilo Absoluto',
      description:
        'Atuação estritamente alinhada ao Provimento 205/2021 da OAB, à LGPD e ao sigilo profissional (Art. 34 do Estatuto da Advocacia).',
    },
  ],
  steps: [
    {
      title: '1. Escolha do Eixo ou Áudio',
      description:
        'Você acessa o eixo da sua necessidade (PF ou PJ) e envia um resumo estruturado ou mensagem de áudio diretamente para o WhatsApp do escritório.',
    },
    {
      title: '2. Análise Pessoal da Dra. Bruna',
      description:
        'Sem triagem robótica: a Dra. Bruna Dourado avalia pessoalmente o contexto inicial, prazos legais e documentos essenciais.',
    },
    {
      title: '3. Consulta e Desenho Estratégico',
      description:
        'Na consulta formal, apresentamos o parecer técnico de viabilidade, riscos, prazos e o plano de atuação (preventivo, extrajudicial ou judicial).',
    },
    {
      title: '4. Execução pela Banca Associada',
      description:
        'Com contrato de honorários formalizado, a Dra. Bruna e sua banca associada conduzem a demanda com comunicação transparente em cada etapa.',
    },
  ],
  faqs: [
    {
      question: 'O primeiro contato no WhatsApp é respondido por um robô?',
      answer:
        'Não. Nosso posicionamento é de Banca Boutique: não utilizamos chatbots automatizados que deixam o cliente sem resposta. O relato enviado por texto ou áudio no site chega diretamente para análise e coordenação da Dra. Bruna Dourado.',
    },
    {
      question: 'O escritório atende tanto Pessoas Físicas (PF) quanto Empresas e Escolas (PJ)?',
      answer:
        'Sim. Atendemos Pessoas Físicas em demandas trabalhistas, planos de saúde, família consensual, inventário e proteção patrimonial, e atendemos Pessoas Jurídicas (empresas, setores de RH e instituições de ensino) em consultoria preventiva, compliance, contratos e auditoria imobiliária.',
    },
    {
      question: 'Posso explicar minha situação enviando um áudio no WhatsApp?',
      answer:
        'Sim. Sabemos que muitas situações jurídicas são complexas para digitar. Em todas as páginas do site há um botão específico para iniciar o atendimento enviando mensagem de áudio com total sigilo profissional.',
    },
    {
      question: 'O envio do formulário ou mensagem inicial já gera contratação automática?',
      answer:
        'Não. O primeiro contato serve para triagem e organização do atendimento. A prestação de serviços jurídicos e o vínculo contratual somente se estabelecem após análise de viabilidade e assinatura formal de contrato de honorários, conforme normas da OAB.',
    },
  ],
  compliance: {
    informational:
      'Caráter Educativo e Informativo: O conteúdo deste site possui finalidade meramente informativa e institucional, nos termos do Provimento nº 205/2021 do Conselho Federal da OAB, não substituindo consulta jurídica formal.',
    contractDisclaimer:
      'Vínculo Contratual: O envio de relatos, formulários ou mensagens de áudio para triagem inicial não estabelece vínculo contratual automático de mandato, o qual depende de celebração formal de contrato de honorários advocatícios.',
    privacy:
      'Sigilo Profissional e LGPD: Todos os relatos, áudios e documentos compartilhados são estritamente protegidos pelo Sigilo Profissional da Advocacia (Art. 34, VII do Estatuto da OAB — Lei nº 8.906/94) e tratados em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018).',
    ethics:
      'Dra. Bruna Dourado da Silva — Advogada inscrita na OAB/BA sob o nº 71507. Comunicação ética sem mercantilização ou promessa de resultado.',
  },
}

export function createWhatsAppLink(message: string) {
  return `https://wa.me/${siteConfig.contact.phoneRaw}?text=${encodeURIComponent(message)}`
}

export function getAreaById(areaId: string): PracticeArea | undefined {
  const normalized = areaId.toLowerCase().trim()
  return siteConfig.areas.find(
    (area) =>
      area.id === normalized ||
      area.slug === normalized ||
      area.legacySlugs?.includes(normalized),
  )
}
