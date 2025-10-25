import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Create Supabase client with service role for server operations
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

// Verify reCAPTCHA token with Google
async function verifyRecaptcha(token: string): Promise<boolean> {
  if (!token) return false

  const secretKey = process.env.RECAPTCHA_SECRET_KEY
  if (!secretKey) {
    console.warn('reCAPTCHA secret key not configured')
    return true // Allow submission if not configured (development)
  }

  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${secretKey}&response=${token}`
    })

    const data = await response.json()
    
    // Check if verification was successful and score is good (v3 returns a score 0.0-1.0)
    // Lower scores are more likely to be bots
    const isValid = data.success && (!data.score || data.score >= 0.5)
    
    if (!isValid) {
      console.log('reCAPTCHA verification failed:', {
        success: data.success,
        score: data.score,
        action: data.action,
        errors: data['error-codes']
      })
    }

    return isValid
  } catch (error) {
    console.error('reCAPTCHA verification error:', error)
    return false
  }
}

export async function POST(request: NextRequest) {
  console.log('📧 Contact form submission received')
  
  try {
    const body = await request.json()
    const { name, email, company, phone, subject, message, recaptchaToken } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      )
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      )
    }

    // Verify reCAPTCHA if token is provided
    if (process.env.RECAPTCHA_SECRET_KEY) {
      const isHuman = await verifyRecaptcha(recaptchaToken)
      
      if (!isHuman) {
        console.warn('Failed reCAPTCHA verification from:', email)
        return NextResponse.json(
          { error: 'reCAPTCHA verification failed. Please try again.' },
          { status: 400 }
        )
      }
    }

    console.log('Saving contact message to database...')

    // Insert into Supabase - using contact_submissions table
    const { data, error } = await supabaseAdmin
      .insert({
        name,
        email,
        company: company || null,
        phone: phone || null,
        subject: subject || null,
        message,
        status: 'unread',
        created_at: new Date().toISOString()
      })
      .select()
      .single()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to save message. Please try again.' },
        { status: 500 }
      )
    }

    console.log('✅ Contact message saved successfully:', data.id)

    // Optional: Send email notifications here
    // await sendAdminNotification({ name, email, message })
    // await sendUserConfirmation({ name, email })

    return NextResponse.json({
      success: true,
      message: 'Thank you for your message! We\'ll get back to you soon.',
      id: data.id
    })

  } catch (error: any) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    )
  }
}

// GET method to check if the API is working
export async function GET() {
  const { count, error } = await supabaseAdmin
    .from('contact_submissions')
    .select('*', { count: 'exact', head: true })

  return NextResponse.json({
    status: 'Contact API is running',
    configured: {
      supabase_url: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      service_role_key: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      recaptcha_site_key: !!process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
      recaptcha_secret_key: !!process.env.RECAPTCHA_SECRET_KEY,
      database_connected: !error
    },
    messages_count: count || 0,
    table_name: 'contact_submissions'  // Added to confirm which table is being used
  })
}