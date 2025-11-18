'use client'

import { useState, useEffect } from 'react'
import { Search, Filter, Calendar, Clock, ChevronRight, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

interface Article {
  id: string
  title: string
  slug: string
  excerpt: string
  featured_image_url: string
  featured_image_alt: string
  category_name: string
  category_slug: string
  category_color: string
  author_name: string
  author_slug: string
  author_avatar: string
  published_at: string
  reading_time_minutes: number
  is_featured: boolean
  is_pinned: boolean
  tags: string[]
}

interface Category {
  id: string
  name: string
  slug: string
  color: string
  article_count: number
}

const ARTICLE_LENGTH_FILTERS = [
  { label: 'All Lengths', value: 'all', min: 0, max: 999 },
  { label: 'Quick Read (< 5 min)', value: 'short', min: 0, max: 4 },
  { label: 'Medium (5-10 min)', value: 'medium', min: 5, max: 10 },
  { label: 'In-Depth (10+ min)', value: 'long', min: 11, max: 999 }
]

const DATE_FILTERS = [
  { label: 'All Time', value: 'all', days: 999999 },
  { label: 'Last 7 Days', value: 'week', days: 7 },
  { label: 'Last 30 Days', value: 'month', days: 30 },
  { label: 'Last 3 Months', value: 'quarter', days: 90 },
  { label: 'Last Year', value: 'year', days: 365 }
]

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedLength, setSelectedLength] = useState('all')
  const [selectedDate, setSelectedDate] = useState('all')
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    fetchArticles()
    fetchCategories()
  }, [])

  const fetchArticles = async () => {
    try {
      const response = await fetch('/api/articles')
      const data = await response.json()
      if (response.ok) {
        setArticles(data.articles)
      }
    } catch (error) {
      console.error('Error fetching articles:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/articles/categories')
      const data = await response.json()
      if (response.ok) {
        setCategories(data.categories)
      }
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  // Filter articles based on search and filters
  const filteredArticles = articles.filter(article => {
    // Search filter
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase()
      const matchesSearch = 
        article.title.toLowerCase().includes(searchLower) ||
        article.excerpt?.toLowerCase().includes(searchLower) ||
        article.category_name?.toLowerCase().includes(searchLower) ||
        article.tags?.some(tag => tag.toLowerCase().includes(searchLower))
      
      if (!matchesSearch) return false
    }

    // Category filter
    if (selectedCategory !== 'all' && article.category_slug !== selectedCategory) {
      return false
    }

    // Length filter
    if (selectedLength !== 'all') {
      const lengthFilter = ARTICLE_LENGTH_FILTERS.find(f => f.value === selectedLength)
      if (lengthFilter) {
        if (article.reading_time_minutes < lengthFilter.min || article.reading_time_minutes > lengthFilter.max) {
          return false
        }
      }
    }

    // Date filter
    if (selectedDate !== 'all') {
      const dateFilter = DATE_FILTERS.find(f => f.value === selectedDate)
      if (dateFilter) {
        const publishedDate = new Date(article.published_at)
        const cutoffDate = new Date()
        cutoffDate.setDate(cutoffDate.getDate() - dateFilter.days)
        if (publishedDate < cutoffDate) {
          return false
        }
      }
    }

    return true
  })

  // Separate pinned, featured, and regular articles
  const pinnedArticles = filteredArticles.filter(a => a.is_pinned)
  const featuredArticles = filteredArticles.filter(a => !a.is_pinned && a.is_featured)
  const regularArticles = filteredArticles.filter(a => !a.is_pinned && !a.is_featured)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Articles & Insights
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Expert advice, success stories, and industry insights to help you succeed in the speaking world
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Filter Toggle Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
          >
            <Filter className="h-5 w-5" />
            <span className="font-medium">
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </span>
          </button>

          {/* Filters */}
          {showFilters && (
            <div className="mt-6 grid md:grid-cols-3 gap-4">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="all">All Categories</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.slug}>
                      {category.name} ({category.article_count})
                    </option>
                  ))}
                </select>
              </div>

              {/* Length Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Clock className="inline h-4 w-4 mr-1" />
                  Reading Time
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={selectedLength}
                  onChange={(e) => setSelectedLength(e.target.value)}
                >
                  {ARTICLE_LENGTH_FILTERS.map(filter => (
                    <option key={filter.value} value={filter.value}>
                      {filter.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="inline h-4 w-4 mr-1" />
                  Published
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                >
                  {DATE_FILTERS.map(filter => (
                    <option key={filter.value} value={filter.value}>
                      {filter.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Active Filters Display */}
          {(selectedCategory !== 'all' || selectedLength !== 'all' || selectedDate !== 'all' || searchQuery) && (
            <div className="mt-4 flex flex-wrap gap-2">
              {searchQuery && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                  Search: {searchQuery}
                  <button onClick={() => setSearchQuery('')} className="ml-2">×</button>
                </span>
              )}
              {selectedCategory !== 'all' && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                  Category: {categories.find(c => c.slug === selectedCategory)?.name}
                  <button onClick={() => setSelectedCategory('all')} className="ml-2">×</button>
                </span>
              )}
              {selectedLength !== 'all' && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                  {ARTICLE_LENGTH_FILTERS.find(f => f.value === selectedLength)?.label}
                  <button onClick={() => setSelectedLength('all')} className="ml-2">×</button>
                </span>
              )}
              {selectedDate !== 'all' && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                  {DATE_FILTERS.find(f => f.value === selectedDate)?.label}
                  <button onClick={() => setSelectedDate('all')} className="ml-2">×</button>
                </span>
              )}
              <button
                onClick={() => {
                  setSearchQuery('')
                  setSelectedCategory('all')
                  setSelectedLength('all')
                  setSelectedDate('all')
                }}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''}
          </p>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md animate-pulse">
                <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                <div className="p-6">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredArticles.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <p className="text-gray-600 text-lg mb-4">No articles found matching your criteria.</p>
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory('all')
                setSelectedLength('all')
                setSelectedDate('all')
              }}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <>
            {/* Pinned Articles - Full Width */}
            {pinnedArticles.length > 0 && (
              <div className="mb-12">
                <div className="flex items-center gap-2 mb-6">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  <h2 className="text-2xl font-bold text-gray-900">Pinned Articles</h2>
                </div>
                {pinnedArticles.map(article => (
                  <ArticleCardLarge key={article.id} article={article} formatDate={formatDate} />
                ))}
              </div>
            )}

            {/* Featured Articles - 2 Column Grid */}
            {featuredArticles.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Articles</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  {featuredArticles.map(article => (
                    <ArticleCardMedium key={article.id} article={article} formatDate={formatDate} />
                  ))}
                </div>
              </div>
            )}

            {/* Regular Articles - 3 Column Grid */}
            {regularArticles.length > 0 && (
              <div>
                {(pinnedArticles.length > 0 || featuredArticles.length > 0) && (
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Latest Articles</h2>
                )}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {regularArticles.map(article => (
                    <ArticleCard key={article.id} article={article} formatDate={formatDate} />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

// Large card for pinned articles
function ArticleCardLarge({ article, formatDate }: { article: Article, formatDate: (date: string) => string }) {
  return (
    <Link href={`/articles/${article.slug}`} className="block mb-8">
      <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden">
        <div className="md:flex">
          <div className="md:w-2/5 relative h-64 md:h-auto">
            {article.featured_image_url ? (
              <img
                src={article.featured_image_url}
                alt={article.featured_image_alt || article.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                <TrendingUp className="h-24 w-24 text-blue-300" />
              </div>
            )}
          </div>
          <div className="md:w-3/5 p-8">
            <div className="flex items-center gap-4 mb-4">
              <span
                className="px-3 py-1 rounded-full text-sm font-medium"
                style={{ backgroundColor: `${article.category_color}20`, color: article.category_color }}
              >
                {article.category_name}
              </span>
              <span className="text-sm text-gray-500">{formatDate(article.published_at)}</span>
              <span className="text-sm text-gray-500 flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {article.reading_time_minutes} min read
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
              {article.title}
            </h3>
            <p className="text-gray-600 mb-4 line-clamp-3">{article.excerpt}</p>
            <div className="flex items-center text-blue-600 font-medium">
              Read More
              <ChevronRight className="h-5 w-5 ml-1" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

// Medium card for featured articles
function ArticleCardMedium({ article, formatDate }: { article: Article, formatDate: (date: string) => string }) {
  return (
    <Link href={`/articles/${article.slug}`} className="block h-full">
      <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow h-full flex flex-col">
        <div className="relative h-48">
          {article.featured_image_url ? (
            <img
              src={article.featured_image_url}
              alt={article.featured_image_alt || article.title}
              className="w-full h-full object-cover rounded-t-lg"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center rounded-t-lg">
              <TrendingUp className="h-16 w-16 text-blue-300" />
            </div>
          )}
        </div>
        <div className="p-6 flex flex-col flex-grow">
          <div className="flex items-center gap-3 mb-3 text-sm">
            <span
              className="px-2 py-1 rounded-full text-xs font-medium"
              style={{ backgroundColor: `${article.category_color}20`, color: article.category_color }}
            >
              {article.category_name}
            </span>
            <span className="text-gray-500">{formatDate(article.published_at)}</span>
            <span className="text-gray-500 flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              {article.reading_time_minutes} min
            </span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
            {article.title}
          </h3>
          <p className="text-gray-600 mb-4 line-clamp-2 flex-grow">{article.excerpt}</p>
          <div className="flex items-center text-blue-600 font-medium text-sm">
            Read More
            <ChevronRight className="h-4 w-4 ml-1" />
          </div>
        </div>
      </div>
    </Link>
  )
}

// Regular card for standard articles
function ArticleCard({ article, formatDate }: { article: Article, formatDate: (date: string) => string }) {
  return (
    <Link href={`/articles/${article.slug}`} className="block h-full">
      <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow h-full flex flex-col">
        <div className="relative h-48">
          {article.featured_image_url ? (
            <img
              src={article.featured_image_url}
              alt={article.featured_image_alt || article.title}
              className="w-full h-full object-cover rounded-t-lg"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center rounded-t-lg">
              <TrendingUp className="h-12 w-12 text-gray-300" />
            </div>
          )}
        </div>
        <div className="p-6 flex flex-col flex-grow">
          <div className="flex items-center gap-2 mb-3 text-sm">
            <span
              className="px-2 py-1 rounded-full text-xs font-medium"
              style={{ backgroundColor: `${article.category_color}20`, color: article.category_color }}
            >
              {article.category_name}
            </span>
            <span className="text-gray-500 flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              {article.reading_time_minutes} min
            </span>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors line-clamp-2">
            {article.title}
          </h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">{article.excerpt}</p>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">{formatDate(article.published_at)}</span>
            <span className="text-blue-600 font-medium flex items-center">
              Read
              <ChevronRight className="h-4 w-4 ml-1" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}