'use client'

import { useState, useMemo } from 'react'
import { Search, BookOpen, Mic, Building, CreditCard, Settings, ChevronRight, User, Rocket, FileText, Wrench, Mail, MessageCircle, Clock, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

interface HelpArticle {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  category: string
  author_id: string | null
  is_featured: boolean  // Keep as is_featured
  published: boolean  // Changed from is_published
  view_count: number
  helpful_count: number
  tags: string[] | null
  meta_description: string | null
  created_at: string
  updated_at: string
}

interface HelpClientProps {
  initialArticles: HelpArticle[]
  popularArticles: HelpArticle[]
}

const categoryData = {
  speakers: {
    icon: <Mic className="w-6 h-6" />,
    title: 'For Speakers',
    description: 'Learn how to create your profile, apply to opportunities, and grow your speaking career.',
    color: 'from-calm to-deep'
  },
  organizations: {
    icon: <Building className="w-6 h-6" />,
    title: 'For Organizations',
    description: 'Discover how to post opportunities, review applications, and find the perfect speakers.',
    color: 'from-sand to-calm'
  },
  billing: {
    icon: <CreditCard className="w-6 h-6" />,
    title: 'Billing & Subscriptions',
    description: 'Manage your subscription, understand pricing, and handle payment methods.',
    color: 'from-green-500 to-green-600'
  },
  technical: {
    icon: <Settings className="w-6 h-6" />,
    title: 'Technical Support',
    description: 'Troubleshoot issues, report bugs, and get technical assistance.',
    color: 'from-purple-500 to-purple-600'
  },
  'getting-started': {
    icon: <Rocket className="w-6 h-6" />,
    title: 'Getting Started',
    description: 'New to CoveTalks? Start here with our beginner guides.',
    color: 'from-blue-500 to-blue-600'
  },
  'best-practices': {
    icon: <TrendingUp className="w-6 h-6" />,
    title: 'Best Practices',
    description: 'Tips and strategies to maximize your success on CoveTalks.',
    color: 'from-pink-500 to-pink-600'
  },
  'account': {
    icon: <User className="w-6 h-6" />,
    title: 'Account Management',
    description: 'Manage your profile, settings, and account preferences.',
    color: 'from-indigo-500 to-indigo-600'
  },
  'payments': {
    icon: <CreditCard className="w-6 h-6" />,
    title: 'Payments & Billing',
    description: 'Handle invoices, refunds, and payment processing.',
    color: 'from-orange-500 to-orange-600'
  }
}

export default function HelpClient({ initialArticles, popularArticles }: HelpClientProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  // Filter articles based on search
  const filteredArticles = useMemo(() => {
    let filtered = initialArticles

    if (selectedCategory) {
      filtered = filtered.filter(article => article.category === selectedCategory)
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(query) ||
        article.excerpt.toLowerCase().includes(query) ||
        (article.tags && article.tags.some(tag => tag.toLowerCase().includes(query)))
      )
    }

    return filtered
  }, [initialArticles, selectedCategory, searchQuery])

  // Group articles by category
  const articlesByCategory = useMemo(() => {
    const grouped: Record<string, HelpArticle[]> = {}
    
    filteredArticles.forEach(article => {
      if (!grouped[article.category]) {
        grouped[article.category] = []
      }
      grouped[article.category].push(article)
    })
    
    return grouped
  }, [filteredArticles])

  // Get unique categories from articles
  const availableCategories = useMemo(() => {
    return Array.from(new Set(initialArticles.map(a => a.category)))
      .filter(cat => categoryData[cat as keyof typeof categoryData])
  }, [initialArticles])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Search is handled reactively through the searchQuery state
  }

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-deep to-calm text-white">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-black mb-4">How Can We Help You?</h1>
            <p className="text-xl opacity-95 mb-8">Find answers, explore guides, and get support for your CoveTalks journey</p>
            
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="bg-white rounded-full shadow-xl p-2 flex items-center max-w-2xl mx-auto">
              <Search className="w-5 h-5 text-calm ml-4" />
              <Input
                type="text"
                placeholder="Search for help articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 border-0 focus:ring-0 text-deep text-lg"
              />
              <Button 
                type="submit"
                className="bg-sand hover:bg-sand/90 text-white rounded-full px-6"
              >
                Search
              </Button>
            </form>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Quick Help Categories */}
        <section className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-deep mb-2">Quick Help Topics</h2>
            <p className="text-gray-600">Select a category to get started</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {availableCategories.slice(0, 4).map((categoryKey) => {
              const category = categoryData[categoryKey as keyof typeof categoryData]
              if (!category) return null
              
              return (
                <button
                  key={categoryKey}
                  onClick={() => setSelectedCategory(selectedCategory === categoryKey ? null : categoryKey)}
                  className={cn(
                    "bg-white rounded-xl p-6 shadow-soft hover:shadow-medium transition-all duration-300 text-left border-2",
                    selectedCategory === categoryKey ? "border-calm" : "border-transparent"
                  )}
                >
                  <div className={cn(
                    "w-14 h-14 rounded-xl flex items-center justify-center text-white mb-4",
                    `bg-gradient-to-br ${category.color}`
                  )}>
                    {category.icon}
                  </div>
                  <h3 className="font-bold text-lg text-deep mb-2">{category.title}</h3>
                  <p className="text-gray-600 text-sm">{category.description}</p>
                  <div className="mt-4 text-calm font-medium flex items-center">
                    Explore {category.title.split(' ')[0]} Guides
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </div>
                </button>
              )
            })}
          </div>
        </section>

        {/* Popular Articles */}
        {!selectedCategory && !searchQuery && (
          <section className="mb-12">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-deep mb-2">Popular Help Articles</h2>
              <p className="text-gray-600">Most frequently accessed guides and tutorials</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Getting Started */}
              <div className="bg-white rounded-xl p-6 shadow-soft">
                <h3 className="font-bold text-xl text-deep mb-4 flex items-center gap-2">
                  <Rocket className="w-5 h-5 text-calm" />
                  Getting Started
                </h3>
                <ul className="space-y-3">
                  {popularArticles
                    .filter(a => a.category === 'getting-started')
                    .slice(0, 5)
                    .map((article) => (
                      <li key={article.id}>
                        <Link 
                          href={`/help/${article.slug}`}
                          className="text-gray-700 hover:text-calm transition-colors flex items-center gap-2"
                        >
                          <ChevronRight className="w-4 h-4 text-gray-400" />
                          {article.title}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>

              {/* Best Practices */}
              <div className="bg-white rounded-xl p-6 shadow-soft">
                <h3 className="font-bold text-xl text-deep mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-calm" />
                  Best Practices
                </h3>
                <ul className="space-y-3">
                  {popularArticles
                    .filter(a => a.category === 'best-practices')
                    .slice(0, 5)
                    .map((article) => (
                      <li key={article.id}>
                        <Link 
                          href={`/help/${article.slug}`}
                          className="text-gray-700 hover:text-calm transition-colors flex items-center gap-2"
                        >
                          <ChevronRight className="w-4 h-4 text-gray-400" />
                          {article.title}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>

              {/* Account Management */}
              <div className="bg-white rounded-xl p-6 shadow-soft">
                <h3 className="font-bold text-xl text-deep mb-4 flex items-center gap-2">
                  <Wrench className="w-5 h-5 text-calm" />
                  Account Management
                </h3>
                <ul className="space-y-3">
                  {popularArticles
                    .filter(a => a.category === 'account')
                    .slice(0, 5)
                    .map((article) => (
                      <li key={article.id}>
                        <Link 
                          href={`/help/${article.slug}`}
                          className="text-gray-700 hover:text-calm transition-colors flex items-center gap-2"
                        >
                          <ChevronRight className="w-4 h-4 text-gray-400" />
                          {article.title}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>

              {/* Payments & Billing */}
              <div className="bg-white rounded-xl p-6 shadow-soft">
                <h3 className="font-bold text-xl text-deep mb-4 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-calm" />
                  Payments & Billing
                </h3>
                <ul className="space-y-3">
                  {popularArticles
                    .filter(a => a.category === 'payments')
                    .slice(0, 5)
                    .map((article) => (
                      <li key={article.id}>
                        <Link 
                          href={`/help/${article.slug}`}
                          className="text-gray-700 hover:text-calm transition-colors flex items-center gap-2"
                        >
                          <ChevronRight className="w-4 h-4 text-gray-400" />
                          {article.title}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </section>
        )}

        {/* Filtered Articles */}
        {(selectedCategory || searchQuery) && (
          <section className="mb-12">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-deep">
                  {selectedCategory 
                    ? categoryData[selectedCategory as keyof typeof categoryData]?.title 
                    : 'Search Results'}
                </h2>
                <p className="text-gray-600">
                  {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''} found
                </p>
              </div>
              {(selectedCategory || searchQuery) && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedCategory(null)
                    setSearchQuery('')
                  }}
                >
                  Clear Filters
                </Button>
              )}
            </div>

            <div className="grid gap-4">
              {filteredArticles.map((article) => (
                <Link
                  key={article.id}
                  href={`/help/${article.slug}`}
                  className="bg-white rounded-xl p-6 shadow-soft hover:shadow-medium transition-all duration-300 block"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-deep mb-2">{article.title}</h3>
                      <p className="text-gray-600 mb-3">{article.excerpt}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="capitalize">{article.category}</span>
                        <span>•</span>
                        <span>{article.view_count} views</span>
                        {article.is_featured && (
                          <>
                            <span>•</span>
                            <span className="text-sand font-medium">Featured</span>
                          </>
                        )}
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-calm mt-1 flex-shrink-0" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Contact Support Section */}
        <section className="bg-gradient-to-br from-deep to-calm rounded-2xl p-8 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Still Need Help?</h2>
            <p className="text-xl opacity-95 mb-8">Our support team is here to assist you with any questions or concerns</p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Mail className="w-12 h-12 mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2">Email Support</h3>
                <p className="opacity-90 mb-4">support@covetalks.com</p>
                <Link href="mailto:support@covetalks.com" className="text-sand font-medium hover:underline">
                  Send Email →
                </Link>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <MessageCircle className="w-12 h-12 mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2">Live Chat</h3>
                <p className="opacity-90 mb-4">Mon-Fri, 9am-6pm EST</p>
                <Link href="/contact" className="text-sand font-medium hover:underline">
                  Start Chat →
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
