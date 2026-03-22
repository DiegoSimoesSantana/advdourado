import Link from 'next/link'
import { BlogArticle } from '@/lib/blog-data'

interface InternalLinkWidgetProps {
  article: BlogArticle
  position: 'top' | 'middle' | 'bottom'
}

export function InternalLinkWidget({ article, position }: InternalLinkWidgetProps) {
  // Strategy: Link to related articles at strategic points in the content
  const strategicCTA = {
    'saude': {
      'top': 'Antes de continuar, entenda também como funcionam os reajustes abusivos',
      'middle': 'Você sabia? Carência indevida é um dos principais abusos relatados',
      'bottom': 'Conheça os direitos garantidos pela ANS'
    },
    'voos': {
      'top': 'Além do cancelamento, saiba seus direitos com bagagem também',
      'middle': 'Se o voo foi cancelado, sua bagagem também tem proteção',
      'bottom': 'Não foi só cancelamento? Conheça seus direitos em overbooking'
    },
    'bancos': {
      'top': 'Além de cobrança indevida, proteja seu nome',
      'middle': 'Juros muito altos podem ser questionados na justiça',
      'bottom': 'Conheça todas as suas proteções contra abusos bancários'
    },
    'compras': {
      'top': 'Além de arrependimento, saiba seus direitos completos',
      'middle': 'O produto não chegou? Conhece seus direitos?',
      'bottom': 'Defeito após a garantia? Você ainda tem direitos'
    }
  }

  return (
    <div className="my-6 p-4 rounded-lg border-l-4" style={{ backgroundColor: '#FFF8E7', borderColor: '#C99300' }}>
      <p className="text-sm font-semibold" style={{ color: '#2D2823' }}>
        💡 {strategicCTA[article.category as keyof typeof strategicCTA]?.[position as keyof typeof strategicCTA.saude] || 'Conheça seus direitos'}
      </p>
    </div>
  )
}
