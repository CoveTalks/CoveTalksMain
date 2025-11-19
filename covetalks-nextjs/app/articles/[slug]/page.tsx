import { createClientAsync } from '@/lib/supabase/server'
import { createClient as createDirectClient } from '@supabase/supabase-js'
import { notFound } from 'next/navigation'
import ArticleDetailClient from './ArticleDetailClient'
import type { Metadata } from 'next'

// Server Component - Fetches data on server
export default async function ArticleDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  const supabase = await createClientAsync()

  // Get article first
  const { data: article, error: articleError } = await supabase
    .from('published_articles')
    .select('*')
    .eq('slug', params.slug)
    .single()

  // If article not found, show 404
  if (articleError || !article) {
    notFound()
  }

  // Fetch author and related articles in parallel
  const [authorResult, relatedResult] = await Promise.all([
    supabase
      .from('article_authors')
      .select('bio, avatar_url')
      .eq('id', article.author_id)
      .single(),
    supabase
      .rpc('get_related_articles', {
        article_id_param: article.id,
        limit_param: 3
      })
  ])

  // Increment view count (fire and forget - don't await)
  supabase
    .from('articles')
    .update({ view_count: (article.view_count || 0) + 1 })
    .eq('id', article.id)
    .then(() => {}) // Fire and forget

  // Combine data
  const articleWithDetails = {
    ...article,
    author_bio: authorResult.data?.bio,
    author_avatar: authorResult.data?.avatar_url
  }

  // Pass server data to client component for interactivity
  return (
    <ArticleDetailClient
      article={articleWithDetails}
      relatedArticles={relatedResult.data || []}
    />
  )
}

// ============================================================================
// ISR - Revalidate every 5 minutes (or adjust based on your publishing frequency)
// ============================================================================
export const revalidate = 300 // 5 minutes

// ============================================================================
// Static Generation - Pre-generate top 50 most popular articles at build time
// ============================================================================
export async function generateStaticParams() {
  // Use direct Supabase client for build-time (no cookies needed)
  const supabase = createDirectClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  // Get the 50 most viewed articles (or all articles if you prefer)
  const { data: articles } = await supabase
    .from('published_articles')
    .select('slug')
    .order('view_count', { ascending: false })
    .limit(50) // Adjust based on your needs

  // Generate static pages for these articles at build time
  return articles?.map((article) => ({
    slug: article.slug,
  })) || []
}

// ============================================================================
// SEO Metadata - Generated on server
// ============================================================================
export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  // Use direct Supabase client for metadata generation (no cookies needed)
  const supabase = createDirectClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const { data: article } = await supabase
    .from('published_articles')
    .select('title, excerpt, featured_image_url, og_image_url, meta_title, meta_description, published_at, author_name')
    .eq('slug', params.slug)
    .single()

  if (!article) {
    return {
      title: 'Article Not Found | CoveTalks',
    }
  }

  const title = article.meta_title || article.title
  const description = article.meta_description || article.excerpt
  const image = article.og_image_url || article.featured_image_url

  return {
    title: `${title} | CoveTalks`,
    description,
    authors: [{ name: article.author_name }],
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: article.published_at,
      images: image ? [{ url: image }] : [],
      siteName: 'CoveTalks',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: image ? [image] : [],
    },
    alternates: {
      canonical: `https://covetalks.com/articles/${params.slug}`,
    },
  }
}