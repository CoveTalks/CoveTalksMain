import Image from 'next/image'
import Link from 'next/link'
import { Calendar, MapPin, DollarSign, Clock, Users, Filter, Search, ChevronDown, Building } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { formatDate, formatCurrency } from '@/lib/utils'

// This would normally come from Supabase
const mockOpportunities = [
  {
    id: '1',
    title: 'Keynote Speaker for Annual Tech Conference',
    organization: 'TechCorp International',
    organizationLogo: '/images/org1.jpg',
    eventType: 'Conference',
    eventFormat: 'In-Person',
    eventDate: '2024-06-15',
    applicationDeadline: '2024-05-01',
    location: 'San Francisco, CA',
    audienceSize: 500,
    duration: 60,
    budgetMin: 10000,
    budgetMax: 15000,
    topics: ['AI/ML', 'Future of Work', 'Innovation'],
    description: 'We are seeking an inspiring keynote speaker for our annual technology conference. The ideal speaker will have expertise in AI/ML and can engage a technical audience.',
    featured: true,
    applicants: 12,
  },
  {
    id: '2',
    title: 'Leadership Workshop for Executive Team',
    organization: 'Fortune 500 Company',
    organizationLogo: '/images/org2.jpg',
    eventType: 'Workshop',
    eventFormat: 'Virtual',
    eventDate: '2024-05-20',
    applicationDeadline: '2024-04-15',
    location: 'Virtual',
    audienceSize: 25,
    duration: 180,
    budgetMin: 5000,
    budgetMax: 7500,
    topics: ['Leadership', 'Team Building', 'Change Management'],
    description: 'Looking for an experienced facilitator to conduct a half-day leadership workshop for our executive team focusing on change management strategies.',
    featured: false,
    applicants: 8,
  },
  {
    id: '3',
    title: 'Diversity & Inclusion Panel Moderator',
    organization: 'StartupCo',
    organizationLogo: '/images/org3.jpg',
    eventType: 'Panel Discussion',
    eventFormat: 'Hybrid',
    eventDate: '2024-07-10',
    applicationDeadline: '2024-06-01',
    location: 'New York, NY',
    audienceSize: 200,
    duration: 90,
    budgetMin: 3000,
    budgetMax: 5000,
    topics: ['Diversity', 'Inclusion', 'Company Culture'],
    description: 'Seeking an experienced moderator for our D&I panel discussion at our summer company event. Must have experience facilitating sensitive conversations.',
    featured: false,
    applicants: 15,
  },
]

const eventTypes = [
  'All Types',
  'Conference',
  'Workshop',
  'Seminar',
  'Panel Discussion',
  'Training',
  'Webinar',
]

const eventFormats = [
  'All Formats',
  'In-Person',
  'Virtual',
  'Hybrid',
]

const dateRanges = [
  'All Dates',
  'Next 30 Days',
  'Next 60 Days',
  'Next 90 Days',
  'Next 6 Months',
]

export default function OpportunitiesPage() {
  return (
    <div className="min-h-screen bg-foam">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-calm to-deep py-16">
        <div className="container">
          <h1 className="text-4xl font-bold text-white mb-4">Speaking Opportunities</h1>
          <p className="text-xl text-white/90 max-w-2xl">
            Discover speaking engagements that match your expertise. Apply to opportunities from leading organizations worldwide.
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
                  placeholder="Search opportunities..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            {/* Filter Dropdowns */}
            <div className="flex gap-2">
              <div className="relative">
                <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
                  <Filter className="h-4 w-4" />
                  <span>Event Type</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>

              <div className="relative">
                <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
                  <MapPin className="h-4 w-4" />
                  <span>Format</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>

              <div className="relative">
                <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
                  <Calendar className="h-4 w-4" />
                  <span>Date Range</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>

              <Button variant="outline">Clear Filters</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="container py-8">
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">
            Showing <span className="font-semibold">1-10</span> of <span className="font-semibold">47</span> opportunities
          </p>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Sort by:</span>
            <select className="border rounded-lg px-3 py-1 text-sm">
              <option>Most Recent</option>
              <option>Application Deadline</option>
              <option>Event Date</option>
              <option>Budget: High to Low</option>
              <option>Budget: Low to High</option>
            </select>
          </div>
        </div>

        {/* Opportunity Cards */}
        <div className="space-y-6">
          {mockOpportunities.map((opportunity) => (
            <div key={opportunity.id} className="bg-white rounded-xl shadow-soft hover:shadow-hard transition-shadow">
              {opportunity.featured && (
                <div className="bg-gradient-to-r from-accent to-sand text-black text-sm font-semibold px-4 py-2 rounded-t-xl">
                  ✨ FEATURED OPPORTUNITY
                </div>
              )}
              <div className="p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Left side - Main content */}
                  <div className="flex-1">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="h-16 w-16 rounded-lg bg-gray-200 flex-shrink-0">
                        <Image
                          src={opportunity.organizationLogo}
                          alt={opportunity.organization}
                          width={64}
                          height={64}
                          className="rounded-lg object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <Link href={`/opportunities/${opportunity.id}`}>
                          <h3 className="text-xl font-semibold hover:text-primary transition-colors">
                            {opportunity.title}
                          </h3>
                        </Link>
                        <p className="text-gray-600 flex items-center gap-2 mt-1">
                          <Building className="h-4 w-4" />
                          {opportunity.organization}
                        </p>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4">{opportunity.description}</p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <div>
                          <p className="text-gray-600">Event Date</p>
                          <p className="font-semibold">{formatDate(opportunity.eventDate)}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <div>
                          <p className="text-gray-600">Location</p>
                          <p className="font-semibold">{opportunity.location}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="h-4 w-4 text-gray-400" />
                        <div>
                          <p className="text-gray-600">Audience</p>
                          <p className="font-semibold">{opportunity.audienceSize} people</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <div>
                          <p className="text-gray-600">Duration</p>
                          <p className="font-semibold">{opportunity.duration} min</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {opportunity.topics.map((topic) => (
                        <span
                          key={topic}
                          className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                        >
                          {topic}
                        </span>
                      ))}
                      <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm">
                        {opportunity.eventType}
                      </span>
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                        {opportunity.eventFormat}
                      </span>
                    </div>
                  </div>

                  {/* Right side - Action area */}
                  <div className="lg:w-64 border-t lg:border-t-0 lg:border-l pt-6 lg:pt-0 lg:pl-6">
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Speaking Fee</p>
                        <p className="text-2xl font-bold text-deep">
                          {formatCurrency(opportunity.budgetMin)} - {formatCurrency(opportunity.budgetMax)}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-600 mb-1">Application Deadline</p>
                        <p className="font-semibold text-red-600">
                          {formatDate(opportunity.applicationDeadline)}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-600 mb-1">Current Applicants</p>
                        <p className="font-semibold">{opportunity.applicants} speakers</p>
                      </div>

                      <Link href={`/opportunities/${opportunity.id}`}>
                        <Button className="w-full" size="lg">
                          View Details & Apply
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="flex justify-center mt-12">
          <Button variant="outline" size="lg">
            Load More Opportunities
          </Button>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-deep to-calm py-16 mt-16">
        <div className="container text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Looking for a Speaker?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Post your speaking opportunity and connect with qualified speakers for your next event.
          </p>
          <Link href="/register?type=organization">
            <Button size="xl" className="bg-white text-deep hover:bg-gray-100">
              Post an Opportunity
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
