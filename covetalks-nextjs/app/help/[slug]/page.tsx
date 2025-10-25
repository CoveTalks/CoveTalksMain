import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import HelpArticleClient from './article-client'
import { createServerSupabaseClient } from '@/lib/supabase/server'

interface HelpArticle {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  category: string
  author_id: string | null
  is_featured: boolean  // Keep as is_featured
  published: boolean  // Changed from is_published
  view_count: number
  helpful_count: number
  tags: string[] | null
  meta_description: string | null
  created_at: string
  updated_at: string
}

interface PageProps {
  params: {
    slug: string
  }
}

async function getArticle(slug: string) {
  const supabase = createServerSupabaseClient()
  
  const { data: article, error } = await supabase
    .from('help_articles')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)  // Changed from is_published
    .single()

  if (error || !article) {
    return null
  }

  // Increment view count
  await supabase
    .from('help_articles')
    .update({ view_count: article.view_count + 1 })
    .eq('id', article.id)

  return article as HelpArticle
}

async function getRelatedArticles(category: string, currentId: string) {
  const supabase = createServerSupabaseClient()
  
  const { data: articles, error } = await supabase
    .from('help_articles')
    .select('*')
    .eq('category', category)
    .eq('published', true)  // Changed from is_published
    .neq('id', currentId)
    .order('view_count', { ascending: false })
    .limit(5)

  if (error) {
    console.error('Error fetching related articles:', error)
    return []
  }

  return articles as HelpArticle[]
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const article = await getArticle(params.slug)
  
  if (!article) {
    return {
      title: 'Article Not Found',
      description: 'The requested help article could not be found.',
    }
  }

  return {
    title: article.title,
    description: article.meta_description || article.excerpt,
    openGraph: {
      title: article.title,
      description: article.meta_description || article.excerpt,
      type: 'article',
      publishedTime: article.created_at,
      modifiedTime: article.updated_at,
      tags: article.tags || [],
    },
  }
}

export default async function HelpArticlePage({ params }: PageProps) {
  const article = await getArticle(params.slug)
  
  if (!article) {
    notFound()
  }

  const relatedArticles = await getRelatedArticles(article.category, article.id)

  return <HelpArticleClient article={article} relatedArticles={relatedArticles} />
}
