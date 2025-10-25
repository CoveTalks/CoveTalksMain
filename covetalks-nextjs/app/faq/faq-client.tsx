'use client'

import { useState, useEffect, useMemo } from 'react'
import { Search, HelpCircle, MessageCircle, Mail, ChevronDown, ChevronUp, Info, Mic, Building, CreditCard, Settings, ThumbsUp, ThumbsDown, BookOpen } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { createClientSupabaseClient } from '@/lib/supabase/client'
import { toast } from '@/components/ui/use-toast'

interface FAQ {
  id: string
  question: string
  answer: string
  category: string
  sort_order: number
  is_featured: boolean
  published: boolean  // Changed from is_published
  view_count: number
  helpful_count: number
  not_helpful_count: number
  tags: string[] | null
  created_at: string
  updated_at: string
}

interface FAQClientProps {
  initialFaqs: FAQ[]
}

const categoryIcons = {
  general: <Info className="w-5 h-5" />,
  speakers: <Mic className="w-5 h-5" />,
  organizations: <Building className="w-5 h-5" />,
  billing: <CreditCard className="w-5 h-5" />,
  technical: <Settings className="w-5 h-5" />,
}

export default function FAQClient({ initialFaqs }: FAQClientProps) {
  const [faqs, setFaqs] = useState<FAQ[]>(initialFaqs)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())
  const [votedItems, setVotedItems] = useState<Set<string>>(new Set())
  const supabase = createClientSupabaseClient()

  // Calculate category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      all: faqs.length,
      general: 0,
      speakers: 0,
      organizations: 0,
      billing: 0,
      technical: 0,
    }
    
    faqs.forEach(faq => {
      if (faq.category && counts[faq.category] !== undefined) {
        counts[faq.category]++
      }
    })
    
    return counts
  }, [faqs])

  // Filter FAQs based on search and category
  const filteredFaqs = useMemo(() => {
    let filtered = faqs

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(faq => faq.category === selectedCategory)
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(faq =>
        faq.question.toLowerCase().includes(query) ||
        faq.answer.toLowerCase().includes(query) ||
        (faq.tags && faq.tags.some(tag => tag.toLowerCase().includes(query)))
      )
    }

    return filtered
  }, [faqs, selectedCategory, searchQuery])

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedItems)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
      // Track view count
      trackView(id)
    }
    setExpandedItems(newExpanded)
  }

  const trackView = async (faqId: string) => {
    await supabase
      .from('faqs')
      .update({ view_count: faqs.find(f => f.id === faqId)?.view_count || 0 + 1 })
      .eq('id', faqId)
  }

  const handleVote = async (faqId: string, helpful: boolean) => {
    if (votedItems.has(faqId)) {
      toast({
        title: "Already Voted",
        description: "You've already voted on this FAQ.",
        variant: "default"
      })
      return
    }

    const field = helpful ? 'helpful_count' : 'not_helpful_count'
    const faq = faqs.find(f => f.id === faqId)
    if (!faq) return

    const newCount = (helpful ? faq.helpful_count : faq.not_helpful_count) + 1

    const { error } = await supabase
      .from('faqs')
      .update({ [field]: newCount })
      .eq('id', faqId)

    if (error) {
      toast({
        title: "Error",
        description: "Failed to submit your feedback. Please try again.",
        variant: "destructive"
      })
    } else {
      // Update local state
      setFaqs(prev => prev.map(f => 
        f.id === faqId 
          ? { ...f, [field]: newCount }
          : f
      ))
      setVotedItems(prev => new Set(prev).add(faqId))
      
      toast({
        title: "Thank You!",
        description: "Your feedback has been recorded.",
      })
    }
  }

  const categories = [
    { id: 'all', label: 'All Questions', icon: null },
    { id: 'general', label: 'General', icon: categoryIcons.general },
    { id: 'speakers', label: 'For Speakers', icon: categoryIcons.speakers },
    { id: 'organizations', label: 'For Organizations', icon: categoryIcons.organizations },
    { id: 'billing', label: 'Billing', icon: categoryIcons.billing },
    { id: 'technical', label: 'Technical', icon: categoryIcons.technical },
  ]

  return (
    <main className="min-h-screen">
      {/* Hero Section with Gradient */}
      <div className="bg-gradient-to-br from-deep to-calm text-white">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-black mb-4">Frequently Asked Questions</h1>
            <p className="text-xl opacity-95 mb-8">Find quick answers to common questions about CoveTalks</p>
            
            {/* Search Bar */}
            <div className="bg-white rounded-full shadow-xl p-2 flex items-center max-w-2xl mx-auto">
              <Search className="w-5 h-5 text-calm ml-4" />
              <Input
                type="text"
                placeholder="Search FAQs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 border-0 focus:ring-0 text-deep text-lg"
              />
              <Button 
                className="bg-sand hover:bg-sand/90 text-white rounded-full px-6"
                onClick={() => setSearchQuery('')}
              >
                Clear
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Quick Links */}
        <div className="bg-white rounded-2xl shadow-soft p-6 mb-8">
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/help" className="flex items-center gap-2 text-deep hover:text-calm transition-colors">
              <BookOpen className="w-5 h-5" />
              <span className="font-medium">Help Center</span>
            </Link>
            <Link href="/contact" className="flex items-center gap-2 text-deep hover:text-calm transition-colors">
              <MessageCircle className="w-5 h-5" />
              <span className="font-medium">Contact Support</span>
            </Link>
            <Link href="/pricing" className="flex items-center gap-2 text-deep hover:text-calm transition-colors">
              <CreditCard className="w-5 h-5" />
              <span className="font-medium">View Pricing</span>
            </Link>
            <Link href="/how-it-works" className="flex items-center gap-2 text-deep hover:text-calm transition-colors">
              <HelpCircle className="w-5 h-5" />
              <span className="font-medium">How It Works</span>
            </Link>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={cn(
                "px-5 py-2.5 rounded-full border-2 font-semibold transition-all flex items-center gap-2",
                selectedCategory === category.id
                  ? "bg-gradient-to-r from-deep to-calm text-white border-transparent"
                  : "bg-white border-gray-200 text-gray-600 hover:border-calm hover:text-calm"
              )}
            >
              {category.icon}
              <span>{category.label}</span>
              <span className="ml-1 px-2 py-0.5 bg-white/20 rounded-full text-sm">
                {categoryCounts[category.id]}
              </span>
            </button>
          ))}
        </div>

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto space-y-4">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12">
              <HelpCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No FAQs Found</h3>
              <p className="text-gray-500">Try adjusting your search or browse all categories.</p>
            </div>
          ) : (
            filteredFaqs.map((faq) => (
              <div
                key={faq.id}
                className="bg-white rounded-xl shadow-soft hover:shadow-medium transition-all duration-300"
              >
                <button
                  onClick={() => toggleExpanded(faq.id)}
                  className="w-full px-6 py-4 flex items-start justify-between text-left hover:bg-gray-50 rounded-xl transition-colors"
                >
                  <div className="flex-1 pr-4">
                    <h3 className="text-lg font-bold text-deep mb-1">{faq.question}</h3>
                    <div className="flex items-center gap-3 text-sm text-gray-500">
                      <span className="capitalize">{faq.category}</span>
                      <span>•</span>
                      <span>{faq.view_count} views</span>
                      {faq.is_featured && (
                        <>
                          <span>•</span>
                          <span className="text-sand font-medium">Featured</span>
                        </>
                      )}
                    </div>
                  </div>
                  {expandedItems.has(faq.id) ? (
                    <ChevronUp className="w-5 h-5 text-calm flex-shrink-0 mt-1" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-calm flex-shrink-0 mt-1" />
                  )}
                </button>
                
                {expandedItems.has(faq.id) && (
                  <div className="px-6 pb-4 border-t">
                    <div className="pt-4 prose prose-gray max-w-none">
                      <p className="text-gray-700 whitespace-pre-wrap">{faq.answer}</p>
                    </div>
                    
                    {/* Feedback Section */}
                    <div className="mt-6 pt-4 border-t flex items-center justify-between">
                      <div className="text-sm text-gray-500">Was this helpful?</div>
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => handleVote(faq.id, true)}
                          className={cn(
                            "flex items-center gap-1 text-sm transition-colors",
                            votedItems.has(faq.id) ? "text-gray-400" : "text-gray-600 hover:text-green-600"
                          )}
                          disabled={votedItems.has(faq.id)}
                        >
                          <ThumbsUp className="w-4 h-4" />
                          <span>{faq.helpful_count}</span>
                        </button>
                        <button
                          onClick={() => handleVote(faq.id, false)}
                          className={cn(
                            "flex items-center gap-1 text-sm transition-colors",
                            votedItems.has(faq.id) ? "text-gray-400" : "text-gray-600 hover:text-red-600"
                          )}
                          disabled={votedItems.has(faq.id)}
                        >
                          <ThumbsDown className="w-4 h-4" />
                          <span>{faq.not_helpful_count}</span>
                        </button>
                      </div>
                    </div>
                    
                    {faq.tags && faq.tags.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {faq.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-foam text-xs font-medium text-gray-600 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Still Need Help Section */}
        <div className="mt-16 bg-gradient-to-br from-deep to-calm rounded-2xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
          <p className="text-xl opacity-95 mb-8">We're here to help you get the most out of CoveTalks</p>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <Link href="/contact" className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-colors">
              <MessageCircle className="w-12 h-12 mx-auto mb-3" />
              <h3 className="font-bold text-lg mb-2">Live Chat</h3>
              <p className="text-sm opacity-90">Mon-Fri, 9am-6pm EST</p>
            </Link>
            
            <Link href="mailto:support@covetalks.com" className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-colors">
              <Mail className="w-12 h-12 mx-auto mb-3" />
              <h3 className="font-bold text-lg mb-2">Email Us</h3>
              <p className="text-sm opacity-90">24-48 hour response</p>
            </Link>
            
            <Link href="/help" className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-colors">
              <BookOpen className="w-12 h-12 mx-auto mb-3" />
              <h3 className="font-bold text-lg mb-2">Help Center</h3>
              <p className="text-sm opacity-90">Browse all resources</p>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
