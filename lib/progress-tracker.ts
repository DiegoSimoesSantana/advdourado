// Progress Tracker - Website Development for Bruna Dourado Consumer Law

export const PROJECT_PROGRESS = {
  etapa_1: {
    name: 'Etapa 1: Estratégia e Design Base',
    status: 'CONCLUÍDA ✓',
    completeness: 100,
    items: [
      '✓ Homepage completa com 6 seções',
      '✓ Design profissional e responsivo',
      '✓ Logo e identidade visual',
      '✓ Botão WhatsApp flutuante',
    ],
  },
  etapa_2: {
    name: 'Etapa 2: Sistema de Blog e Estrutura',
    status: 'CONCLUÍDA ✓',
    completeness: 100,
    items: [
      '✓ Estrutura de dados de artigos (blog-data.ts)',
      '✓ Página de listagem de blog com filtros por categoria',
      '✓ Template de artigo individual dinâmico',
      '✓ Sistema de roteamento [slug]',
      '✓ Componentes de navegação (Header Nav, Breadcrumb)',
      '✓ SEO metadata para artigos (OpenGraph, Twitter Cards)',
      '✓ Seção de artigos em destaque na homepage',
      '✓ Sistema de categorias com cores próprias',
    ],
  },
  etapa_3: {
    name: 'Etapa 3: Pilar 1 - Conteúdo Saúde',
    status: 'CONCLUÍDA ✓',
    completeness: 100,
    items: [
      '✓ Artigo 1: Negativa de Procedimento (5 Passos)',
      '✓ Artigo 2: Reajuste Abusivo no Plano',
      '✓ Artigo 3: Carência no Plano de Saúde',
      '✓ Artigo 4: ANS e Seus Direitos',
      '✓ Sistema de linking interno (related articles)',
      '✓ CTAs estratégicos em cada artigo',
      '✓ Imagens estratégicas para cada artigo',
    ],
  },
  etapa_4: {
    name: 'Etapa 4: Pilar 2 - Conteúdo Voos',
    status: 'PENDENTE',
    completeness: 0,
    items: [
      '◻ Artigo: Voo Cancelado - Indenização Passo a Passo',
      '◻ Artigo: Bagagem Extraviada - Calcule sua Indenização',
      '◻ Artigo: Overbooking - Seus Direitos',
      '◻ Sistema de interlinking com Pilar 1',
    ],
  },
  etapa_5: {
    name: 'Etapa 5: Pilar 3 - Conteúdo Bancos',
    status: 'PENDENTE',
    completeness: 0,
    items: [
      '◻ Artigo: Nome Negativado Injustamente',
      '◻ Artigo: Cobrança Indevida - Como Contestar',
      '◻ Artigo: Juros Abusivos em Empréstimos',
      '◻ Sistema de interlinking com Pilares anteriores',
    ],
  },
  etapa_6: {
    name: 'Etapa 6: Pilar 4 - Conteúdo Compras Online',
    status: 'PENDENTE',
    completeness: 0,
    items: [
      '◻ Artigo: Arrependimento de Compra - Direito de Voltar',
      '◻ Artigo: Produto Não Entregue - O que Fazer',
      '◻ Artigo: Vício Oculto - Defeito Após Garantia',
      '◻ Interlinking completo com todos os pilares',
    ],
  },
  etapa_7: {
    name: 'Etapa 7: Otimização de Interlinking',
    status: 'PENDENTE',
    completeness: 0,
    items: [
      '◻ Mapa estratégico completo entre artigos',
      '◻ Interlinking cruzado entre pilares',
      '◻ CTAs secundários otimizados',
      '◻ Testes de navegação e fluxo',
    ],
  },
  etapa_8: {
    name: 'Etapa 8: Funcionalidades Avançadas',
    status: 'PENDENTE',
    completeness: 0,
    items: [
      '◻ Sistema de busca de artigos',
      '◻ Artigos relacionados mais inteligentes',
      '◻ Newsletter/Email capture',
      '◻ Analytics e rastreamento de conversões',
      '◻ Admin dashboard para gerenciar artigos',
    ],
  },
  etapa_9: {
    name: 'Etapa 9: Conversão & Lead Generation',
    status: 'PENDENTE',
    completeness: 0,
    items: [
      '◻ Formulário de Diagnóstico Rápido',
      '◻ WhatsApp API automation',
      '◻ Popup de captura com oferta (PDF)',
      '◻ Rastreamento de funil de conversão',
    ],
  },
  etapa_10: {
    name: 'Etapa 10: SEO & Performance',
    status: 'EM PROGRESSO',
    completeness: 30,
    items: [
      '✓ Estrutura de URLs otimizadas',
      '✓ Metadata OpenGraph',
      '◻ Sitemap.xml',
      '◻ robots.txt',
      '◻ Google Search Console setup',
      '◻ Core Web Vitals optimization',
    ],
  },
}

export function getOverallProgress() {
  const total = Object.keys(PROJECT_PROGRESS).length
  const completed = Object.values(PROJECT_PROGRESS).filter(
    (e) => e.status === 'CONCLUÍDA ✓'
  ).length
  return Math.round((completed / total) * 100)
}
