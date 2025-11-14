'use client'

import { useState, useEffect } from 'react'
import { Search, MapPin, Building2, Users, Calendar, ChevronLeft, ChevronRight, ExternalLink, Globe, Star } from 'lucide-react'
import Image from 'next/image'

interface Organization {
  id: string
  name: string
  organization_type: string
  description: string
  location: string
  city: string
  state: string
  country: string
  website: string
  logo_url: string
  event_frequency: string
  typical_audience_size: number
  average_audience_size: string
  employee_count: number
  industry: string
  event_types: string[]
  typical_budget: string
  verified: boolean
  total_events?: number
}

const ORGANIZATION_TYPES = [
  'Non-Profit',
  'School',
  'Church',
  'Corporation',
  'Association',
  'Government',
  'Healthcare',
  'Technology',
  'Other'
]

const INDUSTRIES = [
  'Education',
  'Healthcare',
  'Technology',
  'Finance',
  'Non-Profit',
  'Government',
  'Manufacturing',
  'Retail',
  'Hospitality',
  'Entertainment',
  'Professional Services',
  'Other'
]

export default function OrganizationsPage() {
  const [organizations, setOrganizations] = useState<Organization[]>([])
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState(0)
  const [filters, setFilters] = useState({
    search: '',
    organizationType: '',
    industry: '',
    location: '',
    offset: 0,
    limit: 12
  })
  const [showFilters, setShowFilters] = useState(false)

  const totalPages = Math.ceil(total / filters.limit)
  const currentPage = Math.floor(filters.offset / filters.limit) + 1
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://app.covetalks.com'

  useEffect(() => {
    fetchOrganizations()
  }, [filters.offset, filters.organizationType, filters.industry])

  const fetchOrganizations = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        ...(filters.search && { search: filters.search }),
        ...(filters.organizationType && { organizationType: filters.organizationType }),
        ...(filters.industry && { industry: filters.industry }),
        ...(filters.location && { location: filters.location }),
        limit: filters.limit.toString(),
        offset: filters.offset.toString()
      })

      const response = await fetch(`/api/organizations?${params}`)
      const data = await response.json()

      if (response.ok) {
        setOrganizations(data.organizations)
        setTotal(data.total)
      } else {
        console.error('Failed to fetch organizations:', data.error)
      }
    } catch (error) {
      console.error('Error fetching organizations:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setFilters({ ...filters, offset: 0 })
    fetchOrganizations()
  }

  const toggleOrganizationType = (type: string) => {
    setFilters(prev => ({
      ...prev,
      organizationType: prev.organizationType === type ? '' : type,
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

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Discover Organizations
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            Browse organizations looking for professional speakers
          </p>
          <p className="text-sm text-gray-500">
            Sign up for a Speaker account to view full profiles and connect with organizations
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search organizations by name, industry, or location..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              />
            </div>
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className="px-6 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Filters
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Search
            </button>
          </div>
        </form>

        {/* Filters Panel */}
        {showFilters && (
          <div className="mb-8 p-6 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Organization Type Filter */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Organization Type</h3>
                <div className="space-y-2">
                  {ORGANIZATION_TYPES.map((type) => (
                    <label key={type} className="flex items-center">
                      <input
                        type="radio"
                        name="organizationType"
                        checked={filters.organizationType === type}
                        onChange={() => toggleOrganizationType(type)}
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-700">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Industry Filter */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Industry</h3>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={filters.industry}
                  onChange={(e) => setFilters({ ...filters, industry: e.target.value, offset: 0 })}
                >
                  <option value="">All Industries</option>
                  {INDUSTRIES.map((industry) => (
                    <option key={industry} value={industry}>
                      {industry}
                    </option>
                  ))}
                </select>
              </div>

              {/* Location Filter */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Location</h3>
                <input
                  type="text"
                  placeholder="City, State, or Country"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={filters.location}
                  onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                />
              </div>

              {/* Clear Filters */}
              <div className="flex items-end">
                <button
                  onClick={() => setFilters({
                    search: '',
                    organizationType: '',
                    industry: '',
                    location: '',
                    offset: 0,
                    limit: 12
                  })}
                  className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Results Summary */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">
            Showing {total > 0 ? filters.offset + 1 : 0} - {Math.min(filters.offset + filters.limit, total)} of {total} organizations
          </p>
        </div>

        {/* Organizations Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
                <div className="h-32 bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : organizations.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {organizations.map((org) => (
              <div key={org.id} className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow h-full flex flex-col">
                <div className="p-6 flex flex-col flex-grow">
                  {/* Logo */}
                  <div className="flex items-center justify-center mb-4">
                    {org.logo_url ? (
                      <img
                        src={org.logo_url}
                        alt={org.name}
                        className="h-24 w-24 object-contain"
                      />
                    ) : (
                      <div className="h-24 w-24 rounded-lg bg-gray-200 flex items-center justify-center">
                        <Building2 className="h-12 w-12 text-gray-400" />
                      </div>
                    )}
                  </div>

                  {/* Organization Info */}
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-semibold text-gray-900 mb-1 flex items-center justify-center">
                      {org.name}
                      {org.verified && (
                        <span className="ml-2 text-green-500" title="Verified">
                          ✓
                        </span>
                      )}
                    </h3>
                    <p className="text-sm text-gray-500">{org.organization_type}</p>
                  </div>

                  {/* Location & Industry */}
                  <div className="space-y-2 mb-4">
                    {(org.city || org.location) && (
                      <div className="flex items-center justify-center text-gray-600 text-sm">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>
                          {org.city && org.state 
                            ? `${org.city}, ${org.state}`
                            : org.location}
                        </span>
                      </div>
                    )}
                    {org.industry && (
                      <div className="flex items-center justify-center text-gray-600 text-sm">
                        <Building2 className="h-4 w-4 mr-1" />
                        <span>{org.industry}</span>
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3 text-center">
                    {org.description || 'No description available'}
                  </p>

                  {/* Event Types */}
                  {org.event_types && org.event_types.length > 0 && (
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2 justify-center">
                        {org.event_types.slice(0, 3).map((type) => (
                          <span
                            key={type}
                            className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                          >
                            {type}
                          </span>
                        ))}
                        {org.event_types.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                            +{org.event_types.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Stats Row */}
                  <div className="grid grid-cols-2 gap-3 mb-4 text-xs text-gray-600">
                    {org.event_frequency && (
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>{org.event_frequency}</span>
                      </div>
                    )}
                    {org.average_audience_size && (
                      <div className="flex items-center">
                        <Users className="h-3 w-3 mr-1" />
                        <span>{org.average_audience_size}</span>
                      </div>
                    )}
                  </div>

                  {/* Flexible spacer to push button to bottom */}
                  <div className="flex-grow"></div>

                  {/* View Profile Button - Points to app subdomain */}
                  <a
                    href={`${appUrl}/organizations/${org.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    View Full Profile
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Building2 className="mx-auto h-16 w-16 text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No organizations found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search or filters
            </p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex justify-center items-center gap-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            
            <span className="text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}