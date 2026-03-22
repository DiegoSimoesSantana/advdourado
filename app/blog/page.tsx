'use client'

import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { blogArticles, BLOG_CATEGORIES } from '@/lib/blog-data'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, ArrowRight } from 'lucide-react'

export default function BlogPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const categoryFromUrl = searchParams.get('category')
  const tagFromUrl = searchParams.get('tag')
  const queryFromUrl = searchParams.get('q')

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const validCategory =
      categoryFromUrl && Object.prototype.hasOwnProperty.call(BLOG_CATEGORIES, categoryFromUrl)
        ? categoryFromUrl
        : null

    setSelectedCategory(validCategory)

    if (queryFromUrl && queryFromUrl.trim()) {
      setSearchQuery(queryFromUrl)
      return
    }

    if (tagFromUrl && tagFromUrl.trim()) {
      setSearchQuery(tagFromUrl)
      return
    }

    setSearchQuery('')
  }, [categoryFromUrl, queryFromUrl, tagFromUrl])

  const updateUrlParams = (nextCategory: string | null, nextQuery: string) => {
    const params = new URLSearchParams(searchParams.toString())

    if (nextCategory) {
      params.set('category', nextCategory)
    } else {
      params.delete('category')
    }

    if (nextQuery.trim()) {
      params.set('q', nextQuery.trim())
      params.delete('tag')
    } else {
      params.delete('q')
    }

    const qs = params.toString()
    router.replace(qs ? `/blog?${qs}` : '/blog', { scroll: false })
  }

  const filteredArticles = useMemo(() => {
    let results = blogArticles

    // Filter by category
    if (selectedCategory) {
      results = results.filter(article => article.category === selectedCategory)
    }

    // `tag` query can come from article pages and should behave as a quick search filter.
    if (tagFromUrl && tagFromUrl.trim() && !searchQuery.trim() && !queryFromUrl?.trim()) {
      const normalizedTag = tagFromUrl.toLowerCase().trim()
      results = results.filter(article => article.tags.some(tag => tag.toLowerCase() === normalizedTag))
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      results = results.filter(article =>
        article.title.toLowerCase().includes(query) ||
        article.excerpt.toLowerCase().includes(query) ||
        article.tags.some(tag => tag.toLowerCase().includes(query)) ||
        article.seoKeywords.some(keyword => keyword.toLowerCase().includes(query))
      )
    }

    return results
  }, [selectedCategory, searchQuery, tagFromUrl, queryFromUrl])

  // Track category clicks for analytics
  const trackCategoryClick = (category: string | null) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'blog_category_filter', {
        category: category === null ? 'all' : category,
        article_count: category === null ? blogArticles.length : blogArticles.filter(a => a.category === category).length,
      })
    }

    const nextCategory = category === selectedCategory ? null : category
    setSelectedCategory(nextCategory)
    updateUrlParams(nextCategory, searchQuery)
  }

  // Track search for analytics
  const trackSearch = (query: string) => {
    setSearchQuery(query)
    updateUrlParams(selectedCategory, query)

    if (typeof window !== 'undefined' && window.gtag && query.trim()) {
      window.gtag('event', 'blog_search', {
        search_term: query,
        results_count: filteredArticles.length,
      })
    }
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header - Responsive */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8" style={{ backgroundColor: '#044B39' }}>
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight" style={{ color: '#FFFFFF' }}>
            Conhecer seus Direitos
          </h1>
          <p className="text-base sm:text-lg md:text-xl" style={{ color: '#ECE5DC' }}>
            Educação, orientação e empatia. Conheça seus direitos como consumidor
          </p>
        </div>
      </section>

      {/* Search and Filters - Responsive */}
      <section className="py-8 sm:py-12 px-4 sm:px-6 md:px-8" style={{ backgroundColor: '#ECE5DC' }}>
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-3 sm:top-4 w-5 h-5" style={{ color: '#C99300' }} />
            <Input
              placeholder="Buscar artigos... (negativa, plano, voo, banco, compra, direitos)"
              value={searchQuery}
              onChange={(e) => trackSearch(e.target.value)}
              className="pl-10 py-2 sm:py-3 text-sm sm:text-base border-2"
              style={{ borderColor: '#C99300' }}
            />
          </div>

          {/* Category Filters - Responsive Grid */}
          <div>
            <p className="text-sm font-semibold mb-3" style={{ color: '#2D2823' }}>Categorias:</p>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              <button
                onClick={() => trackCategoryClick(null)}
                className="px-3 sm:px-4 py-2 rounded-full text-sm font-medium transition-all"
                style={{
                  backgroundColor: selectedCategory === null ? '#044B39' : 'white',
                  color: selectedCategory === null ? 'white' : '#2D2823',
                  border: `2px solid ${selectedCategory === null ? '#044B39' : '#C99300'}`
                }}
              >
                Todos
              </button>
              {Object.entries(BLOG_CATEGORIES).map(([key, category]) => (
                <button
                  key={key}
                  onClick={() => trackCategoryClick(key)}
                  className="px-3 sm:px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap"
                  style={{
                    backgroundColor: selectedCategory === key ? '#C99300' : 'white',
                    color: selectedCategory === key ? 'white' : '#2D2823',
                    border: `2px solid ${selectedCategory === key ? '#C99300' : '#C99300'}`
                  }}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <p className="text-sm font-medium" style={{ color: '#2D2823' }}>
            {filteredArticles.length} artigo{filteredArticles.length !== 1 ? 's' : ''} encontrado{filteredArticles.length !== 1 ? 's' : ''}
          </p>
        </div>
      </section>

      {/* Articles Grid - Responsive */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8">
        <div className="max-w-6xl mx-auto">
          {filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredArticles.map((article) => (
                <Link
                  key={article.id}
                  href={`/blog/${article.slug}`}
                  onClick={() => {
                    if (typeof window !== 'undefined' && window.gtag) {
                      window.gtag('event', 'view_article', {
                        article_title: article.title,
                        article_category: article.category,
                      })
                    }
                  }}
                  className="group flex flex-col rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all border-2"
                  style={{ backgroundColor: 'white', borderColor: '#ECE5DC' }}
                >
                  {/* Image */}
                  <div className="overflow-hidden h-40 sm:h-48 bg-gray-200">
                    <img
                      src={article.image || "/placeholder.svg"}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-grow p-4 sm:p-5">
                    {/* Category Badge */}
                    <div className="mb-3">
                      <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full" style={{ backgroundColor: '#FFF8E7', color: '#C99300' }}>
                        {article.categoryName}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-base sm:text-lg font-bold mb-2 group-hover:underline line-clamp-2" style={{ color: '#044B39' }}>
                      {article.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-sm mb-4 flex-grow line-clamp-2" style={{ color: '#666' }}>
                      {article.excerpt}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center justify-between text-xs border-t pt-3" style={{ color: '#999', borderColor: '#ECE5DC' }}>
                      <time>{new Date(article.date).toLocaleDateString('pt-BR')}</time>
                      <span>{article.readTime} min</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg" style={{ color: '#2D2823' }}>Nenhum artigo encontrado.</p>
              <p className="text-sm mt-2" style={{ color: '#666' }}>Tente outras palavras-chave ou categorias</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section - Responsive */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8" style={{ backgroundColor: '#044B39' }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4" style={{ color: '#FFFFFF' }}>
            Ainda tem dúvidas?
          </h2>
          <p className="text-base sm:text-lg mb-6 sm:mb-8" style={{ color: '#ECE5DC' }}>
            Fale com a Dra. Bruna Dourado para uma análise gratuita do seu caso
          </p>
          <a 
            href="https://wa.me/5511999999999?text=Olá%20Dra.%20Bruna,%20li%20seus%20artigos%20no%20blog%20e%20gostaria%20de%20discutir%20meu%20caso."
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              if (typeof window !== 'undefined' && window.gtag) {
                window.gtag('event', 'click_whatsapp_cta', {
                  section: 'blog_page_cta',
                })
              }
            }}
          >
            <Button 
              size="lg"
              className="text-base sm:text-lg px-6 sm:px-8"
              style={{ backgroundColor: '#C99300', color: '#2D2823' }}
            >
              Conversar no WhatsApp
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </a>
        </div>
      </section>
    </main>
  )
}
