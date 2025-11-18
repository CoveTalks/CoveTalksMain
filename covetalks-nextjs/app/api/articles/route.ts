import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const supabase = await createClient()

    const { data: articles, error } = await supabase
      .from('published_articles')
      .select('*')
      .order('is_pinned', { ascending: false })
      .order('is_featured', { ascending: false })
      .order('published_at', { ascending: false })

    if (error) throw error

    return NextResponse.json({ articles })
  } catch (error) {
    console.error('Error fetching articles:', error)
    return NextResponse.json(
      { error: 'Failed to fetch articles' },
      { status: 500 }
    )
  }
}

// ============================================================================

// FILE: app/api/articles/[slug]/route.ts
// Individual article API with related articles

import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const supabase = await createClient()

    // Get article
    const { data: article, error } = await supabase
      .from('published_articles')
      .select('*')
      .eq('slug', params.slug)
      .single()

    if (error || !article) {
      return NextResponse.json(
        { error: 'Article not found' },
        { status: 404 }
      )
    }

    // Get author bio
    const { data: authorData } = await supabase
      .from('article_authors')
      .select('bio')
      .eq('id', article.author_id)
      .single()

    // Get related articles
    const { data: relatedArticles } = await supabase
      .rpc('get_related_articles', {
        article_id_param: article.id,
        limit_param: 3
      })

    // Increment view count (optional)
    await supabase
      .from('articles')
      .update({ view_count: (article.view_count || 0) + 1 })
      .eq('id', article.id)

    return NextResponse.json({
      article: {
        ...article,
        author_bio: authorData?.bio
      },
      relatedArticles: relatedArticles || []
    })
  } catch (error) {
    console.error('Error fetching article:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// ============================================================================

// FILE: app/api/articles/categories/route.ts
// Categories with article counts API

import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const supabase = await createClient()

    const { data: categories, error } = await supabase
      .from('categories_with_counts')
      .select('*')
      .order('display_order')

    if (error) throw error

    return NextResponse.json({ categories })
  } catch (error) {
    console.error('Error fetching categories:', error)
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    )
  }
}

// ============================================================================

// OPTIONAL FILE: app/api/articles/track-share/route.ts
// Track article shares (for analytics)

import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { articleId, platform } = await request.json()
    const supabase = await createClient()

    // Increment share count
    const { data: article } = await supabase
      .from('articles')
      .select('share_count')
      .eq('id', articleId)
      .single()

    if (article) {
      await supabase
        .from('articles')
        .update({ share_count: (article.share_count || 0) + 1 })
        .eq('id', articleId)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error tracking share:', error)
    return NextResponse.json(
      { error: 'Failed to track share' },
      { status: 500 }
    )
  }
}