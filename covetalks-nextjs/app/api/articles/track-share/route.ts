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