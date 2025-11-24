// This component fetches and displays related articles for better internal linking

import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/server'
import { Clock, ArrowRight } from 'lucide-react'

interface RelatedArticlesProps {
  currentArticleId?: string
  currentCategory?: string
  currentTags?: string[]
  limit?: number
  title?: string
}

export default async function RelatedArticles({
  currentArticleId,
  currentCategory,
  currentTags = [],
  limit = 3,
  title = "Related Articles"
}: RelatedArticlesProps) {
  const supabase = await createClient()

  // Build query to find related articles
  let query = supabase
    .from('published_articles')
    .select('id, title, slug, excerpt, featured_image_url, category_name, reading_time_minutes, published_at')
    .limit(limit)

  // Exclude current article if provided
  if (currentArticleId) {
    query = query.neq('id', currentArticleId)
  }

  // Prioritize same category
  if (currentCategory) {
    query = query.eq('category_slug', currentCategory)
  }

  // Order by most recent
  query = query.order('published_at', { ascending: false })

  const { data: articles } = await query

  // If no articles found in same category, get recent articles
  if (!articles || articles.length === 0) {
    const { data: recentArticles } = await supabase
      .from('published_articles')
      .select('id, title, slug, excerpt, featured_image_url, category_name, reading_time_minutes, published_at')
      .neq('id', currentArticleId || '')
      .order('published_at', { ascending: false })
      .limit(limit)

    if (!recentArticles || recentArticles.length === 0) {
      return null
    }

    return <RelatedArticlesDisplay articles={recentArticles} title={title} />
  }

  return <RelatedArticlesDisplay articles={articles} title={title} />
}

function RelatedArticlesDisplay({ articles, title }: { articles: any[], title: string }) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    })
  }

  return (
    <div className="my-12 bg-gray-50 rounded-xl p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        <Link 
          href="/articles"
          className="text-deep hover:text-calm flex items-center gap-2 text-sm font-medium"
        >
          View All Articles
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        {articles.map((article) => (
          <Link
            key={article.id}
            href={`/articles/${article.slug}`}
            className="block bg-white rounded-lg shadow-md hover:shadow-xl transition-all overflow-hidden group"
          >
            {/* Featured Image */}
            <div className="relative h-48 bg-gray-200">
              {article.featured_image_url ? (
                <Image
                  src={article.featured_image_url}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-deep to-calm flex items-center justify-center">
                  <span className="text-white text-4xl font-bold">
                    {article.title.charAt(0)}
                  </span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-5">
              <div className="flex items-center gap-3 text-sm text-gray-500 mb-2">
                <span className="px-2 py-1 bg-foam text-deep rounded-full text-xs font-medium">
                  {article.category_name}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {article.reading_time_minutes} min
                </span>
              </div>

              <h3 className="font-bold text-gray-900 group-hover:text-deep transition-colors line-clamp-2 mb-2">
                {article.title}
              </h3>

              <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                {article.excerpt}
              </p>

              <p className="text-xs text-gray-400">
                {formatDate(article.published_at)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}