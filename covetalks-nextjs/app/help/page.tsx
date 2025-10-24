import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Search, Users, Building, CreditCard, MessageSquare, Settings, BookOpen, HelpCircle } from 'lucide-react'

const helpCategories = [
  {
    icon: Users,
    title: 'For Speakers',
    description: 'Learn how to create your profile, apply to opportunities, and grow your speaking career.',
    articles: [
      'Creating Your Speaker Profile',
      'How to Apply to Opportunities',
      'Setting Your Speaking Fees',
      'Building Your Reputation',
      'Getting Verified',
    ],
    link: '/help/speakers',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  {
    icon: Building,
    title: 'For Organizations',
    description: 'Discover how to post opportunities, review applications, and find the perfect speakers.',
    articles: [
      'Posting Speaking Opportunities',
      'Reviewing Applications',
      'Selecting the Right Speaker',
      'Managing Bookings',
      'Organization Verification',
    ],
    link: '/help/organizations',
    color: 'text-secondary',
    bgColor: 'bg-secondary/10',
  },
  {
    icon: CreditCard,
    title: 'Billing & Subscriptions',
    description: 'Manage your subscription, understand pricing, and handle payment methods.',
    articles: [
      'Subscription Plans Explained',
      'Updating Payment Methods',
      'Understanding Invoices',
      'Canceling Your Subscription',
      'Refund Policy',
    ],
    link: '/help/billing',
    color: 'text-accent',
    bgColor: 'bg-accent/10',
  },
  {
    icon: Settings,
    title: 'Account & Settings',
    description: 'Manage your account settings, privacy, and security preferences.',
    articles: [
      'Account Security',
      'Privacy Settings',
      'Notification Preferences',
      'Two-Factor Authentication',
      'Deleting Your Account',
    ],
    link: '/help/account',
    color: 'text-deep',
    bgColor: 'bg-deep/10',
  },
]

const popularArticles = [
  { title: 'How to Create a Compelling Speaker Profile', category: 'Speakers' },
  { title: 'Best Practices for Posting Opportunities', category: 'Organizations' },
  { title: 'Understanding Our Pricing Structure', category: 'Billing' },
  { title: 'How to Apply to Speaking Opportunities', category: 'Speakers' },
  { title: 'Speaker Selection Criteria', category: 'Organizations' },
  { title: 'Managing Your Subscription', category: 'Billing' },
]

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-deep to-calm py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl font-black mb-6">
              How Can We Help You?
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Find answers, explore guides, and get support for your CoveTalks journey
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for help articles..."
                  className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white/30"
                />
                <Button className="absolute right-2 top-1/2 -translate-y-1/2">
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Help Categories */}
      <section className="py-20 bg-foam">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Quick Help Topics</h2>
            <p className="text-lg text-gray-600">Select a category to get started</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {helpCategories.map((category) => (
              <Link key={category.title} href={category.link}>
                <div className="bg-white rounded-xl p-6 shadow-soft hover:shadow-hard transition-all cursor-pointer h-full">
                  <div className={`h-12 w-12 rounded-lg ${category.bgColor} flex items-center justify-center mb-4`}>
                    <category.icon className={`h-6 w-6 ${category.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{category.description}</p>
                  <div className="space-y-1">
                    {category.articles.slice(0, 3).map((article) => (
                      <p key={article} className="text-sm text-primary hover:underline">
                        → {article}
                      </p>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Articles */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Popular Help Articles</h2>
              <p className="text-lg text-gray-600">Quick answers to common questions</p>
            </div>

            <div className="bg-foam rounded-xl p-8">
              <div className="space-y-4">
                {popularArticles.map((article, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-white rounded-lg hover:shadow-soft transition-shadow">
                    <div className="flex items-center gap-4">
                      <BookOpen className="h-5 w-5 text-gray-400" />
                      <div>
                        <h4 className="font-semibold">{article.title}</h4>
                        <span className="text-sm text-gray-500">{article.category}</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      Read →
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Still Need Help */}
      <section className="py-20 bg-gradient-to-r from-deep to-calm">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center text-white">
            <HelpCircle className="h-16 w-16 mx-auto mb-6 text-white/80" />
            <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
            <p className="text-xl text-white/90 mb-8">
              We're here to help you get the most out of CoveTalks
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                <MessageSquare className="h-8 w-8 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Live Chat</h3>
                <p className="text-sm text-white/80 mb-4">Mon-Fri, 9am-6pm EST</p>
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-deep">
                  Start Chat
                </Button>
              </div>

              <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                <Mail className="h-8 w-8 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Email Support</h3>
                <p className="text-sm text-white/80 mb-4">24-48 hour response</p>
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-deep">
                  Send Email
                </Button>
              </div>

              <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                <BookOpen className="h-8 w-8 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Knowledge Base</h3>
                <p className="text-sm text-white/80 mb-4">Browse all resources</p>
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-deep">
                  View Articles
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
