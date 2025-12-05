'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { 
  Heart, Users, Lightbulb, Shield, Gift, ArrowRight, 
  PlayCircle, X, CheckCircle, Sparkles, HandHeart,
  GraduationCap, Church, Building2, Megaphone, Brain,
  TrendingUp, Palette, DollarSign, HeartHandshake
} from 'lucide-react'

const expertiseAreas = [
  { icon: Megaphone, label: 'Marketing & Communications' },
  { icon: TrendingUp, label: 'Leadership Development' },
  { icon: Brain, label: 'Mental Health & Wellness' },
  { icon: DollarSign, label: 'Fundraising & Grants' },
  { icon: Palette, label: 'Design & Branding' },
  { icon: Lightbulb, label: 'AI & Technology' },
  { icon: Users, label: 'Team Building' },
  { icon: GraduationCap, label: 'Education & Training' },
]

const benefits = [
  {
    icon: Gift,
    title: 'Completely Free',
    description: 'No cost for nonprofits, schools, or churches. Ever. This is community helping community.',
  },
  {
    icon: HeartHandshake,
    title: 'Mission-Aligned Experts',
    description: 'Connect with professionals who share your values and volunteer their expertise to strengthen your work.',
  },
  {
    icon: Sparkles,
    title: 'Real-World Knowledge',
    description: 'Gain practical skills and actionable insights from practitioners actively giving back through outreach.',
  },
  {
    icon: Shield,
    title: 'Trusted Community',
    description: 'Every CoveTalker is vetted and committed to serving organizations doing important work.',
  },
]

const orgTypes = [
  { icon: Building2, label: 'Non-Profits', description: '501(c)(3) organizations' },
  { icon: GraduationCap, label: 'Schools', description: 'K-12 and higher education' },
  { icon: Church, label: 'Churches', description: 'Religious organizations' },
]

const testimonials = [
  {
    quote: "CoveTalks connected us with a marketing expert who transformed how we communicate our mission. The training was invaluable.",
    author: "Community Center Director",
    org: "Phoenix, AZ"
  },
  {
    quote: "Finding qualified trainers for our volunteer team used to be impossible on our budget. CoveTalks changed everything.",
    author: "Youth Program Coordinator", 
    org: "Dallas, TX"
  },
  {
    quote: "The leadership workshop energized our entire staff. It's rare to find this caliber of expertise offered in service.",
    author: "Church Administrator",
    org: "Atlanta, GA"
  },
]

function VideoModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-4xl">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="relative bg-black aspect-video">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="h-5 w-5 text-white" />
            </button>
            <video
              controls
              autoPlay
              className="w-full h-full"
              src="/assets/Unlocking_Free_Speaker_Opportunities_with_CoveTalks.mp4"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ForNonprofitsPage() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)

  return (
    <div className="min-h-screen">
      <VideoModal 
        isOpen={isVideoModalOpen} 
        onClose={() => setIsVideoModalOpen(false)} 
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-deep via-calm to-deep py-20 lg:py-28">
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-5"></div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-accent/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-8">
              <Heart className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium">100% Free for Non-Profits, Schools & Churches</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
              Community Helping{' '}
              <span className="text-accent">Community</span>
            </h1>
            
            <p className="text-xl md:text-2xl leading-relaxed text-white/90 mb-8 max-w-3xl mx-auto">
              Connect with mission-aligned professionals who volunteer their expertise 
              to train, equip, and strengthen the organizations doing important work in their communities.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/register?type=organization">
                <Button size="xl" className="bg-accent hover:bg-accent/90 text-black font-semibold shadow-lg shadow-accent/25">
                  Create Free Account
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button 
                size="xl" 
                variant="outline" 
                className="border-white/30 text-accent hover:bg-white hover:text-deep"
                onClick={() => setIsVideoModalOpen(true)}
              >
                <PlayCircle className="mr-2 h-5 w-5" />
                Watch How It Works
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/70">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-accent" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-accent" />
                <span>Nationwide network</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-accent" />
                <span>Virtual & in-person</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Serve */}
      <section className="py-16 bg-white border-b">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Who We Serve</h2>
            <p className="text-gray-600">CoveTalks is built for organizations making a difference</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {orgTypes.map((org) => (
              <div key={org.label} className="flex flex-col items-center text-center p-6 rounded-2xl bg-foam/50 hover:bg-foam transition-colors">
                <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                  <org.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-1">{org.label}</h3>
                <p className="text-gray-600 text-sm">{org.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What is CoveTalks */}
      <section className="py-20 bg-foam">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Not a Speakers Bureau.{' '}
                <span className="text-primary">A Community.</span>
              </h2>
              <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
            </div>

            <div className="prose prose-lg max-w-none text-center mb-12">
              <p className="text-xl text-gray-700 leading-relaxed">
                CoveTalks is a nationwide community outreach organization that connects nonprofits, 
                schools, and churches with <strong>mission-aligned professionals who volunteer their expertise</strong> to 
                strengthen the organizations doing important work on the front lines.
              </p>
              <p className="text-xl text-gray-700 leading-relaxed">
                Instead of booking "speakers," you're connecting directly with community members who are 
                eager to serve, support, and strengthen your organization, at <strong>no cost</strong>.
              </p>
            </div>

            {/* Benefits Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {benefits.map((benefit) => (
                <div 
                  key={benefit.title} 
                  className="bg-white rounded-xl p-6 shadow-soft hover:shadow-hard transition-all duration-300 border border-gray-100"
                >
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/10 to-calm/10 flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                      <p className="text-gray-600">{benefit.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Areas */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Access Expertise Across Every Area</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From marketing and design to leadership, AI, fundraising, and mental health - our 
              community of experts is ready to train and equip your team.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {expertiseAreas.map((area) => (
              <div 
                key={area.label} 
                className="flex flex-col items-center text-center p-5 rounded-xl bg-foam hover:bg-gradient-to-br hover:from-primary/5 hover:to-calm/5 transition-all duration-300 group"
              >
                <div className="h-12 w-12 rounded-xl bg-white shadow-soft flex items-center justify-center mb-3 group-hover:shadow-hard transition-shadow">
                  <area.icon className="h-6 w-6 text-primary" />
                </div>
                <span className="text-sm font-medium text-gray-700">{area.label}</span>
              </div>
            ))}
          </div>

          <p className="text-center text-gray-500 mt-8">
            And many more specialties to support your mission
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-b from-foam to-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Getting Started is Simple</h2>
            <p className="text-lg text-gray-600">Three steps to equipping your team</p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Steps with connecting line */}
            <div className="relative">
              {/* Horizontal connector line - hidden on mobile */}
              <div className="hidden md:block absolute top-8 left-[16.67%] right-[16.67%] h-0.5 bg-gray-300"></div>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="relative text-center">
                  <div className="h-16 w-16 rounded-full bg-primary text-white flex items-center justify-center font-bold text-2xl mx-auto mb-6 shadow-lg relative z-10">
                    1
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Create Your Profile</h3>
                  <p className="text-gray-600">
                    Sign up for free and tell us about your organization's mission and training needs.
                  </p>
                </div>

                <div className="relative text-center">
                  <div className="h-16 w-16 rounded-full bg-primary text-white flex items-center justify-center font-bold text-2xl mx-auto mb-6 shadow-lg relative z-10">
                    2
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Browse & Connect</h3>
                  <p className="text-gray-600">
                    Explore our community of CoveTalkers and find experts who align with your goals.
                  </p>
                </div>

                <div className="text-center">
                  <div className="h-16 w-16 rounded-full bg-primary text-white flex items-center justify-center font-bold text-2xl mx-auto mb-6 shadow-lg relative z-10">
                    3
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Transform Your Team</h3>
                  <p className="text-gray-600">
                    Host workshops, trainings, or events that spark progress and fuel your mission.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Organizations Are Thriving</h2>
            <p className="text-lg text-gray-600">See the impact of community helping community</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-foam rounded-2xl p-8 relative">
                <div className="absolute -top-3 left-8 text-6xl text-primary/20 font-serif">"</div>
                <p className="text-gray-700 mb-6 relative z-10 italic">
                  {testimonial.quote}
                </p>
                <div className="border-t border-gray-200 pt-4">
                  <p className="font-semibold text-gray-900">{testimonial.author}</p>
                  <p className="text-sm text-gray-500">{testimonial.org}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mutual Benefit */}
      <section className="py-20 bg-foam">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-6">
              <HeartHandshake className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Mutual Impact</span>
            </div>
            
            <h2 className="text-3xl font-bold mb-6">The Impact Flows Both Ways</h2>
            
            <p className="text-xl text-gray-700 leading-relaxed mb-8">
              While your team gains guidance from experienced community members, CoveTalkers deepen 
              their service, expand their outreach, and build meaningful relationships with organizations 
              that value what they have to offer. It's a powerful, mutually beneficial exchange rooted 
              in the shared goal of <strong>strengthening communities through connection and service</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-deep to-calm relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-5"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
        
        <div className="container relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Equip Your Team?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join the growing network of organizations strengthening their communities 
            through meaningful connection, one conversation at a time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register?type=organization">
              <Button size="xl" className="bg-accent hover:bg-accent/90 text-black font-semibold shadow-lg">
                Create Free Account
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/speakers">
              <Button size="xl" variant="outline" className="border-white/30 text-accent hover:bg-white hover:text-deep">
                Browse CoveTalkers
              </Button>
            </Link>
          </div>
          <p className="text-white/60 text-sm mt-6">
            No cost. No credit card. No catch.
          </p>
        </div>
      </section>
    </div>
  )
}