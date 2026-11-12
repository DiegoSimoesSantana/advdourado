'use client'

import { useState } from 'react'
import Link from 'next/link'
import { blogArticles } from '@/lib/blog-data'
import { Button } from '@/components/ui/button'
import { ArrowRight, UserCheck, Building2 } from 'lucide-react'
import { EditorialArticleCover } from '@/components/editorial-article-cover'

type ProfileTab = 'ALL' | 'PF' | 'PJ'

export function FeaturedArticlesSection() {
  const [profileTab, setProfileTab] = useState<ProfileTab>('ALL')

  // Exibir 3 artigos em destaque para manter foco visual e eliminar fadiga
  const featured = blogArticles
    .filter((article) => {
      if (profileTab === 'ALL') return true
      if (profileTab === 'PF') {
        return article.targetProfile === 'PF' || article.targetProfile === 'PF e PJ'
      }
      return article.targetProfile === 'PJ' || article.targetProfile === 'PF e PJ'
    })
    .slice(0, 3)

  return (
    <section className="border-b border-border bg-background px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Publicações Informativas • PF & PJ
            </p>
            <h2 className="mt-2 font-serif text-3xl font-bold text-foreground sm:text-4xl">
              Artigos Jurídicos em Destaque
            </h2>
            <p className="mt-3 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Orientações objetivas sobre direitos, compliance e prazos legais, elaboradas nos termos do Provimento nº 205/2021 da OAB.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex rounded-xl border border-border bg-secondary/60 p-1.5">
              <button
                type="button"
                onClick={() => setProfileTab('ALL')}
                className={`rounded-lg px-4 py-2 text-sm font-bold transition ${
                  profileTab === 'ALL'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Todos
              </button>
              <button
                type="button"
                onClick={() => setProfileTab('PF')}
                className={`inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-bold transition ${
                  profileTab === 'PF'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <UserCheck className="h-4 w-4" />
                Pessoa Física
              </button>
              <button
                type="button"
                onClick={() => setProfileTab('PJ')}
                className={`inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-bold transition ${
                  profileTab === 'PJ'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Building2 className="h-4 w-4" />
                Empresas / Escolas
              </button>
            </div>

            <Button asChild variant="outline" size="lg" className="rounded-xl border-primary/40 text-base font-semibold">
              <Link href="/blog">
                Biblioteca Completa
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-7 md:grid-cols-3">
          {featured.map((article) => (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:border-primary/60 hover:shadow-md"
            >
              {/* Capa Editorial Temática (sem repetir foto da advogada) */}
              <EditorialArticleCover
                category={article.category}
                categoryName={article.categoryName}
                targetProfile={article.targetProfile}
                variant="card"
              />

              <div className="flex flex-grow flex-col justify-between p-7 sm:p-8">
                <div>
                  <h3 className="line-clamp-2 font-serif text-xl font-bold text-foreground transition-colors group-hover:text-primary sm:text-2xl">
                    {article.title}
                  </h3>
                  <p className="mt-3 line-clamp-2 text-base leading-relaxed text-muted-foreground">
                    {article.excerpt}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-border pt-4 text-sm font-semibold text-primary">
                  <span>Leitura de {article.readTime} min</span>
                  <span className="inline-flex items-center gap-1.5 group-hover:underline">
                    Ler Artigo <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
