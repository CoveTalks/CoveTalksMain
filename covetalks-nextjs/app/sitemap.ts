// FILE: covetalks-nextjs/app/sitemap.ts
// Main sitemap index - points to all sub-sitemaps

import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://covetalks.com'
  
  // Return links to all sub-sitemaps
  // Google will automatically crawl each one
  return [
    {
      url: `${baseUrl}/sitemap-static.xml`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/sitemap-articles.xml`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/sitemap-speakers.xml`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/sitemap-organizations.xml`,
      lastModified: new Date(),
    },
  ]
}