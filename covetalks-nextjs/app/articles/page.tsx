import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Search, Filter, Calendar, Clock, ChevronRight, TrendingUp } from 'lucide-react'
import ArticlesClientWrapper from './ArticlesClientWrapper'

// Server Component - Fast initial load
export default async function ArticlesPage() {
  // Fetch data on the server - no loading spinner needed!
  const supabase = await createClient()

  const [articlesResult, categoriesResult] = await Promise.all([
    supabase
      .from('published_articles')
      .select('*')
      .order('is_pinned', { ascending: false })
      .order('is_featured', { ascending: false })
      .order('published_at', { ascending: false }),
    supabase
      .from('categories_with_counts')
      .select('*')
      .order('display_order')
  ])

  const articles = articlesResult.data || []
  const categories = categoriesResult.data || []

  // Pass server data to client component for interactivity
  return <ArticlesClientWrapper initialArticles={articles} initialCategories={categories} />
}

// Enable ISR (Incremental Static Regeneration)
// Revalidate every 60 seconds
export const revalidate = 60

// Generate metadata for SEO
export const metadata = {
  title: 'Articles & Insights | CoveTalks',
  description: 'Expert advice, success stories, and industry insights to help you succeed in the speaking world',
  openGraph: {
    title: 'Articles & Insights | CoveTalks',
    description: 'Expert advice, success stories, and industry insights',
    type: 'website',
  },
}