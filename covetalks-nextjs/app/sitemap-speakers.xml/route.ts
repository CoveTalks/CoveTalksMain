import { createClient } from '@supabase/supabase-js'
import { NextRequest } from 'next/server'

// Number of speakers per sitemap page
const SPEAKERS_PER_PAGE = 5000
// Supabase has a hard limit of 1000 rows per query
const BATCH_SIZE = 1000

export const revalidate = 86400 // Revalidate every 24 hours

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
    const pageOffset = (page - 1) * SPEAKERS_PER_PAGE
    
    console.log(`Speakers sitemap page ${page}: Starting batch fetch for ${SPEAKERS_PER_PAGE} speakers`)
    
    // Get total count of SPEAKERS from members table
    const { count: totalCount } = await supabase
      .from('members')
      .select('*', { count: 'exact', head: true })
      .eq('member_type', 'Speaker')
    
    // Calculate how many batches we need
    const batchesNeeded = Math.ceil(Math.min(SPEAKERS_PER_PAGE, (totalCount || 0) - pageOffset) / BATCH_SIZE)
    console.log(`Will fetch ${batchesNeeded} batches of ${BATCH_SIZE} rows each`)
    
    // Fetch speakers in batches
    const allSpeakers = []
    
    for (let batchNum = 0; batchNum < batchesNeeded; batchNum++) {
      const batchOffset = pageOffset + (batchNum * BATCH_SIZE)
      const batchLimit = batchOffset + BATCH_SIZE - 1
      
      console.log(`Fetching batch ${batchNum + 1}/${batchesNeeded}: rows ${batchOffset}-${batchLimit}`)
      
      const { data: batchSpeakers, error } = await supabase
        .from('members')
        .select('id, slug, updated_at, created_at')
        .eq('member_type', 'Speaker')
        .order('created_at', { ascending: false })
        .range(batchOffset, batchLimit)
      
      if (error) {
        console.error(`Error fetching batch ${batchNum + 1}:`, error)
        return new Response('Error fetching speakers', { status: 500 })
      }
      
      if (batchSpeakers && batchSpeakers.length > 0) {
        allSpeakers.push(...batchSpeakers)
        console.log(`Batch ${batchNum + 1} fetched ${batchSpeakers.length} speakers. Total so far: ${allSpeakers.length}`)
      } else {
        console.log(`Batch ${batchNum + 1} returned no results, stopping`)
        break
      }
    }
    
    const speakerCount = allSpeakers.length
    console.log(`Speakers sitemap page ${page}: Fetched ${speakerCount} speakers total (${pageOffset + 1}-${pageOffset + speakerCount} of ${totalCount} total)`)
    
    // Calculate expected vs actual
    const expectedCount = Math.min(SPEAKERS_PER_PAGE, (totalCount || 0) - pageOffset)
    const fetchStatus = speakerCount === expectedCount ? 'SUCCESS' : (speakerCount > 0 ? 'PARTIAL' : 'MISMATCH')
    
    // Build XML sitemap
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<!-- ========================================= -->
<!-- SPEAKERS SITEMAP PAGE ${page}                -->
<!-- ========================================= -->
<!-- Total Speakers in DB: ${totalCount}          -->
<!-- Page: ${page} | Per Page: ${SPEAKERS_PER_PAGE}     -->
<!-- Batches: ${batchesNeeded} | Batch Size: ${BATCH_SIZE} -->
<!-- Expected: ${expectedCount} | Fetched: ${speakerCount} -->
<!-- Status: ${fetchStatus}                       -->
<!-- Range: ${pageOffset + 1}-${pageOffset + speakerCount} -->
<!-- ========================================= -->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allSpeakers.map((speaker) => `  <url>
    <loc>https://covetalks.com/speakers/${speaker.slug || speaker.id}</loc>
    <lastmod>${(speaker.updated_at || speaker.created_at || new Date().toISOString()).split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('\n')}
</urlset>`
    
    return new Response(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate',
      },
    })
  } catch (error) {
    console.error('Error generating speakers sitemap:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}