'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Search, ChevronLeft, ChevronRight, Home, BookOpen, Clock, Eye, TrendingUp, Filter, Grid, List } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

interface HelpArticle {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  category: string
  author_id: string | null
  is_popular: boolean  // Changed from is_featured
  is_new: boolean  // Added
  published: boolean
  view_count: number
  helpful_count: number
  not_helpful_count: number  // Added
  tags: string[] | null
  meta_description: string | null
  created_at: string
  updated_at: string
}

interface CategoryClientProps {
  category: string
  categoryTitle: string
  categoryDescription: string
  articles: HelpArticle[]
}

export default function HelpCategoryClient({ 
  category, 
  categoryTitle, 
  categoryDescription, 
  articles 
}: CategoryClientProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState<'popular' | 'newest' | 'alphabetical'>('popular')

  // Filter and sort articles
  const filteredArticles = useMemo(() => {
    let filtered = articles

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(query) ||
        article.excerpt.toLowerCase().includes(query) ||
        (article.tags && article.tags.some(tag => tag.toLowerCase().includes(query)))
      )
    }

    // Sort
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        case 'alphabetical':
          return a.title.localeCompare(b.title)
        case 'popular':
        default:
          return b.view_count - a.view_count
      }
    })

    return filtered
  }, [articles, searchQuery, sortBy])

  // Get category color based on category name
  const getCategoryColor = () => {
    const colors: Record<string, string> = {
      getting_started: 'from-blue-500 to-blue-600',
      best_practices: 'from-pink-500 to-pink-600',
      billing: 'from-green-500 to-green-600',
      technical: 'from-purple-500 to-purple-600',
      speakers: 'from-calm to-deep',
      organizations: 'from-sand to-calm'
    }
    return colors[category] || 'from-deep to-calm'
  }

  // Calculate stats
  const totalArticles = articles.length
  const totalViews = articles.reduce((sum, article) => sum + article.view_count, 0)
  const featuredCount = articles.filter(a => a.is_popular).length  // Changed to is_popular

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <div className={cn("bg-gradient-to-br text-white", getCategoryColor())}>
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-5xl mx-auto">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm mb-6 opacity-90">
              <Link href="/" className="hover:text-white/80 transition-colors">
                <Home className="w-4 h-4" />
              </Link>
              <ChevronRight className="w-4 h-4" />
              <Link href="/help" className="hover:text-white/80 transition-colors">
                Help Center
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span>{categoryTitle}</span>
            </nav>

            {/* Category Header */}
            <h1 className="text-4xl md:text-5xl font-black mb-4">{categoryTitle}</h1>
            <p className="text-xl opacity-95 mb-8">{categoryDescription}</p>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 text-sm opacity-90">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                <span>{totalArticles} article{totalArticles !== 1 ? 's' : ''}</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                <span>{totalViews.toLocaleString()} total views</span>
              </div>
              {featuredCount > 0 && (
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  <span>{featuredCount} popular</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters Bar */}
        <div className="bg-white rounded-xl shadow-soft p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder={`Search ${categoryTitle.toLowerCase()} articles...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="px-4 py-2 border rounded-lg bg-white text-gray-700"
            >
              <option value="popular">Most Popular</option>
              <option value="newest">Newest First</option>
              <option value="alphabetical">A to Z</option>
            </select>

            {/* View Mode Toggle */}
            <div className="flex gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="px-3"
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="px-3"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        {searchQuery && (
          <div className="mb-4 text-gray-600">
            Found {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''}
            {searchQuery && ` matching "${searchQuery}"`}
          </div>
        )}

        {/* Articles Display */}
        {filteredArticles.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-soft">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Articles Found</h3>
            <p className="text-gray-500">
              {searchQuery 
                ? `Try adjusting your search terms or browse all ${categoryTitle.toLowerCase()} articles.`
                : `No articles in this category yet.`}
            </p>
            {searchQuery && (
              <Button
                onClick={() => setSearchQuery('')}
                className="mt-4"
                variant="outline"
              >
                Clear Search
              </Button>
            )}
          </div>
        ) : (
          <div className={cn(
            viewMode === 'grid' 
              ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-4"
          )}>
            {filteredArticles.map((article) => (
              <Link
                key={article.id}
                href={`/help/${article.slug}`}
                className={cn(
                  "bg-white rounded-xl shadow-soft hover:shadow-medium transition-all duration-300 block",
                  viewMode === 'grid' ? "p-6" : "p-6"
                )}
              >
                {article.is_popular && (  // Changed to is_popular
                  <div className="inline-flex items-center gap-1 px-2 py-1 bg-sand/10 text-sand rounded-full text-xs font-medium mb-3">
                    <TrendingUp className="w-3 h-3" />
                    Popular
                  </div>
                )}
                
                <h3 className="font-bold text-lg text-deep mb-2 line-clamp-2">
                  {article.title}
                </h3>
                
                <p className={cn(
                  "text-gray-600 mb-4",
                  viewMode === 'grid' ? "line-clamp-3" : "line-clamp-2"
                )}>
                  {article.excerpt}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {article.view_count}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {new Date(article.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-calm" />
                </div>

                {article.tags && article.tags.length > 0 && viewMode === 'list' && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {article.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-foam text-xs font-medium text-gray-600 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </Link>
            ))}
          </div>
        )}

        {/* Back to Help Center */}
        <div className="mt-12 text-center">
          <Link 
            href="/help"
            className="inline-flex items-center gap-2 text-calm hover:text-deep transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Help Center
          </Link>
        </div>
      </div>
    </main>
  )
}
