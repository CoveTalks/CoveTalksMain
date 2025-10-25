import { Metadata } from 'next'
import FAQClient from './faq-client'
import { createServerSupabaseClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description: 'Find answers to common questions about CoveTalks, speaker booking, and our platform features.',
}

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

async function getFAQs() {
  const supabase = createServerSupabaseClient()
  
  const { data: faqs, error } = await supabase
    .from('faqs')
    .select('*')
    .eq('published', true)  // Changed from is_published to published
    .order('sort_order', { ascending: true })
    .order('helpful_count', { ascending: false })

  if (error) {
    console.error('Error fetching FAQs:', error)
    return []
  }

  return faqs as FAQ[]
}

export default async function FAQPage() {
  const faqs = await getFAQs()

  return <FAQClient initialFaqs={faqs} />
}
