import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'CoveTalks - Where Connections Ignite Opportunities',
    template: '%s | CoveTalks'
  },
  description: 'Connect speakers with organizations. Find expert speakers for your events or share your expertise with the world.',
  keywords: ['speakers', 'keynote', 'events', 'conferences', 'professional speakers', 'speaker booking'],
  authors: [{ name: 'CoveTalks' }],
  creator: 'CoveTalks',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://covetalks.com',
    siteName: 'CoveTalks',
    title: 'CoveTalks - Where Connections Ignite Opportunities',
    description: 'Connect speakers with organizations. Find expert speakers for your events or share your expertise with the world.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'CoveTalks',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CoveTalks - Where Connections Ignite Opportunities',
    description: 'Connect speakers with organizations. Find expert speakers for your events or share your expertise with the world.',
    creator: '@covetalks',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-TKJNB29XMZ"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-TKJNB29XMZ');
          `
        }} />
      </head>
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  )
}
