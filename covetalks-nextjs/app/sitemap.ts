// covetalks-nextjs/app/sitemap.ts
// This generates a DYNAMIC sitemap that automatically updates as content grows

import { MetadataRoute } from 'next'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://covetalks.com'

  // Static pages - always included
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/speakers`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/organizations`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/opportunities`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/articles`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/how-it-works`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/register`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]

  // Fetch all published articles
  const { data: articles } = await supabase
    .from('published_articles')
    .select('slug, published_at, updated_at')
    .order('published_at', { ascending: false })

  const articlePages: MetadataRoute.Sitemap = (articles || []).map((article) => ({
    url: `${baseUrl}/articles/${article.slug}`,
    lastModified: new Date(article.updated_at || article.published_at),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  // Fetch all speakers (limit to 50,000 URLs - Google's sitemap limit)
  const { data: speakers } = await supabase
    .from('members')
    .select('id, updated_at, created_at')
    .eq('member_type', 'Speaker')
    .order('average_rating', { ascending: false })
    .limit(50000)

  const speakerPages: MetadataRoute.Sitemap = (speakers || []).map((speaker) => ({
    url: `${baseUrl}/speakers/${speaker.id}`,
    lastModified: new Date(speaker.updated_at || speaker.created_at),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  // Fetch all organizations (limit to first 50,000)
  const { data: organizations } = await supabase
    .from('organizations')
    .select('id, updated_at, created_at')
    .order('created_at', { ascending: false })
    .limit(50000)

  const organizationPages: MetadataRoute.Sitemap = (organizations || []).map((org) => ({
    url: `${baseUrl}/organizations/${org.id}`,
    lastModified: new Date(org.updated_at || org.created_at),
    changeFrequency: 'weekly' as const,
    priority: 0.5,
  }))

  // Combine all pages
  return [...staticPages, ...articlePages, ...speakerPages, ...organizationPages]
}

// This tells Next.js to regenerate the sitemap every 24 hours
export const revalidate = 86400 // 24 hours in seconds