'use client'

import { useState, useEffect } from 'react'
import { Search, MapPin, Calendar, DollarSign, Filter, ChevronLeft, ChevronRight, Building2, Monitor, Users, ExternalLink } from 'lucide-react'

interface Organization {
  id: string
  name: string
  logo_url?: string
}

interface PostedBy {
  id: string
  name: string
}

interface Opportunity {
  id: string
  title: string
  description: string
  organization: Organization
  posted_by: PostedBy
  event_date: string
  location: string
  event_format: 'In-Person' | 'Virtual' | 'Hybrid'
  topics: string[]
  compensation_type: string
  compensation_amount?: number
  audience_size?: string
  created_at: string
  status: string
}

const TOPICS = [
  'Leadership',
  'Innovation',
  'Technology',
  'Business Strategy',
  'Marketing',
  'Sales',
  'Personal Development',
  'Health & Wellness',
  'Diversity & Inclusion',
  'Entrepreneurship',
  'Finance',
  'Education'
]

export default function OpportunitiesPage() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([])
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState(0)
  const [filters, setFilters] = useState({
    search: '',
    topics: [] as string[],
    location: '',
    eventFormat: '' as '' | 'In-Person' | 'Virtual' | 'Hybrid',
    minCompensation: 0,
    offset: 0,
    limit: 12
  })
  const [showFilters, setShowFilters] = useState(false)

  const totalPages = Math.ceil(total / filters.limit)
  const currentPage = Math.floor(filters.offset / filters.limit) + 1
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://app.covetalks.com'

  useEffect(() => {
    fetchOpportunities()
  }, [filters.offset, filters.topics, filters.eventFormat, filters.minCompensation])

  const fetchOpportunities = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        ...(filters.search && { search: filters.search }),
        ...(filters.topics.length > 0 && { topics: filters.topics.join(',') }),
        ...(filters.location && { location: filters.location }),
        ...(filters.eventFormat && { eventFormat: filters.eventFormat }),
        ...(filters.minCompensation > 0 && { minCompensation: filters.minCompensation.toString() }),
        limit: filters.limit.toString(),
        offset: filters.offset.toString()
      })

      const response = await fetch(`/api/opportunities?${params}`)
      const data = await response.json()

      if (response.ok) {
        setOpportunities(data.opportunities)
        setTotal(data.total)
      } else {
        console.error('Failed to fetch opportunities:', data.error)
      }
    } catch (error) {
      console.error('Error fetching opportunities:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setFilters({ ...filters, offset: 0 })
    fetchOpportunities()
  }

  const toggleTopic = (topic: string) => {
    setFilters(prev => ({
      ...prev,
      topics: prev.topics.includes(topic)
        ? prev.topics.filter(t => t !== topic)
        : [...prev.topics, topic],
      offset: 0
    }))
  }

  const handlePageChange = (newPage: number) => {
    setFilters(prev => ({
      ...prev,
      offset: (newPage - 1) * prev.limit
    }))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const getEventFormatIcon = (format: string) => {
    switch (format) {
      case 'In-Person':
        return <Users className="h-4 w-4" />
      case 'Virtual':
        return <Monitor className="h-4 w-4" />
      case 'Hybrid':
        return (
          <div className="flex">
            <Users className="h-4 w-4" />
            <Monitor className="h-4 w-4 -ml-1" />
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Speaking Opportunities
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            Find your next speaking engagement
          </p>
          <p className="text-sm text-gray-500">
            Create a free speaker account to apply to opportunities and connect with organizations
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search opportunities..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              />
            </div>
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
            >
              <Filter className="h-5 w-5" />
              Filters
            </button>
            <button
              type="submit"
              className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary transition-colors"
            >
              Search
            </button>
          </div>
        </form>

        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="grid md:grid-cols-4 gap-6">
              {/* Topics */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Topics</h3>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {TOPICS.map(topic => (
                    <label key={topic} className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.topics.includes(topic)}
                        onChange={() => toggleTopic(topic)}
                        className="mr-2 rounded text-primary focus:ring-primary"
                      />
                      <span className="text-gray-700">{topic}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Location</h3>
                <input
                  type="text"
                  placeholder="City, State, or Country"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                  value={filters.location}
                  onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                />
              </div>

              {/* Event Format */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Event Format</h3>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                  value={filters.eventFormat}
                  onChange={(e) => setFilters({ ...filters, eventFormat: e.target.value as any, offset: 0 })}
                >
                  <option value="">All Formats</option>
                  <option value="In-Person">In-Person</option>
                  <option value="Virtual">Virtual</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>

              {/* Compensation */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Min. Compensation</h3>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                  value={filters.minCompensation}
                  onChange={(e) => setFilters({ ...filters, minCompensation: parseInt(e.target.value), offset: 0 })}
                >
                  <option value="0">Any Amount</option>
                  <option value="500">$500+</option>
                  <option value="1000">$1,000+</option>
                  <option value="2500">$2,500+</option>
                  <option value="5000">$5,000+</option>
                  <option value="10000">$10,000+</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {opportunities.length > 0 ? filters.offset + 1 : 0} - {Math.min(filters.offset + filters.limit, total)} of {total} opportunities
          </p>
        </div>

        {/* Opportunities Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
                <div className="h-6 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-20 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        ) : opportunities.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {opportunities.map((opportunity) => (
              <div key={opportunity.id} className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow">
                <div className="p-6">
                  {/* Organization */}
                  <div className="flex items-center mb-4">
                    {opportunity.organization?.logo_url ? (
                      <img
                        src={opportunity.organization.logo_url}
                        alt={opportunity.organization.name}
                        className="h-10 w-10 rounded-full object-cover mr-3"
                      />
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                        <Building2 className="h-5 w-5 text-gray-400" />
                      </div>
                    )}
                    <div>
                      <p className="font-semibold text-gray-900">
                        {opportunity.organization?.name || 'Organization'}
                      </p>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {opportunity.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {opportunity.description}
                  </p>

                  {/* Details */}
                  <div className="space-y-2 mb-4">
                    {/* Event Date */}
                    <div className="flex items-center text-gray-600">
                      <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                      <span className="text-sm">{formatDate(opportunity.event_date)}</span>
                    </div>

                    {/* Location */}
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                      <span className="text-sm">{opportunity.location || 'Virtual'}</span>
                    </div>

                    {/* Event Format */}
                    <div className="flex items-center text-gray-600">
                      <div className="mr-2 text-gray-400">
                        {getEventFormatIcon(opportunity.event_format)}
                      </div>
                      <span className="text-sm">{opportunity.event_format}</span>
                    </div>

                    {/* Compensation */}
                    {opportunity.compensation_amount && (
                      <div className="flex items-center text-gray-600">
                        <DollarSign className="h-4 w-4 mr-2 text-gray-400" />
                        <span className="text-sm">
                          ${opportunity.compensation_amount.toLocaleString()}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Topics */}
                  {opportunity.topics && opportunity.topics.length > 0 && (
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {opportunity.topics.slice(0, 3).map((topic) => (
                          <span
                            key={topic}
                            className="px-2 py-1 bg-primary text-primary text-xs rounded-full"
                          >
                            {topic}
                          </span>
                        ))}
                        {opportunity.topics.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                            +{opportunity.topics.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons - Now with both View Details and Apply */}
                  <div className="space-y-2">
                    {/* View Details - points to app subdomain */}
                    <a
                      href={`${appUrl}/opportunities/${opportunity.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-2 bg-primary text-white rounded-lg hover:bg-primary transition-colors"
                    >
                      View Details & Apply
                      <ExternalLink className="h-4 w-4" />
                    </a>
                    
                    {/* Optional: Quick Apply button that goes directly to application */}
                    <a
                      href={`${appUrl}/apply/${opportunity.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-2 bg-white text-primary border border-primary rounded-lg hover:bg-primarytransition-colors"
                    >
                      Quick Apply
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              No opportunities found matching your criteria.
            </p>
            <button
              onClick={() => {
                setFilters({
                  search: '',
                  topics: [],
                  location: '',
                  eventFormat: '',
                  minCompensation: 0,
                  offset: 0,
                  limit: 12
                })
              }}
              className="mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 flex justify-center">
            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              {/* Page Numbers */}
              <div className="flex gap-1">
                {[...Array(Math.min(5, totalPages))].map((_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1
                  } else if (currentPage <= 3) {
                    pageNum = i + 1
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i
                  } else {
                    pageNum = currentPage - 2 + i
                  }

                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`px-4 py-2 rounded-lg ${
                        currentPage === pageNum
                          ? 'bg-primary text-white'
                          : 'border border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {pageNum}
                    </button>
                  )
                })}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 bg-primary rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">
            Ready to Find Your Next Speaking Opportunity?
          </h2>
          <p className="text-lg mb-6">
            Join CoveTalks to apply to opportunities, connect with organizations, and grow your speaking career
          </p>
          <a
            href={`${appUrl}/register`}
            className="inline-block px-8 py-3 bg-white text-primary rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Sign Up Today
          </a>
        </div>
      </div>
    </div>
  )
}
