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
    // Fetch ALL organizations - Supabase can handle large queries
    // Using select with minimal columns for better performance
    const { data: organizations, error, count } = await supabase
      .from('organizations')
      .select('id, updated_at, created_at', { count: 'exact' })
      .order('created_at', { ascending: false })
      .limit(50000) // Google's sitemap limit per file

    if (error) {
      console.error('Sitemap organizations error:', error)
      return new Response('Error generating sitemap', { status: 500 })
    }

    console.log(`Organizations sitemap: Fetched ${organizations?.length || 0} of ${count || 0} total organizations`)

    // Generate XML sitemap
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${(organizations || []).map(org => `  <url>
    <loc>${baseUrl}/organizations/${org.id}</loc>
    <lastmod>${new Date(org.updated_at || org.created_at).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.5</priority>
  </url>`).join('\n')}
</urlset>`

    return new Response(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=86400, s-maxage=86400',
      },
    })
    
  } catch (error) {
    console.error('Organizations sitemap generation failed:', error)
    return new Response('Error generating sitemap', { status: 500 })
  }
}