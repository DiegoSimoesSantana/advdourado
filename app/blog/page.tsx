'use client'

import { useState, useMemo, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { blogArticles, BLOG_CATEGORIES } from '@/lib/blog-data'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, ArrowRight } from 'lucide-react'


function BlogPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const categoryFromUrl = searchParams.get('category')
  const tagFromUrl = searchParams.get('tag')
  const queryFromUrl = searchParams.get('q')

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const validCategory =
      categoryFromUrl && Object.prototype.hasOwnProperty.call(BLOG_CATEGORIES, categoryFromUrl)
        ? categoryFromUrl
        : null

    setSelectedCategory(validCategory)

    if (queryFromUrl && queryFromUrl.trim()) {
      setSearchQuery(queryFromUrl)
      return
    }

    if (tagFromUrl && tagFromUrl.trim()) {
      setSearchQuery(tagFromUrl)
      return
    }

    setSearchQuery('')
  }, [categoryFromUrl, queryFromUrl, tagFromUrl])

  const updateUrlParams = (nextCategory: string | null, nextQuery: string) => {
    const params = new URLSearchParams(searchParams.toString())

    if (nextCategory) {
      params.set('category', nextCategory)
    } else {
      params.delete('category')
    }

    if (nextQuery.trim()) {
      params.set('q', nextQuery.trim())
      params.delete('tag')
    } else {
      params.delete('q')
    }

    const qs = params.toString()
    router.replace(qs ? `/blog?${qs}` : '/blog', { scroll: false })
  }

  const filteredArticles = useMemo(() => {
    let results = blogArticles

    // Filter by category
    if (selectedCategory) {
      results = results.filter(article => article.category === selectedCategory)
    }

    // `tag` query can come from article pages and should behave as a quick search filter.
    if (tagFromUrl && tagFromUrl.trim() && !searchQuery.trim() && !queryFromUrl?.trim()) {
      const normalizedTag = tagFromUrl.toLowerCase().trim()
      results = results.filter(article => article.tags.some(tag => tag.toLowerCase() === normalizedTag))
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      results = results.filter(article =>
        article.title.toLowerCase().includes(query) ||
        article.excerpt.toLowerCase().includes(query) ||
        article.tags.some(tag => tag.toLowerCase().includes(query)) ||
        article.seoKeywords.some(keyword => keyword.toLowerCase().includes(query))
      )
    }

    return results
  }, [selectedCategory, searchQuery, tagFromUrl, queryFromUrl])

  // Track category clicks for analytics
  const trackCategoryClick = (category: string | null) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'blog_category_filter', {
        category: category === null ? 'all' : category,
        article_count: category === null ? blogArticles.length : blogArticles.filter(a => a.category === category).length,
      })
    }

    const nextCategory = category === selectedCategory ? null : category
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
