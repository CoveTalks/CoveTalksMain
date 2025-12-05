'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { 
  Mic2, Heart, Users, Globe, ArrowRight, PlayCircle, X, 
  CheckCircle, Sparkles, HandHeart, Target, Award,
  Building2, GraduationCap, Church, MessageSquare,
  TrendingUp, Zap, Calendar, Star, Lightbulb
} from 'lucide-react'

const impactAreas = [
  { icon: Building2, label: 'Non-Profits', description: 'Train staff and volunteers' },
  { icon: GraduationCap, label: 'Schools', description: 'Educate and inspire students' },
  { icon: Church, label: 'Churches', description: 'Equip ministry teams' },
]

const benefits = [
  {
    icon: Heart,
    title: 'Meaningful Service',
    description: 'Use your expertise to strengthen organizations doing important work in communities across the country.',
  },
  {
    icon: Globe,
    title: 'Expand Your Reach',
    description: 'Connect with nonprofits, schools, and churches nationwide virtually or in-person.',
  },
  {
    icon: Users,
    title: 'Build Relationships',
    description: 'Form lasting connections with mission-driven organizations that value what you offer.',
  },
  {
    icon: Award,
    title: 'Grow Your Impact',
    description: 'Build your reputation as a community leader while making a tangible difference.',
  },
]

const expertiseTopics = [
  'Leadership Development',
  'Marketing & Communications',
  'Fundraising & Grants',
  'Mental Health & Wellness',
  'Technology & AI',
  'Team Building',
  'Strategic Planning',
  'Design & Branding',
  'Education & Training',
  'Financial Management',
  'Volunteer Management',
  'Community Outreach',
]

const howItWorks = [
  {
    icon: Mic2,
    title: 'Create Your Profile',
    description: 'Showcase your expertise, experience, and the topics you\'re passionate about sharing.',
  },
  {
    icon: Target,
    title: 'Get Discovered',
    description: 'Organizations browse our community to find experts who align with their mission and needs.',
  },
  {
    icon: MessageSquare,
    title: 'Connect Directly',
    description: 'Communicate with organizations to understand their goals and plan impactful sessions.',
  },
  {
    icon: Sparkles,
    title: 'Make an Impact',
    description: 'Deliver training, workshops, or talks that transform teams and strengthen communities.',
  },
]

const testimonials = [
  {
    quote: "CoveTalks lets me use my marketing expertise to help organizations that couldn't otherwise afford professional training. It's incredibly fulfilling.",
    author: "Marketing Director",
    location: "Denver, CO"
  },
  {
    quote: "I've built amazing relationships with nonprofits across the country. The platform makes it easy to give back in a structured, meaningful way.",
    author: "Leadership Coach", 
    location: "Austin, TX"
  },
  {
    quote: "As someone who's been blessed with opportunities, CoveTalks is my way of paying it forward to communities that need support.",
    author: "Technology Consultant",
    location: "Chicago, IL"
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
              src="/assets/Amplify_Your_Voice_with_CoveTalks.mp4"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ForSpeakersPage() {
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
        <div className="absolute top-20 right-10 w-64 h-64 bg-accent/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-8">
              <Mic2 className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium">Join the CoveTalkers Community</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
              Amplify Your{' '}
              <span className="text-accent">Voice</span>
            </h1>
            
            <p className="text-xl md:text-2xl leading-relaxed text-white/90 mb-8 max-w-3xl mx-auto">
              Share your expertise with nonprofits, schools, and churches who need your knowledge. 
              Be part of a nationwide community of professionals committed to strengthening organizations through service.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/register?type=speaker">
                <Button size="xl" className="bg-accent hover:bg-accent/90 text-black font-semibold shadow-lg shadow-accent/25">
                  Become a CoveTalker
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
                Watch the Video
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/70">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-accent" />
                <span>Speaker Resources</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-accent" />
                <span>Nationwide reach</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-accent" />
                <span>Meaningful connections</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who You'll Serve */}
      <section className="py-16 bg-white border-b">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Who You'll Serve</h2>
            <p className="text-gray-600">Connect with organizations making a difference</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {impactAreas.map((area) => (
              <div key={area.label} className="flex flex-col items-center text-center p-6 rounded-2xl bg-foam/50 hover:bg-foam transition-colors">
                <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                  <area.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-1">{area.label}</h3>
                <p className="text-gray-600 text-sm">{area.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What is a CoveTalker */}
      <section className="py-20 bg-foam">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                What is a{' '}
                <span className="text-primary">CoveTalker</span>?
              </h2>
              <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
            </div>

            <div className="prose prose-lg max-w-none text-center mb-12">
              <p className="text-xl text-gray-700 leading-relaxed">
                CoveTalkers are <strong>community and organizational leaders committed to strengthening teams 
                through meaningful outreach, learning, and connection</strong>. They're not presenters looking 
                to polish their resumes, they're practitioners actively giving back through service.
              </p>
              <p className="text-xl text-gray-700 leading-relaxed">
                When you become a CoveTalker, you join a nationwide network of professionals who believe 
                that <strong>shared knowledge doesn't just inform, it transforms</strong>.
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

      {/* Topics You Can Share */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Share Your Expertise</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Whatever your specialty, there are organizations that need exactly what you know.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {expertiseTopics.map((topic) => (
              <span 
                key={topic} 
                className="px-4 py-2 rounded-full bg-foam text-gray-700 text-sm font-medium hover:bg-primary/10 hover:text-primary transition-colors cursor-default"
              >
                {topic}
              </span>
            ))}
            <span className="px-4 py-2 rounded-full bg-gradient-to-r from-primary to-calm text-white text-sm font-medium">
              + Many More
            </span>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-b from-foam to-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How CoveTalks Works</h2>
            <p className="text-lg text-gray-600">From sign-up to impact in four simple steps</p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {howItWorks.map((step, index) => (
                <div key={step.title} className="relative text-center">
                  <div className="relative mb-6">
                    <div className="h-16 w-16 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xl mx-auto shadow-lg">
                      {index + 1}
                    </div>
                    <div className="absolute top-1/2 -translate-y-1/2 left-1/2 h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center ml-6">
                      <step.icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">CoveTalkers Making a Difference</h2>
            <p className="text-lg text-gray-600">Hear from professionals already serving through CoveTalks</p>
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
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Features Teaser */}
      <section className="py-20 bg-foam">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-soft border border-gray-100">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 bg-accent/10 rounded-full px-3 py-1 mb-4">
                    <Zap className="h-4 w-4 text-accent" />
                    <span className="text-sm font-medium text-gray-700">For Professional CoveTalkers</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Want to Grow Your Speaking Business?</h3>
                  <p className="text-gray-600 mb-6">
                    CoveTalks also offers premium features for professional CoveTalkers looking to 
                    expand their reach, manage bookings, and build their reputation. Start free 
                    with community outreach, then upgrade when you're ready.
                  </p>
                  <Link href="/pricing?type=speaker">
                    <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                      Explore CoveTalker Plans
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-gray-700">Enhanced profile visibility</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-gray-700">Priority in search results</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-gray-700">Advanced analytics dashboard</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-gray-700">Booking & payment management</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-gray-700">Featured CoveTalkers opportunities</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mutual Benefit */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-6">
              <HandHeart className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Give & Grow</span>
            </div>
            
            <h2 className="text-3xl font-bold mb-6">The Impact Flows Both Ways</h2>
            
            <p className="text-xl text-gray-700 leading-relaxed mb-8">
              While organizations gain guidance from your experience, you deepen your service, 
              expand your outreach, and build meaningful relationships with communities that value 
              what you have to offer. It's a powerful, mutually beneficial exchange rooted in the 
              shared goal of <strong>strengthening communities through connection and service</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-deep to-calm relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-5"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
        
        <div className="container relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Amplify Your Voice?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join the growing community of CoveTalkers making a difference in nonprofits, 
            schools, and churches across the country.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register?type=speaker">
              <Button size="xl" className="bg-accent hover:bg-accent/90 text-black font-semibold shadow-lg">
                Become a CoveTalker
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/organizations">
              <Button size="xl" variant="outline" className="border-white/30 text-accent hover:bg-white hover:text-deep">
                Browse Organizations
              </Button>
            </Link>
          </div>
          <p className="text-white/60 text-sm mt-6">
            Free to join. Start making an impact today.
          </p>
        </div>
      </section>
    </div>
  )
}