/** @type {import('next').NextConfig} */
const nextConfig = {
  // IMPORTANT FOR NETLIFY - Add this for optimal deployment
  output: 'standalone',
  
  // Add for better development experience
  reactStrictMode: true,
  
  // Security enhancement
  poweredByHeader: false,
  
  // Your existing image configuration - enhanced with domains
  images: {
    domains: [
      'localhost',
      'covetalks.com',
      'app.covetalks.com',
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      }
    ],
    formats: ['image/avif', 'image/webp'],
  },
  
  // Your existing experimental features
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  
  // Your existing TypeScript and ESLint settings
  typescript: {
    ignoreBuildErrors: false,
  },
  
  eslint: {
    ignoreDuringBuilds: false,
  },
  
  // ADD: Headers for security (Netlify-compatible)
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
        ],
      },
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, max-age=0',
          },
        ],
      },
    ]
  },
  
  // ADD: Redirects for app subdomain (based on your project structure)
  async redirects() {
    return [
      {
        source: '/app',
        destination: 'https://app.covetalks.com',
        permanent: false,
      },
      {
        source: '/dashboard',
        destination: 'https://app.covetalks.com/dashboard',
        permanent: false,
      },
    ]
  },
  
  // ADD: Environment variables for your domains
  env: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'https://covetalks.com',
    NEXT_PUBLIC_APP_SUBDOMAIN: process.env.NEXT_PUBLIC_APP_SUBDOMAIN || 'https://app.covetalks.com',
  },
  
  // ADD: Compiler optimizations
  compiler: {
    // Remove console logs in production (except errors and warnings)
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
}

module.exports = nextConfig