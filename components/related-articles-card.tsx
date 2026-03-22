import { Card } from '@/components/ui/card'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { BlogArticle } from '@/lib/blog-data'

interface RelatedArticlesCardProps {
  articles: BlogArticle[]
}

export function RelatedArticlesCard({ articles }: RelatedArticlesCardProps) {
  if (articles.length === 0) return null

  return (
    <Card className="p-6 md:p-8 border-0 mt-8 md:mt-12" style={{ backgroundColor: '#ECE5DC' }}>
      <h3 className="text-xl md:text-2xl font-bold mb-6" style={{ color: '#044B39' }}>Artigos Relacionados</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {articles.map((article) => (
          <Link 
            key={article.slug}
            href={`/blog/${article.slug}`}
            className="group p-4 rounded-lg transition-all hover:shadow-lg"
            style={{ backgroundColor: 'white', borderLeft: '4px solid #C99300' }}
          >
            <h4 className="font-semibold mb-2 group-hover:underline line-clamp-2" style={{ color: '#2D2823' }}>
              {article.title}
            </h4>
            <p className="text-sm mb-3 line-clamp-2" style={{ color: '#666' }}>
              {article.excerpt}
            </p>
            <div className="flex items-center text-sm font-semibold" style={{ color: '#C99300' }}>
              Ler mais <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </Card>
  )
}
