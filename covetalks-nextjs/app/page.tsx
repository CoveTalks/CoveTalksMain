import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowRight, Users, Calendar, Star, Shield, MessageSquare, TrendingUp, CheckCircle } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-deep via-calm to-deep py-20 lg:py-32">
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10"></div>
        <div className="container relative z-10">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="text-white">
              <h1 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
                Where Connections{' '}
                <span className="text-accent">Ignite</span>{' '}
                Opportunities
              </h1>
              <p className="mt-6 text-xl leading-relaxed text-white/90">
                Connect professional speakers with organizations seeking expertise. 
                Find the perfect speaker for your next event or share your knowledge with the world.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link href="/register">
                  <Button size="xl" variant="default" className="bg-accent hover:bg-accent/90 text-black">
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/how-it-works">
                  <Button size="xl" variant="outline" className="border-white text-accent hover:bg-white hover:text-deep">
                    Learn How It Works
                  </Button>
                </Link>
              </div>
              <div className="mt-8 flex items-center gap-8 text-sm">
                 <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-accent" />
                  <span>1000+ Speakers</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-accent" />
                  <span>Secure platform</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/hero-speaker.jpg"
                  alt="Professional speaker at event"
                  width={600}
                  height={400}
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep/50 to-transparent"></div>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center">
                    <Star className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <p className="font-semibold">4.9/5 Rating</p>
                    <p className="text-sm text-gray-600">From 500+ Reviews</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-deep">1,000+</div>
              <div className="text-gray-600 mt-1">Active Speakers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-deep">500+</div>
              <div className="text-gray-600 mt-1">Organizations</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-deep">2,500+</div>
              <div className="text-gray-600 mt-1">Events Matched</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-deep">98%</div>
              <div className="text-gray-600 mt-1">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-foam">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">Everything You Need in One Platform</h2>
            <p className="text-lg text-gray-600">
              Whether you're a speaker or an organization, we've got you covered with powerful features.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card hover:shadow-hard transition-shadow">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Matching</h3>
              <p className="text-gray-600">
                Our AI-powered system matches speakers with organizations based on expertise, location, and budget.
              </p>
            </div>

            <div className="card hover:shadow-hard transition-shadow">
              <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Scheduling</h3>
              <p className="text-gray-600">
                Coordinate events effortlessly with integrated calendar management and availability tracking.
              </p>
            </div>

            <div className="card hover:shadow-hard transition-shadow">
              <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                <MessageSquare className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Direct Messaging</h3>
              <p className="text-gray-600">
                Communicate directly within the platform with secure, built-in messaging features.
              </p>
            </div>

            <div className="card hover:shadow-hard transition-shadow">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Payments</h3>
              <p className="text-gray-600">
                Handle transactions safely with our integrated Stripe payment processing system.
              </p>
            </div>

            <div className="card hover:shadow-hard transition-shadow">
              <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
                <Star className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Reviews & Ratings</h3>
              <p className="text-gray-600">
                Build credibility with verified reviews and ratings from past engagements.
              </p>
            </div>

            <div className="card hover:shadow-hard transition-shadow">
              <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Analytics Dashboard</h3>
              <p className="text-gray-600">
                Track performance, engagement, and growth with comprehensive analytics tools.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">How CoveTalks Works</h2>
            <p className="text-lg text-gray-600">
              Get started in minutes and connect with the perfect match for your needs.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0 h-12 w-12 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Create Your Profile</h3>
                  <p className="text-gray-600">
                    Sign up as a speaker or organization and build your comprehensive profile with all relevant details.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 h-12 w-12 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Browse & Connect</h3>
                  <p className="text-gray-600">
                    Speakers browse opportunities, organizations search for speakers. Apply or invite with one click.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 h-12 w-12 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Communicate & Negotiate</h3>
                  <p className="text-gray-600">
                    Use our messaging system to discuss details, negotiate terms, and finalize arrangements.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 h-12 w-12 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Deliver & Review</h3>
                  <p className="text-gray-600">
                    Complete the engagement and leave reviews to build reputation and trust in the community.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <Image
                src="/images/dashboard-preview.svg"
                alt="CoveTalks Dashboard"
                width={600}
                height={450}
                className="rounded-xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-foam">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-lg text-gray-600">
              Join thousands of satisfied speakers and organizations already using CoveTalks.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-soft">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "CoveTalks transformed how I find speaking opportunities. The platform is intuitive and the quality of events is outstanding."
              </p>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gray-200"></div>
                <div>
                  <p className="font-semibold">Sarah Johnson</p>
                  <p className="text-sm text-gray-600">Leadership Coach</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-soft">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "Finding quality speakers for our events has never been easier. The vetting process gives us confidence in our choices."
              </p>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gray-200"></div>
                <div>
                  <p className="font-semibold">Michael Chen</p>
                  <p className="text-sm text-gray-600">Event Director, TechCorp</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-soft">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "The messaging system and payment processing make the entire booking process seamless. Highly recommend!"
              </p>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gray-200"></div>
                <div>
                  <p className="font-semibold">Emily Rodriguez</p>
                  <p className="text-sm text-gray-600">HR Manager, StartupCo</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-deep to-calm">
        <div className="container text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Connect?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join CoveTalks today and start building meaningful connections that drive success.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register?type=speaker">
              <Button size="xl" className="bg-white text-deep hover:bg-gray-100">
                Join as a Speaker
              </Button>
            </Link>
            <Link href="/register?type=organization">
              <Button size="xl" variant="outline" className="border-white text-accent hover:bg-white hover:text-deep">
                Join as an Organization
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
