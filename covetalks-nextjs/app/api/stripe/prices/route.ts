import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia',
})

export async function GET() {
  try {
    // Fetch all active products
    const products = await stripe.products.list({
      active: true,
      limit: 100,
    })

    // Fetch all active prices
    const prices = await stripe.prices.list({
      active: true,
      limit: 100,
    })

    // Map products with their prices
    const productsWithPrices = products.data.map(product => {
      // Find prices for this product
      const productPrices = prices.data.filter(price => {
        const productId = typeof price.product === 'object' ? price.product.id : price.product
        return productId === product.id
      })

      // Get monthly and yearly prices
      const monthlyPrice = productPrices.find(p => p.recurring?.interval === 'month')
      const yearlyPrice = productPrices.find(p => p.recurring?.interval === 'year')
      
      // Parse features from metadata
      let features = []
      if (product.metadata.features) {
        try {
          features = JSON.parse(product.metadata.features)
        } catch (e) {
          features = product.metadata.features.split(',').map(f => f.trim())
        }
      }
      
      return {
        id: product.id,
        name: product.name,
        description: product.description,
        metadata: product.metadata,
        features: features,
        order: parseInt(product.metadata.order || '999'),
        userType: product.metadata.user_type || 'speaker',
        popular: product.metadata.popular === 'true',
        buttonText: product.metadata.button_text || 'Start Free Trial',
        prices: {
          monthly: monthlyPrice ? {
            id: monthlyPrice.id,
            amount: monthlyPrice.unit_amount,
            currency: monthlyPrice.currency,
          } : null,
          yearly: yearlyPrice ? {
            id: yearlyPrice.id,
            amount: yearlyPrice.unit_amount,
            currency: yearlyPrice.currency,
          } : null,
        }
      }
    })

    // Sort by order
    productsWithPrices.sort((a, b) => a.order - b.order)

    // Group by user type
    const speakerPlans = productsWithPrices.filter(p => p.userType === 'speaker')
    const organizationPlans = productsWithPrices.filter(p => p.userType === 'organization')

    return NextResponse.json({
      speaker: speakerPlans,
      organization: organizationPlans,
    })
    
  } catch (error: any) {
    console.error('Error fetching Stripe prices:', error)
    return NextResponse.json(
      { error: 'Failed to fetch pricing data' },
      { status: 500 }
    )
  }
}