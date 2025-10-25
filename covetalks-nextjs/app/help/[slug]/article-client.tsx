'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronLeft, Clock, Eye, ThumbsUp, ThumbsDown, BookOpen, ChevronRight, Home, Copy, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { createClientSupabaseClient } from '@/lib/supabase/client'
import { toast } from '@/components/ui/use-toast'

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

interface HelpArticleClientProps {
  article: HelpArticle
  relatedArticles: HelpArticle[]
}

export default function HelpArticleClient({ article, relatedArticles }: HelpArticleClientProps) {
  const [hasVoted, setHasVoted] = useState(false)
  const [helpfulCount, setHelpfulCount] = useState(article.helpful_count)
  const [copied, setCopied] = useState(false)
  const [activeSection, setActiveSection] = useState<string>('')
  const supabase = createClientSupabaseClient()

  // Extract sections from content for table of contents
  const sections = article.content.match(/#{2,3}\s.+/g)?.map((heading) => {
    const level = heading.match(/^#{2,3}/)?.[0].length || 2
    const text = heading.replace(/^#{2,3}\s/, '')
    const id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
    return { id, text, level }
  }) || []

  useEffect(() => {
    // Handle scroll spy for table of contents
    const handleScroll = () => {
      const headings = document.querySelectorAll('h2, h3')
      let current = ''
      
      headings.forEach((heading) => {
        const rect = heading.getBoundingClientRect()
        if (rect.top <= 100) {
          current = heading.id
        }
      })
      
      setActiveSection(current)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleVote = async (helpful: boolean) => {
    if (hasVoted) {
      toast({
        title: "Already Voted",
        description: "You've already voted on this article.",
        variant: "default"
      })
      return
    }

    const { error } = await supabase
      .from('help_articles')
      .update({ helpful_count: helpfulCount + (helpful ? 1 : 0) })
      .eq('id', article.id)

    if (error) {
      toast({
        title: "Error",
        description: "Failed to submit your feedback. Please try again.",
        variant: "destructive"
      })
    } else {
      if (helpful) {
        setHelpfulCount(prev => prev + 1)
      }
      setHasVoted(true)
      
      toast({
        title: "Thank You!",
        description: "Your feedback has been recorded.",
      })
    }
  }

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    
    toast({
      title: "Link Copied!",
      description: "Article link has been copied to clipboard.",
    })
  }

  // Format the date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  // Calculate read time (assuming 200 words per minute)
  const readTime = Math.ceil(article.content.split(' ').length / 200)

  // Render markdown-like content
  const renderContent = () => {
    let html = article.content
    
    // Convert headers and add IDs
    html = html.replace(/^### (.+)$/gm, (match, p1) => {
      const id = p1.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
      return `<h3 id="${id}" class="text-xl font-bold text-calm mt-6 mb-3">${p1}</h3>`
    })
    
    html = html.replace(/^## (.+)$/gm, (match, p1) => {
      const id = p1.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
      return `<h2 id="${id}" class="text-2xl font-bold text-deep mt-8 mb-4 pt-4 border-t border-gray-200">${p1}</h2>`
    })
    
    // Convert bold text
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong class="font-bold">$1</strong>')
    
    // Convert italic text
    html = html.replace(/\*(.+?)\*/g, '<em class="italic">$1</em>')
    
    // Convert lists
    html = html.replace(/^- (.+)$/gm, '<li class="ml-6 mb-2">• $1</li>')
    html = html.replace(/^(\d+)\. (.+)$/gm, '<li class="ml-6 mb-2">$1. $2</li>')
    
    // Convert paragraphs
    html = html.split('\n\n').map(p => {
      if (p.startsWith('<h') || p.startsWith('<li')) return p
      return `<p class="mb-4 text-gray-700 leading-relaxed">${p}</p>`
    }).join('\n')
    
    return { __html: html }
  }

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-deep to-calm text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-5xl mx-auto">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm mb-6 opacity-90">
              <Link href="/" className="hover:text-sand transition-colors">
                <Home className="w-4 h-4" />
              </Link>
              <ChevronRight className="w-4 h-4" />
              <Link href="/help" className="hover:text-sand transition-colors">
                Help Center
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="capitalize">{article.category}</span>
            </nav>

            {/* Article Header */}
            <h1 className="text-3xl md:text-4xl font-black mb-4">{article.title}</h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm opacity-90">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{readTime} min read</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                <span>{article.view_count} views</span>
              </div>
              <div className="flex items-center gap-1">
                <ThumbsUp className="w-4 h-4" />
                <span>{helpfulCount} found helpful</span>
              </div>
              <span>•</span>
              <span>Last updated {formatDate(article.updated_at)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-[250px_1fr_250px] gap-8">
            {/* Left Sidebar - Table of Contents */}
            {sections.length > 0 && (
              <aside className="hidden lg:block">
                <div className="sticky top-24">
                  <div className="bg-white rounded-xl p-6 shadow-soft">
                    <h3 className="font-bold text-deep mb-4">Table of Contents</h3>
                    <nav className="space-y-2">
                      {sections.map((section) => (
                        <a
                          key={section.id}
                          href={`#${section.id}`}
                          className={cn(
                            "block text-sm transition-colors py-1",
                            section.level === 3 && "pl-4",
                            activeSection === section.id
                              ? "text-calm font-medium border-l-2 border-calm pl-3"
                              : "text-gray-600 hover:text-calm border-l-2 border-transparent pl-3"
                          )}
                        >
                          {section.text}
                        </a>
                      ))}
                    </nav>
                  </div>
                </div>
              </aside>
            )}

            {/* Main Content */}
            <article className="bg-white rounded-xl p-8 shadow-soft">
              {/* Article Content */}
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={renderContent()}
              />

              {/* Tags */}
              {article.tags && article.tags.length > 0 && (
                <div className="mt-8 pt-6 border-t">
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-foam text-sm font-medium text-gray-600 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Feedback Section */}
              <div className="mt-8 pt-6 border-t">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-bold text-deep mb-4">Was this article helpful?</h3>
                  <div className="flex items-center gap-4 mb-4">
                    <Button
                      variant={hasVoted ? "outline" : "default"}
                      onClick={() => handleVote(true)}
                      disabled={hasVoted}
                      className="flex items-center gap-2"
                    >
                      <ThumbsUp className="w-4 h-4" />
                      Yes ({helpfulCount})
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleVote(false)}
                      disabled={hasVoted}
                      className="flex items-center gap-2"
                    >
                      <ThumbsDown className="w-4 h-4" />
                      No
                    </Button>
                    <Button
                      variant="outline"
                      onClick={copyLink}
                      className="flex items-center gap-2"
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          Share
                        </>
                      )}
                    </Button>
                  </div>
                  <p className="text-sm text-gray-600">
                    Still need help? <Link href="/contact" className="text-calm hover:underline">Contact our support team</Link>
                  </p>
                </div>
              </div>
            </article>

            {/* Right Sidebar - Related Articles */}
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <div className="bg-white rounded-xl p-6 shadow-soft">
                  <h3 className="font-bold text-deep mb-4">Related Articles</h3>
                  <div className="space-y-3">
                    {relatedArticles.length > 0 ? (
                      relatedArticles.map((related) => (
                        <Link
                          key={related.id}
                          href={`/help/${related.slug}`}
                          className="block group"
                        >
                          <h4 className="text-sm font-medium text-gray-700 group-hover:text-calm transition-colors mb-1">
                            {related.title}
                          </h4>
                          <p className="text-xs text-gray-500">
                            {related.view_count} views
                          </p>
                        </Link>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500">No related articles found</p>
                    )}
                  </div>

                  <div className="mt-6 pt-4 border-t">
                    <Link
                      href="/help"
                      className="flex items-center gap-2 text-calm hover:underline text-sm font-medium"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Back to Help Center
                    </Link>
                  </div>
                </div>

                {/* Quick Links */}
                <div className="bg-white rounded-xl p-6 shadow-soft mt-4">
                  <h3 className="font-bold text-deep mb-4">Quick Links</h3>
                  <div className="space-y-2">
                    <Link href="/faq" className="flex items-center gap-2 text-sm text-gray-600 hover:text-calm transition-colors">
                      <BookOpen className="w-4 h-4" />
                      FAQs
                    </Link>
                    <Link href="/contact" className="flex items-center gap-2 text-sm text-gray-600 hover:text-calm transition-colors">
                      <MessageCircle className="w-4 h-4" />
                      Contact Support
                    </Link>
                    <Link href="/pricing" className="flex items-center gap-2 text-sm text-gray-600 hover:text-calm transition-colors">
                      <CreditCard className="w-4 h-4" />
                      Pricing Plans
                    </Link>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </main>
  )
}
