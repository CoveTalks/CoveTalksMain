import { NextRequest, NextResponse } from 'next/server'
import { publicQueries } from '@/lib/supabase/public-client'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    
    const filters = {
      search: searchParams.get('search') || undefined,
      topics: searchParams.get('topics')?.split(',').filter(Boolean),
      location: searchParams.get('location') || undefined,
      eventFormat: searchParams.get('eventFormat') as 'In-Person' | 'Virtual' | 'Hybrid' | undefined,
      minCompensation: searchParams.get('minCompensation') 
        ? parseFloat(searchParams.get('minCompensation')!)
        : undefined,
      limit: searchParams.get('limit') 
        ? parseInt(searchParams.get('limit')!)
        : 12,
      offset: searchParams.get('offset')
        ? parseInt(searchParams.get('offset')!)
        : 0
    }

    const result = await publicQueries.getOpportunities(filters)
    
    return NextResponse.json(result)
  } catch (error) {
    console.error('Error in opportunities API:', error)
    return NextResponse.json(
      { error: 'Failed to fetch opportunities' },
      { status: 500 }
    )
  }
}
