import type { Metadata } from 'next'
import Link from 'next/link'
import { getArticleBySlug, blogArticles } from '@/lib/blog-data'
import { Card } from '@/components/ui/card'
import { siteConfig } from '@/lib/site-config'
import { SafePortraitImage } from '@/components/safe-portrait-image'
import { CaseTriageForm } from '@/components/case-triage-form'
import { ContactFooterSection } from '@/components/contact-footer-section'
import { BrandEmblem } from '@/components/brand-emblem'

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
      <main className="min-h-screen flex flex-col items-center justify-center bg-background px-4 py-20">
        <Card className="max-w-xl w-full text-center p-10 bg-card border-border">
          <h1 className="font-serif text-3xl font-bold mb-4 text-foreground">Artigo não encontrado</h1>
          <p className="text-muted-foreground mb-6">
            O conteúdo informativo que você procura pode ter sido atualizado. Confira nossa biblioteca de artigos ou acesse os 6 eixos de atuação.
          </p>
          <Link
            href="/blog"
            className="inline-block rounded-lg bg-primary px-6 py-3 text-primary-foreground font-semibold hover:bg-primary/90 transition"
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

  const defaultProfile: 'PF' | 'PJ' =
    article.targetProfile === 'PJ' ? 'PJ' : 'PF'

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <nav className="text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary hover:underline">
              Início
            </Link>
            <span className="mx-2">/</span>
            <Link href="/blog" className="hover:text-primary hover:underline">
              Artigos
            </Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{article.categoryName}</span>
          </nav>

          <div className="inline-flex items-center gap-2 rounded-full border border-primary/35 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            <BrandEmblem size="sm" className="h-5 w-5" />
            <span>{siteConfig.brand.oab}</span>
          </div>
        </div>

        <article className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-block rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
              {article.categoryName} • Conteúdo Educativo (Provimento 205/2021 OAB)
            </span>
            {article.targetProfile && (
              <span className="inline-block rounded-full border border-border bg-secondary px-3 py-1 text-xs font-bold uppercase tracking-wider text-foreground">
                Público: {article.targetProfile}
              </span>
            )}
          </div>

          <h1 className="mt-4 font-serif text-3xl font-bold text-foreground sm:text-4xl">
            {article.title}
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">{article.subtitle}</p>

          <div className="mt-5 flex flex-wrap items-center gap-3 border-b border-border pb-6 text-xs text-muted-foreground">
            <span className="font-semibold text-foreground">{article.author}</span>
            <span>•</span>
            <span>{new Date(article.date).toLocaleDateString('pt-BR')}</span>
            <span>•</span>
            <span>{article.readTime} min de leitura</span>
          </div>

          <div className="relative my-8 h-64 w-full overflow-hidden rounded-xl border border-border bg-muted sm:h-80">
            <SafePortraitImage
              src={article.image || '/images/foto-perfil2.jpg'}
              alt={article.title}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
            />
          </div>

          <div
            className="prose prose-neutral dark:prose-invert max-w-none text-foreground leading-relaxed space-y-4"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          <div className="mt-10 rounded-xl border border-primary/30 bg-secondary/45 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Eixo Relacionado
            </p>
            <h2 className="mt-1 font-serif text-xl font-bold text-foreground">
              {relatedAxis.title}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">{article.cta}</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href={relatedAxis.route}
                className="inline-flex items-center rounded-lg bg-primary px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-primary-foreground transition hover:bg-primary/90"
              >
                Conhecer Eixo: {relatedAxis.title}
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center rounded-lg border border-border bg-background px-5 py-2.5 text-xs font-semibold text-foreground transition hover:bg-secondary"
              >
                Voltar para Artigos
              </Link>
            </div>
          </div>
        </article>

        <div className="mt-10">
          <CaseTriageForm
            areaId={article.category}
            areaTitle={relatedAxis.title}
            originPath={`/blog/${article.slug}`}
            defaultProfile={defaultProfile}
          />
        </div>
      </div>

      <ContactFooterSection />
    </main>
  )
}
