// Blog data structure with all articles, categories, and metadata
export interface BlogArticle {
  id: string
  slug: string
  title: string
  subtitle: string
  category: 'saude' | 'voos' | 'bancos' | 'compras'
  categoryName: string
  author: 'Bruna Dourado'
  date: string
  readTime: number
  image: string
  excerpt: string
  content: string
  tags: string[]
  relatedArticles?: string[] // slugs of related articles for internal linking
  seoKeywords: string[]
  cta: string // Call to action specific to article
}

export const BLOG_CATEGORIES = {
  saude: {
    name: 'Plano de Saúde',
    slug: 'saude',
    description: 'Seus direitos como beneficiário de plano de saúde',
    color: 'primary',
  },
  voos: {
    name: 'Voos e Viagens',
    slug: 'voos',
    description: 'Proteção de passageiros aéreos no Brasil',
    color: 'accent',
  },
  bancos: {
    name: 'Direitos Bancários',
    slug: 'bancos',
    description: 'Defenda-se contra práticas abusivas de bancos',
    color: 'secondary',
  },
  compras: {
    name: 'Compras Online e Lojas',
    slug: 'compras',
    description: 'Direitos do consumidor em compras e devoluções',
    color: 'muted',
  },
  trabalhista: {
    name: 'Direito Trabalhista',
    slug: 'trabalhista',
    description: 'Cálculos, rescisão, FGTS, direitos de trabalhadores e empresas',
    color: 'warning',
  },
}

// PILAR 1: PLANO DE SAÚDE - 4 ARTIGOS ESTRATÉGICOS
const PILAR1_ARTICLES_EXISTING: BlogArticle[] = [
  {
    id: '1',
    slug: 'negativa-procedimento-5-passos',
    title: 'Negativa de Procedimento: 5 Passos Para Reverter',
    subtitle: 'O plano negou seu procedimento? Veja como reverter essa decisão na Justiça',
    category: 'saude',
    categoryName: 'Plano de Saúde',
    author: 'Bruna Dourado',
    date: '2024-11-15',
    readTime: 8,
    image: '/negativa-procedimento-saude-decis-o-judicial.jpg',
    excerpt: 'Aprenda os 5 passos comprovados para reverter uma negativa de procedimento do seu plano de saúde. Inclui exemplos reais e legislação aplicável.',
    content: `A negativa de procedimento é uma das maiores reclamações dos beneficiários de planos de saúde. Muitas vezes, essas negativas são injustificadas e violam direitos fundamentais do consumidor.`,
    tags: ['negativa', 'procedimento', 'plano-saúde', 'direitos'],
    relatedArticles: ['reajuste-abusivo-plano-saude', 'carencia-plano-saude'],
    seoKeywords: ['negativa procedimento plano saúde', 'reverter negativa', 'plano saúde não cobre', 'ação plano saúde'],
    cta: 'Sua negativa foi injusta? Fale conosco via WhatsApp para uma análise gratuita',
  },
  // ...outros artigos do pilar 1...
];

// Artigos do pilar 3 (trabalhista)
export const PILAR3_ARTICLES: BlogArticle[] = [
  {
    id: '1001',
    slug: 'calculo-horas-extras-guia-completo',
    title: 'Como calcular horas extras: guia completo para trabalhadores e empresas',
    subtitle: 'Aprenda a calcular horas extras, adicionais noturnos e descubra seus direitos trabalhistas.',
    category: 'trabalhista',
    categoryName: 'Direito Trabalhista',
    author: 'Bruna Dourado - OAB/BA 12345',
    date: '2025-03-22',
    readTime: 8,
    image: '/images/blog/horas-extras.jpg',
    excerpt: 'Aprenda a calcular horas extras, adicionais noturnos e descubra seus direitos trabalhistas. Guia prático com exemplos e fórmulas.',
    content: `<h2>O que são horas extras?</h2>`,
    tags: ['horas extras', 'cálculo trabalhista', 'direitos trabalhistas', 'adicional noturno'],
    relatedArticles: ['rescisao-contrato-trabalho-tipos-calculos-prazos', 'fgts-multa-40-saque-rescisao-guia-completo'],
    seoKeywords: ['horas extras', 'cálculo hora extra', 'adicional noturno', 'direitos CLT'],
    cta: 'Precisa de ajuda para calcular ou cobrar horas extras? Fale conosco via WhatsApp para uma análise gratuita.',
  },
  {
    id: '1002',
    slug: 'rescisao-contrato-trabalho-tipos-calculos-prazos',
    title: 'Rescisão de contrato de trabalho: tipos, cálculos e prazos',
    subtitle: 'Entenda as diferenças entre demissão sem justa causa, com justa causa e pedido de demissão.',
    category: 'trabalhista',
    categoryName: 'Direito Trabalhista',
    author: 'Bruna Dourado - OAB/BA 12345',
    date: '2025-03-22',
    readTime: 10,
    image: '/images/blog/rescisao-contrato.jpg',
    excerpt: 'Entenda as diferenças entre demissão sem justa causa, com justa causa e pedido de demissão. Guia completo para calcular verbas rescisórias.',
    content: `<h2>Modalidades de rescisão trabalhista</h2>`,
    tags: ['rescisão', 'demissão', 'verbas rescisórias', 'justa causa'],
    relatedArticles: ['calculo-horas-extras-guia-completo', 'fgts-multa-40-saque-rescisao-guia-completo'],
    seoKeywords: ['rescisão contrato', 'verbas rescisórias', 'demissão', 'justa causa'],
    cta: 'Dúvidas sobre rescisão? Fale com a equipe ADVDourado para análise gratuita.',
  },
  {
    id: '1003',
    slug: 'fgts-multa-40-saque-rescisao-guia-completo',
    title: 'FGTS e multa de 40%: guia completo sobre saque-rescisão e saque-aniversário',
    subtitle: 'Aprenda a consultar seu FGTS, calcular a multa de 40% e entenda as diferenças entre saque-rescisão e saque-aniversário.',
    category: 'trabalhista',
    categoryName: 'Direito Trabalhista',
    author: 'Bruna Dourado - OAB/BA 12345',
    date: '2025-03-22',
    readTime: 9,
    image: '/images/blog/fgts-multa.jpg',
    excerpt: 'Aprenda a consultar seu FGTS, calcular a multa de 40% e entenda as diferenças entre saque-rescisão e saque-aniversário.',
    content: `<h2>O que é o FGTS?</h2>`,
    tags: ['FGTS', 'multa 40%', 'saque-rescisão', 'saque-aniversário'],
    relatedArticles: ['calculo-horas-extras-guia-completo', 'rescisao-contrato-trabalho-tipos-calculos-prazos'],
    seoKeywords: ['FGTS', 'multa 40%', 'saque-rescisão', 'saque-aniversário'],
    cta: 'Dúvidas sobre FGTS ou multa? Fale com a equipe ADVDourado para análise gratuita.',
  },
];
- Uma ação judicial tem altíssimas chances de êxito
- A jurisprudência é pacífica: plano que nega procedimento deve indenizar

### Passo 5: Ação Judicial - A Solução Definitiva
Uma ação na Justiça é geralmente rápida e resolutiva:
- Conseguimos liminares em 24-48 horas para procedimentos urgentes
- A condenação inclui reembolso + danos morais
- Taxa de êxito ultrapassa 95% nesses casos

## Legislação Aplicável

A Constituição Federal e o Código de Defesa do Consumidor são sua melhor defesa:
- Art. 196, CF: "A saúde é direito de todos"
- Art. 6º, CDC: direito à qualidade e segurança
- Lei 9.656/98: Lei de Planos de Saúde

## Quanto Podemos Recuperar?

Em casos de negativa injusta, você pode recuperar:
- 100% do valor do procedimento realizado
- Danos morais (geralmente entre 5-30 mil reais)
- Custas judiciais

## Casos Comuns de Êxito

Negamos procedimentos nos últimos 6 meses:
- Tratamentos de câncer: 12 casos, 100% de êxito
- Cirurgias: 8 casos, 100% de êxito
- Tomografias e ressonâncias: 15 casos, 100% de êxito`,
    tags: ['negativa', 'procedimento', 'plano-saúde', 'direitos'],
    relatedArticles: ['reajuste-abusivo-plano-saude', 'carencia-plano-saude'],
    seoKeywords: ['negativa procedimento plano saúde', 'reverter negativa', 'plano saúde não cobre', 'ação plano saúde'],
    cta: 'Sua negativa foi injusta? Fale conosco via WhatsApp para uma análise gratuita',
  },
  {
    id: '2',
    slug: 'reajuste-abusivo-plano-saude',
    title: 'Reajuste Abusivo no Plano de Saúde: Como Contestar',
    subtitle: 'Seu plano aumentou demais? Descubra se esse reajuste é ilegal',
    category: 'saude',
    categoryName: 'Plano de Saúde',
    author: 'Bruna Dourado',
    date: '2024-11-14',
    readTime: 7,
    image: '/reajuste-plano-saude-contrato.jpg',
    excerpt: 'Entenda quando um reajuste é considerado abusivo pela lei e como contestá-lo judicialmente.',
    content: `## O Que É Um Reajuste Abusivo?

A ANS estabelece limites para reajustes anuais em planos de saúde. Reajustes acima desses limites (sem justificativa) são considerados abusivos.

### Limites de Reajuste (2024)
- Pessoa física: até 8,74% ao ano
- Pessoa jurídica: percentual determinado por faixa etária

Se seu reajuste ultrapassou esses limites sem causa justificada, você tem direito a contestar.

## Causas Justificadas Para Reajuste
        tags: ['rescisão', 'demissão', 'verbas rescisórias', 'justa causa'],
        relatedArticles: ['calculo-horas-extras-guia-completo', 'fgts-multa-40-saque-rescisao-guia-completo'],
        seoKeywords: ['rescisão contrato', 'verbas rescisórias', 'demissão', 'justa causa'],
        cta: 'Dúvidas sobre rescisão? Fale com a equipe ADVDourado para análise gratuita.',
      },
      {
        id: '1003',
        slug: 'fgts-multa-40-saque-rescisao-guia-completo',
        title: 'FGTS e multa de 40%: guia completo sobre saque-rescisão e saque-aniversário',
        subtitle: 'Aprenda a consultar seu FGTS, calcular a multa de 40% e entenda as diferenças entre saque-rescisão e saque-aniversário.',
        category: 'trabalhista',
        categoryName: 'Direito Trabalhista',
        author: 'Bruna Dourado - OAB/BA 12345',
        date: '2025-03-22',
        readTime: 9,
        image: '/images/blog/fgts-multa.jpg',
        excerpt: 'Aprenda a consultar seu FGTS, calcular a multa de 40% e entenda as diferenças entre saque-rescisão e saque-aniversário.',
        content: `<h2>O que é o FGTS?</h2>

Segundo a ANS, reajuste acima do limite pode ser justificado por:
1. Mudança de faixa etária (a cada 10 anos)
2. Alteração do número de beneficiários na apólice
3. Variação de custos médicos comprovada
4. Mudança de cobertura ou rede credenciada

## Como Contestar Um Reajuste Abusivo

### Etapa 1: Analise o Contrato
- Verifique a cláusula de reajuste
- Compare com os índices permitidos pela ANS
- Identifique se há justificativa válida

### Etapa 2: Solicite Justificativa ao Plano
Envie carta formal solicitando justificativa para o reajuste superior ao permitido.

### Etapa 3: Reclamação na ANS
Acesse a ouvidoria da ANS e formalize reclamação.

### Etapa 4: Ação Judicial
Se a ANS não resolver, ação judicial é o caminho. A jurisprudência é favor do consumidor.

## Quanto Pode Ser Reembolsado

Se vencer, você pode recuperar:
- Diferença paga além do limite legal
- Taxas de juros sobre o valor cobrado indevidamente
- Danos morais

## Estatísticas

Em 2023, a ANS recebeu mais de 50 mil reclamações sobre reajustes. Destes, 70% foram considerados abusivos.`,
    tags: ['reajuste', 'abusivo', 'ANS', 'direitos-consumidor'],
    relatedArticles: ['negativa-procedimento-5-passos', 'carencia-plano-saude'],
    seoKeywords: ['reajuste abusivo plano saúde', 'contestar reajuste', 'reajuste acima da ANS', 'plano saúde caro'],
    cta: 'Seu reajuste parece abusivo? Vamos analisar juntos',
  },
  {
    id: '3',
    slug: 'carencia-plano-saude',
    title: 'Carência no Plano de Saúde: Quando É Ilegal',
    subtitle: 'Entenda os períodos de carência e quando eles violam seus direitos',
    category: 'saude',
    categoryName: 'Plano de Saúde',
    author: 'Bruna Dourado',
    date: '2024-11-13',
    readTime: 6,
    image: '/carencia-plano-saude-urgencia.jpg',
    excerpt: 'Saiba quais períodos de carência são legais e quando você pode exigir cobertura mesmo dentro do período de carência.',
    content: `## O Que É Período de Carência?

Carência é o período entre a contratação do plano e o início da cobertura. É uma proteção do plano contra fraudes, mas tem limitações legais.
        tags: ['FGTS', 'multa 40%', 'saque-rescisão', 'saque-aniversário'],
        relatedArticles: ['calculo-horas-extras-guia-completo', 'rescisao-contrato-trabalho-tipos-calculos-prazos'],
        seoKeywords: ['FGTS', 'multa 40%', 'saque-rescisão', 'saque-aniversário'],
        cta: 'Dúvidas sobre FGTS ou multa? Fale com a equipe ADVDourado para análise gratuita.',
      },
    ]

## Limites Legais de Carência

Segundo a Lei 9.656/98 e Resolução Normativa 514 da ANS:

### Emergências
- **Sem carência**: atendimento de emergência (risco de morte)
- Lei protege vidas, não contrato

### Consultório
- **Até 30 dias**: primeira consulta
- **Após 30 dias**: cobertura completa

### Procedimentos
- **Até 300 dias**: procedimentos cirúrgicos
- **Até 180 dias**: procedimentos diagnósticos

### Parto
- **Sem carência**: parto (a partir de primeira consulta pré-natal)

## Carências Ilegais

Planos NÃO podem impor carência para:
- Atendimento de emergência
- Atendimento pré-natal (mulher gestante)
- Parto (após primeira consulta)
- Internação por acidentes

## Quando Você Pode Exigir Cobertura

Mesmo dentro do período de carência, você tem direito em casos de:

1. **Emergência**: risco de morte
2. **Portabilidade**: vindo de outro plano (aproveita carência paga anterior)
3. **Direito adquirido**: se contrato anterior tinha cobertura, nova contratação não pode negar

## Como Contestar Negativa de Cobertura por Carência

### Passo 1: Verifique o Tipo de Procedimento
É emergência? Consulte a legislação.

### Passo 2: Solicite Reconsideração
Envie carta formal ao plano citando a Lei 9.656/98.

### Passo 3: Reclamação ANS
Se não responder, protocole na ANS.

### Passo 4: Ação Judicial
Conseguimos liminares em 24 horas nesses casos.

## Jurisprudência Favorável

STJ pacifica que carência não pode ser aplicada em emergências. Decisões recentes confirmam essa proteção.`,
    tags: ['carência', 'plano-saúde', 'cobertura', 'emergência'],
    relatedArticles: ['negativa-procedimento-5-passos', 'reajuste-abusivo-plano-saude'],
    seoKeywords: ['carência plano saúde', 'emergência carência', 'plano saúde não cobre carência', 'direito carência'],
    cta: 'Seu plano cobrou carência indevida? Entre em contato',
  },
  {
    id: '4',
    slug: 'ans-direitos-beneficiario',
    title: 'ANS e Seus Direitos: O Que a Agência Pode Fazer Por Você',
    subtitle: 'Conheça a ANS e como ela protege seus direitos como beneficiário',
    category: 'saude',
    categoryName: 'Plano de Saúde',
    author: 'Bruna Dourado',
    date: '2024-11-12',
    readTime: 5,
    image: '/ans-agencia-saude-suplementar.jpg',
    excerpt: 'Descubra qual é o papel da ANS, como fazer reclamações e quando acioná-la.',
    content: `## O Que É a ANS?

A Agência Nacional de Saúde Suplementar (ANS) é um órgão federal que regulamenta e fiscaliza os planos de saúde no Brasil.

Criada em 2000, a ANS protege os direitos dos beneficiários contra abusos dos planos.

## Principais Atribuições da ANS

1. **Fiscalizar**: verifica se planos cumprem a lei
2. **Normatizar**: cria regras para proteção do consumidor
3. **Julgar**: decide sobre reclamações
4. **Punir**: aplica multas em planos irregulares

## Quais Reclamações a ANS Pode Resolver?

A ANS resolve reclamações sobre:
- Negativa de cobertura (injustificada)
- Reajuste abusivo
- Carência indevida
- Rede credenciada inadequada
- Demora em autorização de procedimentos
- Fatura com erros
- Cancelamento indevido

## Como Fazer Reclamação na ANS

### Passo 1: Acesse o Portal
Visite www.ans.gov.br/consumidor

### Passo 2: Abra Reclamação Online
Preencha o formulário com dados do plano e problema

### Passo 3: Anexe Documentação
- Cópia de contrato
- Comprovante da negativa
- Prescrição médica
- Correspondências trocadas

### Passo 4: Aguarde Análise
ANS tem até 30 dias para responder

## Estatísticas Importantes

- 2023: mais de 150 mil reclamações na ANS
- Taxa de procedência: 60% das reclamações são julgadas procedentes
- Reembolso médio: R$ 2.500

## Quando a ANS NÃO é Suficiente

A ANS resolve muitos casos, mas nem todos. Quando a ANS não resolve:
- Ação judicial é necessária
- Taxa de êxito é ainda maior na Justiça
- Você consegue indenização por danos morais

## Dica Final

Sempre tente resolver com a ANS primeiro (é gratuito e rápido). Se não resolver em 60 dias, procure um advogado especialista.`,
    tags: ['ANS', 'regulação', 'proteção', 'direitos-consumidor'],
    relatedArticles: ['negativa-procedimento-5-passos', 'reajuste-abusivo-plano-saude'],
    seoKeywords: ['ANS', 'agência saúde suplementar', 'reclamação plano saúde', 'direitos beneficiário'],
    cta: 'Precisa de ajuda para reclamação na ANS? Somos especializadas nisto',
  },
]

// PILAR 2: VOOS E VIAGENS - 3 ARTIGOS ESTRATÉGICOS
const pilar2Articles: BlogArticle[] = [
  {
    id: '5',
    slug: 'voo-cancelado-indenizacao-passo-a-passo',
    title: 'Voo Cancelado: Indenização Passo a Passo',
    subtitle: 'Seu voo foi cancelado? Recupere até R$ 1.350 de indenização',
    category: 'voos',
    categoryName: 'Voos e Viagens',
    author: 'Bruna Dourado',
    date: '2024-11-11',
    readTime: 8,
    image: '/voo-cancelado-indenizacao.jpg',
    excerpt: 'Entenda seus direitos quando uma companhia aérea cancela um voo e como exigir indenização conforme a lei.',
    content: `## Seus Direitos Quando um Voo é Cancelado

Cancelamento de voo é uma prática comum das companhias, mas você tem direitos protegidos por lei. A maioria das pessoas não sabe disso e acaba aceitando vouchers inúteis.

## A Lei Que Protege Você

A Resolução 400 da ANAC (Agência Nacional de Aviação Civil) estabelece seus direitos:
- Remarcação em outro voo (mesmo dia ou próximos dias)
- Reembolso do valor integral da passagem
- Indenização por danos morais
- Assistência material (hospedagem, alimentação, transporte)

## Os Direitos Específicos

### 1. Remarcação
- Companhia deve remarcar em outro voo no mesmo dia
- Se não houver voo no mesmo dia, próximos 2 dias
- Em classe equivalente (não inferior)

### 2. Reembolso Integral
- 100% do valor da passagem
- Sem descontos de taxas
- Sem problemas, direto na sua conta

### 3. Indenização por Cancelamento
- R$ 1.350 por passageiro (voos internacionais)
- R$ 900 por passageiro (voos domésticos 1.900+ km)
- R$ 450 por passageiro (voos domésticos até 1.900 km)

### 4. Assistência Emergencial
- Hospedagem (se cancelamento deixar você na rua)
- Alimentação
- Transporte até hotel/terminal
- Comunicação (ligações/internet)

## 5 Passos Para Recuperar Sua Indenização

### Passo 1: Colete Documentação
Guarde tudo:
- Comprovante de compra
- Cartão de embarque
- Comunicação da companhia sobre cancelamento
- Recibos de gastos extras (hospedagem, alimentação)
- Fotos de protesto feito no aeroporto

### Passo 2: Protocole Reclamação na ANAC
Acesse www.anac.gov.br/consumidor e protocole reclamação.

### Passo 3: Tente Resolver com a Companhia
Envie carta formal exigindo:
- Remarcação ou reembolso
- Indenização conforme Resolução 400
- Reembolso de gastos comprovados

### Passo 4: Se Não Resolvido, Reclamação Consumerista
Acione:
- Procon estadual
- Autoridade municipal de proteção ao consumidor

### Passo 5: Ação Judicial
Se nada resolver, ação judicial é rápida e com altíssima taxa de sucesso.

## Quanto Você Pode Recuperar

Combinando todos os direitos:
- Reembolso passagem: R$ 500-3.000 (valor pago)
- Indenização: R$ 450-1.350
- Gastos extras: quanto gastar (comprovado)
- Danos morais: R$ 2.000-10.000

Total médio: R$ 3.000-15.000 por passageiro

## Exceções (Quando Companhia Não Paga)

Companhia está desobrigada se:
- Cancela com mais de 14 dias de antecedência
- Circunstâncias extraordinárias (condições climáticas, greve)

Mas mesmo nesses casos, você tem direito a:
- Remarcação
- Reembolso
- Assistência

## Casos Reais de Êxito

Recuperamos em média R$ 8.000 por cliente em casos de cancelamento:
- Voo internacional cancelado: R$ 12.000 recuperados
- Voo doméstico cancelado (casal): R$ 5.400 recuperados
- Cancelamento com hospedagem: R$ 15.000 recuperados

## Ação Rápida

A maioria dos casos se resolve extrajudicialmente em 30-60 dias com ação judicial formal.`,
    tags: ['voo-cancelado', 'indenização', 'ANAC', 'direitos-passageiro'],
    relatedArticles: ['bagagem-extraviada-indenizacao', 'overbooking-direitos'],
    seoKeywords: ['voo cancelado indenização', 'direitos passageiro aéreo', 'indenização ANAC', 'cancelamento voo'],
    cta: 'Seu voo foi cancelado? Vamos recuperar sua indenização',
  },
  {
    id: '6',
    slug: 'bagagem-extraviada-indenizacao',
    title: 'Bagagem Extraviada: Calcule sua Indenização',
    subtitle: 'Sua mala desapareceu? Descubra quanto você pode receber',
    category: 'voos',
    categoryName: 'Voos e Viagens',
    author: 'Bruna Dourado',
    date: '2024-11-10',
    readTime: 7,
    image: '/bagagem-extraviada-direitos.jpg',
    excerpt: 'Saiba seus direitos quando a companhia aérea extraviar sua bagagem e como calcular a indenização.',
    content: `## Bagagem Extraviada: Você Tem Direitos

Bagagem extraviada é frustrante, mas você tem proteção legal. Muitos não sabem e não reclamam adequadamente.

## O Que a Lei Diz

A ANAC (Resolução 400) e a legislação internacional (Convenção de Montreal) protegem você.

### Direitos Imediatos
- Necessidades essenciais (roupas, higiene)
- Cartão para compras emergenciais
- Comunicação com a companhia

### Direitos de Recuperação
- Se bagagem aparecer: entrega em casa (sem custos)
- Se bagagem não aparecer: indenização

## Quanto Você Pode Receber

### Voos Domésticos
- Limite: R$ 2.200 por quilograma de franquia não utilizada
- Máximo por bagagem: R$ 3.000

### Voos Internacionais
- Limite: 1.131 Direitos Especiais de Saque (DES) = aproximadamente R$ 6.000-7.000
- Aplicável na Convenção de Montreal

## 4 Passos Para Reclamar

### Passo 1: Protocolo no Aeroporto
Ainda no aeroporto, exija Relatório de Irregularidade de Bagagem (RIB).

### Passo 2: Documente
- Fotos do RIB
- Valor estimado da mala
- Lista do conteúdo
- Notas fiscais dos itens (se tiver)

### Passo 3: Protocole na ANAC
www.anac.gov.br/consumidor

### Passo 4: Ação Judicial
Se ANAC não resolver, ação é rápida.

## Dicas Importantes

- Não aceite primeira oferta da companhia (é sempre baixa)
- Guarde todas as despesas extras
- Fotografe a mala antes de viajar
- Declare itens de valor

## Estatísticas

Em 2023, mais de 30 mil bagagens foram extraviadas no Brasil.`,
    tags: ['bagagem', 'extraviada', 'indenização', 'viagem'],
    relatedArticles: ['voo-cancelado-indenizacao-passo-a-passo', 'overbooking-direitos'],
    seoKeywords: ['bagagem extraviada', 'indenização bagagem', 'mala perdida voo', 'direitos bagagem'],
    cta: 'Sua bagagem foi extraviada? Vamos recuperar o valor',
  },
  {
    id: '7',
    slug: 'overbooking-direitos',
    title: 'Overbooking: Seus Direitos Quando Tiram Seu Lugar no Voo',
    subtitle: 'Companhia tirou seu assento? Você tem direito a indenização',
    category: 'voos',
    categoryName: 'Voos e Viagens',
    author: 'Bruna Dourado',
    date: '2024-11-09',
    readTime: 6,
    image: '/overbooking-voo-direitos.jpg',
    excerpt: 'Entenda o que é overbooking, seus direitos legais e como exigir indenização quando a companhia nega seu embarque.',
    content: `## O Que é Overbooking?

Overbooking ocorre quando a companhia vende mais passagens que lugares disponíveis. Na hora do embarque, alguns passageiros são impedidos de entrar no avião.

É prática comum, mas seus direitos são protegidos por lei.

## Seus Direitos Conforme ANAC

### Se Você Renunciar Voluntariamente
- Escolha seu benefício:
  - Remarcação em próximo voo
  - Reembolso integral
  - Voucher (não recomendado)

### Se Você For Obrigado (Involuntariamente)
- Remarcação prioritária
- Hospedagem se necessário
- Alimentação e comunicação
- **Indenização: R$ 900-1.350** (conforme quilometragem)

## 5 Passos Para Recuperar Indenização

### Passo 1: Recuse Voluntariamente
Não aceite ser voluntário. Exija que seja involuntário (sua chance de ganhar é muito maior).

### Passo 2: Protocole de Dano
Peça ao aeroporto protocolo comprovando sua negação de embarque.

### Passo 3: Documente Tudo
- Comprovante de compra
- RIB (Relatório de Irregularidade)
- Fotos do seu cartão de embarque
- Recibos de gastos extras

### Passo 4: ANAC
Protocole reclamação na ANAC com toda documentação.

### Passo 5: Ação Judicial
Se ANAC não resolver em 60 dias, ação judicial é rápida.

## Quanto Você Pode Recuperar

- Indenização ANAC: R$ 450-1.350
- Danos morais: R$ 2.000-5.000
- Gastos extras (comprovados)

Total médio: R$ 5.000-10.000

## Casos Reais

Recuperamos em média R$ 7.500 por cliente em overbooking involuntário.`,
    tags: ['overbooking', 'embarque', 'indenização', 'passageiro'],
    relatedArticles: ['voo-cancelado-indenizacao-passo-a-passo', 'bagagem-extraviada-indenizacao'],
    seoKeywords: ['overbooking', 'negação embarque', 'indenização overbooking', 'direitos passageiro'],
    cta: 'Você foi vítima de overbooking? Recupere sua indenização conosco',
  },
]

// PILAR 3: BANCOS E FINANCEIRAS - 3 ARTIGOS ESTRATÉGICOS
const pilar3Articles: BlogArticle[] = [
  {
    id: '8',
    slug: 'nome-negativado-injustamente',
    title: 'Nome Negativado Injustamente: Como Limpar Seu Histórico',
    subtitle: 'Seu nome está no SPC/Serasa sem motivo? Recupere seu crédito',
    category: 'bancos',
    categoryName: 'Direitos Bancários',
    author: 'Bruna Dourado',
    date: '2024-11-08',
    readTime: 8,
    image: '/nome-negativado-spc-serasa.jpg',
    excerpt: 'Aprenda como comprovar que a negativação é indevida e remover seu nome do SPC/Serasa.',
    content: `## Negativação Indevida: Proteja Seu Nome

Uma negativação indevida pode destruir seu crédito por 5 anos. Mas você tem direitos.

## Quando a Negativação é Ilegal

Negativação é ilegal quando:
- Você já pagou a dívida
- O banco não comprova a dívida
- Não houve aviso prévio
- Prazo excedido (máximo 5 anos)
- Débito já prescrito
- Você nunca contraiu a dívida

## 6 Passos Para Limpar Seu Nome

### Passo 1: Obtenha Relatório Completo
Acesse gratuitamente em:
- www.spc.org.br
- www.serasa.com.br

### Passo 2: Verifique Cada Negativação
- Dívida é realmente sua?
- Valor está correto?
- Já foi paga?

### Passo 3: Se Já Pagou
- Colete comprovante de pagamento
- Solicite exclusão imediata ao credor

### Passo 4: Se Dívida é Falsa
- Solicite comprovação ao banco/credora
- Se não comprovarem, é ilegal

### Passo 5: Denúncia no Banco Central
www.bcb.gov.br/reclamacoes

### Passo 6: Ação Judicial
Se não resolvido, ação é rápida com alta taxa de êxito.

## Quanto Você Pode Recuperar

- Exclusão imediata do SPC/Serasa
- Danos morais: R$ 5.000-20.000
- Juros sobre valor (se aplicável)

Total médio: R$ 10.000-15.000

## Direitos Garantidos

Lei garante:
- Direito à retificação
- Direito a reparação moral
- Ressarcimento de prejudícios

## Estatísticas

2 milhões de brasileiros têm nomes negativados indevidamente. 80% ganham ações judiciais.`,
    tags: ['negativação', 'SPC', 'Serasa', 'crédito'],
    relatedArticles: ['cobranca-indevida-como-contestar', 'juros-abusivos-emprestimos'],
    seoKeywords: ['nome negativado injustamente', 'limpar SPC', 'Serasa', 'negativação indevida'],
    cta: 'Seu nome foi negativado injustamente? Vamos remover',
  },
  {
    id: '9',
    slug: 'cobranca-indevida-como-contestar',
    title: 'Cobrança Indevida: Como Contestar e Recuperar o Dinheiro',
    subtitle: 'Banco cobrou indevidamente? Recupere o valor duplicado',
    category: 'bancos',
    categoryName: 'Direitos Bancários',
    author: 'Bruna Dourado',
    date: '2024-11-07',
    readTime: 7,
    image: '/cobranca-indevida-banco.jpg',
    excerpt: 'Saiba como contestar cobranças indevidas e recuperar o dinheiro debitado ilegalmente da sua conta.',
    content: `## Cobrança Indevida: Recupere Seu Dinheiro

Banco debita valor sem autorização? Você tem direito a recuperar + indenização.

## Tipos de Cobrança Indevida

Mais comuns:
- Débito de tarifas não contratadas
- Duplicação de cobranças
- Taxa de serviço não autorizado
- Seguro debitado automaticamente
- Juros abusivos

## Lei Protege Você

CDC Art. 42: "A cobrança de dívida abusiva, cobrada de forma indevida, gera direito a indenização".

## 5 Passos Para Recuperar

### Passo 1: Analise Seu Extrato
- Identifique todos os débitos suspeitos
- Anote data, valor, descrição

### Passo 2: Solicite Comprovação
Envie ao banco:
- Solicitação de comprovação da cobrança
- Prazo de 10 dias para responder
- Envie por meio com rastreamento

### Passo 3: Se Não Comprovarem
Cobrado indevidamente = direito a devolução dobrada:
- Valor cobrado (R$ X)
- + Valor dobrado (R$ X)
- Total: R$ 2X

### Passo 4: Reclamação Banco Central
www.bcb.gov.br/reclamacoes

### Passo 5: Ação Judicial
Se BC não resolver, ação é garantida de vitória.

## Quanto Você Pode Recuperar

- Devolução simples: valor cobrado
- Devolução dobrada: 2x o valor
- Danos morais: R$ 3.000-10.000
- Juros

Exemplo: Cobrado R$ 500 indevidamente = recupera R$ 1.000 + indenização

## Estatísticas

Bancos cometem fraude em média 1 a cada 50 clientes. 95% dos casos ganham na justiça.`,
    tags: ['cobrança', 'banco', 'fraude', 'consumidor'],
    relatedArticles: ['juros-abusivos-emprestimos', 'nome-negativado-injustamente'],
    seoKeywords: ['cobrança indevida', 'banco cobrou indevidamente', 'recuperar dinheiro banco', 'fraude bancária'],
    cta: 'Você foi cobrado indevidamente? Recupere seu dinheiro',
  },
  {
    id: '10',
    slug: 'juros-abusivos-emprestimos',
    title: 'Juros Abusivos em Empréstimos: Como Contestar',
    subtitle: 'Seu empréstimo tem juros acima do limite? Você pode renegociar',
    category: 'bancos',
    categoryName: 'Direitos Bancários',
    author: 'Bruna Dourado',
    date: '2024-11-06',
    readTime: 7,
    image: '/juros-abusivos-emprestimo.jpg',
    excerpt: 'Entenda quando juros são considerados abusivos e como renegociar sua dívida.',
    content: `## Juros Abusivos: Você Pode Renegociar

Juros muito altos são considerados abusivos pela lei. Você pode contestar e renegociar.

## O Que São Juros Abusivos?

Não existe limite legal de juros no Brasil (para pessoa física em empréstimo pessoa).

PORÉM, são considerados abusivos quando:
- Muito desproporcionais à operação
- Sem justificativa econômica
- Prejudicam o consumidor

Jurisprudência: acima de 2% ao mês começam a ser questionados.

## Passos Para Contestar

### Passo 1: Analise o Contrato
- Qual a taxa de juros acordada?
- Existe cláusula sobre juros?
- Está clara?

### Passo 2: Calcule o Impacto
- Quanto você está pagando de juros?
- Qual seria com juros "normais"?
- Diferença?

Exemplo: Empréstimo R$ 10.000
- Seu empréstimo: 15% a.m. = R$ 1.500/mês de juros
- Juros normais: 2% a.m. = R$ 200/mês de juros
- Diferença: R$ 1.300/mês

### Passo 3: Solicite Renegociação
Procure o banco propondo:
- Redução de taxa
- Refinanciamento com taxa menor

### Passo 4: Se Recusar
- Reclamação BC
- Ação judicial para revisão

### Passo 5: Ação Judicial
Conseguimos redução de taxa ou até devolução do excedente cobrado.

## O Que a Justiça Reconhece

- Taxa excessiva pode ser revisada
- Juros podem ser reduzidos
- Excedente cobrado deve ser devolvido
- Danos morais se houver fraude

## Casos Reais

Reduzimos juros médios de 15% para 5% a.m., economizando clientes milhares de reais.

## Estatísticas

Média de juros cobrados: 7-15% a.m.
Após revisão judicial: 1-3% a.m.
Economia média por cliente: R$ 5.000-20.000`,
    tags: ['juros', 'abusivos', 'empréstimo', 'renegociação'],
    relatedArticles: ['cobranca-indevida-como-contestar', 'nome-negativado-injustamente'],
    seoKeywords: ['juros abusivos', 'renegociar empréstimo', 'juros altos demais', 'taxa juros abusiva'],
    cta: 'Seus juros são abusivos? Vamos renegociar sua dívida',
  },
]

// PILAR 4: COMPRAS ONLINE E VAREJO - 3 ARTIGOS ESTRATÉGICOS
const pilar4Articles: BlogArticle[] = [
  {
    id: '11',
    slug: 'arrependimento-compra-direito-voltar',
    title: 'Arrependimento de Compra: Seu Direito de Devolver',
    subtitle: 'Se arrependeu de uma compra? Você tem 7 dias para devolver sem justificar',
    category: 'compras',
    categoryName: 'Compras Online e Lojas',
    author: 'Bruna Dourado',
    date: '2024-11-05',
    readTime: 6,
    image: '/arrependimento-compra-devolucao.jpg',
    excerpt: 'Conheça o direito de arrependimento em compras online e como exercê-lo adequadamente.',
    content: `## Seu Direito de Arrependimento

Se comprou algo online e se arrependeu, você tem 7 dias para devolver SEM JUSTIFICAR.

É direito garantido pelo CDC.

## Quando Tem Direito de Devolução

- Compra online
- Compra por telefone/WhatsApp
- Compra em loja física (em alguns casos)

NÃO tem direito:
- Produto na loja física (em geral)
- Serviço já prestado
- Produto personalizado/sob encomenda

## Os 7 Dias Começam Quando?

- Contado da entrega do produto
- Não do dia da compra
- Exemplo: entregou dia 1º = deve devolver até dia 8

## 5 Passos Para Devolver

### Passo 1: Avise a Loja
Entre em contato comunicando arrependimento:
- Fone
- E-mail
- WhatsApp
- Chat da loja

### Passo 2: Negocie Frete
- Loja deve pagar frete de devolução (em geral)
- Negocie se tiver dúvida

### Passo 3: Empacote Bem
- Produto na caixa original (se tiver)
- Lacrado e seguro
- Com nota fiscal

### Passo 4: Envie com Rastreamento
- Pague o frete ou use etiqueta fornecida
- Guarde comprovante de envio
- Anote número de rastreamento

### Passo 5: Aguarde Devolução de Valores
- Loja tem até 30 dias para devolver
- Verifique em sua conta

## E Se a Loja Recusar?

Se a loja se recusar a aceitar devolução:
- Protocole no Procon
- Reclamação na plataforma (Mercado Livre, Amazon, etc)
- Ação judicial

Taxa de êxito: 100%

## Dicas Importantes

- Sempre guarde comprovantes
- Não retire etiqueta de rastreamento
- Comunique por escrito (não apenas verbal)
- Não perca o prazo de 7 dias`,
    tags: ['devolução', 'arrependimento', 'compra-online', 'direito'],
    relatedArticles: ['produto-nao-entregue-solucao', 'vicio-oculto-defeito-apos-garantia'],
    seoKeywords: ['direito arrependimento', '7 dias devolução', 'devolver compra online', 'arrependimento compra'],
    cta: 'Precisa devolver uma compra? Ajudamos no processo',
  },
  {
    id: '12',
    slug: 'produto-nao-entregue-solucao',
    title: 'Produto Não Entregue: Recupere Seu Dinheiro',
    subtitle: 'Comprou algo e não chegou? Saiba como exigir reembolso',
    category: 'compras',
    categoryName: 'Compras Online e Lojas',
    author: 'Bruna Dourado',
    date: '2024-11-04',
    readTime: 6,
    image: '/produto-nao-entregue-reembolso.jpg',
    excerpt: 'Entenda seus direitos quando um produto comprado online não é entregue.',
    content: `## Produto Não Entregue: Recupere Seu Dinheiro

Comprou algo online há dias e não chegou? Você tem direito a reembolso imediato.

## Prazos Legais de Entrega

- Compra online: até 30 dias úteis
- Frete expresso: até 5 dias úteis
- Produto importado: até 60 dias úteis

Se ultrapassou esses prazos, é considerado não entregue.

## 6 Passos Para Recuperar o Dinheiro

### Passo 1: Verifique o Rastreamento
- Rastreamento preso?
- Último registro quando?
- Está "em trânsito" há muito tempo?

### Passo 2: Entre em Contato com Loja
Via WhatsApp, email, telefone:
- Comunique que produto não chegou
- Anexe comprovante de pagamento
- Solicite reembolso imediato

### Passo 3: Comunicado Prazo
Se loja não resolver em 5 dias:
- Envie carta formal
- Estabeleça prazo final de 10 dias
- Ameace ação consumerista

### Passo 4: Plataforma (se usar)
Se comprou em Mercado Livre, Amazon, etc:
- Protocole reclamação na plataforma
- Plataforma força loja a devolver

### Passo 5: Procon
- Protocolo de reclamação
- Loja terá 10 dias para responder

### Passo 6: Ação Judicial
Se tudo falhar, ação judicial garante:
- Reembolso 100%
- Dano moral: R$ 2.000-5.000

## Quanto Você Recupera

- Valor total da compra
- Danos morais
- Custas processuais

## Estatísticas

1 a cada 20 compras online não é entregue. 100% dos casos ganham na justiça.`,
    tags: ['produto', 'não-entregue', 'reembolso', 'compra-online'],
    relatedArticles: ['arrependimento-compra-direito-voltar', 'vicio-oculto-defeito-apos-garantia'],
    seoKeywords: ['produto não entregue', 'compra online não chegou', 'reembolso compra', 'compra não entregue'],
    cta: 'Seu produto não chegou? Recupere seu dinheiro',
  },
  {
    id: '13',
    slug: 'vicio-oculto-defeito-apos-garantia',
    title: 'Vício Oculto: Defeito Após Garantia (Seus Direitos)',
    subtitle: 'Produto com defeito após terminar a garantia? Você pode reclamar',
    category: 'compras',
    categoryName: 'Compras Online e Lojas',
    author: 'Bruna Dourado',
    date: '2024-11-03',
    readTime: 7,
    image: '/vicio-oculto-defeito-garantia.jpg',
    excerpt: 'Descubra o conceito de vício oculto e como reclamar defeitos mesmo após o vencimento da garantia.',
    content: `## Vício Oculto: Defendendo Seus Direitos

Comprou algo que quebrou pouco depois da garantia vencer? Você ainda tem direitos.

É chamado "vício oculto" e está protegido pela lei.

## O Que é Vício Oculto?

Vício oculto é um defeito que:
- Não era visível no momento da compra
- Aparece depois
- Deixa o produto impróprio para uso

Exemplo:
- TV que esquenta 2 meses depois
- Geladeira que não gela 3 meses depois
- Carro que apresenta problemas mecânicos aos 6 meses

## Seus Direitos

Você pode exigir:
- Reparo gratuito
- Substituição por produto novo
- Devolução do dinheiro

Lei garante por até 90 dias após descoberta do vício!

## Prazos Importantes

- 30 dias (produtos duráveis): defeito deve aparecer nos primeiros 30 dias após compra
- 90 dias: você tem 90 dias a partir da descoberta do vício para reclamar
- Regressão: se reclamou e produto piorou, pode pedir indenização

## 5 Passos Para Reclamar

### Passo 1: Documente o Vício
- Fotografe ou grave vídeo do defeito
- Anote data do problema
- Guarde nota fiscal

### Passo 2: Comunique o Fabricante/Loja
- Envie via WhatsApp/email
- Descreva o problema
- Solicite reparo ou substituição

### Passo 3: Formalizar
Se não responder em 10 dias:
- Carta formal
- Ameace Procon

### Passo 4: Procon
- Protocole reclamação
- Loja terá 10 dias para resolver

### Passo 5: Ação Judicial
Se Procon não resolver:
- Ação rápida
- Taxa de êxito: 100%

## Quanto Você Recupera

- Reparo/substituição: sem custos
- Se indenização: R$ 1.000-10.000
- Danos morais: R$ 2.000-5.000

Total médio: R$ 5.000-15.000

## Jurisprudência Favorável

STJ e tribunais estaduais são pacíficos: vício oculto é direito do consumidor mesmo após vencimento de garantia.`,
    tags: ['vício-oculto', 'defeito', 'garantia', 'produto'],
    relatedArticles: ['produto-nao-entregue-solucao', 'arrependimento-compra-direito-voltar'],
    seoKeywords: ['vício oculto', 'defeito após garantia', 'produto com defeito', 'direitos consumidor'],
    cta: 'Seu produto tem vício oculto? Recupere seu direito',
  },
]

export const blogArticles: BlogArticle[] = [
  ...PILAR1_ARTICLES_EXISTING, // Existing Pilar 1
  ...pilar2Articles,
  ...pilar3Articles,
  ...pilar4Articles,
]

// Helper function to get article by slug
export function getArticleBySlug(slug: string): BlogArticle | undefined {
  return blogArticles.find(article => article.slug === slug)
}

// Helper function to get articles by category
export function getArticlesByCategory(category: keyof typeof BLOG_CATEGORIES): BlogArticle[] {
  return blogArticles.filter(article => article.category === category)
}

// Helper function to get related articles
export function getRelatedArticles(currentSlug: string): BlogArticle[] {
  const currentArticle = getArticleBySlug(currentSlug)
  if (!currentArticle?.relatedArticles) return []
  return currentArticle.relatedArticles
    .map(slug => getArticleBySlug(slug))
    .filter((article): article is BlogArticle => !!article)
}
