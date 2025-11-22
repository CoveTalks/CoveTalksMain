import { createClient } from '@/lib/supabase/server'
import OrganizationsClientWrapper from './OrganizationsClientWrapper'
import type { Metadata } from 'next'

// Server Component - Fast initial load with SEO-friendly URL params
export default async function OrganizationsPage({
  searchParams,
}: {
  searchParams: { 
    page?: string
    type?: string
    industry?: string
    location?: string
    search?: string
  }
}) {
  const supabase = await createClient()
  
  // Parse URL parameters
  const currentPage = parseInt(searchParams.page || '1', 10)
  const ORGANIZATIONS_PER_PAGE = 24
  const offset = (currentPage - 1) * ORGANIZATIONS_PER_PAGE

  // Build query based on URL parameters
  let query = supabase
    .from('organizations')
    .select('*', { count: 'exact' })

  // Apply filters from URL
  if (searchParams.search) {
    query = query.or(`name.ilike.%${searchParams.search}%,description.ilike.%${searchParams.search}%,industry.ilike.%${searchParams.search}%`)
  }

  if (searchParams.type) {
    query = query.eq('organization_type', searchParams.type)
  }

  if (searchParams.industry) {
    query = query.eq('industry', searchParams.industry)
  }

  if (searchParams.location) {
    query = query.or(`location.ilike.%${searchParams.location}%,city.ilike.%${searchParams.location}%,state.ilike.%${searchParams.location}%,country.ilike.%${searchParams.location}%`)
  }

  // Fetch organizations with pagination
  const { data: organizations, error, count } = await query
    .order('name')
    .range(offset, offset + ORGANIZATIONS_PER_PAGE - 1)

  if (error) {
    console.error('Error fetching organizations:', error)
  }

  // Calculate pagination
  const totalPages = Math.ceil((count || 0) / ORGANIZATIONS_PER_PAGE)

  // Fetch filter options
  const [enumTypesResult, industriesResult] = await Promise.all([
    // Query ENUM values for organization_type (fast, always complete)
    supabase.rpc('get_organization_type_enum'),
    
    // Query distinct industry values from actual data
    supabase
      .from('organizations')
      .select('industry')
      .not('industry', 'is', null)
  ])

  // Get organization types from ENUM (already returns array of strings)
  const availableTypes = enumTypesResult.data || []

  // Get unique industry values from data
  const availableIndustries = Array.from(
    new Set(industriesResult.data?.map(o => o.industry).filter(Boolean))
  ).sort()

  // Pass server data to client component for interactivity
  return (
    <OrganizationsClientWrapper 
      initialOrganizations={organizations || []}
      currentPage={currentPage}
      totalPages={totalPages}
      totalCount={count || 0}
      organizationsPerPage={ORGANIZATIONS_PER_PAGE}
      availableTypes={availableTypes}
      availableIndustries={availableIndustries}
      initialFilters={{
        search: searchParams.search || '',
        type: searchParams.type || '',
        industry: searchParams.industry || '',
        location: searchParams.location || ''
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
    type?: string
    industry?: string
    location?: string
    search?: string
  }
}): Promise<Metadata> {
  let title = 'Browse Organizations | CoveTalks'
  let description = 'Discover organizations looking for professional speakers. Connect with non-profits, schools, churches, corporations, and associations seeking speakers for their events.'

  // Customize metadata based on filters for better SEO
  if (searchParams.type || searchParams.industry || searchParams.location) {
    const filters = []
    if (searchParams.type) filters.push(searchParams.type)
    if (searchParams.industry) filters.push(searchParams.industry)
    if (searchParams.location) filters.push(`in ${searchParams.location}`)
    
    title = `${filters.join(' ')} Organizations | CoveTalks`
    description = `Browse ${filters.join(' ')} organizations seeking professional speakers for their events.`
  }

  if (searchParams.search) {
    title = `Search: ${searchParams.search} | Organizations | CoveTalks`
    description = `Search results for "${searchParams.search}" in organizations looking for speakers.`
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
      canonical: 'https://covetalks.com/organizations',
    },
  }
}