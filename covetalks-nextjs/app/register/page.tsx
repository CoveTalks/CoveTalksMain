'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Loader2, Check, CreditCard, User, Mail, Lock, Building2 } from 'lucide-react'

interface RegistrationForm {
  email: string
  password: string
  name: string
  userType: 'speaker' | 'organization'
  planId: string
  priceId: string
  billingPeriod: 'monthly' | 'yearly'
}

export default function RegisterPage() {
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [step, setStep] = useState(1) // 1: Account, 2: Plan, 3: Payment (speakers only)
  const [pricingData, setPricingData] = useState<any>(null)
  
  // Pre-fill from URL params
  const [formData, setFormData] = useState<RegistrationForm>({
    email: '',
    password: '',
    name: '',
    userType: (searchParams.get('type') as 'speaker' | 'organization') || 'speaker',
    planId: searchParams.get('plan') || '',
    priceId: searchParams.get('priceId') || '',
    billingPeriod: (searchParams.get('billing') as 'monthly' | 'yearly') || 'monthly'
  })

  // Fetch pricing data from Stripe (for speakers only)
  useEffect(() => {
    if (formData.userType === 'speaker') {
      fetchPricing()
    }
  }, [formData.userType])



  const fetchPricing = async () => {
    try {
      const response = await fetch('/api/stripe/prices')
      if (response.ok) {
        const data = await response.json()
        setPricingData(data)
      }
    } catch (error) {
      console.error('Failed to fetch pricing:', error)
    }
  }

  // Organization plans (hardcoded since no Stripe)
  const organizationPlans = [
    {
      id: 'org_free',
      name: 'Free',
      description: 'For non-profits, schools & churches',
      price: 0,
      features: [
        'Search speaker database',
        'View speaker profiles',
        'Contact speakers directly',
        'Post speaking opportunities',
        'Basic event management'
      ]
    },
    {
      id: 'org_professional',
      name: 'Professional',
      description: 'For corporate events & conferences',
      price: 97,
      popular: true,
      features: [
        'Everything in Free',
        'Priority speaker matching',
        'Advanced search filters',
        'Event analytics dashboard',
        'Email support'
      ],
      comingSoon: true
    },
    {
      id: 'org_enterprise',
      name: 'Enterprise',
      description: 'For large organizations',
      price: -1, // Custom
      features: [
        'Everything in Professional',
        'Unlimited team members',
        'Custom integrations',
        'Dedicated account manager',
        'API access'
      ],
      comingSoon: true
    }
  ]

  const currentPlans = formData.userType === 'organization' 
    ? organizationPlans 
    : (pricingData ? pricingData.speaker : [])

  const selectedPlan = currentPlans.find((p: any) => {
    const planId = typeof p.id === 'string' 
      ? p.id 
      : p.id.toLowerCase().replace('covetalks ', '').replace(' ', '_')
    return planId === formData.planId
  })

  const handleAccountSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.email || !formData.password || !formData.name) {
      setError('Please fill in all fields')
      return
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }

    setError(null)
    setStep(2)
  }

  const handlePlanSelect = (plan: any) => {
    // For organizations, always use free plan (others coming soon)
    if (formData.userType === 'organization') {
      if (plan.comingSoon) {
        setError('This plan is coming soon! Please select the Free plan for now.')
        return
      }
      setFormData({
        ...formData,
        planId: plan.id,
        priceId: '' // No Stripe for organizations
      })
      // Go straight to registration for organizations
      handleOrganizationRegistration()
      return
    }

    // For speakers, handle Stripe pricing
    const price = formData.billingPeriod === 'yearly' ? plan.prices.yearly : plan.prices.monthly
    
    if (!price) {
      setError('This plan is not available')
      return
    }

    const planId = plan.id.toLowerCase().replace('covetalks ', '').replace(' ', '_')
    
    setFormData({
      ...formData,
      planId: planId,
      priceId: price.id
    })

    // Go to payment for speakers
    setStep(3)
  }

  const handleOrganizationRegistration = async () => {
    setLoading(true)
    setError(null)

    try {
      const signupRes = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          name: formData.name,
          userType: 'organization',
          planId: 'free' // All organizations start free
        })
      })

      if (!signupRes.ok) {
        const error = await signupRes.json()
        throw new Error(error.error || 'Failed to create account')
      }

      const data = await signupRes.json()
      
      // NEW: Use redirect URL if provided
      if (data.redirectUrl) {
        window.location.href = data.redirectUrl
      } else {
        // FALLBACK: Keep existing flow
        const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001'
        window.location.href = `${appUrl}/onboarding?welcome=true&type=organization`
      }

    } catch (err: any) {
      setError(err.message)
      setLoading(false)
    }
  }

  const handleSpeakerPayment = async () => {
    setLoading(true)
    setError(null)

    try {
      // Build signup data
      const signupData: any = {
        email: formData.email,
        password: formData.password,
        name: formData.name,
        userType: 'speaker',
        planId: formData.planId
      }

      // NEW: Add priceId for paid plans
      if (formData.userType === 'speaker' && formData.planId && formData.planId !== 'free') {
        const selectedPlanData = pricingData?.speaker?.find((p: any) => {
          const planId = p.id.toLowerCase().replace('covetalks ', '').replace(' ', '_')
          return planId === formData.planId
        })
        
        const priceId = formData.billingPeriod === 'monthly' 
          ? selectedPlanData?.prices.monthly?.id 
          : selectedPlanData?.prices.yearly?.id
        
        if (priceId) {
          signupData.priceId = priceId
        }
      }

      // 1. Create user account first
      const signupRes = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(signupData)
      })

      if (!signupRes.ok) {
        const error = await signupRes.json()
        throw new Error(error.error || 'Failed to create account')
      }

      const data = await signupRes.json()

      // NEW: Use redirect URL if provided
      if (data.redirectUrl) {
        window.location.href = data.redirectUrl
      } else {
        // FALLBACK: Keep existing Stripe checkout flow
        const { user } = data

        // 2. Create Stripe checkout session for speakers
        const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001'
        
        const checkoutRes = await fetch('/api/stripe/checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            priceId: formData.priceId,
            customerEmail: formData.email,
            successUrl: `${appUrl}/onboarding?welcome=true&session_id={CHECKOUT_SESSION_ID}`,
            cancelUrl: `${window.location.origin}/register`,
            metadata: {
              userId: user.id,
              userType: 'speaker',
              planId: formData.planId
            }
          })
        })

        if (!checkoutRes.ok) {
          throw new Error('Failed to create checkout session')
        }

        const { url } = await checkoutRes.json()

        // 3. Redirect to Stripe Checkout
        window.location.href = url
      }

    } catch (err: any) {
      setError(err.message)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-foam to-white py-20">
      <div className="max-w-4xl mx-auto px-4">
        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center space-x-2 md:space-x-4">
            <div className={`flex items-center ${step >= 1 ? 'text-deep' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                step >= 1 ? 'border-deep bg-deep text-white' : 'border-gray-300'
              }`}>
                {step > 1 ? <Check className="h-5 w-5" /> : '1'}
              </div>
              <span className="ml-2 font-medium">Account</span>
            </div>

            <div className={`w-12 md:w-20 h-0.5 ${step > 1 ? 'bg-deep' : 'bg-gray-300'}`} />

            <div className={`flex items-center ${step >= 2 ? 'text-deep' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                step >= 2 ? 'border-deep bg-deep text-white' : 'border-gray-300'
              }`}>
                {step > 2 ? <Check className="h-5 w-5" /> : '2'}
              </div>
              <span className="ml-2 font-medium">Plan</span>
            </div>

            {/* Only show payment step for speakers */}
            {formData.userType === 'speaker' && (
              <>
                <div className={`w-12 md:w-20 h-0.5 ${step > 2 ? 'bg-deep' : 'bg-gray-300'}`} />
                <div className={`flex items-center ${step >= 3 ? 'text-deep' : 'text-gray-400'}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                    step >= 3 ? 'border-deep bg-deep text-white' : 'border-gray-300'
                  }`}>
                    3
                  </div>
                  <span className="ml-2 font-medium">Payment</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Step 1: Create Account */}
        {step === 1 && (
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Create Your Account</h2>
            
            <form onSubmit={handleAccountSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  I am a...
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, userType: 'speaker' })}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      formData.userType === 'speaker'
                        ? 'border-deep bg-deep text-white'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <User className="h-5 w-5 mx-auto mb-1" />
                    Speaker
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, userType: 'organization' })}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      formData.userType === 'organization'
                        ? 'border-deep bg-deep text-white'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <Building2 className="h-5 w-5 mx-auto mb-1" />
                    Organization
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-deep focus:border-transparent"
                  placeholder="John Smith"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-deep focus:border-transparent"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  required
                  minLength={8}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-deep focus:border-transparent"
                  placeholder="••••••••"
                />
                <p className="text-xs text-gray-500 mt-1">Minimum 8 characters</p>
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-deep text-white rounded-lg font-semibold hover:bg-deep-dark transition-colors"
              >
                Continue to Plan Selection →
              </button>

              <p className="text-center text-gray-600">
                Already have an account?{' '}
                <a 
                  href={`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001'}/login`}
                  className="text-deep hover:underline"
                >
                  Sign in
                </a>
              </p>
            </form>
          </div>
        )}

        {/* Step 2: Choose Plan */}
        {step === 2 && (
          <div>
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
              Choose Your Plan
            </h2>

            {/* Only show billing toggle for speakers */}
            {formData.userType === 'speaker' && (
              <div className="flex justify-center mb-8">
                <div className="bg-white rounded-full p-1 shadow-md flex">
                  <button
                    onClick={() => setFormData({ ...formData, billingPeriod: 'monthly' })}
                    className={`px-6 py-2 rounded-full transition-all ${
                      formData.billingPeriod === 'monthly'
                        ? 'bg-deep text-white'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Monthly
                  </button>
                  <button
                    onClick={() => setFormData({ ...formData, billingPeriod: 'yearly' })}
                    className={`px-6 py-2 rounded-full transition-all ${
                      formData.billingPeriod === 'yearly'
                        ? 'bg-deep text-white'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Yearly (Save 15%)
                  </button>
                </div>
              </div>
            )}

            {/* Notice for organizations */}
            {formData.userType === 'organization' && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8 max-w-3xl mx-auto">
                <p className="text-blue-800 text-center">
                  🎉 <strong>Free for all organizations during our launch!</strong> Premium features coming soon.
                </p>
              </div>
            )}

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {currentPlans.map((plan: any) => {
                const isOrg = formData.userType === 'organization'
                const price = isOrg 
                  ? plan.price 
                  : (formData.billingPeriod === 'yearly' ? plan.prices?.yearly : plan.prices?.monthly)
                
                const planId = typeof plan.id === 'string' 
                  ? plan.id 
                  : plan.id.toLowerCase().replace('covetalks ', '').replace(' ', '_')
                
                const isSelected = formData.planId === planId
                const isComingSoon = plan.comingSoon

                return (
                  <div
                    key={plan.id}
                    className={`bg-white rounded-xl shadow-lg p-6 relative cursor-pointer transition-all ${
                      isComingSoon ? 'opacity-75' : ''
                    } ${
                      isSelected && !isComingSoon ? 'ring-2 ring-deep transform scale-105' : 'hover:shadow-xl'
                    }`}
                    onClick={() => !isComingSoon && handlePlanSelect(plan)}
                  >
                    {plan.popular && (
                      <div className="absolute -top-4 left-0 right-0 flex justify-center">
                        <span className="bg-sand text-deep text-sm font-bold px-4 py-1 rounded-full">
                          MOST POPULAR
                        </span>
                      </div>
                    )}

                    {isComingSoon && (
                      <div className="absolute -top-4 left-0 right-0 flex justify-center">
                        <span className="bg-gray-500 text-white text-sm font-bold px-4 py-1 rounded-full">
                          COMING SOON
                        </span>
                      </div>
                    )}

                    <h3 className="text-xl font-bold text-gray-900 mb-4">{plan.name}</h3>
                    <p className="text-sm text-gray-600 mb-4">{plan.description}</p>
                    
                    <div className="mb-6">
                      {isOrg ? (
                        <span className="text-4xl font-bold text-gray-900">
                          {plan.price === 0 ? 'Free' : plan.price === -1 ? 'Custom' : `$${plan.price}/mo`}
                        </span>
                      ) : (
                        <>
                          <span className="text-4xl font-bold text-gray-900">
                            {price && price.amount ? `$${price.amount / 100}` : 'Free'}
                          </span>
                          {price && price.amount > 0 && (
                            <span className="text-gray-600">
                              /{formData.billingPeriod === 'yearly' ? 'year' : 'month'}
                            </span>
                          )}
                        </>
                      )}
                    </div>

                    <ul className="space-y-3 mb-6">
                      {(plan.features || []).slice(0, 5).map((feature: string, i: number) => (
                        <li key={i} className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                          <span className="text-gray-700 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <button
                      type="button"
                      disabled={isComingSoon}
                      className={`w-full py-2 rounded-lg font-semibold transition-colors ${
                        isComingSoon
                          ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                          : isSelected
                          ? 'bg-deep text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {isComingSoon ? 'Coming Soon' : isSelected ? 'Selected' : 'Select Plan'}
                    </button>
                  </div>
                )
              })}
            </div>

            {error && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 max-w-md mx-auto">
                {error}
              </div>
            )}

            <div className="mt-8 flex justify-between max-w-md mx-auto">
              <button
                onClick={() => setStep(1)}
                className="px-6 py-2 text-gray-600 hover:text-gray-900"
              >
                ← Back
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Payment (Speakers Only) */}
        {step === 3 && formData.userType === 'speaker' && (
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Payment Information</h2>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold text-gray-900">{selectedPlan?.name} Plan</p>
                  <p className="text-gray-600">
                    {formData.billingPeriod === 'yearly' ? 'Billed yearly' : 'Billed monthly'}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">
                    ${formData.billingPeriod === 'yearly' 
                      ? (selectedPlan?.prices.yearly?.amount || 0) / 100
                      : (selectedPlan?.prices.monthly?.amount || 0) / 100}
                  </p>
                  <p className="text-sm text-gray-600">
                    /{formData.billingPeriod === 'yearly' ? 'year' : 'month'}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-center py-8 text-gray-500">
                <CreditCard className="h-12 w-12 mr-4" />
                <div>
                  <p className="font-semibold">Secure Payment with Stripe</p>
                  <p className="text-sm">You'll be redirected to complete payment</p>
                </div>
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
                  {error}
                </div>
              )}

              <button
                onClick={handleSpeakerPayment}
                disabled={loading}
                className="w-full py-3 bg-deep text-white rounded-lg font-semibold hover:bg-deep-dark transition-colors disabled:opacity-50 flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin mr-2" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Lock className="h-5 w-5 mr-2" />
                    Continue to Secure Checkout
                  </>
                )}
              </button>

              <button
                onClick={() => setStep(2)}
                disabled={loading}
                className="w-full py-2 text-gray-600 hover:text-gray-900"
              >
                ← Back to Plan Selection
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}