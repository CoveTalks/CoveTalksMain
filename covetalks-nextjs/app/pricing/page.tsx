import { Check, Star, Users, User, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Stripe from 'stripe'
import PricingClient from './pricing-client'

// Server Component - fetches data on server
async function getPricingData() {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2023-10-16',
  })

  try {
    // Fetch products and prices
    const [products, prices] = await Promise.all([
      stripe.products.list({ active: true, limit: 100 }),
      stripe.prices.list({ active: true, limit: 100 })
    ])

    // Map products with prices
    const productsWithPrices = products.data.map(product => {
      const productPrices = prices.data.filter(price => {
        const productId = typeof price.product === 'object' ? price.product.id : price.product
        return productId === product.id
      })

      const monthlyPrice = productPrices.find(p => p.recurring?.interval === 'month')
      const yearlyPrice = productPrices.find(p => p.recurring?.interval === 'year')
      
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

    // Sort and group
    productsWithPrices.sort((a, b) => a.order - b.order)
    
    return {
      speaker: productsWithPrices.filter(p => p.userType === 'speaker'),
      organization: productsWithPrices.filter(p => p.userType === 'organization'),
    }
  } catch (error) {
    console.error('Error fetching Stripe prices:', error)
    return null
  }
}

export default async function PricingPage() {
  const pricingData = await getPricingData()

  // If no data, show error state
  if (!pricingData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-foam to-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Unable to load pricing at this time</p>
          <Link href="/" className="text-deep hover:underline">
            Return to Home
          </Link>
        </div>
      </div>
    )
  }

  // Pass data to client component for interactivity
  return <PricingClient initialData={pricingData} />
}