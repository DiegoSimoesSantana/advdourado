'use client'

import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { blogArticles, BLOG_CATEGORIES } from '@/lib/blog-data'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, ArrowRight, UserCheck, Building2 } from 'lucide-react'
import { siteConfig } from '@/lib/site-config'
import { ContactFooterSection } from '@/components/contact-footer-section'
import { BrandEmblem } from '@/components/brand-emblem'

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
  name: `${siteConfig.brand.legalName} — Artigos Informativos PF e PJ`,
  url: `${siteConfig.contact.siteUrl}/blog`,
  description:
    'Artigos educativos e informativos para Pessoas Físicas (PF) e Pessoas Jurídicas (PJ) do escritório Dra. Bruna Dourado (OAB/BA 71507) em Salvador/BA.',
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
  const profileFromUrl = searchParams.get('perfil')

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedProfile, setSelectedProfile] = useState<'ALL' | 'PF' | 'PJ'>('ALL')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    setSelectedCategory(categoryFromUrl)
  }, [categoryFromUrl])

  useEffect(() => {
    if (profileFromUrl === 'PF' || profileFromUrl === 'PJ') {
      setSelectedProfile(profileFromUrl)
    } else {
      setSelectedProfile('ALL')
    }
  }, [profileFromUrl])

  useEffect(() => {
    setSearchQuery(queryFromUrl ?? '')
  }, [queryFromUrl])

  const updateUrlParams = (
    nextCategory: string | null,
    nextQuery: string,
    nextProfile: 'ALL' | 'PF' | 'PJ' = selectedProfile,
  ) => {
    const params = new URLSearchParams(searchParams.toString())
    if (nextCategory) {
      params.set('category', nextCategory)
    } else {
      params.delete('category')
    }
    if (nextProfile !== 'ALL') {
      params.set('perfil', nextProfile)
    } else {
      params.delete('perfil')
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
    if (selectedProfile !== 'ALL') {
      results = results.filter(
        (article) =>
          article.targetProfile === selectedProfile || article.targetProfile === 'PF e PJ',
      )
    }
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
  }, [selectedCategory, selectedProfile, searchQuery, tagFromUrl, queryFromUrl])

  return (
    <main className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 md:px-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <nav className="text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary hover:underline">
              Início
            </Link>
            <span className="mx-2">/</span>
            <span className="font-semibold text-foreground">Artigos Informativos (PF & PJ)</span>
          </nav>

          <div className="inline-flex items-center gap-2 rounded-full border border-primary/35 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            <BrandEmblem size="sm" className="h-5 w-5" />
            <span>Biblioteca Jurídica • {siteConfig.brand.oab}</span>
          </div>
        </div>

        <h1 className="font-serif text-4xl font-bold text-foreground md:text-5xl">
          Artigos e Orientações Jurídicas para PF e PJ
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          Publicações de caráter estritamente educativo e informativo sob coordenação da Dra. Bruna Dourado ({siteConfig.brand.oab}), cobrindo demandas de <strong>Pessoas Físicas</strong> e <strong>Empresas / Instituições de Ensino</strong> nos 6 eixos do escritório.
        </p>

        {/* Seletor de Perfil PF vs PJ */}
        <div className="mt-8 flex flex-wrap items-center gap-2">
          <Button
            variant={selectedProfile === 'ALL' ? 'default' : 'outline'}
            onClick={() => updateUrlParams(selectedCategory, searchQuery, 'ALL')}
            size="sm"
          >
            Todos os Perfis (PF & PJ)
          </Button>
          <Button
            variant={selectedProfile === 'PF' ? 'default' : 'outline'}
            onClick={() => updateUrlParams(selectedCategory, searchQuery, 'PF')}
            size="sm"
            className="inline-flex items-center gap-1.5"
          >
            <UserCheck className="h-4 w-4" />
            Para Pessoa Física (PF)
          </Button>
          <Button
            variant={selectedProfile === 'PJ' ? 'default' : 'outline'}
            onClick={() => updateUrlParams(selectedCategory, searchQuery, 'PJ')}
            size="sm"
            className="inline-flex items-center gap-1.5"
          >
            <Building2 className="h-4 w-4" />
            Para Empresas e Escolas (PJ)
          </Button>
        </div>

        {/* Filtros por Eixo e Busca */}
        <section className="mt-6">
          <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedCategory === null ? 'default' : 'outline'}
                onClick={() => updateUrlParams(null, searchQuery)}
                className="text-xs sm:text-sm"
              >
                Todos os Eixos
              </Button>
              {Object.entries(BLOG_CATEGORIES).map(([key, value]) => (
                <Button
                  key={key}
                  variant={selectedCategory === key ? 'default' : 'outline'}
                  onClick={() => updateUrlParams(key, searchQuery)}
                  className="text-xs sm:text-sm"
                >
                  {value.name}
                </Button>
              ))}
            </div>
            <form
              className="flex w-full gap-2 sm:w-auto"
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
                className="w-full sm:w-64"
              />
              <Button type="submit" variant="outline" className="px-3">
                <Search className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </section>

        {/* Lista de artigos */}
        <section className="mt-8">
          {filteredArticles.length === 0 ? (
            <div className="py-12 text-center text-muted-foreground">
              Nenhum artigo encontrado para este filtro.
            </div>
          ) : (
            <ul className="space-y-5">
              {filteredArticles.map((article) => {
                const profileBadge = article.targetProfile ?? 'PF'
                const isPJ = profileBadge === 'PJ'
                const targetAxisRoute =
                  article.axisRoute ?? categoryToRoute[article.category] ?? '/trabalhista'

                return (
                  <li
                    key={article.slug}
                    className="rounded-2xl border border-border bg-card p-6 shadow-xs transition-all hover:border-primary/60 hover:shadow-md"
                  >
                    <Link href={`/blog/${article.slug}`} className="block">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                          {article.categoryName}
                        </span>
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                            isPJ
                              ? 'border border-amber-500/40 bg-amber-500/15 text-amber-700 dark:text-amber-300'
                              : 'border border-primary/40 bg-primary/15 text-primary'
                          }`}
                        >
                          Público: {profileBadge}
                        </span>
                      </div>
                      <h2 className="mt-2 font-serif text-2xl font-bold text-foreground hover:text-primary">
                        {article.title}
                      </h2>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {article.excerpt}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2 text-xs text-muted-foreground">
                        <span>{article.author}</span>
                        <span>•</span>
                        <span>{article.readTime} min</span>
                        <span>•</span>
                        <span>{new Date(article.date).toLocaleDateString('pt-BR')}</span>
                      </div>
                    </Link>
                    <div className="mt-4 flex flex-wrap items-center gap-4 border-t border-border pt-3 text-xs">
                      <Link
                        href={`/blog/${article.slug}`}
                        className="inline-flex items-center gap-1 font-bold text-primary hover:underline"
                      >
                        Ler artigo completo <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                      <Link
                        href={targetAxisRoute}
                        className="font-medium text-muted-foreground hover:text-primary hover:underline"
                      >
                        Conhecer Eixo Relacionado ({targetAxisRoute})
                      </Link>
                    </div>
                  </li>
                )
              })}
            </ul>
          )}
        </section>
      </div>

      <ContactFooterSection />
    </main>
  )
}
