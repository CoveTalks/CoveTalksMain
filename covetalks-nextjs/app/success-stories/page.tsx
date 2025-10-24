'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Star, Calendar, MapPin, Users, TrendingUp, Award, Quote } from 'lucide-react'
import { Button } from '@/components/ui/button'

const successStories = [
  {
    id: 1,
    type: 'speaker',
    name: 'Sarah Johnson',
    title: 'Leadership Coach',
    image: '/images/success-1.jpg',
    location: 'New York, NY',
    featured: true,
    stats: {
      events: 45,
      rating: 4.9,
      earnings: '$125,000',
    },
    quote: 'CoveTalks transformed my speaking career. I went from struggling to find opportunities to being booked months in advance. The platform made it easy to showcase my expertise and connect with organizations that truly value what I offer.',
    story: 'Sarah joined CoveTalks 18 months ago and has since become one of our most requested leadership speakers. Her expertise in transformational leadership has helped dozens of organizations improve their company culture.',
    outcomes: [
      'Increased speaking engagements by 300%',
      'Built relationships with Fortune 500 companies',
      'Launched her own leadership podcast',
    ],
  },
  {
    id: 2,
    type: 'organization',
    name: 'TechCorp International',
    title: 'Global Technology Company',
    image: '/images/success-2.jpg',
    location: 'San Francisco, CA',
    featured: true,
    stats: {
      events: 25,
      speakers: 30,
      satisfaction: '98%',
    },
    quote: 'Finding quality speakers used to take weeks. With CoveTalks, we can find and book expert speakers in days. The platform has become essential for our event planning.',
    story: 'TechCorp uses CoveTalks to find speakers for their quarterly all-hands meetings, customer conferences, and employee development programs. They\'ve significantly improved event quality while reducing planning time.',
    outcomes: [
      'Reduced speaker sourcing time by 75%',
      'Improved event satisfaction scores by 40%',
      'Saved over $50,000 in agency fees',
    ],
  },
  {
    id: 3,
    type: 'speaker',
    name: 'Michael Chen',
    title: 'Innovation Strategist',
    image: '/images/success-3.jpg',
    location: 'Austin, TX',
    featured: false,
    stats: {
      events: 32,
      rating: 5.0,
      earnings: '$85,000',
    },
    quote: 'As someone new to professional speaking, CoveTalks gave me the platform and tools to build my reputation. The review system helped me establish credibility quickly.',
    story: 'Michael transitioned from corporate consulting to professional speaking using CoveTalks. Within a year, he\'s become a sought-after innovation speaker for tech companies and startups.',
    outcomes: [
      'Built a speaking business from scratch',
      'Achieved 5-star average rating',
      'Now speaks internationally',
    ],
  },
]

const testimonials = [
  {
    name: 'Jennifer Williams',
    role: 'Event Director, NonProfit Alliance',
    quote: 'CoveTalks has been a game-changer for our annual conference planning. The quality of speakers and ease of booking is unmatched.',
    rating: 5,
  },
  {
    name: 'David Thompson',
    role: 'Motivational Speaker',
    quote: 'The platform\'s professional tools and supportive community helped me grow from local events to national conferences.',
    rating: 5,
  },
  {
    name: 'Lisa Park',
    role: 'HR Director, Global Retail Co',
    quote: 'We\'ve found amazing speakers for our diversity and inclusion initiatives through CoveTalks. The impact on our organization has been profound.',
    rating: 5,
  },
]

const impactStats = [
  { icon: Users, value: '10,000+', label: 'Successful Connections' },
  { icon: Star, value: '4.8', label: 'Average Rating' },
  { icon: MapPin, value: '50+', label: 'Countries Reached' },
  { icon: TrendingUp, value: '$5M+', label: 'Speaker Earnings' },
]

export default function SuccessStoriesPage() {
  const [filter, setFilter] = useState<'all' | 'speaker' | 'organization'>('all')

  const filteredStories = successStories.filter(
    story => filter === 'all' || story.type === filter
  )

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-deep to-calm py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl font-black mb-6">
              Real Stories, Real Impact
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Discover how CoveTalks is connecting knowledge with opportunity, 
              transforming events and careers
            </p>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-12 bg-white border-b">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8">
            {impactStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-4">
                  <stat.icon className="h-8 w-8 text-primary" />
                </div>
                <div className="text-3xl font-bold text-deep">{stat.value}</div>
                <div className="text-gray-600 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-8 bg-foam sticky top-16 z-30">
        <div className="container">
          <div className="flex justify-center gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              All Stories
            </button>
            <button
              onClick={() => setFilter('speaker')}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                filter === 'speaker'
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Speaker Success
            </button>
            <button
              onClick={() => setFilter('organization')}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                filter === 'organization'
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Organization Success
            </button>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20">
        <div className="container">
          <div className="space-y-20">
            {filteredStories.map((story, index) => (
              <div key={story.id} className={`${index % 2 === 1 ? 'bg-foam' : ''} py-12 -mx-4 px-4 rounded-xl`}>
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <div className="relative">
                      {story.featured && (
                        <div className="absolute -top-4 -right-4 bg-accent text-black px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 z-10">
                          <Award className="h-4 w-4" />
                          FEATURED STORY
                        </div>
                      )}
                      <div className="relative h-[400px] rounded-xl overflow-hidden bg-gray-200">
                        <Image
                          src={story.image}
                          alt={story.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        story.type === 'speaker' 
                          ? 'bg-primary/10 text-primary' 
                          : 'bg-secondary/10 text-secondary'
                      }`}>
                        {story.type === 'speaker' ? 'SPEAKER SUCCESS' : 'ORGANIZATION SUCCESS'}
                      </span>
                      {story.location && (
                        <span className="flex items-center gap-1 text-sm text-gray-600">
                          <MapPin className="h-3 w-3" />
                          {story.location}
                        </span>
                      )}
                    </div>

                    <h2 className="text-3xl font-bold mb-2">{story.name}</h2>
                    <p className="text-lg text-gray-600 mb-6">{story.title}</p>

                    <div className="flex gap-6 mb-6">
                      {Object.entries(story.stats).map(([key, value]) => (
                        <div key={key}>
                          <div className="text-2xl font-bold text-deep">{value}</div>
                          <div className="text-sm text-gray-600 capitalize">{key}</div>
                        </div>
                      ))}
                    </div>

                    <blockquote className="relative mb-6">
                      <Quote className="absolute -top-2 -left-2 h-8 w-8 text-primary/20" />
                      <p className="text-lg italic text-gray-700 pl-6">
                        "{story.quote}"
                      </p>
                    </blockquote>

                    <p className="text-gray-600 mb-6">{story.story}</p>

                    <div className="space-y-2 mb-6">
                      <h4 className="font-semibold">Key Outcomes:</h4>
                      {story.outcomes.map((outcome, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-accent"></div>
                          <span className="text-gray-700">{outcome}</span>
                        </div>
                      ))}
                    </div>

                    <Link href={story.type === 'speaker' ? '/register?type=speaker' : '/register?type=organization'}>
                      <Button>
                        {story.type === 'speaker' ? 'Become a Speaker' : 'Find Speakers'}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-foam">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Community Says</h2>
            <p className="text-lg text-gray-600">
              Hear directly from speakers and organizations who've found success
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-soft">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-deep to-calm">
        <div className="container text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Write Your Success Story?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals connecting through CoveTalks
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register?type=speaker">
              <Button size="xl" className="bg-white text-deep hover:bg-gray-100">
                Become a Speaker
              </Button>
            </Link>
            <Link href="/register?type=organization">
              <Button size="xl" variant="outline" className="border-white text-white hover:bg-white hover:text-deep">
                Find Speakers
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
