import { createClient } from '@/lib/supabase/server'
import ArticlesClientWrapper from './ArticlesClientWrapper'

// Server Component - Fast initial load with pagination support
export default async function ArticlesPage({
  searchParams,
}: {
  searchParams: { page?: string }
}) {
  const supabase = await createClient()
  
  // Parse page number from URL (default to page 1)
  const currentPage = parseInt(searchParams.page || '1', 10)
  const ARTICLES_PER_PAGE = 24
  const INITIAL_LOAD = 50 // First load includes all pinned/featured + first page of regular

  // Get total count for pagination
  const { count: totalCount } = await supabase
    .from('published_articles')
    .select('*', { count: 'exact', head: true })

  // Calculate pagination
  const totalPages = Math.ceil((totalCount || 0) / ARTICLES_PER_PAGE)

  // Fetch categories
  const categoriesResult = await supabase
    .from('categories_with_counts')
    .select('*')
    .order('display_order')

  let articles = []
  
  if (currentPage === 1) {
    // First page: Load initial batch (all pinned/featured + first regular articles)
    const articlesResult = await supabase
      .from('published_articles')
      .select('*')
      .order('is_pinned', { ascending: false })
      .order('is_featured', { ascending: false })
      .order('published_at', { ascending: false })
      .limit(INITIAL_LOAD)
    
    articles = articlesResult.data || []
  } else {
    // Subsequent pages: Load specific page of regular articles
    // First, get all pinned and featured to exclude them
    const pinnedFeaturedResult = await supabase
      .from('published_articles')
      .select('id')
      .or('is_pinned.eq.true,is_featured.eq.true')
    
    const excludeIds = (pinnedFeaturedResult.data || []).map(a => a.id)
    
    // Then get the regular articles for this page
    const offset = (currentPage - 1) * ARTICLES_PER_PAGE
    
    let query = supabase
      .from('published_articles')
      .select('*')
      .order('published_at', { ascending: false })
      .range(offset, offset + ARTICLES_PER_PAGE - 1)
    
    // Only exclude if there are IDs to exclude
    if (excludeIds.length > 0) {
      query = query.not('id', 'in', `(${excludeIds.join(',')})`)
    }
    
    const articlesResult = await query
    articles = articlesResult.data || []
  }

  const categories = categoriesResult.data || []

  // Pass server data to client component for interactivity
  return (
    <ArticlesClientWrapper 
      initialArticles={articles}
      initialCategories={categories}
      currentPage={currentPage}
      totalPages={totalPages}
      totalCount={totalCount || 0}
      articlesPerPage={ARTICLES_PER_PAGE}
    />
  )
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