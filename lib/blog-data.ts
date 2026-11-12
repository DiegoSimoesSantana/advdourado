// Categorias do blog para filtros e navegação
export const BLOG_CATEGORIES = {
  trabalhista: { name: 'Direito Trabalhista (PF & PJ)' },
  educacional: { name: 'Direito Educacional (B2B)' },
  familia: { name: 'Família Consensual & Patrimônio' },
  bancos: { name: 'Consumidor, Bancário & Compliance' },
  imobiliario: { name: 'Imóveis & Inventário em Cartório' },
  saude: { name: 'Planos de Saúde (Beneficiários)' },
}

export type ArticleCategory = keyof typeof BLOG_CATEGORIES
export type TargetProfile = 'PF' | 'PJ' | 'PF e PJ'

export interface BlogArticle {
  id: string
  slug: string
  title: string
  subtitle: string
  category: ArticleCategory
  categoryName: string
  targetProfile: TargetProfile
  axisRoute: string
  author: string
  date: string
  readTime: number
  image: string
  excerpt: string
  content: string
  tags: string[]
  relatedArticles?: string[]
  seoKeywords: string[]
  cta: string
}

const AUTHOR_OFFICIAL = 'Dra. Bruna Dourado — OAB/BA 71507'

export const blogArticles: BlogArticle[] = [
  // ==========================================
  // EIXO 1: TRABALHISTA (PF & PJ)
  // ==========================================
  {
    id: 'trab-pj-1',
    slug: 'compliance-trabalhista-empresas-salvador',
    title: 'Compliance Trabalhista para Empresas e RH: Auditoria de Jornada, Banco de Horas e Prevenção de Passivo',
    subtitle: 'Como estruturar rotinas preventivas, regimentos internos e desligamentos seguros em pequenas e médias empresas.',
    category: 'trabalhista',
    categoryName: 'Direito Trabalhista',
    targetProfile: 'PJ',
    axisRoute: '/trabalhista',
    author: AUTHOR_OFFICIAL,
    date: '2025-04-10',
    readTime: 8,
    image: '/icon.svg',
    excerpt:
      'A maioria das condenações trabalhistas decorre de falhas documentais evitáveis no controle de jornada, gestão de banco de horas e aplicação de penalidades sem critério técnico.',
    content: `
      <h2>Por que a prevenção trabalhista é estratégica para empresas e gestores de RH?</h2>
      <p>No contencioso trabalhista, vigora o princípio da primazia da realidade sobre a forma e uma distribuição rigorosa do ônus da prova documental para o empregador. Empresas que não mantêm rotinas auditadas de Recursos Humanos frequentemente enfrentam passivos ocultos expressivos por ausência de controles formais.</p>
      <h2>3 Pilares do Compliance Trabalhista Preventivo</h2>
      <ul>
        <li><strong>1. Gestão Fidedigna de Jornada e Banco de Horas:</strong> Validação dos registros de ponto (evitando marcações invariáveis ou "ponto britânico" — Súmula 338 do TST) e formalização correta de acordos individuais escritos (compensação em até 6 meses) ou coletivos.</li>
        <li><strong>2. Enquadramento Funcional e Prevenção ao Desvio/Acúmulo de Função:</strong> Descrição clara de cargos (CBO), aditivos contratuais tempestivos e alinhamento entre as atribuições reais e a folha de pagamento.</li>
        <li><strong>3. Protocolos de Conduta, Prevenção ao Assédio e Desligamentos:</strong> Instituição de Código de Conduta, canal interno de escuta, aplicação pedagógica e graduada de medidas disciplinares (advertência, suspensão) e conferência técnica antes de rescisões ou acordos extrajudiciais (Art. 855-B da CLT).</li>
      </ul>
      <h2>Como funciona o diagnóstico preventivo na ADVDourado</h2>
      <p>Sob coordenação direta da Dra. Bruna Dourado (Pós-Graduada em Direito e Processo do Trabalho), realizamos o mapeamento das rotinas de RH da empresa em Salvador e Região Metropolitana, entregando um plano prático de adequação documental e treinamento de lideranças.</p>
    `,
    tags: ['compliance trabalhista', 'assessoria empresarial', 'RH', 'banco de horas', 'prevenção de passivo'],
    relatedArticles: ['calculo-horas-extras-guia-completo', 'rescisao-contrato-trabalho-tipos-calculos-prazos'],
    seoKeywords: ['compliance trabalhista salvador', 'advogada trabalhista empresas salvador', 'consultoria rh trabalhista'],
    cta: 'Sua empresa busca reduzir riscos trabalhistas e organizar rotinas de RH? Solicite uma reunião de diagnóstico com a Dra. Bruna Dourado.',
  },
  {
    id: '1001',
    slug: 'calculo-horas-extras-guia-completo',
    title: 'Horas extras, intervalo intrajornada e prazos de 2 e 5 anos na CLT: guia para trabalhadores e empresas',
    subtitle: 'Compreenda as regras constitucionais sobre jornada suplementar, adicional noturno e prescrição trabalhista.',
    category: 'trabalhista',
    categoryName: 'Direito Trabalhista',
    targetProfile: 'PF e PJ',
    axisRoute: '/trabalhista',
    author: AUTHOR_OFFICIAL,
    date: '2025-03-22',
    readTime: 8,
    image: '/icon.svg',
    excerpt:
      'Entenda como a legislação trabalhista regula as horas extraordinárias, a supressão de intervalo para refeição e os prazos prescricionais de 2 anos após o desligamento e 5 anos retroativos.',
    content: `
      <h2>O que caracteriza as horas extras na legislação trabalhista?</h2>
      <p>Nos termos do Art. 7º, XIII da Constituição Federal e do Art. 58 da CLT, a duração normal do trabalho não deve exceder 8 horas diárias e 44 horas semanais, facultada a compensação de horários mediante acordo ou convenção coletiva.</p>
      <p>Toda jornada efetivamente laborada além desse limite contratual ou legal configura hora extraordinária, devendo ser remunerada com adicional mínimo de 50% sobre o valor da hora normal em dias úteis, ou 100% em domingos e feriados não compensados, gerando reflexos em DSR, férias + 1/3, 13º salário, aviso prévio e FGTS.</p>
      <h2>Prazos Legais Trabalhistas: 2 anos e 5 anos (Art. 7º, XXIX da CF)</h2>
      <p>Tanto trabalhadores quanto empresas devem observar com rigor os marcos prescricionais: o prazo para ajuizar reclamação trabalhista é de até <strong>2 (dois) anos após a extinção do contrato de trabalho</strong> (prescrição bienal), podendo ser pleiteados os créditos referentes aos <strong>últimos 5 (cinco) anos</strong> contados retroativamente da data de propositura da ação (prescrição quinquenal).</p>
    `,
    tags: ['horas extras', 'jornada de trabalho', 'prazos trabalhistas', 'CLT'],
    relatedArticles: ['compliance-trabalhista-empresas-salvador', 'rescisao-contrato-trabalho-tipos-calculos-prazos'],
    seoKeywords: ['horas extras clt', 'advogado trabalhista salvador', 'prazo 2 anos e 5 anos trabalhista'],
    cta: 'Deseja orientação técnica sobre jornada de trabalho ou apuração de horas extras? Solicite triagem diretamente com a Dra. Bruna Dourado.',
  },
  {
    id: '1002',
    slug: 'rescisao-contrato-trabalho-tipos-calculos-prazos',
    title: 'Rescisão do contrato de trabalho e rescisão indireta: modalidades, verbas devidas e prazo de 10 dias',
    subtitle: 'Conheça os direitos na dispensa sem justa causa, no acordo consensual e quando há falta grave do empregador.',
    category: 'trabalhista',
    categoryName: 'Direito Trabalhista',
    targetProfile: 'PF',
    axisRoute: '/trabalhista',
    author: AUTHOR_OFFICIAL,
    date: '2025-03-22',
    readTime: 9,
    image: '/icon.svg',
    excerpt:
      'Saiba quais são as verbas devidas em cada modalidade de desligamento, o prazo legal de 10 dias corridos para quitação e quando cabe a rescisão indireta.',
    content: `
      <h2>Principais modalidades de rescisão trabalhista</h2>
      <ul>
        <li><strong>Dispensa sem justa causa:</strong> garante saldo de salário, aviso prévio (trabalhado ou indenizado proporcional ao tempo de serviço), férias vencidas e proporcionais + 1/3, 13º salário proporcional, saque do FGTS com multa de 40% e guias do seguro-desemprego.</li>
        <li><strong>Rescisão indireta (Art. 483 da CLT):</strong> conhecida como a "justa causa do empregador", aplica-se quando a empresa descumpre gravemente o contrato (atraso reiterado de salários, ausência de recolhimento do FGTS, rigor excessivo ou assédio moral), preservando todos os direitos da demissão sem justa causa.</li>
        <li><strong>Acordo consensual (Art. 484-A da CLT):</strong> prevê metade do aviso prévio indenizado e multa de 20% sobre o FGTS, com saque de até 80% do saldo do FGTS.</li>
      </ul>
      <h2>Prazo de 10 dias para pagamento (Art. 477, § 6º da CLT)</h2>
      <p>O pagamento das verbas rescisórias e a entrega dos documentos da extinção contratual devem ocorrer em até <strong>10 (dez) dias corridos contados do término do contrato</strong>, sob pena de multa em favor do trabalhador equivalente a um salário nominal (Art. 477, § 8º da CLT).</p>
    `,
    tags: ['rescisão trabalhista', 'rescisão indireta', 'verbas rescisórias', 'prazo 10 dias'],
    relatedArticles: ['calculo-horas-extras-guia-completo', 'fgts-multa-40-saque-rescisao-guia-completo'],
    seoKeywords: ['rescisão indireta salvador', 'prazo pagamento rescisão clt', 'verbas rescisórias advogado'],
    cta: 'Precisa avaliar a regularidade de uma rescisão ou situação de falta grave? Envie seu relato ou áudio para a Dra. Bruna Dourado.',
  },
  {
    id: '1003',
    slug: 'fgts-multa-40-saque-rescisao-guia-completo',
    title: 'FGTS não depositado e multa rescisória de 40%: como fiscalizar o extrato analítico',
    subtitle: 'Entenda os reflexos da ausência de depósitos fundiários e a tese consolidada de rescisão indireta.',
    category: 'trabalhista',
    categoryName: 'Direito Trabalhista',
    targetProfile: 'PF',
    axisRoute: '/trabalhista',
    author: AUTHOR_OFFICIAL,
    date: '2025-03-20',
    readTime: 7,
    image: '/icon.svg',
    excerpt:
      'A conferência periódica do extrato analítico do FGTS permite identificar atrasos ou omissões patronais que impactam o patrimônio do trabalhador.',
    content: `
      <h2>A importância da conferência do extrato analítico do FGTS</h2>
      <p>O empregador tem o dever legal de depositar mensalmente 8% da remuneração bruta do empregado em sua conta vinculada do FGTS (Lei nº 8.036/1990). A ausência contumaz ou o recolhimento irregular configura falta grave nos termos do Art. 483, "d" da CLT, autorizando o pedido de rescisão indireta do contrato de trabalho e a cobrança integral das diferenças dos últimos 5 anos.</p>
    `,
    tags: ['FGTS', 'multa 40%', 'direito do trabalhador', 'rescisão indireta'],
    relatedArticles: ['rescisao-contrato-trabalho-tipos-calculos-prazos', 'calculo-horas-extras-guia-completo'],
    seoKeywords: ['fgts atrasado rescisão indireta', 'multa 40 fgts cálculo', 'advogada trabalhista salvador'],
    cta: 'Identificou ausência de depósitos no seu FGTS? Solicite análise técnica do seu extrato analítico.',
  },

  // ==========================================
  // EIXO 2: EDUCACIONAL INSTITUCIONAL (EXCLUSIVO B2B / PJ)
  // ==========================================
  {
    id: 'edu-pj-1',
    slug: 'contratos-educacionais-inadimplencia-escolas-b2b',
    title: 'Contratos Educacionais Anuais e Gestão da Inadimplência Escolar: Blindagem Jurídica para Escolas e Faculdades',
    subtitle: 'Diretrizes da Lei nº 9.870/1999, prazo de 45 dias antes da matrícula e segurança contratual para mantenedoras.',
    category: 'educacional',
    categoryName: 'Direito Educacional (B2B)',
    targetProfile: 'PJ',
    axisRoute: '/educacional',
    author: AUTHOR_OFFICIAL,
    date: '2025-04-12',
    readTime: 8,
    image: '/icon.svg',
    excerpt:
      'Saiba como estruturar o Contrato de Prestação de Serviços Educacionais e os protocolos de cobrança respeitando a Lei da Mensalidade Escolar sem expor a instituição a passivos.',
    content: `
      <h2>A arquitetura jurídica do Contrato Educacional Anual</h2>
      <p>Para escolas privadas, colégios confessionais, cursos e faculdades, o Contrato de Prestação de Serviços Educacionais é o principal instrumento de governança da relação com os responsáveis financeiros. Nos termos da <strong>Lei nº 9.870/1999</strong>, a minuta contratual, a planilha de custos e o valor das anuidades devem ser divulgados em local de fácil acesso com antecedência mínima de <strong>45 (quarenta e cinco) dias</strong> da data final para matrícula.</p>
      <h2>Pontos críticos que exigem atualização anual</h2>
      <ul>
        <li><strong>Distinção clara entre serviços inclusos na anuidade e serviços opcionais/extracurriculares:</strong> prevenindo questionamentos junto ao Procon e Ministério Público;</li>
        <li><strong>Protocolos lícitos de cobrança de inadimplência:</strong> observando a vedação legal à retenção de documentos de transferência ou aplicação de sanções pedagógicas ao aluno durante o período letivo (Art. 6º da Lei 9.870/99), mas assegurando o direito da instituição de recusar a renovação de matrícula para o período seguinte e executar o crédito;</li>
        <li><strong>Integração com o Regimento Escolar:</strong> alinhando cláusulas de convivência, pontualidade, guarda compartilhada/autorização de retirada de alunos e responsabilidade civil.</li>
      </ul>
    `,
    tags: ['direito educacional', 'contratos escolares', 'gestão escolar', 'B2B', 'Lei 9.870/99'],
    relatedArticles: ['educacao-inclusiva-lbi-protocolos-escolas', 'politicas-antibullying-lgpd-escolar-instituicoes'],
    seoKeywords: ['advogado direito educacional salvador', 'contrato escolar assessoria jurídica', 'inadimplência escolar lei 9870'],
    cta: 'Sua instituição de ensino precisa atualizar contratos e regimentos para o próximo ciclo de matrículas? Agende diagnóstico B2B com a Dra. Bruna Dourado.',
  },
  {
    id: 'edu-pj-2',
    slug: 'educacao-inclusiva-lbi-protocolos-escolas',
    title: 'Educação Inclusiva e Adequação à LBI (Lei 13.146/2015): Protocolos de PDI/PEI para Instituições de Ensino',
    subtitle: 'Como documentar o atendimento a alunos PcD e neurodivergentes com segurança jurídica e responsabilidade pedagógica.',
    category: 'educacional',
    categoryName: 'Direito Educacional (B2B)',
    targetProfile: 'PJ',
    axisRoute: '/educacional',
    author: AUTHOR_OFFICIAL,
    date: '2025-04-08',
    readTime: 9,
    image: '/icon.svg',
    excerpt:
      'Entenda os deveres das instituições privadas de ensino perante o Estatuto da Pessoa com Deficiência (LBI) e como estruturar atas, Planos de Desenvolvimento Individual e diálogo com equipes médicas.',
    content: `
      <h2>O dever legal de inclusão e a vedação de taxas extras</h2>
      <p>A Lei Brasileira de Inclusão da Pessoa com Deficiência (Lei nº 13.146/2015 — Art. 28, § 1º) estabelece que as instituições privadas de ensino de qualquer nível e modalidade devem prover as medidas de adaptação razoável e atendimento educacional especializado, sendo vedada a cobrança de valores adicionais de qualquer natureza em suas mensalidades, anuidades e matrículas.</p>
      <h2>Como proteger juridicamente a escola e qualificar o acolhimento</h2>
      <p>A maior vulnerabilidade das escolas em fiscalizações do MEC, Conselho Estadual de Educação (CEE/BA) e Ministério Público não está na falta de intenção pedagógica, mas na <strong>ausência de documentação técnica rastreável</strong>. Nossa assessoria B2B estrutura junto à coordenação pedagógica:</p>
      <ul>
        <li>Fluxo formal de recepção de laudos clínicos e diálogo documentado com a equipe multiprofissional externa da família;</li>
        <li>Modelos juridicamente seguros de <strong>PDI/PEI (Plano de Desenvolvimento Individual / Plano Educacional Individualizado)</strong> e atas de alinhamento periódico com os responsáveis;</li>
        <li>Critérios técnicos para avaliação da necessidade e atribuições do profissional de apoio escolar, delimitando o papel pedagógico da escola frente a demandas estritamente clínicas/terapêuticas.</li>
      </ul>
    `,
    tags: ['LBI', 'educação inclusiva', 'alunos PcD', 'assessoria para escolas', 'PDI PEI'],
    relatedArticles: ['contratos-educacionais-inadimplencia-escolas-b2b', 'politicas-antibullying-lgpd-escolar-instituicoes'],
    seoKeywords: ['assessoria jurídica escolas inclusão lbi', 'lei brasileira de inclusão escolas particulares', 'pdi pei direito educacional'],
    cta: 'Deseja estruturar os protocolos de inclusão (LBI) e capacitar a equipe pedagógica da sua escola? Fale com a Dra. Bruna Dourado.',
  },
  {
    id: 'edu-pj-3',
    slug: 'politicas-antibullying-lgpd-escolar-instituicoes',
    title: 'Políticas Antibullying (Lei 14.811/2024) e LGPD Escolar: Governança e Formação de Equipes',
    subtitle: 'Prevenção de responsabilidade civil objetiva da instituição em conflitos entre alunos e proteção de dados de menores.',
    category: 'educacional',
    categoryName: 'Direito Educacional (B2B)',
    targetProfile: 'PJ',
    axisRoute: '/educacional',
    author: AUTHOR_OFFICIAL,
    date: '2025-04-02',
    readTime: 8,
    image: '/icon.svg',
    excerpt:
      'Com o endurecimento legal contra o bullying e o cyberbullying e as exigências do Art. 14 da LGPD, escolas precisam de protocolos formais de apuração, registro em ata e treinamento docente.',
    content: `
      <h2>A responsabilidade das instituições diante do Bullying e Cyberbullying</h2>
      <p>As Leis nº 13.185/2015 e nº 14.811/2024 impõem aos estabelecimentos de ensino o dever legal de implementar medidas permanentes de conscientização, prevenção, diagnose e combate à violência e à intimidação sistemática no ambiente escolar. A omissão em documentar a intervenção pedagógica e disciplinar pode gerar severa responsabilização civil e administrativa para a mantenedora.</p>
      <h2>LGPD no Ambiente Escolar (Art. 14 da Lei 13.709/2018)</h2>
      <p>O tratamento de dados pessoais de crianças e adolescentes — incluindo fichas médicas, avaliações psicopedagógicas, biometria de catracas e uso de imagem em redes sociais da escola — exige observância do melhor interesse do menor, termos de consentimento específicos e treinamento contínuo da secretaria e do corpo docente.</p>
    `,
    tags: ['antibullying', 'LGPD escolar', 'formação docente', 'direito educacional B2B'],
    relatedArticles: ['contratos-educacionais-inadimplencia-escolas-b2b', 'educacao-inclusiva-lbi-protocolos-escolas'],
    seoKeywords: ['programa antibullying escolas lei 14811', 'lgpd para escolas particulares salvador', 'treinamento jurídico professores'],
    cta: 'Solicite um plano de implantação de protocolo antibullying e adequação à LGPD para sua instituição de ensino.',
  },

  // ==========================================
  // EIXO 3: DIREITO DE FAMÍLIA CONSENSUAL (PF & PJ)
  // ==========================================
  {
    id: 'fam-pf-1',
    slug: 'divorcio-consensual-extrajudicial-cartorio-guia',
    title: 'Divórcio Consensual Extrajudicial em Cartório (Presencial ou Online): Requisitos, Documentos e Celeridade',
    subtitle: 'Como realizar a dissolução do casamento por escritura pública em Tabelionato de Notas ou via plataforma e-Notariado.',
    category: 'familia',
    categoryName: 'Família Consensual & Patrimônio',
    targetProfile: 'PF',
    axisRoute: '/familia',
    author: AUTHOR_OFFICIAL,
    date: '2025-04-05',
    readTime: 7,
    image: '/icon.svg',
    excerpt:
      'Quando há consenso entre o casal, o divórcio extrajudicial em cartório oferece discrição, previsibilidade de custos e rápida finalização da partilha de bens.',
    content: `
      <h2>Por que optar pelo Divórcio Consensual em Cartório?</h2>
      <p>Desde a Lei nº 11.441/2007 (Art. 733 do Código de Processo Civil) e as recentes atualizações da <strong>Resolução CNJ nº 571/2024</strong>, casais que estão de comum acordo quanto ao fim do vínculo matrimonial e à partilha do patrimônio podem formalizar o divórcio diretamente em Tabelionato de Notas, por escritura pública, com a assistência obrigatória de advogado(a).</p>
      <h2>Principais vantagens da via extrajudicial</h2>
      <ul>
        <li><strong>Celeridade e Discrição:</strong> evita a exposição e a demora de um processo judicial contencioso, sendo concluído em poucos dias ou semanas após a reunião documental;</li>
        <li><strong>Modalidade 100% Digital (e-Notariado):</strong> possibilidade de assinatura eletrônica e videoconferência notarial, ideal para cônjuges que residem em cidades diferentes ou possuem rotina intensa;</li>
        <li><strong>Segurança na Partilha e Retomada do Nome:</strong> a própria escritura pública serve como título hábil para averbação no Registro Civil, Registro de Imóveis, Detran e Juntas Comerciais.</li>
      </ul>
    `,
    tags: ['divórcio em cartório', 'divórcio consensual', 'e-Notariado', 'direito de família'],
    relatedArticles: ['pacto-antenupcial-protecao-patrimonial-empresarial', 'acordo-amigavel-guarda-convivencia-pensao'],
    seoKeywords: ['divórcio em cartório salvador', 'advogada divórcio consensual salvador', 'divórcio online e-notariado'],
    cta: 'Deseja conduzir um divórcio consensual em cartório com discrição e agilidade? Inicie a triagem diretamente com a Dra. Bruna Dourado.',
  },
  {
    id: 'fam-pfpj-2',
    slug: 'pacto-antenupcial-protecao-patrimonial-empresarial',
    title: 'Pacto Antenupcial e Proteção de Quotas Empresariais: Planejamento Patrimonial para Casais e Sócios',
    subtitle: 'Como estruturar o regime de bens antes do casamento ou na união estável para preservar a harmonia familiar e a governança da empresa.',
    category: 'familia',
    categoryName: 'Família Consensual & Patrimônio',
    targetProfile: 'PF e PJ',
    axisRoute: '/familia',
    author: AUTHOR_OFFICIAL,
    date: '2025-03-30',
    readTime: 8,
    image: '/icon.svg',
    excerpt:
      'Para empresários, profissionais liberais e famílias com patrimônio prévio, o pacto antenupcial e o contrato de convivência evitam que eventuais dissoluções futuras afetem a operação societária.',
    content: `
      <h2>O papel preventivo do Pacto Antenupcial para pessoas físicas e empresários</h2>
      <p>Na ausência de pacto antenupcial lavrado por escritura pública, vigora no Brasil o regime supletivo da comunhão parcial de bens (Art. 1.640 do Código Civil). Para sócios de empresas, médicos, gestores e titulares de patrimônio em expansão, esse regime padrão pode gerar dúvidas complexas sobre a comunicação da valorização de quotas sociais, lucros retidos e imóveis adquiridos durante a união.</p>
      <h2>O que pode ser regulamentado consensualmente</h2>
      <ul>
        <li>Escolha do regime de separação convencional de bens, comunhão universal ou regimes híbridos sob medida;</li>
        <li>Cláusulas de incomunicabilidade de participações societárias, dividendos e ativos financeiros empresariais, alinhadas ao Contrato Social ou Acordo de Sócios;</li>
        <li>Regras claras de administração patrimonial e indenizações compensatórias preestabelecidas.</li>
      </ul>
    `,
    tags: ['pacto antenupcial', 'planejamento patrimonial', 'proteção societária', 'união estável'],
    relatedArticles: ['divorcio-consensual-extrajudicial-cartorio-guia', 'acordo-amigavel-guarda-convivencia-pensao'],
    seoKeywords: ['pacto antenupcial salvador advogada', 'proteção patrimonial casamento empresário', 'contrato de união estável'],
    cta: 'Planeja casar ou formalizar união estável com segurança patrimonial e empresarial? Solicite orientação com a Dra. Bruna Dourado.',
  },
  {
    id: 'fam-pf-3',
    slug: 'acordo-amigavel-guarda-convivencia-pensao',
    title: 'Acordos Amigáveis de Guarda Compartilhada, Convivência e Pensão Alimentícia: Clareza para os Filhos',
    subtitle: 'Por que a redação detalhada de rotinas escolares, férias e despesas extraordinárias previne novos conflitos.',
    category: 'familia',
    categoryName: 'Família Consensual & Patrimônio',
    targetProfile: 'PF',
    axisRoute: '/familia',
    author: AUTHOR_OFFICIAL,
    date: '2025-03-25',
    readTime: 7,
    image: '/icon.svg',
    excerpt:
      'Acordos genéricos costumam gerar dúvidas no dia a dia. Veja como estruturar um termo consensual completo que proteja o melhor interesse da criança e dê tranquilidade aos pais.',
    content: `
      <h2>A importância do detalhamento técnico nos acordos parentais</h2>
      <p>Muitos conflitos familiares pós-separação surgem não por má-fé, mas porque o acordo inicial previu apenas "visitas livres" ou não especificou como seriam divididas despesas médicas, escolares e extracurriculares. Na condução consensual, elaboramos termos minuciosos prevendo calendário de festas de fim de ano, férias escolares, feriados, busca e entrega na escola e indexador claro de atualização da pensão alimentícia.</p>
    `,
    tags: ['guarda compartilhada', 'pensão alimentícia', 'acordo familiar', 'convivência'],
    relatedArticles: ['divorcio-consensual-extrajudicial-cartorio-guia', 'pacto-antenupcial-protecao-patrimonial-empresarial'],
    seoKeywords: ['acordo guarda compartilhada salvador', 'homologação acordo pensão alimentícia', 'advogada família consensual'],
    cta: 'Deseja formalizar ou atualizar um acordo amigável de guarda, convivência e alimentos? Fale com a Dra. Bruna Dourado.',
  },

  // ==========================================
  // EIXO 4: CONSUMIDOR E PATRIMONIAL (PF & PJ)
  // ==========================================
  {
    id: 'cons-pj-1',
    slug: 'compliance-consumerista-preventivo-empresas',
    title: 'Compliance Consumerista para Empresas: Revisão de Contratos de Adesão, Garantia e Resposta Técnica ao Procon',
    subtitle: 'Como pequenas e médias empresas podem adequar seus termos comerciais ao CDC e reduzir reclamações e multas.',
    category: 'bancos',
    categoryName: 'Consumidor, Bancário & Compliance',
    targetProfile: 'PJ',
    axisRoute: '/consumidor',
    author: AUTHOR_OFFICIAL,
    date: '2025-04-06',
    readTime: 7,
    image: '/icon.svg',
    excerpt:
      'Cláusulas contratuais mal redigidas, ausência de termo de entrega/recebimento e respostas intempestivas ao Procon geram condenações evitáveis para empresas fornecedoras.',
    content: `
      <h2>Prevenção de passivo consumerista na operação empresarial</h2>
      <p>No âmbito do Código de Defesa do Consumidor (Lei nº 8.078/1990), a responsabilidade do fornecedor é, em regra, objetiva, sendo frequente a inversão do ônus da prova (Art. 6º, VIII). Por isso, empresas prestadoras de serviços, clínicas, comércios e negócios digitais precisam de contratos claros, termos de ciência assinados pelo cliente e protocolos padronizados de SAC/pós-venda.</p>
      <h2>Frentes de atuação consultiva para empresas</h2>
      <ul>
        <li>Revisão de Contratos de Prestação de Serviços, Termos de Garantia e Políticas de Cancelamento/Reembolso;</li>
        <li>Defesa técnica em autos de infração e notificações do Procon/BA, Codecon e plataforma Consumidor.gov.br;</li>
        <li>Defesa de pessoas jurídicas quando também figuram como destinatárias finais ou vítimas de fraudes bancárias e negativação indevida do CNPJ.</li>
      </ul>
    `,
    tags: ['compliance consumerista', 'contratos empresariais', 'Procon', 'defesa de empresas'],
    relatedArticles: ['cobranca-indevida-como-contestar', 'juros-abusivos-emprestimos'],
    seoKeywords: ['compliance código defesa do consumidor empresas', 'advogada empresarial contratos salvador', 'defesa procon salvador'],
    cta: 'Sua empresa precisa revisar contratos com clientes ou responder a notificações de órgãos de defesa do consumidor? Solicite atendimento.',
  },
  {
    id: '9',
    slug: 'cobranca-indevida-como-contestar',
    title: 'Fraudes bancárias, golpes via PIX e invasão de contas (PF e PJ): Súmula 479 do STJ e protocolo MED',
    subtitle: 'Compreenda o dever objetivo de segurança das instituições financeiras e as providências imediatas para contenção de danos.',
    category: 'bancos',
    categoryName: 'Consumidor, Bancário & Compliance',
    targetProfile: 'PF e PJ',
    axisRoute: '/consumidor',
    author: AUTHOR_OFFICIAL,
    date: '2024-11-07',
    readTime: 7,
    image: '/icon.svg',
    excerpt:
      'Tanto pessoas físicas quanto contas jurídicas de empresas têm sofrido fraudes eletrônicas sofisticadas. Saiba como documentar a falha de segurança bancária.',
    content: `
      <h2>Dever de segurança bancária e fortuito interno (Súmula 479 do STJ)</h2>
      <p>De acordo com a <strong>Súmula 479 do Superior Tribunal de Justiça</strong>, as instituições financeiras respondem objetivamente pelos danos gerados por fortuito interno relativo a fraudes e delitos praticados por terceiros no âmbito de operações bancárias. Cabe ao banco monitorar e bloquear transações que fujam completamente do padrão de movimentação do correntista (pessoa física ou pessoa jurídica).</p>
      <h2>Providências imediatas em caso de fraude ou débito não reconhecido</h2>
      <ol>
        <li>Comunicar imediatamente o banco e exigir a abertura formal do <strong>MED (Mecanismo Especial de Devolução)</strong> nas operações via PIX;</li>
        <li>Registrar Boletim de Ocorrência detalhando horários, valores e contas destinatárias;</li>
        <li>Preservar extratos, comprovantes, prints de tela e protocolos de contestação;</li>
        <li>Submeter a documentação à análise técnica da banca para avaliação das medidas extrajudiciais e judiciais cabíveis.</li>
      </ol>
    `,
    tags: ['fraude bancária', 'golpe do PIX', 'proteção patrimonial', 'Súmula 479 STJ'],
    relatedArticles: ['juros-abusivos-emprestimos', 'nome-negativado-injustamente'],
    seoKeywords: ['fraude bancária advogado salvador', 'golpe do pix responsabilidade do banco', 'invasão conta jurídica banco'],
    cta: 'Sofreu lesão patrimonial em operação bancária pessoal ou empresarial? Envie seu relato para análise direta da Dra. Bruna Dourado.',
  },
  {
    id: '8',
    slug: 'nome-negativado-injustamente',
    title: 'Negativação indevida de CPF ou CNPJ em SPC/Serasa: prazo legal de 5 dias úteis e reparação patrimonial',
    subtitle: 'Entenda o alcance da Súmula 548 do STJ, da Súmula 227 (pessoa jurídica) e como agir diante de restrições irregulares.',
    category: 'bancos',
    categoryName: 'Consumidor, Bancário & Compliance',
    targetProfile: 'PF e PJ',
    axisRoute: '/consumidor',
    author: AUTHOR_OFFICIAL,
    date: '2024-11-08',
    readTime: 7,
    image: '/icon.svg',
    excerpt:
      'Apontamentos restritivos por dívida já paga ou não reconhecida afetam o crédito de famílias e travam linhas de financiamento e licitações de empresas.',
    content: `
      <h2>Quando a restrição no SPC, Serasa ou Protesto de Títulos é irregular?</h2>
      <p>A manutenção de apontamento restritivo após a quitação da dívida (ultrapassado o prazo de <strong>5 dias úteis</strong> fixado pela Súmula 548 do STJ) ou a inscrição originada de cobrança inexistente/fraudulenta viola os direitos da personalidade da pessoa física e a honra objetiva da pessoa jurídica (Súmula 227 do STJ: <em>"A pessoa jurídica pode sofrer dano moral"</em>).</p>
    `,
    tags: ['negativação indevida', 'CPF e CNPJ', 'SPC Serasa', 'proteção de crédito'],
    relatedArticles: ['cobranca-indevida-como-contestar', 'juros-abusivos-emprestimos'],
    seoKeywords: ['negativação indevida salvador', 'protesto indevido cnpj empresa', 'prazo 5 dias úteis limpar nome'],
    cta: 'Identificou apontamento ou protesto indevido em seu CPF ou no CNPJ da sua empresa? Solicite triagem com a Dra. Bruna Dourado.',
  },
  {
    id: '10',
    slug: 'juros-abusivos-emprestimos',
    title: 'Revisão de contratos bancários, capital de giro e juros abusivos: parâmetros do Banco Central',
    subtitle: 'Saiba quando a discrepância frente à taxa média de mercado do Bacen e a venda casada autorizam a revisão contratual.',
    category: 'bancos',
    categoryName: 'Consumidor, Bancário & Compliance',
    targetProfile: 'PF e PJ',
    axisRoute: '/consumidor',
    author: AUTHOR_OFFICIAL,
    date: '2024-11-06',
    readTime: 7,
    image: '/icon.svg',
    excerpt:
      'Contratos de financiamento, empréstimo pessoal, consignado e cédulas de crédito empresarial exigem auditoria do Custo Efetivo Total (CET) e das tarifas embutidas.',
    content: `
      <h2>Critérios técnicos para revisão de contratos bancários</h2>
      <p>A jurisprudência do STJ admite a revisão de cláusulas bancárias quando demonstrada abusividade concreta em comparação com a taxa média de mercado divulgada pelo Banco Central para a mesma época e modalidade da operação, bem como para afastar seguros prestamistas impostos por venda casada (Tema 972 do STJ) e encargos sem pactuação expressa.</p>
    `,
    tags: ['juros abusivos', 'contratos bancários', 'capital de giro', 'revisão contratual'],
    relatedArticles: ['cobranca-indevida-como-contestar', 'compliance-consumerista-preventivo-empresas'],
    seoKeywords: ['revisão de contrato bancário salvador', 'juros abusivos banco central', 'venda casada empréstimo'],
    cta: 'Deseja submeter um contrato bancário pessoal ou empresarial à análise técnica? Entre em contato com o escritório.',
  },

  // ==========================================
  // EIXO 5: IMÓVEIS E INVENTÁRIO CONSENSUAL (PF & PJ)
  // ==========================================
  {
    id: 'imob-pf-1',
    slug: 'inventario-extrajudicial-cartorio-salvador-guia',
    title: 'Inventário Consensual Extrajudicial em Cartório na Bahia: Prazo de 60 Dias, ITCMD e Partilha Amigável',
    subtitle: 'Como regularizar os bens da herança com rapidez em Tabelionato de Notas, inclusive com as novas regras da Resolução CNJ 571/2024.',
    category: 'imobiliario',
    categoryName: 'Imóveis & Inventário em Cartório',
    targetProfile: 'PF',
    axisRoute: '/imobiliario',
    author: AUTHOR_OFFICIAL,
    date: '2025-04-09',
    readTime: 8,
    image: '/icon.svg',
    excerpt:
      'Havendo consenso entre os herdeiros, o inventário em cartório permite destravar imóveis e contas bancárias do espólio sem a lentidão do processo judicial.',
    content: `
      <h2>Como funciona o Inventário Extrajudicial em Cartório?</h2>
      <p>Nos termos do Art. 610, § 1º do Código de Processo Civil e da <strong>Resolução CNJ nº 571/2024</strong>, quando todos os herdeiros estão de acordo sobre a divisão dos bens, o inventário e a partilha podem ser realizados por escritura pública em qualquer Cartório de Notas, independentemente do local do óbito ou da situação dos imóveis, mediante assistência obrigatória de advogado(a).</p>
      <h2>Atenção ao prazo legal de 2 meses (60 dias)</h2>
      <p>O Art. 611 do CPC estabelece o prazo de <strong>2 (dois) meses</strong> a contar da abertura da sucessão (data do óbito) para instauração do inventário. Iniciar o levantamento documental tempestivamente evita multas sobre o Imposto de Transmissão Causa Mortis e Doação (ITCMD — SEFAZ/BA) e permite, inclusive, utilizar valores depositados em contas bancárias do próprio espólio para quitar os tributos e emolumentos cartorários.</p>
    `,
    tags: ['inventário em cartório', 'partilha amigável', 'ITCMD Bahia', 'direito sucessório'],
    relatedArticles: ['due-diligence-imobiliaria-compra-segura-imovel', 'contratos-imobiliarios-locacao-comercial-compra-venda'],
    seoKeywords: ['inventário em cartório salvador', 'advogada inventário extrajudicial bahia', 'prazo 60 dias inventário itcmd'],
    cta: 'Sua família busca realizar um inventário consensual em cartório com segurança e agilidade? Fale diretamente com a Dra. Bruna Dourado.',
  },
  {
    id: 'imob-pfpj-2',
    slug: 'due-diligence-imobiliaria-compra-segura-imovel',
    title: 'Due Diligence Imobiliária na Compra de Imóveis Residenciais e Comerciais: Como Evitar Fraude à Execução',
    subtitle: 'Por que apenas a certidão de matrícula do imóvel não basta para garantir a segurança jurídica do comprador ou investidor.',
    category: 'imobiliario',
    categoryName: 'Imóveis & Inventário em Cartório',
    targetProfile: 'PF e PJ',
    axisRoute: '/imobiliario',
    author: AUTHOR_OFFICIAL,
    date: '2025-04-01',
    readTime: 8,
    image: '/icon.svg',
    excerpt:
      'Antes de pagar o sinal (arras) ou assinar promessa de compra e venda, a auditoria jurídica dos vendedores e do imóvel protege seu patrimônio contra penhoras ocultas.',
    content: `
      <h2>O que é a Due Diligence Imobiliária?</h2>
      <p>A aquisição de um imóvel — seja para moradia familiar (PF), seja para sede empresarial ou investimento (PJ) — envolve valores expressivos. A <strong>Due Diligence Imobiliária</strong> é a auditoria jurídica prévia que analisa não apenas a matrícula atualizada e a cadeia dominial no Cartório de Registro de Imóveis, mas também o passivo fiscal, cível, federal e trabalhista dos vendedores (e das empresas das quais os vendedores são sócios).</p>
      <h2>Comprovação da boa-fé do adquirente (Súmula 375 do STJ e Lei 13.097/2015)</h2>
      <p>Emitir e arquivar o dossiê completo de certidões negativas antes da assinatura do contrato blindam o comprador contra alegações futuras de fraude contra credores ou fraude à execução, além de permitir a redação de cláusulas contratuais seguras sobre pagamento de sinal, comissão de corretagem, entrega de chaves e quitação condominial/IPTU.</p>
    `,
    tags: ['due diligence imobiliária', 'compra e venda de imóvel', 'segurança patrimonial', 'direito imobiliário'],
    relatedArticles: ['inventario-extrajudicial-cartorio-salvador-guia', 'contratos-imobiliarios-locacao-comercial-compra-venda'],
    seoKeywords: ['due diligence imobiliária salvador', 'advogada análise contrato compra e venda imóvel', 'segurança jurídica compra imóvel'],
    cta: 'Vai comprar ou vender um imóvel e deseja uma auditoria documental completa antes de assinar? Solicite atendimento.',
  },
  {
    id: 'imob-pfpj-3',
    slug: 'contratos-imobiliarios-locacao-comercial-compra-venda',
    title: 'Contratos de Locação Comercial e Residencial, Permuta e Compra e Venda: Cláusulas Essenciais',
    subtitle: 'Os riscos de utilizar minutas genéricas da internet em negócios imobiliários e locações empresariais.',
    category: 'imobiliario',
    categoryName: 'Imóveis & Inventário em Cartório',
    targetProfile: 'PF e PJ',
    axisRoute: '/imobiliario',
    author: AUTHOR_OFFICIAL,
    date: '2025-03-27',
    readTime: 7,
    image: '/icon.svg',
    excerpt:
      'Garantias locatícias (Lei 8.245/91), direito à renovatória comercial, benfeitorias, cláusula penal e vistoria detalhada exigem redação técnica personalizada.',
    content: `
      <h2>A importância da redação contratual sob medida</h2>
      <p>Na Lei do Inquilinato (Lei nº 8.245/1991) e no Código Civil, pequenos detalhes redacionais definem quem arca com benfeitorias estruturais, como opera a multa rescisória proporcional, quais garantias são válidas (vedada a dupla garantia locatícia sob pena de nulidade — Art. 37, parágrafo único) e como proteger o ponto comercial da empresa locatária.</p>
    `,
    tags: ['contratos imobiliários', 'locação comercial', 'Lei do Inquilinato', 'permuta'],
    relatedArticles: ['due-diligence-imobiliaria-compra-segura-imovel', 'inventario-extrajudicial-cartorio-salvador-guia'],
    seoKeywords: ['contrato locação comercial advogado salvador', 'revisão contrato imobiliário salvador', 'direito imobiliário'],
    cta: 'Precisa elaborar ou revisar um contrato imobiliário residencial ou comercial? Converse com nossa banca.',
  },

  // ==========================================
  // EIXO 6: PLANOS DE SAÚDE (PF & PLANOS EMPRESARIAIS PME)
  // ==========================================
  {
    id: '1',
    slug: 'negativa-procedimento-5-passos',
    title: 'Negativa de cobertura pelo plano de saúde: 5 providências documentais essenciais para o paciente',
    subtitle: 'Saiba como organizar o relatório médico e exigir a justificativa formal por escrito da operadora.',
    category: 'saude',
    categoryName: 'Planos de Saúde (Beneficiários)',
    targetProfile: 'PF',
    axisRoute: '/saude',
    author: AUTHOR_OFFICIAL,
    date: '2025-02-10',
    readTime: 7,
    image: '/negativa-procedimento-saude-decis-o-judicial.jpg',
    excerpt:
      'Diante da recusa de cirurgia, exame, home care ou medicamento de alto custo, a organização imediata dos documentos clínicos e da negativa formal é decisiva para a proteção do beneficiário.',
    content: `
      <h2>O dever de cobertura das operadoras de saúde</h2>
      <p>Quando há indicação médica fundamentada para tratamento de doença coberta pelo contrato (CID), a recusa imotivada de procedimentos essenciais, cirurgias, materiais cirúrgicos (OPME) ou medicamentos de alto custo pode configurar abusividade contratual à luz da Lei nº 9.656/98, da Lei nº 14.454/2022 e do Código de Defesa do Consumidor.</p>
      <h2>5 passos para documentar a situação</h2>
      <ol>
        <li><strong>Exija a negativa formal por escrito:</strong> conforme normativas da ANS, a operadora é obrigada a fornecer por escrito, de forma clara, o motivo da recusa.</li>
        <li><strong>Solicite Relatório Médico circunstanciado:</strong> o documento assinado pelo médico assistente deve descrever o quadro clínico, o CID, os tratamentos anteriores, a imprescindibilidade da conduta prescrita e o risco da demora (urgência/emergência).</li>
        <li><strong>Anote todos os números de protocolo:</strong> registre datas, horários e contatos realizados junto à operadora e Ouvidoria.</li>
        <li><strong>Preserve exames, prescrições e comprovantes de pagamento:</strong> mantenha cópia digitalizada dos laudos e da adimplência contratual.</li>
        <li><strong>Busque avaliação jurídica especializada:</strong> com a documentação reunida, é possível analisar o cabimento de medidas administrativas ou judiciais (inclusive pedido de tutela de urgência quando presentes os requisitos do Art. 300 do CPC).</li>
      </ol>
    `,
    tags: ['negativa de cobertura', 'plano de saúde', 'tutela de urgência', 'direito do paciente'],
    relatedArticles: ['reajuste-abusivo-plano-saude', 'carencia-plano-saude'],
    seoKeywords: ['negativa plano de saúde salvador', 'advogada plano de saúde salvador', 'liminar cirurgia plano de saúde'],
    cta: 'Enfrenta negativa de cobertura médica? Envie seu relato ou áudio diretamente para triagem prioritária com a Dra. Bruna Dourado.',
  },
  {
    id: '2',
    slug: 'reajuste-abusivo-plano-saude',
    title: 'Reajuste abusivo em planos de saúde individuais, por adesão e coletivos empresariais (PME)',
    subtitle: 'Entenda o que dizem a ANS, o Estatuto do Idoso e a jurisprudência do STJ sobre aumentos por faixa etária e sinistralidade.',
    category: 'saude',
    categoryName: 'Planos de Saúde (Beneficiários)',
    targetProfile: 'PF e PJ',
    axisRoute: '/saude',
    author: AUTHOR_OFFICIAL,
    date: '2025-01-28',
    readTime: 7,
    image: '/reajuste-plano-saude-contrato.jpg',
    excerpt:
      'Tanto famílias quanto pequenas empresas titulares de planos coletivos empresariais (MEI/PME) sofrem com reajustes anuais e etários sem demonstração atuarial idônea.',
    content: `
      <h2>Quando um reajuste de plano de saúde exige revisão técnica?</h2>
      <p>Os contratos de planos de saúde estão sujeitos ao reajuste anual (financeiro/sinistralidade) e ao reajuste por mudança de faixa etária. O Superior Tribunal de Justiça (Tema Repetitivo 952) e o Estatuto do Idoso vedam percentuais desarrazoados, aleatórios ou sem comprovação atuarial que inviabilizem a manutenção do beneficiário ou da apólice familiar/empresarial (falsos coletivos).</p>
    `,
    tags: ['reajuste plano de saúde', 'faixa etária', 'plano empresarial PME', 'sinistralidade'],
    relatedArticles: ['negativa-procedimento-5-passos', 'carencia-plano-saude'],
    seoKeywords: ['reajuste abusivo plano de saúde salvador', 'reajuste plano empresarial mei pme', 'aumento faixa etária 59 anos'],
    cta: 'Deseja avaliar a legalidade do histórico de reajustes do seu plano individual, por adesão ou empresarial? Solicite análise documental.',
  },
  {
    id: '3',
    slug: 'carencia-plano-saude',
    title: 'Carência em planos de saúde: regras para situações de urgência e emergência médica (Limite de 24h)',
    subtitle: 'Conheça o limite legal previsto no Art. 35-C da Lei nº 9.656/98 e na Súmula 597 do STJ.',
    category: 'saude',
    categoryName: 'Planos de Saúde (Beneficiários)',
    targetProfile: 'PF',
    axisRoute: '/saude',
    author: AUTHOR_OFFICIAL,
    date: '2025-01-15',
    readTime: 6,
    image: '/carencia-plano-saude-urgencia.jpg',
    excerpt:
      'Em quadros de urgência ou emergência médica, a invocação de prazo de carência contratual de 180 dias para negar internação ou cirurgia viola a legislação.',
    content: `
      <h2>O limite de 24 horas para urgência e emergência</h2>
      <p>Nos termos do Art. 12, V, "c" e do Art. 35-C da Lei nº 9.656/98, bem como da <strong>Súmula 597 do STJ</strong>, é considerada abusiva a cláusula contratual que nega cobertura integral de urgência ou emergência após decorridas <strong>24 (vinte e quatro) horas</strong> da contratação do plano de saúde.</p>
    `,
    tags: ['carência', 'urgência e emergência', 'plano de saúde', 'Súmula 597 STJ'],
    relatedArticles: ['negativa-procedimento-5-passos', 'reajuste-abusivo-plano-saude'],
    seoKeywords: ['carência plano de saúde urgência', 'negativa internação carência', 'advogada saúde salvador'],
    cta: 'Teve atendimento de urgência negado sob alegação de carência? Entre em contato imediatamente para orientação.',
  },
]

export function getArticleBySlug(slug: string): BlogArticle | undefined {
  return blogArticles.find((article) => article.slug === slug)
}

export function getArticlesByCategory(category: ArticleCategory): BlogArticle[] {
  return blogArticles.filter((article) => article.category === category)
}

export function getRelatedArticles(currentSlug: string): BlogArticle[] {
  const currentArticle = getArticleBySlug(currentSlug)
  if (!currentArticle?.relatedArticles) return []
  return currentArticle.relatedArticles
    .map((slug) => getArticleBySlug(slug))
    .filter((article): article is BlogArticle => !!article)
}
