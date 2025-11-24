// Additional SEO footer section with keyword-rich internal links
// Place this ABOVE your main footer for maximum SEO benefit

import Link from 'next/link'

export default function SEOFooterLinks() {
  const linkCategories = [
    {
      title: 'Browse by Speaker Specialty',
      links: [
        { href: '/speakers?specialty=Leadership', label: 'Leadership Speakers' },
        { href: '/speakers?specialty=Innovation', label: 'Innovation Speakers' },
        { href: '/speakers?specialty=Technology', label: 'Technology Speakers' },
        { href: '/speakers?specialty=Business Strategy', label: 'Business Strategy Speakers' },
        { href: '/speakers?specialty=Sales', label: 'Sales Speakers' },
        { href: '/speakers?specialty=Marketing', label: 'Marketing Speakers' },
        { href: '/speakers?specialty=Diversity and Inclusion', label: 'Diversity & Inclusion Speakers' },
        { href: '/speakers?specialty=Healthcare', label: 'Healthcare Speakers' },
        { href: '/speakers?specialty=Education', label: 'Education Speakers' },
        { href: '/speakers?specialty=Motivation', label: 'Motivational Speakers' },
      ]
    },
    {
      title: 'Organizations by Type',
      links: [
        { href: '/organizations?type=Nonprofit', label: 'Nonprofit Organizations' },
        { href: '/organizations?type=Corporate', label: 'Corporate Organizations' },
        { href: '/organizations?type=Educational', label: 'Educational Institutions' },
        { href: '/organizations?type=Association', label: 'Professional Associations' },
        { href: '/organizations?type=Government', label: 'Government Agencies' },
        { href: '/organizations?type=Religious', label: 'Religious Organizations' },
        { href: '/organizations?type=Healthcare', label: 'Healthcare Organizations' },
        { href: '/organizations?type=Technology', label: 'Technology Companies' },
      ]
    },
    {
      title: 'Speaker Resources',
      links: [
        { href: '/articles?category=speaker-tips', label: 'Speaker Success Tips' },
        { href: '/articles?category=getting-started', label: 'Getting Started as a Speaker' },
        { href: '/pricing#speakers', label: 'Speaker Pricing & Plans' },
        { href: '/how-it-works', label: 'How CoveTalks Works' },
        { href: '/articles?category=marketing', label: 'Speaker Marketing Guides' },
        { href: '/articles?category=business', label: 'Speaking Business Advice' },
        { href: '/faq', label: 'Speaker FAQ' },
        { href: '/register?type=speaker', label: 'Become a Speaker' },
      ]
    },
    {
      title: 'Organization Resources',
      links: [
        { href: '/articles?category=event-planning', label: 'Event Planning Tips' },
        { href: '/articles?category=speaker-selection', label: 'How to Choose a Speaker' },
        { href: '/pricing#organizations', label: 'Organization Pricing' },
        { href: '/speakers?minRating=4', label: 'Top-Rated Speakers' },
        { href: '/articles?category=budget', label: 'Speaker Budget Planning' },
        { href: '/articles?category=contracts', label: 'Speaker Contracts' },
        { href: '/faq', label: 'Organization FAQ' },
        { href: '/register?type=organization', label: 'Register Your Organization' },
      ]
    },
    {
      title: 'Popular Searches',
      links: [
        { href: '/speakers?specialty=Keynote', label: 'Keynote Speakers' },
        { href: '/speakers?specialty=Motivational', label: 'Motivational Speakers' },
        { href: '/speakers?specialty=Virtual', label: 'Virtual Event Speakers' },
        { href: '/speakers?location=New York', label: 'Speakers in New York' },
        { href: '/speakers?location=California', label: 'Speakers in California' },
        { href: '/speakers?location=Texas', label: 'Speakers in Texas' },
        { href: '/opportunities', label: 'Speaking Opportunities' },
        { href: '/articles', label: 'Speaker Blog & Articles' },
      ]
    },
  ]

  return (
    <section className="bg-gray-50 border-t border-gray-200 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Explore CoveTalks
          </h2>
          <p className="text-gray-600">
            Connect with thousands of professional speakers and organizations worldwide
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
          {linkCategories.map((category) => (
            <div key={category.title}>
              <h3 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wide">
                {category.title}
              </h3>
              <ul className="space-y-2">
                {category.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-600 hover:text-deep transition-colors hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Additional SEO Text */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="prose prose-sm max-w-none text-gray-600">
            <p className="text-center">
              <strong>CoveTalks</strong> is the leading marketplace connecting professional speakers with organizations seeking 
              expert presenters for conferences, corporate events, educational programs, and association meetings. 
              Browse our network of{' '}
              <Link href="/speakers" className="text-deep hover:underline">keynote speakers</Link>,{' '}
              <Link href="/speakers?specialty=Motivational" className="text-deep hover:underline">motivational speakers</Link>, and{' '}
              <Link href="/speakers?specialty=Industry Experts" className="text-deep hover:underline">industry experts</Link>{' '}
              across all specialties. Organizations can{' '}
              <Link href="/register?type=organization" className="text-deep hover:underline">post speaking opportunities</Link>{' '}
              for free and connect with qualified speakers. Professional speakers can{' '}
              <Link href="/register?type=speaker" className="text-deep hover:underline">create free profiles</Link>,{' '}
              <Link href="/opportunities" className="text-deep hover:underline">browse opportunities</Link>, and grow their speaking business.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}