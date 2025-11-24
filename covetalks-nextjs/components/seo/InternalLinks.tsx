// Reusable component for adding contextual internal links to any page

'use client'

import Link from 'next/link'
import { ArrowRight, Users, Building2, BookOpen, DollarSign } from 'lucide-react'

interface InternalLinksProps {
  variant?: 'default' | 'article' | 'speaker' | 'organization'
  className?: string
}

export default function InternalLinks({ variant = 'default', className = '' }: InternalLinksProps) {
  // Different link sets based on page type
  const linkSets = {
    default: [
      {
        title: 'Browse Professional Speakers',
        description: 'Discover expert speakers across all industries and specialties',
        href: '/speakers',
        icon: Users,
        color: 'bg-blue-50 border-blue-200 hover:bg-blue-100'
      },
      {
        title: 'Explore Organizations',
        description: 'Find organizations actively seeking professional speakers',
        href: '/organizations',
        icon: Building2,
        color: 'bg-green-50 border-green-200 hover:bg-green-100'
      },
      {
        title: 'Articles & Insights',
        description: 'Expert advice and industry insights for speakers and organizations',
        href: '/articles',
        icon: BookOpen,
        color: 'bg-purple-50 border-purple-200 hover:bg-purple-100'
      },
      {
        title: 'View Pricing Plans',
        description: 'Transparent pricing for speakers and organizations',
        href: '/pricing',
        icon: DollarSign,
        color: 'bg-amber-50 border-amber-200 hover:bg-amber-100'
      }
    ],
    article: [
      {
        title: 'Find Speaking Opportunities',
        description: 'Browse active opportunities from organizations worldwide',
        href: '/opportunities',
        icon: Building2,
        color: 'bg-green-50 border-green-200 hover:bg-green-100'
      },
      {
        title: 'Explore Professional Speakers',
        description: 'View profiles of expert speakers in your industry',
        href: '/speakers',
        icon: Users,
        color: 'bg-blue-50 border-blue-200 hover:bg-blue-100'
      },
      {
        title: 'Read More Articles',
        description: 'Discover more expert insights and success stories',
        href: '/articles',
        icon: BookOpen,
        color: 'bg-purple-50 border-purple-200 hover:bg-purple-100'
      }
    ],
    speaker: [
      {
        title: 'Browse Speaking Opportunities',
        description: 'Find your next speaking engagement',
        href: '/opportunities',
        icon: Building2,
        color: 'bg-green-50 border-green-200 hover:bg-green-100'
      },
      {
        title: 'Speaker Success Guide',
        description: 'Learn how to maximize your speaking career',
        href: '/articles',
        icon: BookOpen,
        color: 'bg-purple-50 border-purple-200 hover:bg-purple-100'
      },
      {
        title: 'View All Speakers',
        description: 'See how you compare to other professional speakers',
        href: '/speakers',
        icon: Users,
        color: 'bg-blue-50 border-blue-200 hover:bg-blue-100'
      }
    ],
    organization: [
      {
        title: 'Browse Speaker Directory',
        description: 'Find the perfect speaker for your next event',
        href: '/speakers',
        icon: Users,
        color: 'bg-blue-50 border-blue-200 hover:bg-blue-100'
      },
      {
        title: 'Organization Success Stories',
        description: 'See how other organizations found great speakers',
        href: '/articles',
        icon: BookOpen,
        color: 'bg-purple-50 border-purple-200 hover:bg-purple-100'
      },
      {
        title: 'View All Organizations',
        description: 'See other organizations seeking speakers',
        href: '/organizations',
        icon: Building2,
        color: 'bg-green-50 border-green-200 hover:bg-green-100'
      }
    ]
  }

  const links = linkSets[variant]

  return (
    <div className={`my-12 ${className}`}>
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        Explore More on CoveTalks
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`block p-6 rounded-lg border-2 transition-all ${link.color}`}
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <link.icon className="h-8 w-8 text-gray-700" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  {link.title}
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </h3>
                <p className="text-sm text-gray-600">
                  {link.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}