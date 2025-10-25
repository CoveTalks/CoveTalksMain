import { Metadata } from 'next'
import HelpClient from './help-client'
import { createServerSupabaseClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  title: 'Help Center',
  description: 'Get help and support for using CoveTalks. Browse guides, tutorials, and resources.',
}

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

async function getHelpArticles() {
  const supabase = createServerSupabaseClient()
  
  const { data: articles, error } = await supabase
    .from('help_articles')
    .select('*')
    .eq('published', true)  // Changed from is_published
    .order('view_count', { ascending: false })

  if (error) {
    console.error('Error fetching help articles:', error)
    return []
  }

  return articles as HelpArticle[]
}

async function getPopularArticles() {
  const supabase = createServerSupabaseClient()
  
  const { data: articles, error } = await supabase
    .from('help_articles')
    .select('*')
    .eq('published', true)  // Changed from is_published
    .order('view_count', { ascending: false })
    .limit(12)

  if (error) {
    console.error('Error fetching popular articles:', error)
    return []
  }

  return articles as HelpArticle[]
}

export default async function HelpPage() {
  const [articles, popularArticles] = await Promise.all([
    getHelpArticles(),
    getPopularArticles()
  ])

  return <HelpClient initialArticles={articles} popularArticles={popularArticles} />
}
