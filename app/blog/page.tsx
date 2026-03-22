"use client"

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { blogArticles, BLOG_CATEGORIES } from "@/lib/blog-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export const metadata = {
  title: `Blog | ${siteConfig.brand.name}`,
  description: "Conteúdo jurídico de alta qualidade, artigos, novidades e orientações do escritório Bruna Dourado Advocacia & Consultoria.",
  openGraph: {
    title: `Blog | ${siteConfig.brand.name}`,
    description: "Conteúdo jurídico de alta qualidade, artigos, novidades e orientações do escritório Bruna Dourado Advocacia & Consultoria.",
    url: `${siteConfig.contact.siteUrl}/blog`,
    type: "blog",
  },
};

const blogSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "name": `${siteConfig.brand.legalName} Blog`,
  "url": `${siteConfig.contact.siteUrl}/blog`,
  "description": "Conteúdo jurídico, artigos e novidades do escritório Bruna Dourado Advocacia & Consultoria.",
  "publisher": {
    "@type": "Organization",
    "name": siteConfig.brand.legalName,
    "url": siteConfig.contact.siteUrl,
  },
};

export default function BlogPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryFromUrl = searchParams.get("category");
  const tagFromUrl = searchParams.get("tag");
  const queryFromUrl = searchParams.get("q");

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const validCategory =
      categoryFromUrl && Object.prototype.hasOwnProperty.call(BLOG_CATEGORIES, categoryFromUrl)
        ? categoryFromUrl
        : null;
    setSelectedCategory(validCategory);
    if (queryFromUrl && queryFromUrl.trim()) {
      setSearchQuery(queryFromUrl);
      return;
    }
    if (tagFromUrl && tagFromUrl.trim()) {
      setSearchQuery(tagFromUrl);
      return;
    }
    setSearchQuery("");
  }, [categoryFromUrl, queryFromUrl, tagFromUrl]);

  const updateUrlParams = (nextCategory: string | null, nextQuery: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (nextCategory) {
      params.set("category", nextCategory);
    } else {
      params.delete("category");
    }
    if (nextQuery.trim()) {
      params.set("q", nextQuery.trim());
      params.delete("tag");
    } else {
      params.delete("q");
    }
    const qs = params.toString();
    router.replace(qs ? `/blog?${qs}` : "/blog", { scroll: false });
  };

  const filteredArticles = useMemo(() => {
    let results = blogArticles;
    if (selectedCategory) {
      results = results.filter((article) => article.category === selectedCategory);
    }
    if (tagFromUrl && tagFromUrl.trim() && !searchQuery.trim() && !queryFromUrl?.trim()) {
      const normalizedTag = tagFromUrl.toLowerCase().trim();
      results = results.filter((article) => article.tags.some((tag) => tag.toLowerCase() === normalizedTag));
    }
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        (article) =>
          article.title.toLowerCase().includes(query) ||
          article.excerpt.toLowerCase().includes(query) ||
          article.tags.some((tag) => tag.toLowerCase().includes(query)) ||
          article.seoKeywords.some((keyword) => keyword.toLowerCase().includes(query))
      );
    }
    return results;
  }, [selectedCategory, searchQuery, tagFromUrl, queryFromUrl]);

  return (
    <main className="min-h-screen bg-background px-4 py-14 sm:px-6 md:px-8">
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }} />
      <div className="mx-auto max-w-4xl animate-fadein">
        <nav className="mb-6 text-sm text-primary/80 animate-fadein delay-100">
          <Link href="/" className="hover:underline">Início</Link>
          <span className="mx-2">/</span>
          <span className="font-semibold">Blog</span>
        </nav>
        <h1 className="text-4xl font-serif text-foreground md:text-5xl animate-slideup">Blog Jurídico</h1>
        <p className="mt-4 text-lg leading-8 text-foreground/75 animate-fadein delay-100">
          Artigos, novidades e orientações do escritório Bruna Dourado Advocacia &amp; Consultoria.
        </p>

        {/* Filtros e busca */}
        <section className="mt-10 animate-fadein delay-200">
          <div className="flex flex-col sm:flex-row gap-4 items-center mb-6">
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={selectedCategory === null ? "default" : "outline"}
                onClick={() => updateUrlParams(null, searchQuery)}
                className="text-sm"
              >
                Todos
              </Button>
              {Object.entries(BLOG_CATEGORIES).map(([key, label]) => (
                <Button
                  key={key}
                  variant={selectedCategory === key ? "default" : "outline"}
                  onClick={() => updateUrlParams(key, searchQuery)}
                  className="text-sm"
                >
                  {label}
                </Button>
              ))}
            </div>
            <form
              className="flex-1 flex gap-2 w-full sm:w-auto"
              onSubmit={e => {
                e.preventDefault();
                updateUrlParams(selectedCategory, searchQuery);
              }}
            >
              <Input
                type="text"
                placeholder="Buscar artigo..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full sm:w-64"
              />
              <Button type="submit" variant="outline" className="px-3">
                <Search className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </section>

        {/* Lista de artigos */}
        <section className="mt-8 animate-fadein delay-300">
          {filteredArticles.length === 0 ? (
            <div className="text-center text-foreground/60 py-12">Nenhum artigo encontrado.</div>
          ) : (
            <ul className="space-y-6">
              {filteredArticles.map(article => (
                <li key={article.slug} className="rounded-xl border border-border bg-white p-6 shadow-sm hover:shadow-lg transition-all">
                  <Link href={`/blog/${article.slug}`} className="block">
                    <h2 className="text-2xl font-serif text-primary mb-2">{article.title}</h2>
                    <p className="text-base text-foreground/80 mb-2">{article.excerpt}</p>
                    <div className="flex flex-wrap gap-2 text-xs text-foreground/60">
                      <span>{article.categoryName}</span>
                      <span>•</span>
                      <span>{article.readTime} min</span>
                      <span>•</span>
                      <span>{new Date(article.date).toLocaleDateString('pt-BR')}</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* CTA */}
        <section className="mt-16 flex flex-col items-center gap-4 animate-fadein delay-400">
          <span className="text-base text-foreground/80">Quer receber novidades e artigos exclusivos?</span>
          <Link href="/contato">
            <Button size="lg" className="bg-primary text-white font-bold shadow-lg hover:bg-primary/90 transition-all duration-200">
              Fale com o escritório
            </Button>
          </Link>
        </section>

        {/* Footer / Compliance OAB */}
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
    setSelectedCategory(nextCategory)
    updateUrlParams(nextCategory, searchQuery)
  }

  // Track search for analytics
  const trackSearch = (query: string) => {
    setSearchQuery(query)
    updateUrlParams(selectedCategory, query)

    if (typeof window !== 'undefined' && window.gtag && query.trim()) {
      window.gtag('event', 'blog_search', {
        search_term: query,
        results_count: filteredArticles.length,
      })
    }
  }

  return (
    <main className="min-h-screen bg-background">
      {/* ...existing code... */}
    </main>
  )
}

export default function BlogPage() {
  return (
    <Suspense>
      <BlogPageContent />
    </Suspense>
  )
}
