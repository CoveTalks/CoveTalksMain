import { createClient } from '@supabase/supabase-js'
import { MetadataRoute } from 'next'

// Items per page for each content type
const ORGS_PER_PAGE = 5000
const SPEAKERS_PER_PAGE = 5000
const ARTICLES_PER_PAGE = 5000

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sitemaps: MetadataRoute.Sitemap = []

  // Add static pages sitemap first
  sitemaps.push({
    url: 'https://covetalks.com/sitemap-static.xml',
    lastModified: new Date(),
  })

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

    // Get counts for dynamic pagination with error handling
    const [orgResult, speakerResult, articleResult] = await Promise.allSettled([
      supabase.from('organizations').select('*', { count: 'exact', head: true }),
      supabase.from('members').select('*', { count: 'exact', head: true })
        .eq('member_type', 'Speaker'),
      supabase.from('articles').select('*', { count: 'exact', head: true })
        .eq('status', 'published')
        .lte('published_at', new Date().toISOString())
    ])

    // Extract counts with fallbacks
    const orgCount = orgResult.status === 'fulfilled' ? (orgResult.value.count || 0) : 0
    const speakerCount = speakerResult.status === 'fulfilled' ? (speakerResult.value.count || 0) : 0
    const articleCount = articleResult.status === 'fulfilled' ? (articleResult.value.count || 0) : 0

    console.log(`Sitemap counts - Orgs: ${orgCount}, Speakers: ${speakerCount}, Articles: ${articleCount}`)

    // Log any errors
    if (orgResult.status === 'rejected') console.error('Org count error:', orgResult.reason)
    if (speakerResult.status === 'rejected') console.error('Speaker count error:', speakerResult.reason)
    if (articleResult.status === 'rejected') console.error('Article count error:', articleResult.reason)

    // Calculate pages needed for each content type
    const orgPages = Math.max(1, Math.ceil(orgCount / ORGS_PER_PAGE))
    const speakerPages = Math.max(1, Math.ceil(speakerCount / SPEAKERS_PER_PAGE))
    const articlePages = Math.max(1, Math.ceil(articleCount / ARTICLES_PER_PAGE))

    console.log(`Pages calculated - Orgs: ${orgPages}, Speakers: ${speakerPages}, Articles: ${articlePages}`)

    // Add articles sitemap(s) - ALWAYS include at least one
    if (articleCount === 0 || articlePages === 1) {
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

    // Add speakers sitemap(s) - ALWAYS include at least one
    if (speakerCount === 0 || speakerPages === 1) {
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

    // Add organizations sitemap(s) - ALWAYS include at least one
    if (orgCount === 0 || orgPages === 1) {
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

  } catch (error) {
    console.error('Error generating sitemap index:', error)
    
    // Fallback: Add all sitemaps without pagination if there's an error
    sitemaps.push(
      {
        url: 'https://covetalks.com/sitemap-articles.xml',
        lastModified: new Date(),
      },
      {
        url: 'https://covetalks.com/sitemap-speakers.xml',
        lastModified: new Date(),
      },
      {
        url: 'https://covetalks.com/sitemap-organizations.xml?page=1',
        lastModified: new Date(),
      },
      {
        url: 'https://covetalks.com/sitemap-organizations.xml?page=2',
        lastModified: new Date(),
      },
      {
        url: 'https://covetalks.com/sitemap-organizations.xml?page=3',
        lastModified: new Date(),
      },
      {
        url: 'https://covetalks.com/sitemap-organizations.xml?page=4',
        lastModified: new Date(),
      },
      {
        url: 'https://covetalks.com/sitemap-organizations.xml?page=5',
        lastModified: new Date(),
      }
    )
  }

  return sitemaps
}