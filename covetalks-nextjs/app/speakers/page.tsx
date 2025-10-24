import Image from 'next/image'
import Link from 'next/link'
import { Star, MapPin, DollarSign, Filter, Search, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'

// This would normally come from Supabase
const mockSpeakers = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    title: 'Leadership & Innovation Expert',
    bio: 'Transforming organizations through innovative leadership strategies for over 15 years.',
    location: 'New York, NY',
    specialties: ['Leadership', 'Innovation', 'Change Management'],
    rating: 4.9,
    reviewCount: 127,
    priceRange: '$5,000 - $10,000',
    image: '/images/speaker1.jpg',
    verified: true,
    featured: true,
  },
  {
    id: '2',
    name: 'Michael Chen',
    title: 'Technology Futurist',
    bio: 'Helping companies navigate digital transformation and emerging technologies.',
    location: 'San Francisco, CA',
    specialties: ['AI/ML', 'Digital Transformation', 'Future of Work'],
    rating: 4.8,
    reviewCount: 89,
    priceRange: '$3,000 - $7,000',
    image: '/images/speaker2.jpg',
    verified: true,
    featured: false,
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    title: 'Diversity & Inclusion Strategist',
    bio: 'Building inclusive workplaces that drive innovation and employee engagement.',
    location: 'Chicago, IL',
    specialties: ['Diversity', 'Inclusion', 'Company Culture'],
    rating: 5.0,
    reviewCount: 63,
    priceRange: '$2,500 - $5,000',
    image: '/images/speaker3.jpg',
    verified: true,
    featured: false,
  },
  // Add more mock speakers as needed
]

const specialtyOptions = [
  'Leadership',
  'Innovation',
  'Technology',
  'Marketing',
  'Sales',
  'Finance',
  'HR',
  'Diversity',
  'Wellness',
  'Motivation',
]

const locationOptions = [
  'Any Location',
  'Virtual Only',
  'United States',
  'Europe',
  'Asia',
  'Australia',
]

const priceRanges = [
  'Any Budget',
  'Under $1,000',
  '$1,000 - $2,500',
  '$2,500 - $5,000',
  '$5,000 - $10,000',
  '$10,000+',
]

export default function SpeakersPage() {
  return (
    <div className="min-h-screen bg-foam">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-deep to-calm py-16">
        <div className="container">
          <h1 className="text-4xl font-bold text-white mb-4">Find Your Perfect Speaker</h1>
          <p className="text-xl text-white/90 max-w-2xl">
            Browse our curated network of professional speakers ready to inspire, educate, and transform your next event.
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="bg-white border-b sticky top-16 z-40 shadow-sm">
        <div className="container py-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, topic, or keyword..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            {/* Filter Dropdowns */}
            <div className="flex gap-2">
              <div className="relative">
                <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
                  <Filter className="h-4 w-4" />
                  <span>Specialty</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>

              <div className="relative">
                <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
                  <MapPin className="h-4 w-4" />
                  <span>Location</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>

              <div className="relative">
                <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
                  <DollarSign className="h-4 w-4" />
                  <span>Budget</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>

              <Button variant="outline">Clear Filters</Button>
            </div>
          </div>

          {/* Active Filters */}
          <div className="flex flex-wrap gap-2 mt-4">
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
              Leadership ×
            </span>
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
              United States ×
            </span>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="container py-8">
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">
            Showing <span className="font-semibold">1-12</span> of <span className="font-semibold">127</span> speakers
          </p>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Sort by:</span>
            <select className="border rounded-lg px-3 py-1 text-sm">
              <option>Relevance</option>
              <option>Rating</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Most Reviews</option>
            </select>
          </div>
        </div>

        {/* Speaker Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockSpeakers.map((speaker) => (
            <Link key={speaker.id} href={`/speakers/${speaker.id}`}>
              <div className="bg-white rounded-xl shadow-soft hover:shadow-hard transition-shadow cursor-pointer h-full">
                {speaker.featured && (
                  <div className="bg-accent text-black text-xs font-semibold px-3 py-1 rounded-t-xl text-center">
                    FEATURED SPEAKER
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="relative h-20 w-20 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                      <Image
                        src={speaker.image}
                        alt={speaker.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-lg">{speaker.name}</h3>
                          <p className="text-sm text-gray-600">{speaker.title}</p>
                        </div>
                        {speaker.verified && (
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                            Verified
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-700 mt-4 line-clamp-2">{speaker.bio}</p>

                  <div className="flex items-center gap-4 mt-4 text-sm">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600">{speaker.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600">{speaker.priceRange}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {speaker.specialties.slice(0, 3).map((specialty) => (
                      <span
                        key={specialty}
                        className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-4 border-t">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-accent text-accent" />
                        <span className="font-semibold">{speaker.rating}</span>
                      </div>
                      <span className="text-sm text-gray-600">
                        ({speaker.reviewCount} reviews)
                      </span>
                    </div>
                    <Button size="sm" variant="ghost" className="text-primary hover:text-primary/80">
                      View Profile →
                    </Button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-12">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">Previous</Button>
            <Button variant="default" size="sm">1</Button>
            <Button variant="outline" size="sm">2</Button>
            <Button variant="outline" size="sm">3</Button>
            <span className="px-3 text-gray-500">...</span>
            <Button variant="outline" size="sm">11</Button>
            <Button variant="outline" size="sm">Next</Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-deep to-calm py-16 mt-16">
        <div className="container text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Are You a Professional Speaker?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join our network of expert speakers and connect with organizations looking for your expertise.
          </p>
          <Link href="/register?type=speaker">
            <Button size="xl" className="bg-white text-deep hover:bg-gray-100">
              Join as a Speaker
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
