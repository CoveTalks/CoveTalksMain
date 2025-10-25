import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'  // Use your existing function
import HelpCategoryClient from './category-client'

interface PageProps {
  params: {
    category: string
  }
}

const categoryData: Record<string, { title: string; description: string }> = {
  getting_started: {
    title: 'Getting Started',
    description: 'New to CoveTalks? Start here with our beginner guides and tutorials.'
  },
  best_practices: {
    title: 'Best Practices',
    description: 'Tips, strategies, and proven methods to maximize your success on CoveTalks.'
  },
  billing: {
    title: 'Billing & Subscriptions',
    description: 'Everything about pricing, subscriptions, payments, and billing management.'
  },
  technical: {
    title: 'Technical Support',
    description: 'Troubleshooting guides, technical issues, and platform support.'
  },
  speakers: {
    title: 'For Speakers',
    description: 'Resources for speakers to build profiles, apply to opportunities, and grow their careers.'
  },
  organizations: {
    title: 'For Organizations',
    description: 'Guides for organizations to post opportunities and find the perfect speakers.'
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const category = categoryData[params.category]
  
  if (!category) {
    return {
      title: 'Category Not Found',
      description: 'The requested category could not be found.'
    }
  }
  
  return {
    title: `${category.title} - Help Center`,
    description: category.description,
    openGraph: {
      title: `${category.title} - CoveTalks Help Center`,
      description: category.description,
    }
  }
}

// Generate static params for all known categories
export async function generateStaticParams() {
  return Object.keys(categoryData).map((category) => ({
    category: category,
  }))
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
  is_new: boolean  // Added this field
  published: boolean
  view_count: number
  helpful_count: number
  not_helpful_count: number  // Added this field
  tags: string[] | null
  meta_description: string | null
  created_at: string
  updated_at: string
  search_vector?: any  // Added for full-text search
}

async function getCategoryArticles(category: string) {
  const supabase = createClient()  // Use your existing function
  
  console.log('Fetching articles for category:', category)  // Debug log
  
  const { data: articles, error } = await supabase
    .from('help_articles')
    .select('*')
    .eq('category', category)
    .eq('published', true)
    .order('view_count', { ascending: false })

  if (error) {
    console.error('Error fetching category articles:', error)
    console.error('Query details:', { category, table: 'help_articles' })
    return []
  }

  console.log(`Found ${articles?.length || 0} articles in category ${category}`)  // Debug log
  
  return articles as HelpArticle[]
}

export default async function CategoryPage({ params }: PageProps) {
  // Check if category exists
  if (!categoryData[params.category]) {
    notFound()
  }

  const articles = await getCategoryArticles(params.category)
  const categoryInfo = categoryData[params.category]
  
  return (
    <HelpCategoryClient 
      category={params.category}
      categoryTitle={categoryInfo.title}
      categoryDescription={categoryInfo.description}
      articles={articles}
    />
  )
}
