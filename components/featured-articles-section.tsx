'use client'

import { useState } from 'react'
import Link from 'next/link'
import { blogArticles } from '@/lib/blog-data'
import { Button } from '@/components/ui/button'
import { ArrowRight, UserCheck, Building2 } from 'lucide-react'
import { SafePortraitImage } from '@/components/safe-portrait-image'

type ProfileTab = 'ALL' | 'PF' | 'PJ'

export function FeaturedArticlesSection() {
  const [profileTab, setProfileTab] = useState<ProfileTab>('ALL')

  const filtered = blogArticles
    .filter((article) => {
      if (profileTab === 'ALL') return true
      if (profileTab === 'PF') {
        return article.targetProfile === 'PF' || article.targetProfile === 'PF e PJ'
      }
      return article.targetProfile === 'PJ' || article.targetProfile === 'PF e PJ'
    })
    .slice(0, 6)

  return (
    <section className="border-b border-border bg-background px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
              Publicações Informativas • PF & PJ
            </p>
            <h2 className="mt-2 font-serif text-3xl font-bold text-foreground sm:text-4xl">
              Artigos Jurídicos para Pessoas Físicas e Empresas
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              Conteúdo educativo sobre direitos, deveres, compliance e prazos legais nos 6 eixos do escritório, elaborado em conformidade com o Provimento nº 205/2021 da OAB.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex rounded-xl border border-border bg-secondary/60 p-1">
              <button
                type="button"
                onClick={() => setProfileTab('ALL')}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                  profileTab === 'ALL'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Destaques PF & PJ
              </button>
              <button
                type="button"
                onClick={() => setProfileTab('PF')}
                className={`inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                  profileTab === 'PF'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <UserCheck className="h-3.5 w-3.5" />
                Artigos PF
              </button>
              <button
                type="button"
                onClick={() => setProfileTab('PJ')}
                className={`inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                  profileTab === 'PJ'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Building2 className="h-3.5 w-3.5" />
                Artigos PJ / B2B
              </button>
            </div>

            <Button asChild variant="outline" className="rounded-lg border-primary/40">
              <Link href="/blog">
                Ver Todos ({blogArticles.length})
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((article) => {
            const profileBadge = article.targetProfile ?? 'PF'
            const isPJ = profileBadge === 'PJ'
            return (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/60 hover:shadow-md"
              >
                <div className="relative h-44 overflow-hidden bg-muted">
                  <SafePortraitImage
                    src={article.image || '/images/foto-perfil2.jpg'}
                    alt={article.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 360px"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-3 right-3">
                    <span
                      className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider shadow-sm backdrop-blur-md ${
                        isPJ
                          ? 'border border-amber-400/50 bg-[#0a0a0a]/85 text-amber-300'
                          : 'border border-[#c5a880]/50 bg-[#0a0a0a]/85 text-[#c5a880]'
                      }`}
                    >
                      Público: {profileBadge}
                    </span>
                  </div>
                </div>

                <div className="flex flex-grow flex-col p-5">
                  <span className="mb-2.5 inline-block w-fit rounded-full border border-primary/30 bg-primary/10 px-3 py-0.5 text-xs font-semibold text-primary">
                    {article.categoryName}
                  </span>
                  <h3 className="mb-2 line-clamp-2 font-serif text-lg font-bold text-foreground transition-colors group-hover:text-primary">
                    {article.title}
                  </h3>
                  <p className="mb-4 flex-grow line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between border-t border-border pt-3 text-xs text-muted-foreground">
                    <span>{article.author}</span>
                    <span className="font-semibold text-primary group-hover:underline">
                      Ler artigo ({article.readTime} min) →
                    </span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
