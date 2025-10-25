import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Create Supabase admin client
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)

export async function POST(request: NextRequest) {
  console.log('📝 Signup request received')
  
  try {
    const body = await request.json()
    const { email, password, name, userType, planId } = body

    console.log('Request data:', { email, name, userType, planId })

    // Validate required fields
    if (!email || !password || !name || !userType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // First check if email already exists in members table
    const { data: existingMember } = await supabaseAdmin
      .from('members')
      .select('id, email')
      .eq('email', email)
      .single()

    if (existingMember) {
      console.log('Member already exists with this email')
      return NextResponse.json(
        { error: 'An account with this email already exists' },
        { status: 400 }
      )
    }

    // Create user in Supabase Auth
    console.log('Creating user in Supabase Auth...')
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        name,
        user_type: userType,
        plan_id: planId || 'free'
      }
    })

    if (authError) {
      console.error('Auth error:', authError)
      
      if (authError.message?.includes('already registered')) {
        return NextResponse.json(
          { error: 'An account with this email already exists' },
          { status: 400 }
        )
      }
      
      return NextResponse.json(
        { error: authError.message },
        { status: 400 }
      )
    }

    console.log('User created in Auth:', authData.user.id)
    
    // Check if member with this ID already exists (from previous failed attempt)
    const { data: existingMemberById } = await supabaseAdmin
      .from('members')
      .select('id')
      .eq('id', authData.user.id)
      .single()

    if (existingMemberById) {
      console.log('Member record already exists for this ID, updating instead...')
      
      // Update existing member record
      const { data: updatedMember, error: updateError } = await supabaseAdmin
        .from('members')
        .update({
          email,
          name,
          member_type: userType === 'speaker' ? 'Speaker' : 'Organization',
          updated_at: new Date().toISOString()
        })
        .eq('id', authData.user.id)
        .select()
        .single()

      if (updateError) {
        console.error('Update error:', updateError)
        await supabaseAdmin.auth.admin.deleteUser(authData.user.id)
        return NextResponse.json(
          { error: 'Failed to update user profile', details: updateError.message },
          { status: 500 }
        )
      }

      console.log('✅ Member profile updated successfully')
      
      return NextResponse.json({
        user: {
          id: authData.user.id,
          email: authData.user.email,
          name,
          userType,
          planId
        },
        message: 'Account created successfully'
      })
    }

    // Create new member profile
    console.log('Creating member profile...')
    
    const memberType = userType === 'speaker' ? 'Speaker' : 'Organization'
    const memberInsert = {
      id: authData.user.id,
      email,
      name,
      member_type: memberType
    }

    console.log('Inserting member with data:', memberInsert)

    const { data: insertedMember, error: memberError } = await supabaseAdmin
      .from('members')
      .insert(memberInsert)
      .select()
      .single()

    if (memberError) {
      console.error('Member creation error:', memberError)
      console.error('Error details:', {
        code: memberError.code,
        message: memberError.message,
        details: memberError.details,
        hint: memberError.hint
      })
      
      // Clean up auth user if member creation fails
      console.log('Cleaning up auth user...')
      await supabaseAdmin.auth.admin.deleteUser(authData.user.id)
      
      return NextResponse.json(
        { 
          error: 'Failed to create user profile',
          details: memberError.message,
          hint: memberError.hint
        },
        { status: 500 }
      )
    }

    console.log('✅ Member profile created successfully:', insertedMember)

    // If organization type, try to create organization record
    if (userType === 'organization') {
      console.log('Creating organization record...')
      
      const { data: orgData, error: orgError } = await supabaseAdmin
        .from('organizations')
        .insert({
          id: authData.user.id,
          name: name
        })
        .select()

      if (orgError) {
        console.error('Organization creation error (non-fatal):', orgError)
      } else {
        console.log('Organization created:', orgData)
      }

      // Try to create organization_member link
      const { error: linkError } = await supabaseAdmin
        .from('organization_members')
        .insert({
          organization_id: authData.user.id,
          member_id: authData.user.id,
          role: 'Owner'
        })

      if (linkError) {
        console.error('Organization link error (non-fatal):', linkError)
      }
    }

    console.log('✅ Signup successful!')

    // Return success with user data
    return NextResponse.json({
      user: {
        id: authData.user.id,
        email: authData.user.email,
        name,
        userType,
        planId
      },
      message: 'Account created successfully'
    })

  } catch (error: any) {
    console.error('Unexpected signup error:', error)
    console.error('Error stack:', error.stack)
    
    return NextResponse.json(
      { 
        error: 'An error occurred during signup',
        details: error.message
      },
      { status: 500 }
    )
  }
}

// Test endpoint
export async function GET() {
  const { count, error } = await supabaseAdmin
    .from('members')
    .select('*', { count: 'exact', head: true })

  return NextResponse.json({
    status: 'Signup API is running',
    configured: {
      supabase_url: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      service_role_key: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      database_connected: !error
    },
    database: {
      members_count: count || 0,
      connection_error: error?.message || null
    }
  })
}
