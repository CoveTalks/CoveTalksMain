import { createClient } from '@supabase/supabase-js'
import type { Database } from './database.types'

// Public client for fetching data that doesn't require authentication
export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    auth: {
      persistSession: false
    }
  }
)

// Helper functions for public data fetching
export const publicQueries = {
  // Fetch featured speakers
  async getFeaturedSpeakers(limit = 6) {
    const { data, error } = await supabase
      .from('members')
      .select(`
        id,
        name,
        bio,
        location,
        specialties,
        profile_image_url,
        average_rating,
        total_reviews
      `)
      .eq('member_type', 'Speaker')
      .gte('average_rating', 4.0)
      .order('total_reviews', { ascending: false })
      .limit(limit)

    if (error) {
      console.error('Error fetching featured speakers:', error)
      return []
    }
    return data || []
  },

  // Fetch all speakers with filters
  async getSpeakers(filters?: {
    search?: string
    specialties?: string[]
    location?: string
    minRating?: number
    limit?: number
    offset?: number
  }) {
    let query = supabase
      .from('members')
      .select(`
        id,
        name,
        bio,
        location,
        specialties,
        profile_image_url,
        average_rating,
        total_reviews,
        website
      `, { count: 'exact' })
      .eq('member_type', 'Speaker')

    if (filters?.search) {
      query = query.or(`name.ilike.%${filters.search}%,bio.ilike.%${filters.search}%`)
    }

    if (filters?.specialties && filters.specialties.length > 0) {
      query = query.contains('specialties', filters.specialties)
    }

    if (filters?.location) {
      query = query.ilike('location', `%${filters.location}%`)
    }

    if (filters?.minRating) {
      query = query.gte('average_rating', filters.minRating)
    }

    // Pagination
    const limit = filters?.limit || 12
    const offset = filters?.offset || 0
    query = query.range(offset, offset + limit - 1)
    
    // Default sorting by rating and reviews
    query = query.order('average_rating', { ascending: false })
      .order('total_reviews', { ascending: false })

    const { data, error, count } = await query

    if (error) {
      console.error('Error fetching speakers:', error)
      return { speakers: [], total: 0 }
    }

    return {
      speakers: data || [],
      total: count || 0
    }
  },

  // Fetch speaking opportunities
  async getOpportunities(filters?: {
    search?: string
    topics?: string[]
    location?: string
    eventFormat?: 'In-Person' | 'Virtual' | 'Hybrid'
    minCompensation?: number
    limit?: number
    offset?: number
  }) {
    let query = supabase
      .from('speaking_opportunities')
      .select(`
        *,
        organization:organizations(
          id,
          name,
          logo_url
        ),
        posted_by:members!posted_by(
          id,
          name
        )
      `, { count: 'exact' })
      .eq('status', 'Open')
      .gte('event_date', new Date().toISOString())

    if (filters?.search) {
      query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`)
    }

    if (filters?.topics && filters.topics.length > 0) {
      query = query.contains('topics', filters.topics)
    }

    if (filters?.location) {
      query = query.or(`location.ilike.%${filters.location}%,event_format.eq.Virtual`)
    }

    if (filters?.eventFormat) {
      query = query.eq('event_format', filters.eventFormat)
    }

    if (filters?.minCompensation) {
      query = query.gte('compensation_amount', filters.minCompensation)
    }

    // Pagination
    const limit = filters?.limit || 12
    const offset = filters?.offset || 0
    query = query.range(offset, offset + limit - 1)
    
    // Sort by event date
    query = query.order('event_date', { ascending: true })

    const { data, error, count } = await query

    if (error) {
      console.error('Error fetching opportunities:', error)
      return { opportunities: [], total: 0 }
    }

    return {
      opportunities: data || [],
      total: count || 0
    }
  },

  // Get single speaker profile
  async getSpeakerProfile(speakerId: string) {
    const { data, error } = await supabase
      .from('members')
      .select(`
        *,
        reviews(
          id,
          rating,
          comment,
          created_at,
          reviewer:members!reviewer_id(name)
        )
      `)
      .eq('id', speakerId)
      .eq('member_type', 'Speaker')
      .single()

    if (error) {
      console.error('Error fetching speaker profile:', error)
      return null
    }

    return data
  },

  // Get single opportunity details
  async getOpportunityDetails(opportunityId: string) {
    const { data, error } = await supabase
      .from('speaking_opportunities')
      .select(`
        *,
        organization:organizations(
          id,
          name,
          logo_url,
          website,
          description
        ),
        posted_by:members!posted_by(
          id,
          name,
          email
        )
      `)
      .eq('id', opportunityId)
      .single()

    if (error) {
      console.error('Error fetching opportunity details:', error)
      return null
    }

    return data
  },

  // Get testimonials for homepage
  async getTestimonials(limit = 3) {
    const { data, error } = await supabase
      .from('reviews')
      .select(`
        id,
        rating,
        comment,
        created_at,
        reviewer:members!reviewer_id(
          name,
          profile_image_url,
          member_type
        ),
        speaker:members!speaker_id(
          name
        )
      `)
      .gte('rating', 4)
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) {
      console.error('Error fetching testimonials:', error)
      return []
    }

    return data || []
  }
}
