import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export const dynamic = 'force-dynamic'
export const revalidate = 3600 // 1 hour - articles change more frequently

export async function GET() {
  const baseUrl = 'https://covetalks.com'
  
  try {
    const { data: articles, error } = await supabase
      .from('published_articles')
      .select('slug, published_at, updated_at')
      .order('published_at', { ascending: false })

    if (error) {
      console.error('Sitemap articles error:', error)
      return new Response('Error generating sitemap', { status: 500 })
    }

    console.log(`Articles sitemap: Fetched ${articles?.length || 0} articles`)

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${(articles || []).map(article => `  <url>
    <loc>${baseUrl}/articles/${article.slug}</loc>
    <lastmod>${new Date(article.updated_at || article.published_at).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`).join('\n')}
</urlset>`

    return new Response(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600',
      },
    })
    
  } catch (error) {
    console.error('Articles sitemap generation failed:', error)
    return new Response('Error generating sitemap', { status: 500 })
  }
}