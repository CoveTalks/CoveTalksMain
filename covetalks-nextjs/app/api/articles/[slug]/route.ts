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
      .select('*, author_bio:article_authors(bio)')
      .eq('slug', params.slug)
      .single()

    if (error || !article) {
      return NextResponse.json(
        { error: 'Article not found' },
        { status: 404 }
      )
    }

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
        author_bio: article.author_bio?.[0]?.bio
      },
      relatedArticles
    })
  } catch (error) {
    console.error('Error fetching article:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}