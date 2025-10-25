import { NextRequest, NextResponse } from 'next/server'
import { publicQueries } from '@/lib/supabase/public-client'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    
    const filters = {
      search: searchParams.get('search') || undefined,
      specialties: searchParams.get('specialties')?.split(',').filter(Boolean),
      location: searchParams.get('location') || undefined,
      minRating: searchParams.get('minRating') 
        ? parseFloat(searchParams.get('minRating')!) 
        : undefined,
      limit: searchParams.get('limit') 
        ? parseInt(searchParams.get('limit')!)
        : 12,
      offset: searchParams.get('offset')
        ? parseInt(searchParams.get('offset')!)
        : 0
    }

    const result = await publicQueries.getSpeakers(filters)
    
    return NextResponse.json(result)
  } catch (error) {
    console.error('Error in speakers API:', error)
    return NextResponse.json(
      { error: 'Failed to fetch speakers' },
      { status: 500 }
    )
  }
}
