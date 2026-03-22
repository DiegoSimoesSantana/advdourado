// Category configuration and interlinking strategy for SEO
// This file maps the content structure and internal linking strategy

export const CATEGORY_INTERLINKING = {
  saude: {
    name: 'Plano de Saúde',
    articles: [
      'negativa-procedimento-5-passos',
      'reajuste-abusivo-plano-saude',
      'carencia-plano-saude',
      'ans-direitos-beneficiario',
    ],
    strategicLinks: {
      // After reading about "Negativa de Procedimento", link to:
      'negativa-procedimento-5-passos': [
        'reajuste-abusivo-plano-saude', // Related topic: other common abuses
        'ans-direitos-beneficiario', // Next step: know your agencies
      ],
      'reajuste-abusivo-plano-saude': [
        'negativa-procedimento-5-passos',
        'carencia-plano-saude',
      ],
      'carencia-plano-saude': [
        'negativa-procedimento-5-passos',
        'reajuste-abusivo-plano-saude',
      ],
      'ans-direitos-beneficiario': [
        'negativa-procedimento-5-passos',
        'reajuste-abusivo-plano-saude',
      ],
    },
  },
  // Pillar 2 will be configured here
  voos: {
    name: 'Voos e Viagens',
    articles: [],
    strategicLinks: {},
  },
  // Pillar 3 will be configured here
  bancos: {
    name: 'Direitos Bancários',
    articles: [],
    strategicLinks: {},
  },
  // Pillar 4 will be configured here
  compras: {
    name: 'Compras Online e Lojas',
    articles: [],
    strategicLinks: {},
  },
}

// Helper: get strategic links for an article
export function getStrategicLinks(slug: string): string[] {
  for (const category of Object.values(CATEGORY_INTERLINKING)) {
    if (slug in category.strategicLinks) {
      return category.strategicLinks[slug as keyof typeof category.strategicLinks] || []
    }
  }
  return []
}
