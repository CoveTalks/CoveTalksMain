// FILE: covetalks-nextjs/app/sitemap-speakers.xml/route.ts
// Speakers sitemap - fetches all speakers

import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export const dynamic = 'force-dynamic'
export const revalidate = 86400 // 24 hours

export async function GET() {
  const baseUrl = 'https://covetalks.com'
  
  try {
    const { data: speakers, error, count } = await supabase
      .from('members')
      .select('id, updated_at, created_at', { count: 'exact' })
      .eq('member_type', 'Speaker')
      .order('created_at', { ascending: false })
      .limit(50000)

    if (error) {
      console.error('Sitemap speakers error:', error)
      return new Response('Error generating sitemap', { status: 500 })
    }

    console.log(`Speakers sitemap: Fetched ${speakers?.length || 0} of ${count || 0} total speakers`)

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${(speakers || []).map(speaker => `  <url>
    <loc>${baseUrl}/speakers/${speaker.id}</loc>
    <lastmod>${new Date(speaker.updated_at || speaker.created_at).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`).join('\n')}
</urlset>`

    return new Response(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=86400',
      },
    })
    
  } catch (error) {
    console.error('Speakers sitemap generation failed:', error)
    return new Response('Error generating sitemap', { status: 500 })
  }
}