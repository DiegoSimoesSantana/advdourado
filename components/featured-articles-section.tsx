import Link from 'next/link'
import Image from 'next/image'
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
          <p className="mx-auto mb-6 max-w-2xl text-justify text-lg text-slate-700">
            O acervo do blog apoia a compreensão inicial de temas jurídicos e direciona você para a área certa de
            atendimento, com caminho direto para contato quando necessário.
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
              key={article.slug}
              href={`/blog/${article.slug}`}
              className="group relative flex cursor-pointer flex-col overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-shadow hover:border-primary/50 hover:shadow-lg"
            >
              <div className="relative h-40 overflow-hidden bg-muted">
                <Image
                  src={article.image || "/placeholder.svg"}
                  alt={article.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 320px"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>

              <div className="flex flex-col flex-grow p-4">
                <span className="inline-block w-fit px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full mb-3">
                  {article.categoryName}
                </span>
                <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors mb-2 line-clamp-2">
                  {article.title}
                </h3>
                <p className="mb-4 flex-grow line-clamp-2 text-justify text-sm text-slate-600">
                  {article.excerpt}
                </p>
                <div className="flex items-center justify-between border-t border-border pt-3 text-xs text-slate-500">
                  <time>{new Date(article.date).toLocaleDateString('pt-BR')}</time>
                  <span>{article.readTime} min</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-slate-700">
          <Link href="/areas" className="cursor-pointer font-semibold underline decoration-primary/40 underline-offset-4 transition hover:text-primary">
            Ver áreas de atuação
          </Link>
          <Link href="/contato" className="cursor-pointer font-semibold underline decoration-primary/40 underline-offset-4 transition hover:text-primary">
            Falar com especialista no WhatsApp
          </Link>
        </div>
      </div>
    </section>
  )
}
