// Template and helper for creating new articles easily
// Copy this template, fill in the data, and add to blogArticles array in lib/blog-data.ts

export const NEW_ARTICLE_TEMPLATE = {
  id: 'X',
  slug: 'novo-artigo-slug',
  title: 'Título do Artigo',
  subtitle: 'Subtítulo/resumo em uma linha',
  category: 'saude' as const,
  categoryName: 'Plano de Saúde',
  author: 'Bruna Dourado',
  date: new Date().toISOString().split('T')[0],
  readTime: 5,
  image: '/placeholder.svg?key=xxxxx',
  excerpt: 'Breve resumo do artigo para listagem',
  content: `
# Heading 1

Parágrafo introdutório.

## Heading 2

Conteúdo em seções.

### Heading 3

Subseções para estrutura.

- Item 1
- Item 2
- Item 3

## Outra Seção

Mais conteúdo estruturado.
  `,
  tags: ['tag1', 'tag2', 'tag3'],
  relatedArticles: ['slug-artigo-relacionado-1', 'slug-artigo-relacionado-2'],
  seoKeywords: ['palavra-chave-1', 'palavra-chave-2', 'palavra-chave-3'],
  cta: 'Chamada para ação específica do artigo',
}

// PILLAR STRUCTURE FOR CONTENT PLANNING:
export const CONTENT_PILLARS = {
  saude: {
    name: 'Plano de Saúde',
    articles: 4,
    topics: [
      'Negativa de procedimento',
      'Reajuste abusivo',
      'Carência indevida',
      'Direitos perante ANS',
    ],
  },
  voos: {
    name: 'Voos e Viagens',
    articles: 3,
    topics: [
      'Cancelamento de voo e indenização',
      'Bagagem extraviada ou danificada',
      'Overbooking e direitos do passageiro',
    ],
  },
  bancos: {
    name: 'Direitos Bancários',
    articles: 3,
    topics: [
      'Nome negativado injustamente',
      'Cobrança indevida',
      'Juros e taxas abusivas',
    ],
  },
  compras: {
    name: 'Compras Online e Lojas',
    articles: 3,
    topics: [
      'Direito de arrependimento',
      'Produto não entregue',
      'Vício oculto e defeitos',
    ],
  },
}
