import { createClient } from '@supabase/supabase-js'
import { MetadataRoute } from 'next'

// Items per page for each content type
const ORGS_PER_PAGE = 5000
const SPEAKERS_PER_PAGE = 5000
const ARTICLES_PER_PAGE = 5000

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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

  const sitemaps: MetadataRoute.Sitemap = []

  // Add static pages sitemap
  sitemaps.push({
    url: 'https://covetalks.com/sitemap-static.xml',
    lastModified: new Date(),
  })

  // Get counts for dynamic pagination
  const [
    { count: orgCount },
    { count: speakerCount },
    { count: articleCount }
  ] = await Promise.all([
    supabase.from('organizations').select('*', { count: 'exact', head: true }),
    supabase.from('speakers').select('*', { count: 'exact', head: true }),
    supabase.from('articles').select('*', { count: 'exact', head: true })
      .eq('published', true)
      .lte('published_at', new Date().toISOString())
  ])

  console.log(`Sitemap counts - Orgs: ${orgCount}, Speakers: ${speakerCount}, Articles: ${articleCount}`)

  // Calculate pages needed for each content type
  const orgPages = Math.ceil((orgCount || 0) / ORGS_PER_PAGE)
  const speakerPages = Math.ceil((speakerCount || 0) / SPEAKERS_PER_PAGE)
  const articlePages = Math.ceil((articleCount || 0) / ARTICLES_PER_PAGE)

  console.log(`Pages needed - Orgs: ${orgPages}, Speakers: ${speakerPages}, Articles: ${articlePages}`)

  // Add articles sitemap(s)
  if (articlePages === 1) {
    // Single page - no pagination needed
    sitemaps.push({
      url: 'https://covetalks.com/sitemap-articles.xml',
      lastModified: new Date(),
    })
  } else {
    // Multiple pages - add pagination
    for (let page = 1; page <= articlePages; page++) {
      sitemaps.push({
        url: `https://covetalks.com/sitemap-articles.xml?page=${page}`,
        lastModified: new Date(),
      })
    }
  }

  // Add speakers sitemap(s)
  if (speakerPages === 1) {
    // Single page - no pagination needed
    sitemaps.push({
      url: 'https://covetalks.com/sitemap-speakers.xml',
      lastModified: new Date(),
    })
  } else {
    // Multiple pages - add pagination
    for (let page = 1; page <= speakerPages; page++) {
      sitemaps.push({
        url: `https://covetalks.com/sitemap-speakers.xml?page=${page}`,
        lastModified: new Date(),
      })
    }
  }

  // Add organizations sitemap(s)
  if (orgPages === 1) {
    // Single page - no pagination needed
    sitemaps.push({
      url: 'https://covetalks.com/sitemap-organizations.xml',
      lastModified: new Date(),
    })
  } else {
    // Multiple pages - add pagination
    for (let page = 1; page <= orgPages; page++) {
      sitemaps.push({
        url: `https://covetalks.com/sitemap-organizations.xml?page=${page}`,
        lastModified: new Date(),
      })
    }
  }

  console.log(`Generated sitemap index with ${sitemaps.length} entries`)

  return sitemaps
}