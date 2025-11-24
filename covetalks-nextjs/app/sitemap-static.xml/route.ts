export const dynamic = 'force-dynamic'
export const revalidate = 86400 // 24 hours

export async function GET() {
  const baseUrl = 'https://covetalks.com'
  
  const staticPages = [
    { url: baseUrl, priority: 1.0, changefreq: 'daily' },
    { url: `${baseUrl}/speakers`, priority: 0.9, changefreq: 'daily' },
    { url: `${baseUrl}/organizations`, priority: 0.9, changefreq: 'daily' },
    { url: `${baseUrl}/opportunities`, priority: 0.8, changefreq: 'daily' },
    { url: `${baseUrl}/articles`, priority: 0.9, changefreq: 'daily' },
    { url: `${baseUrl}/pricing`, priority: 0.8, changefreq: 'weekly' },
    { url: `${baseUrl}/about`, priority: 0.7, changefreq: 'monthly' },
    { url: `${baseUrl}/how-it-works`, priority: 0.7, changefreq: 'monthly' },
    { url: `${baseUrl}/contact`, priority: 0.6, changefreq: 'monthly' },
    { url: `${baseUrl}/privacy`, priority: 0.3, changefreq: 'yearly' },
    { url: `${baseUrl}/terms`, priority: 0.3, changefreq: 'yearly' },
    { url: `${baseUrl}/faq`, priority: 0.6, changefreq: 'monthly' },
    { url: `${baseUrl}/register`, priority: 0.8, changefreq: 'monthly' },
  ]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages.map(page => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400',
    },
  })
}