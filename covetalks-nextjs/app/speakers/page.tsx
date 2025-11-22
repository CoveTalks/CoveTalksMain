import { createClient } from '@/lib/supabase/server'
import SpeakersClientWrapper from './SpeakersClientWrapper'
import type { Metadata } from 'next'

// Server Component - Fast initial load with SEO-friendly URL params
export default async function SpeakersPage({
  searchParams,
}: {
  searchParams: { 
    page?: string
    specialty?: string
    location?: string
    minRating?: string
    search?: string
  }
}) {
  const supabase = await createClient()
  
  // Parse URL parameters
  const currentPage = parseInt(searchParams.page || '1', 10)
  const SPEAKERS_PER_PAGE = 12
  const offset = (currentPage - 1) * SPEAKERS_PER_PAGE

  // Build query based on URL parameters
  let query = supabase
    .from('members')
    .select('*', { count: 'exact' })
    .eq('member_type', 'Speaker')

  // Apply filters from URL
  if (searchParams.search) {
    query = query.or(`name.ilike.%${searchParams.search}%,bio.ilike.%${searchParams.search}%,location.ilike.%${searchParams.search}%`)
  }

  if (searchParams.specialty) {
    query = query.contains('specialties', [searchParams.specialty])
  }

  if (searchParams.location) {
    query = query.ilike('location', `%${searchParams.location}%`)
  }

  if (searchParams.minRating) {
    const minRating = parseFloat(searchParams.minRating)
    query = query.gte('average_rating', minRating)
  }

  // Fetch speakers with pagination
  const { data: speakers, error, count } = await query
    .order('average_rating', { ascending: false })
    .order('name')
    .range(offset, offset + SPEAKERS_PER_PAGE - 1)

  if (error) {
    console.error('Error fetching speakers:', error)
  }

  // Calculate pagination
  const totalPages = Math.ceil((count || 0) / SPEAKERS_PER_PAGE)

  // Fetch all unique specialties for filter dropdown
  const { data: allSpeakers } = await supabase
    .from('members')
    .select('specialties')
    .eq('member_type', 'Speaker')
    .not('specialties', 'is', null)

  // Get unique specialties
  const allSpecialties = new Set<string>()
  allSpeakers?.forEach(speaker => {
    speaker.specialties?.forEach((specialty: string) => {
      allSpecialties.add(specialty)
    })
  })
  const availableSpecialties = Array.from(allSpecialties).sort()

  // Pass server data to client component for interactivity
  return (
    <SpeakersClientWrapper 
      initialSpeakers={speakers || []}
      currentPage={currentPage}
      totalPages={totalPages}
      totalCount={count || 0}
      speakersPerPage={SPEAKERS_PER_PAGE}
      availableSpecialties={availableSpecialties}
      initialFilters={{
        search: searchParams.search || '',
        specialty: searchParams.specialty || '',
        location: searchParams.location || '',
        minRating: searchParams.minRating || ''
      }}
    />
  )
}

// Enable ISR (Incremental Static Regeneration)
// Revalidate every 60 seconds
export const revalidate = 60

// Generate metadata for SEO
export async function generateMetadata({
  searchParams,
}: {
  searchParams: { 
    specialty?: string
    location?: string
    minRating?: string
    search?: string
  }
}): Promise<Metadata> {
  let title = 'Find Professional Speakers | CoveTalks'
  let description = 'Browse our curated network of professional speakers. Find experts in leadership, innovation, technology, business strategy, and more for your next event.'

  // Customize metadata based on filters for better SEO
  if (searchParams.specialty || searchParams.location || searchParams.minRating) {
    const filters = []
    if (searchParams.specialty) filters.push(searchParams.specialty)
    if (searchParams.location) filters.push(`in ${searchParams.location}`)
    if (searchParams.minRating) filters.push(`${searchParams.minRating}+ star rated`)
    
    title = `${filters.join(' ')} Speakers | CoveTalks`
    description = `Find professional ${filters.join(' ')} speakers for your next event.`
  }

  if (searchParams.search) {
    title = `Search: ${searchParams.search} | Speakers | CoveTalks`
    description = `Search results for "${searchParams.search}" in professional speakers.`
  }

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      siteName: 'CoveTalks',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: 'https://covetalks.com/speakers',
    },
  }
}