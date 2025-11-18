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