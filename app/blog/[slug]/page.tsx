import type { Metadata } from 'next'
import Link from 'next/link'
import { getArticleBySlug, blogArticles } from '@/lib/blog-data'
import { Card } from '@/components/ui/card'
import { siteConfig } from '@/lib/site-config'
import { SafePortraitImage } from '@/components/safe-portrait-image'
import { CaseTriageForm } from '@/components/case-triage-form'
import { ContactFooterSection } from '@/components/contact-footer-section'
import { BrandEmblem } from '@/components/brand-emblem'
import { EditorialArticleCover } from '@/components/editorial-article-cover'
import { ArrowRight } from 'lucide-react'

type Props = {
  params: Promise<{ slug: string }>
}

const categoryToRoute: Record<string, { route: string; title: string }> = {
  trabalhista: { route: '/trabalhista', title: 'Direito Trabalhista' },
  educacional: { route: '/educacional', title: 'Direito Educacional Institucional' },
  familia: { route: '/familia', title: 'Direito de Família Extrajudicial' },
  imobiliario: { route: '/imobiliario', title: 'Imóveis e Inventário Extrajudicial' },
  saude: { route: '/saude', title: 'Planos de Saúde' },
  compras: { route: '/consumidor', title: 'Direito do Consumidor e Patrimonial' },
  bancos: { route: '/consumidor', title: 'Direito do Consumidor e Patrimonial' },
  voos: { route: '/consumidor', title: 'Direito do Consumidor e Patrimonial' },
}

export async function generateStaticParams() {
  return blogArticles.map((article) => ({ slug: article.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = getArticleBySlug(slug)

  if (!article) {
    return {
      title: `Artigo | ${siteConfig.brand.shortName}`,
      description: siteConfig.seo.description,
    }
  }

  return {
    title: article.title,
    description: article.excerpt,
    alternates: {
      canonical: `${siteConfig.contact.siteUrl}/blog/${article.slug}`,
    },
    openGraph: {
      title: `${article.title} | ${siteConfig.brand.shortName} (${siteConfig.brand.oab})`,
      description: article.excerpt,
      url: `${siteConfig.contact.siteUrl}/blog/${article.slug}`,
      type: 'article',
    },
  }
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params
  const article = getArticleBySlug(slug)

  if (!article) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-background px-4 py-24">
        <Card className="max-w-xl w-full text-center p-10 bg-card border-border">
          <h1 className="font-serif text-3xl font-bold mb-4 text-foreground">Artigo não encontrado</h1>
          <p className="text-base text-muted-foreground mb-6">
            O conteúdo informativo que você procura pode ter sido atualizado. Confira nossa biblioteca de artigos ou acesse as 6 áreas de atuação.
          </p>
          <Link
            href="/blog"
            className="inline-block rounded-xl bg-primary px-6 py-3.5 text-base text-primary-foreground font-semibold hover:bg-primary/90 transition"
          >
            Ver todos os artigos
          </Link>
        </Card>
      </main>
    )
  }

  const relatedAxis = categoryToRoute[article.category] ?? {
    route: article.axisRoute ?? '/trabalhista',
    title: article.categoryName,
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 md:py-24">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <nav className="text-base text-muted-foreground">
            <Link href="/" className="hover:text-primary hover:underline">
              Início
            </Link>
            <span className="mx-2">/</span>
            <Link href="/blog" className="hover:text-primary hover:underline">
              Artigos
            </Link>
            <span className="mx-2">/</span>
            <span className="font-semibold text-foreground">{article.categoryName}</span>
          </nav>

          <div className="inline-flex items-center gap-2 rounded-full border border-primary/35 bg-primary/10 px-3.5 py-1.5 text-sm font-semibold text-primary">
            <BrandEmblem size="sm" className="h-5 w-5" />
            <span>{siteConfig.brand.oab}</span>
          </div>
        </div>

        <article className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          {/* Capa Editorial Temática */}
          <EditorialArticleCover
            category={article.category}
            categoryName={article.categoryName}
            variant="hero"
          />

          <div className="p-7 sm:p-10">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1 text-sm font-semibold text-primary">
                {article.categoryName} • Provimento 205/2021 OAB
              </span>
            </div>

            <h1 className="mt-5 font-serif text-3xl font-bold leading-tight text-foreground sm:text-4xl">
              {article.title}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              {article.subtitle}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3 border-b border-border pb-6 text-base text-muted-foreground">
              <span className="font-semibold text-foreground">{article.author}</span>
              <span>•</span>
              <span>{new Date(article.date).toLocaleDateString('pt-BR')}</span>
              <span>•</span>
              <span>{article.readTime} min de leitura</span>
            </div>

            <div
              className="prose prose-lg prose-neutral dark:prose-invert mt-8 max-w-none text-base leading-relaxed text-foreground space-y-5"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Assinatura da Autora ao Final da Leitura (Único local com miniatura da foto no artigo) */}
            <div className="mt-12 flex flex-col justify-between gap-6 rounded-2xl border border-primary/35 bg-secondary/45 p-7 sm:flex-row sm:items-center">
              <div className="flex items-center gap-4">
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-primary/50">
                  <SafePortraitImage
                    src="/images/foto-perfil.jpg"
                    alt="Dra. Bruna Dourado (OAB/BA 71507)"
                    fill
                    sizes="64px"
                    className="object-cover object-top"
                  />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-primary">
                    Autoria e Coordenação Técnica
                  </p>
                  <p className="mt-0.5 font-serif text-xl font-bold text-foreground">
                    Dra. Bruna Dourado da Silva ({siteConfig.brand.oab})
                  </p>
                  <p className="mt-1 text-base text-muted-foreground">
                    {article.cta}
                  </p>
                </div>
              </div>

              <Link
                href={relatedAxis.route}
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 text-base font-bold text-primary-foreground transition hover:bg-primary/90"
              >
                <span>Explorar Área: {relatedAxis.title}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </article>

        <div className="mt-12">
          <CaseTriageForm
            areaId={article.category}
            areaTitle={relatedAxis.title}
            originPath={`/blog/${article.slug}`}
          />
        </div>
      </div>

      <ContactFooterSection />
    </main>
  )
}
