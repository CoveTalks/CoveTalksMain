import Link from 'next/link'
import Image from 'next/image'
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react'

const footerNavigation = {
  quickLinks: [
    { name: 'Home', href: '/' },
    { name: 'Find Speakers', href: '/speakers' },
    { name: 'Browse Opportunities', href: '/opportunities' },
    { name: 'Register', href: '/register' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'About Us', href: '/about' },
  ],
  forOrganizations: [
    { name: 'Register Your Organization', href: '/register?type=organization' },
    { name: 'Post Speaking Opportunity', href: '/post-opportunity' },
    { name: 'Browse Speakers', href: '/speakers' },
    { name: 'Organization Plans', href: '/pricing#organizations' },
    { name: 'Organization Guide', href: '/resources/organization-guide' },
  ],
  forSpeakers: [
    { name: 'Become a Speaker', href: '/register?type=speaker' },
    { name: 'Find Opportunities', href: '/opportunities' },
    { name: 'Speaker Resources', href: '/resources/speaker-tips' },
    { name: 'Speaker Plans', href: '/pricing#speakers' },
    { name: 'Success Stories', href: '/success-stories' },
  ],
  support: [
    { name: 'Help Center', href: '/help' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Accessibility', href: '/accessibility' },
  ],
}

const socialLinks = [
  { name: 'LinkedIn', href: 'https://www.linkedin.com/company/108118017', icon: Linkedin },
  { name: 'Facebook', href: '#', icon: Facebook },
  { name: 'Twitter', href: '#', icon: Twitter },
  { name: 'Instagram', href: '#', icon: Instagram },
]

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {/* Company Info */}
          <div className="space-y-8 xl:col-span-1">
            <Link href="/" className="flex items-center">
              <div className="relative h-10 w-32">
                <Image
                  src="/images/CoveTalks_logo_white.png"
                  alt="CoveTalks"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
            <p className="text-sm leading-6">
              Where Connections Ignite Opportunities. Connect professional speakers with organizations for meaningful events and engagements.
            </p>
            <div className="flex space-x-6">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">Quick Links</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {footerNavigation.quickLinks.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm leading-6 hover:text-white transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-white">For Organizations</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {footerNavigation.forOrganizations.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm leading-6 hover:text-white transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">For Speakers</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {footerNavigation.forSpeakers.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm leading-6 hover:text-white transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-white">Support</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {footerNavigation.support.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm leading-6 hover:text-white transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-12 border-t border-gray-800 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-accent" />
              <a href="mailto:hello@covetalks.com" className="text-sm hover:text-white transition-colors">
                hello@covetalks.com
              </a>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-accent" />
              <a href="tel:+1234567890" className="text-sm hover:text-white transition-colors">
                +1 (234) 567-890
              </a>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="h-5 w-5 text-accent" />
              <span className="text-sm">Phoenix, Arizona, USA</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 border-t border-gray-800 pt-8 md:flex md:items-center md:justify-between">
          <p className="text-xs leading-5 md:order-1">
            &copy; {new Date().getFullYear()} CoveTalks. All rights reserved.
          </p>
          <div className="mt-4 md:order-2 md:mt-0">
            <p className="text-xs leading-5">
              Built with ❤️ for connecting speakers and organizations
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
