import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

// Use API version compatible with stripe@14.14.0
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
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

    // Updated URLs to point to production
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://covetalks.com'
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://app.covetalks.com'
    
    // Ensure URLs have proper scheme
    const getFullUrl = (url: string | undefined, defaultPath: string, baseUrl: string) => {
      if (!url) {
        return `${baseUrl}${defaultPath}`
      }
      if (url.startsWith('http://') || url.startsWith('https://')) {
        return url
      }
      if (url.startsWith('/')) {
        return `${baseUrl}${url}`
      }
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
        metadata: metadata || {},
      },
      allow_promotion_codes: true,
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
    const userId = searchParams.get('userId')
    const token = searchParams.get('token')
    
    if (!priceId) {
      return NextResponse.json(
        { error: 'Price ID is required' },
        { status: 400 }
      )
    }

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://covetalks.com'
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://app.covetalks.com'

    // Include token in success URL - this redirects to app after payment
    const successUrl = token 
      ? `${appUrl}/auth/auto-login?token=${token}&fromStripe=true&session_id={CHECKOUT_SESSION_ID}`
      : `${appUrl}/onboarding?success=true&session_id={CHECKOUT_SESSION_ID}`

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: successUrl,
      cancel_url: `${baseUrl}/register`,
      allow_promotion_codes: true,
      metadata: {
        userId: userId || '',
      }
    })

    // Redirect to Stripe Checkout
    return NextResponse.redirect(session.url!)
  } catch (error: any) {
    console.error('Stripe checkout error:', error)
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://covetalks.com'
    return NextResponse.redirect(`${baseUrl}/register?error=checkout_failed`)
  }
}
