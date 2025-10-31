import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { SignJWT } from 'jose'
import { nanoid } from 'nanoid'

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

// Generate a secure auto-login token
async function generateAutoLoginToken(userId: string, email: string): Promise<string> {
  const secret = new TextEncoder().encode(process.env.AUTH_SECRET || 'your-secret-key')
  
  const token = await new SignJWT({ 
    userId,
    email,
    purpose: 'auto-login',
    jti: nanoid(), // Unique token ID
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('5m') // Token expires in 5 minutes
    .sign(secret)
  
  return token
}

export async function POST(request: NextRequest) {
  console.log('🔐 Signup request received')
  
  try {
    const body = await request.json()
    const { email, password, name, userType, planId, priceId } = body

    console.log('Request data:', { email, name, userType, planId, priceId })

    // Validate required fields
    if (!email || !password || !name || !userType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate password strength
    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters' },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Check if email already exists in members table
    const { data: existingMember } = await supabaseAdmin
      .from('members')
      .select('id, email')
      .eq('email', email.toLowerCase())
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
      email: email.toLowerCase(),
      password,
      email_confirm: true, // Auto-confirm for now, change for production
      user_metadata: {
        name,
        user_type: userType,
        plan_id: planId || 'Free'
      }
    })

    if (authError) {
      console.error('Auth error:', authError)
      
      // Handle duplicate user in auth
      if (authError.message?.includes('already registered')) {
        // User exists in auth but not in members table - this is an orphaned record
        // Use getUserByEmail to properly fetch the existing auth user
        console.log('Detected potential orphaned auth user - attempting cleanup')
        
        try {
          const { data: authUserData } = await supabaseAdmin.auth.admin.getUserByEmail(email.toLowerCase())
          
          if (authUserData?.user && !existingMember) {
            // Orphaned auth user found - clean it up
            console.log('Cleaning up orphaned auth user:', authUserData.user.id)
            await supabaseAdmin.auth.admin.deleteUser(authUserData.user.id)
            
            // Retry user creation
            const retryResult = await supabaseAdmin.auth.admin.createUser({
              email: email.toLowerCase(),
              password,
              email_confirm: true,
              user_metadata: { name, user_type: userType, plan_id: planId || 'Free' }
            })
            
            if (retryResult.error) {
              console.error('Retry creation failed:', retryResult.error)
              return NextResponse.json(
                { error: 'Failed to create account. Please try again.' },
                { status: 400 }
              )
            }
            
            // Use the retry result data
            authData.user = retryResult.data.user
          } else {
            return NextResponse.json(
              { error: 'An account with this email already exists' },
              { status: 400 }
            )
          }
        } catch (getUserError) {
          console.error('Error getting user by email:', getUserError)
          return NextResponse.json(
            { error: 'An account with this email already exists' },
            { status: 400 }
          )
        }
      } else {
        return NextResponse.json(
          { error: authError.message },
          { status: 400 }
        )
      }
    }

    if (!authData?.user) {
      return NextResponse.json(
        { error: 'Failed to create user account' },
        { status: 500 }
      )
    }

    console.log('User created in Auth:', authData.user.id)
    
    // Check for orphaned member record before inserting
    const { data: existingMemberById } = await supabaseAdmin
      .from('members')
      .select('id')
      .eq('id', authData.user.id)
      .single()

    if (existingMemberById) {
      console.log('Found orphaned member record, cleaning up...')
      await supabaseAdmin
        .from('members')
        .delete()
        .eq('id', authData.user.id)
    }
    
    // Create member profile with proper fields
    const memberType = userType === 'speaker' ? 'Speaker' : 'Organization'
    
    // Determine the plan name from planId
    let subscriptionPlan = 'Free'
    if (planId) {
      // If planId starts with 'prod_' it's a Stripe product ID
      // Map it to the plan name based on your Stripe products
      if (planId.startsWith('prod_')) {
        console.warn('Received Stripe product ID instead of plan name:', planId)
        subscriptionPlan = 'Professional' // Default fallback, should be passed from frontend
      } else {
        // It's already the plan name
        subscriptionPlan = planId
      }
    }
    
    const memberInsert = {
      id: authData.user.id,
      email: email.toLowerCase(),
      name,
      member_type: memberType,
      status: 'Active',
      created_at: new Date().toISOString(),
      onboarding_completed: false,
      // Set initial fields based on user type
      ...(userType === 'speaker' ? {
        stripe_price_id: priceId || null,
        subscription_plan: subscriptionPlan
      } : {})
    }

    console.log('Inserting member with data:', memberInsert)

    const { data: insertedMember, error: memberError } = await supabaseAdmin
      .from('members')
      .insert(memberInsert)
      .select()
      .single()

    if (memberError) {
      console.error('Member creation error:', memberError)
      
      // Clean up auth user if member creation fails
      await supabaseAdmin.auth.admin.deleteUser(authData.user.id)
      
      return NextResponse.json(
        { 
          error: 'Failed to create user profile',
          details: memberError.message
        },
        { status: 500 }
      )
    }

    console.log('✅ Member profile created successfully')

    // Handle organization setup
    if (userType === 'organization') {
      console.log('Setting up organization...')
      
      // Create organization record
      const { error: orgError } = await supabaseAdmin
        .from('organizations')
        .insert({
          id: authData.user.id,
          name: name,
          type: 'Pending', // Will be set during onboarding
          created_at: new Date().toISOString()
        })

      if (orgError && orgError.code !== '23505') { // Ignore duplicate key error
        console.error('Organization creation warning:', orgError)
      }

      // Create organization_member link
      const { error: linkError } = await supabaseAdmin
        .from('organization_members')
        .insert({
          organization_id: authData.user.id,
          member_id: authData.user.id,
          role: 'Admin',
          is_primary: true,
          created_at: new Date().toISOString()
        })

      if (linkError && linkError.code !== '23505') {
        console.error('Organization member link warning:', linkError)
      }
    }

    // Create initial subscription record (Free plan)
    if (userType === 'speaker' && !priceId) {
      const { error: subError } = await supabaseAdmin
        .from('subscriptions')
        .insert({
          member_id: authData.user.id,
          plan_type: 'Free',
          status: 'Active',
          billing_period: 'Monthly',
          amount: 0,
          start_date: new Date().toISOString(),
          created_at: new Date().toISOString()
        })

      if (subError && subError.code !== '23505') {
        console.error('Free subscription creation warning:', subError)
      }
    }

    // Generate auto-login token
    const autoLoginToken = await generateAutoLoginToken(authData.user.id, authData.user.email!)
    
    console.log('✅ Signup successful! Generated auto-login token')

    // Determine redirect URL based on plan type
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001'
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    
    let redirectUrl: string
    
    if (priceId && userType === 'speaker') {
      // Paid plan: Store token and redirect to Stripe checkout
      // Token will be used after Stripe success callback
      
      // Check if pending_auth_tokens table exists, if not, skip this step
      try {
        await supabaseAdmin
          .from('pending_auth_tokens')
          .insert({
            token: autoLoginToken,
            user_id: authData.user.id,
            email: authData.user.email,
            expires_at: new Date(Date.now() + 30 * 60 * 1000).toISOString() // 30 minutes for Stripe flow
          })
      } catch (tokenError) {
        console.warn('Could not store pending auth token:', tokenError)
        // Continue anyway - token is embedded in URL
      }
      
      // Return Stripe checkout URL
      redirectUrl = `/api/stripe/checkout?priceId=${priceId}&userId=${authData.user.id}&token=${autoLoginToken}`
    } else {
      // Free plan or organization: Direct to app with auto-login
      redirectUrl = `${appUrl}/auth/auto-login?token=${autoLoginToken}&newUser=true`
    }

    return NextResponse.json({
      success: true,
      redirectUrl,
      requiresCheckout: !!priceId,
      user: {
        id: authData.user.id,
        email: authData.user.email,
        name,
        userType,
        planId: subscriptionPlan
      },
      message: 'Account created successfully'
    })

  } catch (error: any) {
    console.error('Unexpected signup error:', error)
    
    return NextResponse.json(
      { 
        error: 'An error occurred during signup',
        details: error.message
      },
      { status: 500 }
    )
  }
}

// Test/health check endpoint
export async function GET() {
  const { count: memberCount, error: memberError } = await supabaseAdmin
    .from('members')
    .select('*', { count: 'exact', head: true })

  const { count: orgCount, error: orgError } = await supabaseAdmin
    .from('organizations')
    .select('*', { count: 'exact', head: true })

  return NextResponse.json({
    status: 'Signup API is running',
    timestamp: new Date().toISOString(),
    configured: {
      supabase_url: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      service_role_key: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      auth_secret: !!process.env.AUTH_SECRET,
      app_url: process.env.NEXT_PUBLIC_APP_URL || 'not set',
      database_connected: !memberError
    },
    database: {
      members_count: memberCount || 0,
      organizations_count: orgCount || 0,
      member_error: memberError?.message || null,
      org_error: orgError?.message || null
    }
  })
}