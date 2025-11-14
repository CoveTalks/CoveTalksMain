import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') || ''
    const organizationType = searchParams.get('organizationType') || ''
    const industry = searchParams.get('industry') || ''
    const location = searchParams.get('location') || ''
    const limit = parseInt(searchParams.get('limit') || '12')
    const offset = parseInt(searchParams.get('offset') || '0')

    const supabase = await createClient()

    // Build the query
    let query = supabase
      .from('organizations')
      .select('*', { count: 'exact' })

    // Apply filters
    if (search) {
      query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%,industry.ilike.%${search}%`)
    }

    if (organizationType) {
      query = query.eq('organization_type', organizationType)
    }

    if (industry) {
      query = query.eq('industry', industry)
    }

    if (location) {
      query = query.or(`location.ilike.%${location}%,city.ilike.%${location}%,state.ilike.%${location}%,country.ilike.%${location}%`)
    }

    // Apply pagination and ordering
    const { data: organizations, error, count } = await query
      .order('name')
      .range(offset, offset + limit - 1)

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch organizations' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      organizations: organizations || [],
      total: count || 0,
      limit,
      offset
    })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}