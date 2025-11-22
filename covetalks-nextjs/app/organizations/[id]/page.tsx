import { createClient } from '@/lib/supabase/server'
import { createClient as createDirectClient } from '@supabase/supabase-js'
import { notFound } from 'next/navigation'
import OrganizationDetailClient from './OrganizationDetailClient'
import type { Metadata } from 'next'

// Server Component - Fetches data on server for SEO
export default async function OrganizationDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const supabase = await createClient()

  // Fetch organization data
  const { data: organization, error } = await supabase
    .from('organizations')
    .select('*')
    .eq('id', params.id)
    .single()

  // If organization not found, show 404
  if (error || !organization) {
    notFound()
  }

  // Pass server data to client component for interactivity
  return <OrganizationDetailClient organization={organization} />
}

// ============================================================================
// ISR - Revalidate every 5 minutes
// ============================================================================
export const revalidate = 300 // 5 minutes

// ============================================================================
// Static Generation - Pre-generate top 200 most active organizations at build time
// ============================================================================
export async function generateStaticParams() {
  // Use direct Supabase client for build-time (no cookies needed)
  const supabase = createDirectClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  // Get organizations with most activity (you can adjust this query)
  // For now, we'll get verified organizations first, then others
  const { data: organizations } = await supabase
    .from('organizations')
    .select('id')
    .order('verified', { ascending: false })
    .order('created_at', { ascending: false })
    .limit(200) // Pre-build top 200 at build time

  // Generate static pages for these organizations
  return organizations?.map((org) => ({
    id: org.id,
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

  const { data: organization } = await supabase
    .from('organizations')
    .select('name, description, organization_type, industry, city, state, logo_url')
    .eq('id', params.id)
    .single()

  if (!organization) {
    return {
      title: 'Organization Not Found | CoveTalks',
    }
  }

  const title = `${organization.name} | CoveTalks`
  const description = organization.description 
    ? `${organization.description.substring(0, 155)}...`
    : `${organization.organization_type} organization ${organization.city && organization.state ? `in ${organization.city}, ${organization.state}` : ''} seeking professional speakers.`

  const locationStr = organization.city && organization.state 
    ? `${organization.city}, ${organization.state}` 
    : ''

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      siteName: 'CoveTalks',
      images: organization.logo_url ? [{ url: organization.logo_url }] : [],
    },
    twitter: {
      card: 'summary',
      title,
      description,
      images: organization.logo_url ? [organization.logo_url] : [],
    },
    alternates: {
      canonical: `https://covetalks.com/organizations/${params.id}`,
    },
    keywords: [
      organization.name,
      organization.organization_type,
      organization.industry,
      'speaking opportunities',
      'professional speakers',
      locationStr,
      'CoveTalks'
    ].filter(Boolean),
  }
}