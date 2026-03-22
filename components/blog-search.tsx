'use client'

import { useState, useMemo } from 'react'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { blogArticles, BLOG_CATEGORIES } from '@/lib/blog-data'

interface BlogSearchProps {
  onResults: (results: typeof blogArticles) => void
}

export function BlogSearch({ onResults }: BlogSearchProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const results = useMemo(() => {
    return blogArticles.filter(article => {
      const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      
      const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategory])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    onResults(results)
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    onResults(results)
  }

  return (
    <div className="space-y-4">
      {/* Search Input - Responsive */}
      <div className="relative">
        <Search className="absolute left-3 top-3 w-5 h-5" style={{ color: '#C99300' }} />
        <Input
          placeholder="Buscar artigos... (negativa, plano, voo, banco, compra)"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-10 py-2 md:py-3 text-sm md:text-base"
        />
      </div>

      {/* Category Filter - Responsive Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
        <button
          onClick={() => handleCategoryChange('all')}
          className="px-3 py-2 rounded-lg text-sm font-medium transition-all"
          style={{
            backgroundColor: selectedCategory === 'all' ? '#044B39' : '#ECE5DC',
            color: selectedCategory === 'all' ? 'white' : '#2D2823'
          }}
        >
          Todos
        </button>
        {Object.entries(BLOG_CATEGORIES).map(([key, category]) => (
          <button
            key={key}
            onClick={() => handleCategoryChange(key)}
            className="px-3 py-2 rounded-lg text-sm font-medium transition-all truncate"
            style={{
              backgroundColor: selectedCategory === key ? '#C99300' : '#ECE5DC',
              color: selectedCategory === key ? 'white' : '#2D2823'
            }}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Results Count - Responsive */}
      <p className="text-sm" style={{ color: '#666' }}>
        {results.length} artigo{results.length !== 1 ? 's' : ''} encontrado{results.length !== 1 ? 's' : ''}
      </p>
    </div>
  )
}
