'use client'

import { useState } from 'react'
import { Check, Star, Users, User, ArrowRight, Heart } from 'lucide-react'
import Link from 'next/link'

interface StripePrice {
  id: string
  amount: number | null
  currency: string
}

interface StripePlan {
  id: string
  name: string
  description: string | null
  metadata: Record<string, string>
  features: string[]
  order: number
  userType: string
  popular: boolean
  buttonText: string
  prices: {
    monthly: StripePrice | null
    yearly: StripePrice | null
  }
}

interface PricingData {
  speaker: StripePlan[]
  organization: StripePlan[]
}

interface PricingClientProps {
  initialData: PricingData
}

export default function PricingClient({ initialData }: PricingClientProps) {
  const [isYearly, setIsYearly] = useState(false)
  const [userType, setUserType] = useState<'speaker' | 'organization'>('speaker')

  const formatPrice = (price: StripePrice | null) => {
    if (!price || !price.amount) return 'Free'
    if (price.amount === -1) return 'Custom'
    
    const amount = price.amount / 100
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: price.currency || 'usd',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const getPeriodText = (plan: StripePlan, isYearly: boolean) => {
    const price = isYearly ? plan.prices.yearly : plan.prices.monthly
    if (!price || !price.amount || price.amount === 0) return ''
    if (price.amount === -1) return ''
    return isYearly ? '/year' : '/month'
  }

  const calculateSavings = (plan: StripePlan) => {
    if (!plan.prices.monthly?.amount || !plan.prices.yearly?.amount) return null
    if (plan.prices.monthly.amount <= 0 || plan.prices.yearly.amount <= 0) return null
    
    const monthlyTotal = (plan.prices.monthly.amount * 12) / 100
    const yearlyTotal = plan.prices.yearly.amount / 100
    const savings = monthlyTotal - yearlyTotal
    const percentSaved = Math.round((savings / monthlyTotal) * 100)
    
    return percentSaved > 0 ? percentSaved : null
  }

  const getRegistrationUrl = (plan: StripePlan | any, isYearly: boolean) => {
    // For organizations, always go to free registration
    if (userType === 'organization') {
      return `/register?type=organization`
    }
    
    // For speakers, use Stripe pricing
    const price = isYearly ? plan.prices.yearly : plan.prices.monthly
    
    if (!price || !price.id) {
      return `/register?type=${userType}`
    }
    
    const planId = plan.id.toLowerCase()
      .replace('covetalks ', '')
      .replace(/\s+/g, '_')
    
    const params = new URLSearchParams({
      plan: planId,
      planName: plan.name,
      priceId: price.id,
      billing: isYearly ? 'yearly' : 'monthly',
      type: userType,
      amount: price.amount ? (price.amount / 100).toString() : '0'
    })

    return `/register?${params.toString()}`
  }

  const speakerPlans = initialData.speaker || []
  const savingsPercent = speakerPlans.length > 1 ? calculateSavings(speakerPlans[1]) : 15

  return (
    <div className="min-h-screen bg-gradient-to-b from-foam to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-deep via-calm to-deep">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent"></div>
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-sand/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-12">
              {userType === 'speaker' 
                ? 'Start your speaking journey today'
                : 'Connect with amazing speakers for your events'}
            </p>

            {/* User Type Toggle */}
            <div className="flex justify-center mb-8">
              <div className="bg-white/20 backdrop-blur-md rounded-full p-1 flex">
                <button
                  onClick={() => setUserType('speaker')}
                  className={`px-6 py-3 rounded-full font-medium transition-all flex items-center gap-2 ${
                    userType === 'speaker'
                      ? 'bg-white text-deep shadow-lg'
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  <User className="h-4 w-4" />
                  For Speakers
                </button>
                <button
                  onClick={() => setUserType('organization')}
                  className={`px-6 py-3 rounded-full font-medium transition-all flex items-center gap-2 ${
                    userType === 'organization'
                      ? 'bg-white text-deep shadow-lg'
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  <Users className="h-4 w-4" />
                  For Organizations
                </button>
              </div>
            </div>

            {/* Billing Period Toggle - Only for Speakers */}
            {userType === 'speaker' && (
              <div className="flex items-center justify-center gap-4">
                <span className={`text-white ${!isYearly ? 'font-semibold' : 'opacity-75'}`}>
                  Monthly
                </span>
                <button
                  onClick={() => setIsYearly(!isYearly)}
                  className="relative w-16 h-8 bg-white/30 rounded-full transition-colors hover:bg-white/40"
                >
                  <div
                    className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform ${
                      isYearly ? 'translate-x-8' : ''
                    }`}
                  />
                </button>
                <span className={`text-white ${isYearly ? 'font-semibold' : 'opacity-75'}`}>
                  Yearly
                  {savingsPercent && savingsPercent > 0 && (
                    <span className="ml-2 px-3 py-1 bg-sand text-deep text-xs font-bold rounded-full">
                      SAVE {savingsPercent}%
                    </span>
                  )}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
        {/* Organization Section - Simple Free Tier */}
        {userType === 'organization' && (
          <div>
            {/* Free for Non-Profits Banner */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-12 text-center mb-16">
              <div className="max-w-3xl mx-auto">
                <Heart className="h-16 w-16 text-deep mx-auto mb-6" />
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Free for Non-Profits, Schools & Churches
                </h2>
                <p className="text-lg text-gray-700 mb-8">
                  We believe in supporting organizations that make a difference. Access our full platform 
                  at no cost to connect with amazing speakers for your events.
                </p>
                
                <div className="bg-white rounded-xl p-8 shadow-lg max-w-2xl mx-auto">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Everything You Need, Free Forever</h3>
                  <div className="grid md:grid-cols-2 gap-4 text-left mb-8">
                    <div className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Search our full speaker database</span>
                    </div>
                    <div className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">View complete speaker profiles</span>
                    </div>
                    <div className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Contact speakers directly</span>
                    </div>
                    <div className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Post unlimited speaking opportunities</span>
                    </div>
                    <div className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Manage your events</span>
                    </div>
                    <div className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Save speaker lists</span>
                    </div>
                  </div>
                  
                  <Link
                    href="/register?type=organization"
                    className="inline-flex items-center px-8 py-4 bg-deep text-white rounded-lg font-semibold hover:bg-deep-dark transition-colors shadow-lg"
                  >
                    Get Started Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                  
                  <p className="text-sm text-gray-500 mt-4">
                    No credit card required • Free forever for qualifying organizations
                  </p>
                </div>
              </div>
            </div>

            {/* Coming Soon for Enterprises */}
            <div className="text-center">
              <p className="text-gray-600 mb-4">
                Enterprise and corporate plans coming soon.
              </p>
              <Link
                href="/contact?subject=enterprise"
                className="text-deep hover:underline"
              >
                Contact us for enterprise pricing →
              </Link>
            </div>
          </div>
        )}

        {/* Speaker Plans */}
        {userType === 'speaker' && (
          <div>
            {speakerPlans.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600">Loading speaker plans...</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {speakerPlans.map((plan) => {
                  const price = isYearly ? plan.prices.yearly : plan.prices.monthly
                  const savings = calculateSavings(plan)

                  return (
                    <div
                      key={plan.id}
                      className={`relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-1 ${
                        plan.popular ? 'ring-2 ring-sand scale-105' : ''
                      }`}
                    >
                      {plan.popular && (
                        <div className="absolute -top-5 left-0 right-0 flex justify-center">
                          <span className="bg-sand text-deep text-sm font-bold px-4 py-2 rounded-full flex items-center gap-1 shadow-lg">
                            <Star className="h-4 w-4" />
                            MOST POPULAR
                          </span>
                        </div>
                      )}

                      <div className="p-8">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                        <p className="text-gray-600 mb-6 text-sm">{plan.description}</p>

                        {/* Price */}
                        <div className="mb-6">
                          <div className="flex items-baseline">
                            <span className="text-4xl font-bold text-gray-900">
                              {formatPrice(price)}
                            </span>
                            <span className="ml-2 text-gray-600">
                              {getPeriodText(plan, isYearly)}
                            </span>
                          </div>
                          {isYearly && price && price.amount && price.amount > 0 && (
                            <p className="text-sm text-gray-500 mt-1">
                              Billed annually
                            </p>
                          )}
                          {isYearly && savings && savings > 0 && (
                            <p className="text-sm text-green-600 font-medium mt-1">
                              Save {savings}% vs monthly
                            </p>
                          )}
                        </div>

                        {/* CTA Button */}
                        <Link
                          href={getRegistrationUrl(plan, isYearly)}
                          className={`group block w-full text-center py-3 px-6 rounded-lg font-semibold transition-all mb-6 ${
                            plan.popular
                              ? 'bg-sand text-deep hover:bg-yellow-400 shadow-md hover:shadow-lg'
                              : price?.amount === 0
                              ? 'bg-calm text-white hover:bg-deep'
                              : 'bg-deep text-white hover:bg-deep-dark'
                          }`}
                        >
                          <span className="flex items-center justify-center">
                            {plan.buttonText || 'Get Started'}
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </span>
                        </Link>

                        {/* Features */}
                        <div className="space-y-4">
                          <h4 className="font-semibold text-gray-900">What's included:</h4>
                          <ul className="space-y-3">
                            {(plan.features || []).map((feature, index) => (
                              <li key={index} className="flex items-start">
                                <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-700 text-sm">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}

        {/* FAQ Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Frequently Asked Questions
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {userType === 'organization' ? (
              <>
                <div className="bg-white rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Who qualifies for free access?
                  </h3>
                  <p className="text-gray-600">
                    501(c)(3) non-profits, K-12 schools, universities, and religious organizations get free access forever.
                  </p>
                </div>
                <div className="bg-white rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Do we need to provide proof?
                  </h3>
                  <p className="text-gray-600">
                    We may request verification of your non-profit status, but you can start using the platform immediately.
                  </p>
                </div>
                <div className="bg-white rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    What about for-profit organizations?
                  </h3>
                  <p className="text-gray-600">
                    Corporate and enterprise plans are coming soon. Contact us to be notified when they launch.
                  </p>
                </div>
                <div className="bg-white rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Are there any limitations?
                  </h3>
                  <p className="text-gray-600">
                    No! Non-profit organizations get full access to all features with no limitations.
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="bg-white rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Can I change plans anytime?
                  </h3>
                  <p className="text-gray-600">
                    Yes! You can upgrade or downgrade your plan at any time. Changes take effect at the next billing cycle.
                  </p>
                </div>
                <div className="bg-white rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    What payment methods do you accept?
                  </h3>
                  <p className="text-gray-600">
                    We accept all major credit cards, debit cards, and ACH transfers for annual plans through our secure payment partner, Stripe.
                  </p>
                </div>
                <div className="bg-white rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Can I cancel my subscription?
                  </h3>
                  <p className="text-gray-600">
                    You can cancel anytime with no questions asked. Your access continues until the end of your current billing period.
                  </p>
                </div>
                <div className="bg-white rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Do you offer refunds?
                  </h3>
                  <p className="text-gray-600">
                    We offer a 30-day money-back guarantee. If you're not satisfied within the first 30 days, we'll refund your payment.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}