"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { getArticleBySlug, getRelatedArticles } from "@/lib/blog-data";
import { Button } from "@/components/ui/button";
import { Breadcrumb } from "@/components/breadcrumb";
import { useEffect } from "react";
import { trackArticleView } from "@/lib/analytics";
import { siteConfig } from "@/lib/site-config";

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = getArticleBySlug(params.slug);
  const relatedArticles = getRelatedArticles(params.slug);

  useEffect(() => {
    if (article) {
      trackArticleView(article.slug, article.title, article.category, article.readTime);
    }
  }, [article]);

  if (!article) {
    notFound();
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": article.title,
    "description": article.excerpt,
    "image": article.image,
    "author": {
      "@type": "Person",
      "name": article.author,
    },
    "datePublished": article.date,
    "publisher": {
      "@type": "Organization",
      "name": siteConfig.brand.legalName,
      "logo": {
        "@type": "ImageObject",
        "url": `${siteConfig.contact.siteUrl}/images/logo.png`,
      },
    },
    "mainEntityOfPage": `${siteConfig.contact.siteUrl}/blog/${article.slug}`,
  };

  return (
    <main className="min-h-screen bg-background px-4 py-14 sm:px-6 md:px-8">
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <div className="mx-auto max-w-4xl animate-fadein">
        <nav className="mb-6 text-sm text-primary/80 animate-fadein delay-100">
          <Link href="/blog" className="hover:underline">Blog</Link>
          <span className="mx-2">/</span>
          <span className="font-semibold">{article.title}</span>
        </nav>
        <section className="py-8 sm:py-12 md:py-16 px-0 animate-fadein delay-200">
          <div className="mb-4">
            <Link href={`/blog?category=${article.category}`}>
              <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full transition-all bg-[#FFF8E7] text-[#C99300]">
                {article.categoryName}
              </span>
            </Link>
          </div>
          <h1 className="text-4xl font-serif text-foreground md:text-5xl mb-3 sm:mb-4 leading-tight animate-slideup">{article.title}</h1>
          <p className="text-lg mb-6 sm:mb-8 text-foreground/80 animate-fadein delay-100">{article.subtitle}</p>
          <div className="flex flex-wrap gap-4 sm:gap-6 text-xs sm:text-sm border-t pt-4 sm:pt-6 text-foreground/60 border-primary/20">
            <div>
              <span className="font-semibold text-foreground">Por</span> {article.author}
            </div>
            <div>
              <time dateTime={article.date}>
                {new Date(article.date).toLocaleDateString("pt-BR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>
            <div>
              <span>{article.readTime} min de leitura</span>
            </div>
          </div>
        </section>
        <section className="py-6 sm:py-8 animate-fadein delay-300">
          <div className="rounded-lg overflow-hidden shadow-lg h-64 sm:h-80 md:h-96 bg-gray-200">
            <img
              src={article.image || "/placeholder.svg"}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        </section>
        <section className="py-8 sm:py-12 md:py-16 animate-fadein delay-400">
          <article className="prose max-w-none">
            {article.content}
          </article>
        </section>
        {relatedArticles.length > 0 && (
          <section className="mt-10 animate-fadein delay-500">
            <h2 className="text-2xl font-serif text-foreground mb-3">Veja também</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {relatedArticles.map((rel) => (
                <Link key={rel.slug} href={`/blog/${rel.slug}`} className="block p-4 rounded-xl border border-border bg-white shadow-sm hover:shadow-lg transition-all">
                  <h3 className="text-lg font-semibold text-primary mb-1">{rel.title}</h3>
                  <p className="text-sm text-foreground/70">{rel.excerpt}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
        <section className="mt-12 flex flex-col items-center gap-4 animate-fadein delay-600">
          <span className="text-base text-foreground/80">Precisa de orientação jurídica personalizada?</span>
          <Link href="/contato">
            <Button size="lg" className="bg-primary text-white font-bold shadow-lg hover:bg-primary/90 transition-all duration-200">
              Fale com o escritório
            </Button>
          </Link>
        </section>
        <footer className="mt-20 border-t border-gray-200 pt-8 pb-12">
          <div className="text-center text-sm text-gray-500 space-y-2">
            <p>© {new Date().getFullYear()} Bruna Dourado Advocacia &amp; Consultoria. Todos os direitos reservados.</p>
            <p>OAB/BA 71507</p>
            <p className="text-xs mt-4">
              As informações deste site têm finalidade exclusivamente institucional e informativa, não substituindo consulta jurídica formal e individualizada.<br />
              Este site está em conformidade com o Provimento nº 205/2021 do Conselho Federal da OAB e com a LGPD.
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}
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
