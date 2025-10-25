import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia',
})

export async function POST(request: NextRequest) {
  try {
    const { priceId, successUrl, cancelUrl, customerEmail, metadata } = await request.json()

    if (!priceId) {
      return NextResponse.json(
        { error: 'Price ID is required' },
        { status: 400 }
      )
    }

    // Build URLs with proper scheme
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001'
    
    // Ensure URLs have proper scheme
    const getFullUrl = (url: string | undefined, defaultPath: string, baseUrl: string) => {
      if (!url) {
        return `${baseUrl}${defaultPath}`
      }
      // If URL already has scheme, use it
      if (url.startsWith('http://') || url.startsWith('https://')) {
        return url
      }
      // If it's a path, prepend base URL
      if (url.startsWith('/')) {
        return `${baseUrl}${url}`
      }
      // Otherwise, it's probably missing scheme
      return `${baseUrl}/${url}`
    }

    const finalSuccessUrl = successUrl 
      ? getFullUrl(successUrl, '', baseUrl)
      : `${appUrl}/onboarding?success=true&session_id={CHECKOUT_SESSION_ID}`
    
    const finalCancelUrl = cancelUrl
      ? getFullUrl(cancelUrl, '', baseUrl)
      : `${baseUrl}/register`

    console.log('Creating checkout session with URLs:', {
      success: finalSuccessUrl,
      cancel: finalCancelUrl
    })

    // Create Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: finalSuccessUrl,
      cancel_url: finalCancelUrl,
      customer_email: customerEmail,
      metadata: metadata || {},
      subscription_data: {
        // No trial period - immediate payment
        metadata: metadata || {},
      },
      allow_promotion_codes: true, // Allow discount codes
    })

    return NextResponse.json({ 
      url: session.url,
      sessionId: session.id 
    })
  } catch (error: any) {
    console.error('Stripe checkout error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to create checkout session',
        details: error.message 
      },
      { status: 500 }
    )
  }
}

// GET method for creating checkout via URL redirect
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const priceId = searchParams.get('priceId')
    
    if (!priceId) {
      return NextResponse.json(
        { error: 'Price ID is required' },
        { status: 400 }
      )
    }

    // Build URLs with proper scheme
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001'

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${appUrl}/onboarding?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/register`,
      allow_promotion_codes: true,
      // No trial period - immediate payment
    })

    // Redirect to Stripe Checkout
    return NextResponse.redirect(session.url!)
  } catch (error: any) {
    console.error('Stripe checkout error:', error)
    // Redirect back to pricing with error
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    return NextResponse.redirect(`${baseUrl}/register?error=checkout_failed`)
  }
}