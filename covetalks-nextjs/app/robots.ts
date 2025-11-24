import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://covetalks.com'
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',           // Don't crawl API routes
          '/_next/',         // Don't crawl Next.js internals
          '/admin/',         // If you have admin pages
        ],
      },
      {
        userAgent: 'GPTBot',  // OpenAI's crawler
        allow: '/',
      },
      {
        userAgent: 'CCBot',   // Common Crawl
        allow: '/',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}

// This generates a robots.txt file at /robots.txt automatically
// Next.js 14+ handles this natively