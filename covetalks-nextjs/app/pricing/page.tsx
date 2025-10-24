import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Check, X, Star, Zap, Shield, ArrowRight } from 'lucide-react'

const pricingPlans = {
  speakers: [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Get started with basic features',
      features: [
        'Create speaker profile',
        'Browse opportunities',
        'Apply to 5 opportunities/month',
        'Basic profile visibility',
        'Standard support',
      ],
      notIncluded: [
        'Featured profile placement',
        'Unlimited applications',
        'Advanced analytics',
        'Priority support',
        'Custom branding',
      ],
      cta: 'Start Free',
      popular: false,
    },
    {
      name: 'Professional',
      price: '$29',
      period: 'per month',
      description: 'For active professional speakers',
      features: [
        'Everything in Free',
        'Unlimited applications',
        'Featured profile badge',
        'Advanced profile analytics',
        'Priority in search results',
        'Direct message organizations',
        'Email notifications',
        'Priority support',
      ],
      notIncluded: [
        'Top placement in searches',
        'Custom profile URL',
        'White-label options',
      ],
      cta: 'Go Professional',
      popular: true,
    },
    {
      name: 'Premium',
      price: '$99',
      period: 'per month',
      description: 'Maximum visibility and features',
      features: [
        'Everything in Professional',
        'Top placement in searches',
        'Custom profile URL',
        'Video showcase gallery',
        'Advanced booking calendar',
        'Exclusive opportunities',
        'Personal account manager',
        'Quarterly strategy calls',
        'Custom contracts',
      ],
      notIncluded: [],
      cta: 'Go Premium',
      popular: false,
    },
  ],
  organizations: [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Post opportunities and find speakers',
      features: [
        'Post 2 opportunities/month',
        'Browse speaker profiles',
        'Basic search filters',
        'Standard messaging',
        'Email support',
      ],
      notIncluded: [
        'Featured opportunities',
        'Advanced search filters',
        'Bulk messaging',
        'Team collaboration',
        'API access',
      ],
      cta: 'Start Free',
      popular: false,
    },
    {
      name: 'Business',
      price: '$99',
      period: 'per month',
      description: 'For regular event organizers',
      features: [
        'Everything in Free',
        'Unlimited opportunities',
        'Featured opportunity badges',
        'Advanced search & filters',
        'Saved speaker lists',
        'Team collaboration (3 users)',
        'Bulk messaging',
        'Priority support',
        'Monthly reports',
      ],
      notIncluded: [
        'White-label options',
        'API access',
        'Custom integrations',
      ],
      cta: 'Go Business',
      popular: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'contact us',
      description: 'For large organizations',
      features: [
        'Everything in Business',
        'Unlimited team members',
        'White-label options',
        'API access',
        'Custom integrations',
        'Dedicated account manager',
        'Custom contracts',
        'Onboarding & training',
        'SLA guarantee',
        'Custom reporting',
      ],
      notIncluded: [],
      cta: 'Contact Sales',
      popular: false,
    },
  ],
}

export default function PricingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-deep via-calm to-deep py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl font-black mb-6">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Choose the plan that fits your needs. Upgrade or downgrade anytime.
            </p>
            <div className="inline-flex rounded-lg border border-white/20 p-1 bg-white/10 backdrop-blur">
              <button className="px-6 py-2 rounded-md bg-white text-deep font-semibold">
                For Speakers
              </button>
              <button className="px-6 py-2 rounded-md hover:bg-white/20 font-medium transition-colors">
                For Organizations
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Speakers Pricing */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">For Speakers</h2>
            <p className="text-lg text-gray-600">
              Build your speaking career with the right plan
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.speakers.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl ${
                  plan.popular
                    ? 'border-2 border-primary shadow-xl scale-105'
                    : 'border border-gray-200 shadow-soft'
                } bg-white p-8`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-primary text-white px-4 py-1 rounded-full text-sm font-semibold">
                      MOST POPULAR
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.period !== 'forever' && (
                      <span className="text-gray-600 ml-2">/{plan.period}</span>
                    )}
                  </div>
                  <p className="text-gray-600">{plan.description}</p>
                </div>

                <div className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                  {plan.notIncluded.map((feature) => (
                    <div key={feature} className="flex items-start gap-3 opacity-50">
                      <X className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-500">{feature}</span>
                    </div>
                  ))}
                </div>

                <Link href="/register?type=speaker">
                  <Button
                    className={`w-full ${plan.popular ? 'btn-primary' : ''}`}
                    variant={plan.popular ? 'default' : 'outline'}
                    size="lg"
                  >
                    {plan.cta}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Organizations Pricing */}
      <section className="py-20 bg-foam">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">For Organizations</h2>
            <p className="text-lg text-gray-600">
              Find and book speakers efficiently with the right tools
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.organizations.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl ${
                  plan.popular
                    ? 'border-2 border-secondary shadow-xl scale-105'
                    : 'border border-gray-200 shadow-soft'
                } bg-white p-8`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-secondary text-white px-4 py-1 rounded-full text-sm font-semibold">
                      RECOMMENDED
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.period !== 'forever' && plan.period !== 'contact us' && (
                      <span className="text-gray-600 ml-2">/{plan.period}</span>
                    )}
                  </div>
                  <p className="text-gray-600">{plan.description}</p>
                </div>

                <div className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                  {plan.notIncluded.map((feature) => (
                    <div key={feature} className="flex items-start gap-3 opacity-50">
                      <X className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-500">{feature}</span>
                    </div>
                  ))}
                </div>

                <Link href={plan.name === 'Enterprise' ? '/contact' : '/register?type=organization'}>
                  <Button
                    className={`w-full ${plan.popular ? '' : ''}`}
                    variant={plan.popular ? 'gradient' : 'outline'}
                    size="lg"
                  >
                    {plan.cta}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Features */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">All Plans Include</h2>
              <p className="text-lg text-gray-600">
                Core features available to all CoveTalks members
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Secure Platform</h3>
                <p className="text-gray-600 text-sm">
                  SSL encryption, secure payments, and data protection
                </p>
              </div>

              <div className="text-center">
                <div className="h-16 w-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="font-semibold mb-2">Fast & Reliable</h3>
                <p className="text-gray-600 text-sm">
                  99.9% uptime guarantee with lightning-fast performance
                </p>
              </div>

              <div className="text-center">
                <div className="h-16 w-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-accent" />
                </div>
                <h3 className="font-semibold mb-2">Quality Network</h3>
                <p className="text-gray-600 text-sm">
                  Verified profiles and authentic reviews you can trust
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-foam">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Pricing FAQs</h2>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-soft">
                <h3 className="text-lg font-semibold mb-2">Can I change plans anytime?</h3>
                <p className="text-gray-600">
                  Yes! You can upgrade or downgrade your plan at any time. Changes take effect 
                  at your next billing cycle.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-soft">
                <h3 className="text-lg font-semibold mb-2">Do you offer discounts for annual billing?</h3>
                <p className="text-gray-600">
                  Yes, we offer a 20% discount when you pay annually. Contact our sales team 
                  for more information.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-soft">
                <h3 className="text-lg font-semibold mb-2">What payment methods do you accept?</h3>
                <p className="text-gray-600">
                  We accept all major credit cards (Visa, Mastercard, American Express) and 
                  ACH transfers for enterprise accounts.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-soft">
                <h3 className="text-lg font-semibold mb-2">Is there a free trial for paid plans?</h3>
                <p className="text-gray-600">
                  We offer a 14-day free trial for our Professional and Business plans. 
                  No credit card required to start.
                </p>
              </div>
            </div>

            <div className="text-center mt-12">
              <p className="text-gray-600 mb-4">Have more questions?</p>
              <Link href="/contact">
                <Button variant="outline">Contact Our Sales Team</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-deep to-calm">
        <div className="container text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of speakers and organizations already using CoveTalks
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="xl" className="bg-white text-deep hover:bg-gray-100">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="xl" variant="outline" className="border-white text-white hover:bg-white hover:text-deep">
                Talk to Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
