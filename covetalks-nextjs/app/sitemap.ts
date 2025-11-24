import { MetadataRoute } from 'next'
import { createClient } from '@/lib/supabase/server'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient()
  
  // Get total count of organizations to determine how many sitemap pages we need
  const { count: totalOrganizations } = await supabase
    .from('organizations')
    .select('*', { count: 'exact', head: true })
  
  // Calculate number of organization sitemap pages needed (5,000 orgs per page)
  const orgsPerPage = 5000
  const totalOrgPages = Math.ceil((totalOrganizations || 0) / orgsPerPage)
  
  console.log(`Main sitemap: ${totalOrganizations} total organizations across ${totalOrgPages} sitemap pages`)
  
  // Build array of all sub-sitemaps
  const sitemaps: MetadataRoute.Sitemap = [
    // Static pages sitemap
    {
      url: 'https://covetalks.com/sitemap-static.xml',
      lastModified: new Date(),
    },
    // Articles sitemap
    {
      url: 'https://covetalks.com/sitemap-articles.xml',
      lastModified: new Date(),
    },
    // Speakers sitemap
    {
      url: 'https://covetalks.com/sitemap-speakers.xml',
      lastModified: new Date(),
    },
  ]
  
  // Add all organization sitemap pages dynamically
  for (let page = 1; page <= totalOrgPages; page++) {
    sitemaps.push({
      url: `https://covetalks.com/sitemap-organizations.xml?page=${page}`,
      lastModified: new Date(),
    })
  }
  
  return sitemaps
}