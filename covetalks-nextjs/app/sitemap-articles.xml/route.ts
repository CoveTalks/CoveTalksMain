import { createClient } from '@supabase/supabase-js'
import { NextRequest } from 'next/server'

// Number of articles per sitemap page
const ARTICLES_PER_PAGE = 5000
// Supabase has a hard limit of 1000 rows per query
const BATCH_SIZE = 1000

export const revalidate = 3600 // Revalidate every hour (articles update more frequently)

export async function GET(request: NextRequest) {
  try {
    // Create service role client (bypasses RLS)
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
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
    const pageOffset = (page - 1) * ARTICLES_PER_PAGE
    
    console.log(`Articles sitemap page ${page}: Starting batch fetch for ${ARTICLES_PER_PAGE} articles`)
    
    // Get total count of PUBLISHED articles only
    const { count: totalCount } = await supabase
      .from('articles')
      .select('*', { count: 'exact', head: true })
      .eq('published', true)
      .lte('published_at', new Date().toISOString())
    
    // Calculate how many batches we need
    const batchesNeeded = Math.ceil(Math.min(ARTICLES_PER_PAGE, (totalCount || 0) - pageOffset) / BATCH_SIZE)
    console.log(`Will fetch ${batchesNeeded} batches of ${BATCH_SIZE} rows each`)
    
    // Fetch articles in batches
    const allArticles = []
    
    for (let batchNum = 0; batchNum < batchesNeeded; batchNum++) {
      const batchOffset = pageOffset + (batchNum * BATCH_SIZE)
      const batchLimit = batchOffset + BATCH_SIZE - 1
      
      console.log(`Fetching batch ${batchNum + 1}/${batchesNeeded}: rows ${batchOffset}-${batchLimit}`)
      
      const { data: batchArticles, error } = await supabase
        .from('articles')
        .select('slug, updated_at, published_at')
        .eq('published', true)
        .lte('published_at', new Date().toISOString())
        .order('published_at', { ascending: false })
        .range(batchOffset, batchLimit)
      
      if (error) {
        console.error(`Error fetching batch ${batchNum + 1}:`, error)
        return new Response('Error fetching articles', { status: 500 })
      }
      
      if (batchArticles && batchArticles.length > 0) {
        allArticles.push(...batchArticles)
        console.log(`Batch ${batchNum + 1} fetched ${batchArticles.length} articles. Total so far: ${allArticles.length}`)
      } else {
        console.log(`Batch ${batchNum + 1} returned no results, stopping`)
        break
      }
    }
    
    const articleCount = allArticles.length
    console.log(`Articles sitemap page ${page}: Fetched ${articleCount} articles total (${pageOffset + 1}-${pageOffset + articleCount} of ${totalCount} total)`)
    
    // Calculate expected vs actual
    const expectedCount = Math.min(ARTICLES_PER_PAGE, (totalCount || 0) - pageOffset)
    const fetchStatus = articleCount === expectedCount ? 'SUCCESS' : (articleCount > 0 ? 'PARTIAL' : 'MISMATCH')
    
    // Build XML sitemap
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<!-- ========================================= -->
<!-- ARTICLES SITEMAP PAGE ${page}                -->
<!-- ========================================= -->
<!-- Total Articles in DB: ${totalCount}          -->
<!-- Page: ${page} | Per Page: ${ARTICLES_PER_PAGE}     -->
<!-- Batches: ${batchesNeeded} | Batch Size: ${BATCH_SIZE} -->
<!-- Expected: ${expectedCount} | Fetched: ${articleCount} -->
<!-- Status: ${fetchStatus}                       -->
<!-- Range: ${pageOffset + 1}-${pageOffset + articleCount} -->
<!-- ========================================= -->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allArticles.map((article) => `  <url>
    <loc>https://covetalks.com/articles/${article.slug}</loc>
    <lastmod>${(article.updated_at || article.published_at || new Date().toISOString()).split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`).join('\n')}
</urlset>`
    
    return new Response(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate',
      },
    })
  } catch (error) {
    console.error('Error generating articles sitemap:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}