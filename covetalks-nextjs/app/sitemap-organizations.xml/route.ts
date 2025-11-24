import { createClient } from '@supabase/supabase-js'
import { NextRequest } from 'next/server'

// Number of organizations per sitemap page
const ORGS_PER_PAGE = 5000

export const revalidate = 86400 // Revalidate every 24 hours

export async function GET(request: NextRequest) {
  try {
    // Create service role client (bypasses RLS)
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!, // Service role key
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )
    
    // Get page number from query parameter (default to 1)
    const searchParams = request.nextUrl.searchParams
    const page = parseInt(searchParams.get('page') || '1')
    
    // Calculate offset for pagination
    const offset = (page - 1) * ORGS_PER_PAGE
    const limit = offset + ORGS_PER_PAGE - 1 // range() is inclusive
    
    console.log(`Organizations sitemap page ${page}: Fetching orgs ${offset + 1} to ${limit + 1}`)
    
    // Get total count
    const { count: totalCount } = await supabase
      .from('organizations')
      .select('*', { count: 'exact', head: true })
    
    // Fetch organizations for this page using range
    const { data: organizations, error } = await supabase
      .from('organizations')
      .select('id, updated_at, created_at')
      .order('created_at', { ascending: false })
      .range(offset, limit)
    
    if (error) {
      console.error('Error fetching organizations:', error)
      return new Response('Error fetching organizations', { status: 500 })
    }
    
    const orgCount = organizations?.length || 0
    console.log(`Organizations sitemap page ${page}: Fetched ${orgCount} organizations (${offset + 1}-${offset + orgCount} of ${totalCount} total)`)
    
    // Build XML sitemap
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${organizations?.map((org) => `  <url>
    <loc>https://covetalks.com/organizations/${org.id}</loc>
    <lastmod>${(org.updated_at || org.created_at || new Date().toISOString()).split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.5</priority>
  </url>`).join('\n')}
</urlset>`
    
    return new Response(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate',
      },
    })
  } catch (error) {
    console.error('Error generating organizations sitemap:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}