import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { createWhatsAppLink, getAreaById, siteConfig } from '@/lib/site-config'
import { getArticleBySlug } from '@/lib/blog-data'

type Props = {
  params: Promise<{ area: string }>
}

export async function generateStaticParams() {
  return siteConfig.areas.map((area) => ({ area: area.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { area } = await params
  const areaData = getAreaById(area)

  if (!areaData) {
    return {
      title: siteConfig.seo.title,
      description: siteConfig.seo.description,
    }
  }

  return {
    title: areaData.seoTitle,
    description: areaData.seoDescription,
    openGraph: {
      title: areaData.seoTitle,
      description: areaData.seoDescription,
      url: `${siteConfig.contact.siteUrl}/areas/${areaData.id}`,
      type: 'article',
    },
  }
}

export default async function AreaPage({ params }: Props) {
  const { area } = await params
  const areaData = getAreaById(area)

  if (!areaData) {
    notFound()
  }

  const whatsappLink = createWhatsAppLink(
    `Olá, vim pela página de ${areaData.title} e gostaria de orientação sobre meu caso.`,
  )

  const relatedArticles = areaData.relatedArticleSlugs
    .map((slug) => getArticleBySlug(slug))
    .filter((article) => !!article)
    .slice(0, 3)

  // JSON-LD schemas
  const legalServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: siteConfig.brand.legalName,
    description: areaData.summary,
    serviceType: areaData.title,
    areaServed: 'Salvador/BA',
    url: `${siteConfig.contact.siteUrl}/areas/${areaData.id}`,
    telephone: siteConfig.contact.phoneDisplay,
    email: siteConfig.contact.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.contact.address,
      addressLocality: 'Salvador',
      addressRegion: 'BA',
      addressCountry: 'BR',
    },
  }
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: areaData.faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Início',
        item: `${siteConfig.contact.siteUrl}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Áreas de atuação',
        item: `${siteConfig.contact.siteUrl}/areas`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: areaData.title,
        item: `${siteConfig.contact.siteUrl}/areas/${areaData.id}`,
      },
    ],
  }

  return (
    <main className="min-h-screen bg-background px-4 py-14 sm:px-6 md:px-8">
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(legalServiceSchema) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className="mx-auto max-w-4xl animate-fadein">
        <nav className="mb-6 text-sm text-primary/80 animate-fadein delay-100">
          <Link href="/areas" className="hover:underline">Áreas de atuação</Link>
          <span className="mx-2">/</span>
          <span className="font-semibold">{areaData.title}</span>
        </nav>
        <h1 className="text-4xl font-serif text-foreground md:text-5xl animate-slideup">{areaData.title}</h1>
        <p className="mt-4 text-lg leading-8 text-foreground/75 animate-fadein delay-100">{areaData.summary}</p>

        <section className="mt-10 animate-fadein delay-200">
          <h2 className="text-2xl font-serif text-foreground mb-3">Como podemos ajudar?</h2>
          <ul className="list-disc pl-6 space-y-2 text-foreground/80">
            {areaData.benefits?.map((benefit) => (
              <li key={benefit}>{benefit}</li>
            ))}
          </ul>
        </section>

        <section className="mt-10 animate-fadein delay-300">
          <h2 className="text-2xl font-serif text-foreground mb-3">Perguntas frequentes</h2>
          <ul className="divide-y divide-border">
            {areaData.faq.map((item, idx) => (
              <li key={item.question} className="py-4">
                <details className="group">
                  <summary className="cursor-pointer text-lg font-semibold text-primary group-open:text-foreground transition-colors">
                    {item.question}
                  </summary>
                  <div className="mt-2 text-foreground/80 text-base animate-fadein delay-100">
                    {item.answer}
                  </div>
                </details>
              </li>
            ))}
          </ul>
        </section>

        {relatedArticles.length > 0 && (
          <section className="mt-10 animate-fadein delay-400">
            <h2 className="text-2xl font-serif text-foreground mb-3">Conteúdo recomendado</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {relatedArticles.map((article) => (
                <Link key={article.slug} href={`/blog/${article.slug}`} className="block p-4 rounded-xl border border-border bg-white shadow-sm hover:shadow-lg transition-all">
                  <h3 className="text-lg font-semibold text-primary mb-1">{article.title}</h3>
                  <p className="text-sm text-foreground/70">{article.excerpt}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="mt-12 flex flex-col items-center gap-4 animate-fadein delay-500">
          <span className="text-base text-foreground/80">Precisa de orientação personalizada?</span>
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="bg-primary text-white font-bold shadow-lg hover:bg-primary/90 transition-all duration-200">
              Falar com especialista
            </Button>
          </a>
        </section>

        <footer className="mt-20 text-xs text-center text-foreground/50 animate-fadein delay-600">
          {siteConfig.brand.legalName} | OAB {siteConfig.brand.oab} | {siteConfig.contact.address}
        </footer>
      </div>
    </main>
  )
}
        name: areaData.title,
        item: `${siteConfig.contact.siteUrl}/areas/${areaData.id}`,
      },
    ],
  }

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: siteConfig.brand.legalName,
    url: siteConfig.contact.siteUrl,
    telephone: siteConfig.contact.phoneDisplay,
    email: siteConfig.contact.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.contact.address,
      addressLocality: 'Salvador',
      addressRegion: 'BA',
      addressCountry: 'BR',
    },
  }

  return (
    <main className="min-h-screen bg-background px-4 py-14 sm:px-6 md:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(legalServiceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      <div className="mx-auto max-w-5xl">
        <nav className="text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary hover:underline">
            Início
          </Link>
          <span className="mx-2">/</span>
          <Link href="/areas" className="hover:text-primary hover:underline">
            Áreas
          </Link>
          <span className="mx-2">/</span>
          <span>{areaData.title}</span>
        </nav>

        <header className="mt-6 rounded-3xl border border-border bg-white p-8 shadow-sm md:p-10">
          <p className="text-xs uppercase tracking-[0.22em] text-primary/75">Área de atuação</p>
          <h1 className="mt-3 text-4xl text-foreground md:text-5xl">{areaData.title}</h1>
          <p className="mt-4 text-lg leading-8 text-foreground/75">{areaData.summary}</p>
          <p className="mt-6 rounded-2xl bg-secondary/50 p-4 text-sm leading-7 text-foreground/70">
            {areaData.audience}
          </p>
        </header>

        <section className="mt-8 rounded-3xl border border-border bg-white p-8 shadow-sm md:p-10">
          <h2 className="text-3xl text-foreground">Como a ADVDourado pode atuar</h2>
          <div className="mt-6 space-y-3">
            {areaData.highlights.map((highlight) => (
              <div key={highlight} className="rounded-2xl border border-border/70 bg-secondary/40 px-4 py-3 text-base text-foreground/80">
                {highlight}
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button asChild className="rounded-full bg-primary hover:bg-primary/90">
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                Falar sobre esta área no WhatsApp
              </a>
            </Button>
            <Button asChild variant="outline" className="rounded-full border-primary/20">
              <Link href="/contato">Enviar formulário de contato</Link>
            </Button>
          </div>

          <p className="mt-8 text-xs leading-6 text-muted-foreground">{siteConfig.compliance.informational}</p>
        </section>

        <section className="mt-8 rounded-3xl border border-border bg-white p-8 shadow-sm md:p-10">
          <h2 className="text-3xl text-foreground">Perguntas frequentes sobre {areaData.title}</h2>
          <div className="mt-6 space-y-4">
            {areaData.faq.map((item) => (
              <details key={item.question} className="rounded-2xl border border-border/70 bg-secondary/35 p-4">
                <summary className="cursor-pointer text-base font-semibold text-foreground">{item.question}</summary>
                <p className="mt-3 text-sm leading-7 text-foreground/75">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-3xl border border-border bg-white p-8 shadow-sm md:p-10">
          <h2 className="text-3xl text-foreground">Artigos relacionados</h2>

          {relatedArticles.length > 0 ? (
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {relatedArticles.map((article) => (
                <article key={article.slug} className="rounded-2xl border border-border/70 bg-secondary/25 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-primary/75">{article.categoryName}</p>
                  <h3 className="mt-2 text-lg text-foreground">{article.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-foreground/75 line-clamp-3">{article.excerpt}</p>
                  <Link href={`/blog/${article.slug}`} className="mt-4 inline-block text-sm font-semibold text-primary hover:underline">
                    Ler artigo
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <p className="mt-4 text-sm leading-7 text-foreground/75">
              Em breve, esta área contará com conteúdo editorial específico no blog. Enquanto isso, você pode acessar a
              biblioteca completa de artigos.
            </p>
          )}

          <Button asChild variant="outline" className="mt-6 rounded-full border-primary/20">
            <Link href="/blog">Ver todos os artigos</Link>
          </Button>
        </section>
      </div>
    </main>
  )
}
