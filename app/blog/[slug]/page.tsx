'use client'

import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getArticleBySlug, getRelatedArticles } from '@/lib/blog-data'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Breadcrumb } from '@/components/breadcrumb'
import { useEffect } from 'react'
import { trackArticleView, trackWhatsAppClick } from '@/lib/analytics'

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = getArticleBySlug(params.slug)
  const relatedArticles = getRelatedArticles(params.slug)

  useEffect(() => {
    if (article) {
      trackArticleView(article.slug, article.title, article.category, article.readTime)
    }
  }, [article])

  if (!article) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Back Button - Responsive */}
      <section className="bg-background border-b border-border sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <Breadcrumb
            items={[
              { label: 'Blog', href: '/blog' },
              { label: article.categoryName, href: `/blog?category=${article.category}` },
              { label: article.title, href: `/blog/${article.slug}` },
            ]}
          />
        </div>
      </section>

      {/* Article Header - Responsive */}
      <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#ECE5DC' }}>
        <div className="max-w-4xl mx-auto">
          {/* Category */}
          <div className="mb-4">
            <Link href={`/blog?category=${article.category}`}>
              <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full transition-all" style={{ backgroundColor: '#FFF8E7', color: '#C99300' }}>
                {article.categoryName}
              </span>
            </Link>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 leading-tight text-balance" style={{ color: '#044B39' }}>
            {article.title}
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-balance" style={{ color: '#2D2823' }}>
            {article.subtitle}
          </p>

          {/* Meta Information - Responsive */}
          <div className="flex flex-wrap gap-4 sm:gap-6 text-xs sm:text-sm border-t pt-4 sm:pt-6" style={{ color: '#666', borderColor: '#C99300' }}>
            <div>
              <span className="font-semibold" style={{ color: '#2D2823' }}>Por</span> {article.author}
            </div>
            <div>
              <time dateTime={article.date}>
                {new Date(article.date).toLocaleDateString('pt-BR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </div>
            <div>
              <span>{article.readTime} min de leitura</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image - Responsive */}
      <section className="py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-lg overflow-hidden shadow-lg h-64 sm:h-80 md:h-96 bg-gray-200">
            <img
              src={article.image || "/placeholder.svg"}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Article Content - Responsive */}
      <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <article className="prose max-w-none">
            <div
              className="text-sm sm:text-base leading-relaxed space-y-4 sm:space-y-6"
              style={{ color: '#2D2823' }}
              dangerouslySetInnerHTML={{
                __html: article.content
                  .split('\n')
                  .map((paragraph) => {
                    if (paragraph.startsWith('##')) {
                      return `<h2 class="text-xl sm:text-2xl md:text-3xl font-bold mt-6 sm:mt-8 mb-3 sm:mb-4" style="color: #044B39;">${paragraph.replace('## ', '')}</h2>`
                    }
                    if (paragraph.startsWith('###')) {
                      return `<h3 class="text-lg sm:text-xl font-bold mt-4 sm:mt-6 mb-2 sm:mb-3" style="color: #C99300;">${paragraph.replace('### ', '')}</h3>`
                    }
                    if (paragraph.trim() === '') return ''
                    if (paragraph.startsWith('-')) {
                      return `<li class="ml-4 sm:ml-6 mb-2">${paragraph.replace('- ', '')}</li>`
                    }
                    return `<p class="mb-3 sm:mb-4 leading-relaxed">${paragraph}</p>`
                  })
                  .join('')
                  .replace(/<\/li>/g, '</li>')
                  .replace(/(<li[^>]*>[\s\S]*?<\/li>)/g, '<ul class="list-disc space-y-2 mb-4 ml-4">$1</ul>'),
              }}
            />
          </article>
        </div>
      </section>

      {/* CTA Section - Responsive */}
      <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#044B39' }}>
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-base sm:text-lg md:text-xl mb-4 sm:mb-6 text-balance" style={{ color: '#ECE5DC' }}>
            {article.cta}
          </p>
          <a
            href="https://wa.me/5511999999999?text=Olá%20Dra.%20Bruna,%20li%20seu%20artigo%20e%20gostaria%20de%20discutir%20meu%20caso."
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick('article_cta', article.slug)}
          >
            <Button 
              size="lg"
              className="text-base sm:text-lg px-6 sm:px-8"
              style={{ backgroundColor: '#C99300', color: '#2D2823' }}
            >
              Fale Conosco Via WhatsApp
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </a>
        </div>
      </section>

      {/* Related Articles - Responsive */}
      {relatedArticles.length > 0 && (
        <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#ECE5DC' }}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-12" style={{ color: '#044B39' }}>
              Artigos Relacionados
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {relatedArticles.map((relatedArticle) => (
                <Link
                  key={relatedArticle.id}
                  href={`/blog/${relatedArticle.slug}`}
                  className="group flex flex-col rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all p-4 sm:p-5 border-2"
                  style={{ backgroundColor: 'white', borderColor: '#C99300' }}
                >
                  <div className="mb-3">
                    <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full" style={{ backgroundColor: '#FFF8E7', color: '#C99300' }}>
                      {relatedArticle.categoryName}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold group-hover:underline mb-2 line-clamp-2" style={{ color: '#044B39' }}>
                    {relatedArticle.title}
                  </h3>
                  <p className="text-sm mb-4 flex-grow line-clamp-2" style={{ color: '#666' }}>
                    {relatedArticle.excerpt}
                  </p>
                  <div className="text-xs flex justify-between items-center pt-3 border-t" style={{ color: '#999', borderColor: '#ECE5DC' }}>
                    <time>{new Date(relatedArticle.date).toLocaleDateString('pt-BR')}</time>
                    <span>{relatedArticle.readTime} min</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Tags Section - Responsive */}
      <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <Link
                key={tag}
                href={`/blog?tag=${tag}`}
                className="px-3 py-1 text-xs sm:text-sm rounded-full transition-all font-medium"
                style={{ backgroundColor: '#ECE5DC', color: '#2D2823' }}
              >
                #{tag}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
