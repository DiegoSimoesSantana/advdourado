import { getArticleBySlug } from '@/lib/blog-data'
import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const article = getArticleBySlug(params.slug)

  if (!article) {
    return {
      title: 'Artigo não encontrado',
    }
  }

  return {
    title: `${article.title} | Bruna Dourado`,
    description: article.excerpt,
    keywords: article.seoKeywords,
    authors: [{ name: 'Dra. Bruna Dourado' }],
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      publishedTime: article.date,
      authors: ['Dra. Bruna Dourado'],
      tags: article.tags,
      images: [
        {
          url: article.image || '/placeholder.svg',
          width: 1200,
          height: 630,
          alt: article.title,
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: [article.image || '/placeholder.svg'],
    }
  }
}

export default function ArticleLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
