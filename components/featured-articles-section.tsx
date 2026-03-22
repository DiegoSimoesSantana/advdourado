import Link from 'next/link'
import { blogArticles } from '@/lib/blog-data'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export function FeaturedArticlesSection() {
  const featured = blogArticles.slice(0, 3)

  return (
    <section className="bg-secondary/55 py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-primary/75">Conteúdo jurídico</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Base informativa para fortalecer a tomada de decisão
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            O acervo do blog continua disponível dentro da nova estrutura para apoiar a compreensão inicial de temas
            jurídicos recorrentes.
          </p>
          <Button
            asChild
            variant="outline"
            className="rounded-full"
          >
            <Link href="/blog">
              Ver Todos os Artigos
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {featured.map((article) => (
            <Link
              key={article.id}
              href={`/blog/${article.slug}`}
              className="group flex flex-col bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-border hover:border-primary/50"
            >
              <div className="h-40 overflow-hidden bg-muted">
                <img
                  src={article.image || "/placeholder.svg"}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="flex flex-col flex-grow p-4">
                <span className="inline-block w-fit px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full mb-3">
                  {article.categoryName}
                </span>
                <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors mb-2 line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-sm text-muted-foreground flex-grow line-clamp-2 mb-4">
                  {article.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border pt-3">
                  <time>{new Date(article.date).toLocaleDateString('pt-BR')}</time>
                  <span>{article.readTime} min</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
