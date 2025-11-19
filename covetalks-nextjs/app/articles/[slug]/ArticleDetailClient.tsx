'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { 
  Calendar, 
  Clock, 
  ArrowLeft, 
  Linkedin, 
  Twitter, 
  Facebook,
  Link as LinkIcon,
  Check
} from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface Article {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  featured_image_url: string
  featured_image_alt: string
  category_name: string
  category_slug: string
  category_color: string
  author_name: string
  author_slug: string
  author_avatar: string
  author_bio: string
  published_at: string
  reading_time_minutes: number
  tags: string[]
}

interface RelatedArticle {
  id: string
  title: string
  slug: string
  excerpt: string
  featured_image_url: string
  category_name: string
  author_name: string
  published_at: string
  reading_time_minutes: number
}

interface Props {
  article: Article
  relatedArticles: RelatedArticle[]
}

export default function ArticleDetailClient({ article, relatedArticles }: Props) {
  const [copied, setCopied] = useState(false)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    })
  }

  const shareOnLinkedIn = () => {
    const url = encodeURIComponent(window.location.href)
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      '_blank',
      'width=600,height=600'
    )
  }

  const shareOnTwitter = () => {
    const url = encodeURIComponent(window.location.href)
    const text = encodeURIComponent(article.title)
    window.open(
      `https://twitter.com/intent/tweet?url=${url}&text=${text}&via=CoveTalks`,
      '_blank',
      'width=600,height=600'
    )
  }

  const shareOnFacebook = () => {
    const url = encodeURIComponent(window.location.href)
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      '_blank',
      'width=600,height=600'
    )
  }

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      {/* Back Button */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <Link 
          href="/articles"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Articles
        </Link>
      </div>

      {/* Article Header */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-8">
          {/* Category Badge */}
          <Link href={`/articles?category=${article.category_slug}`}>
            <span
              className="inline-block px-3 py-1 rounded-full text-sm font-medium mb-4 cursor-pointer hover:opacity-80 transition-opacity"
              style={{ 
                backgroundColor: `${article.category_color}20`, 
                color: article.category_color 
              }}
            >
              {article.category_name}
            </span>
          </Link>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {article.title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-6">
            <div className="flex items-center">
              {article.author_avatar && (
                <div className="relative w-10 h-10 mr-3">
                  <Image 
                    src={article.author_avatar} 
                    alt={article.author_name}
                    fill
                    className="rounded-full object-cover"
                    sizes="40px"
                  />
                </div>
              )}
              <div>
                <p className="font-medium text-gray-900">{article.author_name}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              {formatDate(article.published_at)}
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              {article.reading_time_minutes} min read
            </div>
          </div>

          {/* Featured Image */}
          {article.featured_image_url && (
            <div className="mb-8 rounded-xl overflow-hidden relative h-[400px]">
              <Image
                src={article.featured_image_url}
                alt={article.featured_image_alt || article.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 896px"
                priority
              />
            </div>
          )}
        </header>

        {/* Share Buttons - Sticky on Desktop */}
        <div className="lg:fixed lg:left-8 lg:top-1/3 flex lg:flex-col gap-3 mb-8 lg:mb-0">
          <button
            onClick={shareOnLinkedIn}
            className="p-3 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow border border-gray-200 hover:border-blue-600 group"
            aria-label="Share on LinkedIn"
          >
            <Linkedin className="h-5 w-5 text-gray-600 group-hover:text-blue-600" />
          </button>
          <button
            onClick={shareOnTwitter}
            className="p-3 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow border border-gray-200 hover:border-sky-500 group"
            aria-label="Share on Twitter"
          >
            <Twitter className="h-5 w-5 text-gray-600 group-hover:text-sky-500" />
          </button>
          <button
            onClick={shareOnFacebook}
            className="p-3 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow border border-gray-200 hover:border-blue-600 group"
            aria-label="Share on Facebook"
          >
            <Facebook className="h-5 w-5 text-gray-600 group-hover:text-blue-600" />
          </button>
          <button
            onClick={copyLink}
            className="p-3 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow border border-gray-200 hover:border-green-600 group relative"
            aria-label="Copy link"
          >
            {copied ? (
              <Check className="h-5 w-5 text-green-600" />
            ) : (
              <LinkIcon className="h-5 w-5 text-gray-600 group-hover:text-green-600" />
            )}
          </button>
        </div>

        {/* Article Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 md:p-12 mb-12">
          <div className="prose prose-lg max-w-none">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({node, ...props}) => <h1 className="text-3xl font-bold mt-8 mb-4 text-gray-900" {...props} />,
                h2: ({node, ...props}) => <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900" {...props} />,
                h3: ({node, ...props}) => <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-900" {...props} />,
                p: ({node, ...props}) => <p className="mb-4 leading-relaxed text-gray-700" {...props} />,
                a: ({node, ...props}) => <a className="text-blue-600 hover:text-blue-800 underline" {...props} />,
                ul: ({node, ...props}) => <ul className="list-disc list-inside mb-4 space-y-2" {...props} />,
                ol: ({node, ...props}) => <ol className="list-decimal list-inside mb-4 space-y-2" {...props} />,
                blockquote: ({node, ...props}) => (
                  <blockquote className="border-l-4 border-blue-500 pl-4 italic my-4 text-gray-600" {...props} />
                ),
                code: ({node, inline, ...props}: any) => 
                  inline ? (
                    <code className="bg-gray-100 px-2 py-1 rounded text-sm" {...props} />
                  ) : (
                    <code className="block bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto" {...props} />
                  ),
                img: ({node, ...props}) => (
                  <span className="block relative my-6 h-96">
                    <Image 
                      src={props.src || ''} 
                      alt={props.alt || ''} 
                      fill
                      className="object-cover rounded-lg"
                      sizes="(max-width: 768px) 100vw, 896px"
                    />
                  </span>
                ),
              }}
            >
              {article.content}
            </ReactMarkdown>
          </div>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Tags:</h3>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Author Bio */}
        {article.author_bio && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8 mb-12">
            <div className="flex items-start gap-4">
              {article.author_avatar && (
                <div className="relative w-16 h-16 flex-shrink-0">
                  <Image
                    src={article.author_avatar}
                    alt={article.author_name}
                    fill
                    className="rounded-full object-cover"
                    sizes="64px"
                  />
                </div>
              )}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  About {article.author_name}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {article.author_bio}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Related Articles
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedArticles.map((related) => (
                <Link 
                  key={related.id} 
                  href={`/articles/${related.slug}`}
                  className="block group"
                >
                  <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden h-full">
                    <div className="relative h-40">
                      {related.featured_image_url ? (
                        <Image
                          src={related.featured_image_url}
                          alt={related.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200"></div>
                      )}
                    </div>
                    <div className="p-4">
                      <p className="text-xs text-gray-500 mb-2">
                        {related.category_name} • {related.reading_time_minutes} min read
                      </p>
                      <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-2">
                        {related.title}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {related.excerpt}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Mobile Share Buttons */}
        <div className="lg:hidden bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Share this article</h3>
          <div className="flex gap-3">
            <button
              onClick={shareOnLinkedIn}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Linkedin className="h-5 w-5" />
              LinkedIn
            </button>
            <button
              onClick={shareOnTwitter}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
            >
              <Twitter className="h-5 w-5" />
              Twitter
            </button>
            <button
              onClick={copyLink}
              className="flex items-center justify-center px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              {copied ? <Check className="h-5 w-5" /> : <LinkIcon className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </article>
    </div>
  )
}