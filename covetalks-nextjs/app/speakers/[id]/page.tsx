import { createClient } from '@/lib/supabase/server'
import { createClient as createDirectClient } from '@supabase/supabase-js'
import { notFound } from 'next/navigation'
import SpeakerDetailClient from './SpeakerDetailClient'
import type { Metadata } from 'next'

// Server Component - Fetches data on server for SEO
export default async function SpeakerDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const supabase = await createClient()

  // Fetch speaker data
  const { data: speaker, error } = await supabase
    .from('members')
    .select('*')
    .eq('id', params.id)
    .eq('member_type', 'Speaker')
    .single()

  // If speaker not found, show 404
  if (error || !speaker) {
    notFound()
  }

  // Pass server data to client component for interactivity
  return <SpeakerDetailClient speaker={speaker} />
}

// ============================================================================
// ISR - Revalidate every 5 minutes
// ============================================================================
export const revalidate = 300 // 5 minutes

// ============================================================================
// Static Generation - Pre-generate top 200 most active speakers at build time
// ============================================================================
export async function generateStaticParams() {
  // Use direct Supabase client for build-time (no cookies needed)
  const supabase = createDirectClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  // Get speakers with highest ratings and most reviews
  const { data: speakers } = await supabase
    .from('members')
    .select('id')
    .eq('member_type', 'Speaker')
    .order('average_rating', { ascending: false })
    .order('total_reviews', { ascending: false })
    .limit(200) // Pre-build top 200 at build time

  // Generate static pages for these speakers
  return speakers?.map((speaker) => ({
    id: speaker.id,
  })) || []
}

// ============================================================================
// SEO Metadata - Generated on server
// ============================================================================
export async function generateMetadata({
  params,
}: {
  params: { id: string }
}): Promise<Metadata> {
  // Use direct Supabase client for metadata generation
  const supabase = createDirectClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const { data: speaker } = await supabase
    .from('members')
    .select('name, bio, location, specialties, profile_image_url, average_rating')
    .eq('id', params.id)
    .eq('member_type', 'Speaker')
    .single()

  if (!speaker) {
    return {
      title: 'Speaker Not Found | CoveTalks',
    }
  }

  const title = `${speaker.name} - Professional Speaker | CoveTalks`
  const description = speaker.bio 
    ? `${speaker.bio.substring(0, 155)}...`
    : `Professional speaker specializing in ${speaker.specialties?.slice(0, 3).join(', ') || 'various topics'}. ${speaker.location ? `Based in ${speaker.location}.` : ''}`

  const specialtiesStr = speaker.specialties?.join(', ') || ''

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'profile',
      siteName: 'CoveTalks',
      images: speaker.profile_image_url ? [{ url: speaker.profile_image_url }] : [],
    },
    twitter: {
      card: 'summary',
      title,
      description,
      images: speaker.profile_image_url ? [speaker.profile_image_url] : [],
    },
    alternates: {
      canonical: `https://covetalks.com/speakers/${params.id}`,
    },
    keywords: [
      speaker.name,
      'professional speaker',
      'keynote speaker',
      specialtiesStr,
      speaker.location,
      'CoveTalks'
    ].filter(Boolean),
  }
}