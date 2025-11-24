// Smart CTAs with internal links based on user type and page context

import Link from 'next/link'
import { ArrowRight, Users, Building2, Search, TrendingUp } from 'lucide-react'

interface ContextualCTAProps {
  variant: 'speaker-to-opportunities' | 'org-to-speakers' | 'article-to-action' | 'homepage-explore'
  className?: string
}

export function ContextualCTA({ variant, className = '' }: ContextualCTAProps) {
  const variants = {
    'speaker-to-opportunities': {
      title: 'Ready to Find Your Next Speaking Gig?',
      description: 'Browse thousands of speaking opportunities from organizations worldwide. Filter by topic, location, and compensation.',
      primaryLink: {
        text: 'Browse Opportunities',
        href: '/opportunities',
        icon: Search
      },
      secondaryLink: {
        text: 'View Organizations',
        href: '/organizations',
        icon: Building2
      },
      bgColor: 'bg-gradient-to-r from-blue-600 to-blue-700'
    },
    'org-to-speakers': {
      title: 'Find the Perfect Speaker for Your Event',
      description: 'Search our curated network of professional speakers. Filter by expertise, location, budget, and availability.',
      primaryLink: {
        text: 'Browse Speakers',
        href: '/speakers',
        icon: Users
      },
      secondaryLink: {
        text: 'How It Works',
        href: '/how-it-works',
        icon: TrendingUp
      },
      bgColor: 'bg-gradient-to-r from-green-600 to-green-700'
    },
    'article-to-action': {
      title: 'Put This Advice Into Action',
      description: 'Join thousands of speakers and organizations connecting on CoveTalks. Start finding opportunities or speakers today.',
      primaryLink: {
        text: 'Get Started Free',
        href: '/register',
        icon: ArrowRight
      },
      secondaryLink: {
        text: 'See Pricing',
        href: '/pricing',
        icon: TrendingUp
      },
      bgColor: 'bg-gradient-to-r from-purple-600 to-purple-700'
    },
    'homepage-explore': {
      title: 'Explore the CoveTalks Marketplace',
      description: 'Whether you\'re seeking speakers or opportunities, discover what makes CoveTalks the leading platform for professional speaking.',
      primaryLink: {
        text: 'Browse Speakers',
        href: '/speakers',
        icon: Users
      },
      secondaryLink: {
        text: 'View Organizations',
        href: '/organizations',
        icon: Building2
      },
      bgColor: 'bg-gradient-to-r from-deep to-calm'
    }
  }

  const config = variants[variant]
  const PrimaryIcon = config.primaryLink.icon
  const SecondaryIcon = config.secondaryLink.icon

  return (
    <div className={`my-16 ${className}`}>
      <div className={`${config.bgColor} rounded-2xl shadow-xl overflow-hidden`}>
        <div className="px-6 py-12 sm:px-12 sm:py-16 lg:flex lg:items-center lg:justify-between">
          <div className="lg:w-0 lg:flex-1">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {config.title}
            </h2>
            <p className="mt-4 max-w-3xl text-lg text-blue-100">
              {config.description}
            </p>
          </div>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 lg:mt-0 lg:ml-8 lg:flex-shrink-0">
            <Link
              href={config.primaryLink.href}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 text-base font-semibold text-gray-900 shadow-sm hover:bg-gray-50 transition-colors"
            >
              <PrimaryIcon className="h-5 w-5" />
              {config.primaryLink.text}
            </Link>
            <Link
              href={config.secondaryLink.href}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-transparent border-2 border-white px-6 py-3 text-base font-semibold text-white hover:bg-white/10 transition-colors"
            >
              <SecondaryIcon className="h-5 w-5" />
              {config.secondaryLink.text}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

// Inline text link component for use within content
interface InlineInternalLinkProps {
  href: string
  children: React.ReactNode
  className?: string
}

export function InlineInternalLink({ href, children, className = '' }: InlineInternalLinkProps) {
  return (
    <Link
      href={href}
      className={`text-deep hover:text-calm underline font-medium transition-colors ${className}`}
    >
      {children}
    </Link>
  )
}

// Quick links component for footer of articles or pages
export function QuickLinks() {
  const links = [
    { href: '/speakers', label: 'Find Speakers', icon: Users },
    { href: '/organizations', label: 'Find Organizations', icon: Building2 },
    { href: '/opportunities', label: 'Browse Opportunities', icon: Search },
    { href: '/articles', label: 'Read Articles', icon: TrendingUp },
  ]

  return (
    <div className="my-8 border-t border-gray-200 pt-8">
      <h3 className="text-sm font-semibold text-gray-900 mb-4">Quick Links</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-deep transition-colors group"
          >
            <link.icon className="h-4 w-4 group-hover:scale-110 transition-transform" />
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  )
}