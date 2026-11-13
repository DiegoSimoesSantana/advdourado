'use client'

import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { blogArticles, BLOG_CATEGORIES } from '@/lib/blog-data'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, ArrowRight } from 'lucide-react'
import { siteConfig } from '@/lib/site-config'
import { ContactFooterSection } from '@/components/contact-footer-section'
import { BrandEmblem } from '@/components/brand-emblem'
import { EditorialArticleCover } from '@/components/editorial-article-cover'

const categoryToRoute: Record<string, string> = {
  trabalhista: '/trabalhista',
  educacional: '/educacional',
  familia: '/familia',
  imobiliario: '/imobiliario',
  saude: '/saude',
  compras: '/consumidor',
  bancos: '/consumidor',
  voos: '/consumidor',
}

const blogSchema = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  name: `${siteConfig.brand.legalName} — Artigos`,
  url: `${siteConfig.contact.siteUrl}/blog`,
  description:
    'Artigos educativos e informativos do escritório Dra. Bruna Dourado (OAB/BA 71507) em Salvador/BA.',
  publisher: {
    '@type': 'LegalService',
    name: siteConfig.brand.legalName,
    url: siteConfig.contact.siteUrl,
  },
}

export default function BlogPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const categoryFromUrl = searchParams.get('category')
  const tagFromUrl = searchParams.get('tag')
  const queryFromUrl = searchParams.get('q')

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    setSelectedCategory(categoryFromUrl)
  }, [categoryFromUrl])

  useEffect(() => {
    setSearchQuery(queryFromUrl ?? '')
  }, [queryFromUrl])

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
    if (selectedCategory) {
      results = results.filter((article) => article.category === selectedCategory)
    }
    if (tagFromUrl && tagFromUrl.trim() && !searchQuery.trim() && !queryFromUrl?.trim()) {
      const normalizedTag = tagFromUrl.toLowerCase().trim()
      results = results.filter((article) =>
        article.tags.some((tag) => tag.toLowerCase() === normalizedTag),
      )
    }
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      results = results.filter(
        (article) =>
          article.title.toLowerCase().includes(query) ||
          article.excerpt.toLowerCase().includes(query) ||
          article.tags.some((tag) => tag.toLowerCase() === query) ||
          article.seoKeywords.some((keyword) => keyword.toLowerCase().includes(query)),
      )
    }
    return results
  }, [selectedCategory, searchQuery, tagFromUrl, queryFromUrl])

  return (
    <main className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:px-8 md:py-24">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <nav className="text-base text-muted-foreground">
            <Link href="/" className="hover:text-primary hover:underline">
              Início
            </Link>
            <span className="mx-2">/</span>
            <span className="font-semibold text-foreground">Artigos</span>
          </nav>

          <div className="inline-flex items-center gap-2 rounded-full border border-primary/35 bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
            <BrandEmblem size="sm" className="h-5 w-5" />
            <span>Biblioteca Jurídica • {siteConfig.brand.oab}</span>
          </div>
        </div>

        <h1 className="font-serif text-4xl font-bold text-foreground md:text-5xl">
          Artigos e Orientações Jurídicas
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted-foreground">
          Publicações educativas sobre direitos, deveres e prazos legais sob coordenação da Dra. Bruna Dourado ({siteConfig.brand.oab}), conforme o Provimento nº 205/2021 da OAB.
        </p>

        {/* Filtros por Área e Busca */}
        <section className="mt-10">
          <div className="mb-10 flex flex-col items-start justify-between gap-4 lg:flex-row lg:items-center">
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedCategory === null ? 'default' : 'outline'}
                onClick={() => updateUrlParams(null, searchQuery)}
                className="rounded-lg text-sm font-semibold"
              >
                Todas as Áreas
              </Button>
              {Object.entries(BLOG_CATEGORIES).map(([key, value]) => (
                <Button
                  key={key}
                  variant={selectedCategory === key ? 'default' : 'outline'}
                  onClick={() => updateUrlParams(key, searchQuery)}
                  className="rounded-lg text-sm font-semibold"
                >
                  {value.name}
                </Button>
              ))}
            </div>
            <form
              className="flex w-full gap-2 lg:w-auto"
              onSubmit={(e) => {
                e.preventDefault()
                updateUrlParams(selectedCategory, searchQuery)
              }}
            >
              <Input
                type="text"
                placeholder="Buscar tema jurídico..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-11 w-full text-base lg:w-72"
              />
              <Button type="submit" variant="outline" className="h-11 px-4">
                <Search className="h-5 w-5" />
              </Button>
            </form>
          </div>
        </section>

        {/* Grid de Artigos com Capa Editorial Temática e Texto Enxuto */}
        <section className="mt-8">
          {filteredArticles.length === 0 ? (
            <div className="py-16 text-center text-lg text-muted-foreground">
              Nenhum artigo encontrado para este filtro.
            </div>
          ) : (
            <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
              {filteredArticles.map((article) => {
                const targetAxisRoute =
                  article.axisRoute ?? categoryToRoute[article.category] ?? '/trabalhista'

                return (
                  <article
                    key={article.slug}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:border-primary/60 hover:shadow-md"
                  >
                    <Link href={`/blog/${article.slug}`} className="block">
                      <EditorialArticleCover
                        category={article.category}
                        categoryName={article.categoryName}
                        variant="card"
                      />
                    </Link>

                    <div className="flex flex-grow flex-col justify-between p-7 sm:p-8">
                      <div>
                        <Link href={`/blog/${article.slug}`}>
                          <h2 className="line-clamp-2 font-serif text-xl font-bold text-foreground transition-colors group-hover:text-primary sm:text-2xl">
                            {article.title}
                          </h2>
                        </Link>
                        <p className="mt-3 line-clamp-2 text-base leading-relaxed text-muted-foreground">
                          {article.excerpt}
                        </p>
                      </div>

                      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4 text-sm">
                        <Link
                          href={`/blog/${article.slug}`}
                          className="inline-flex items-center gap-1.5 font-bold text-primary hover:underline"
                        >
                          Ler Artigo ({article.readTime} min) <ArrowRight className="h-4 w-4" />
                        </Link>
                        <Link
                          href={targetAxisRoute}
                          className="font-medium text-muted-foreground hover:text-primary hover:underline"
                        >
                          Explorar Área
                        </Link>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          )}
        </section>
      </div>

      <ContactFooterSection />
    </main>
  )
}
