'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search, MapPin, Building2, Users, Calendar, ChevronLeft, ChevronRight, ExternalLink, Filter, X } from 'lucide-react'

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
}

interface Props {
  initialOrganizations: Organization[]
  currentPage: number
  totalPages: number
  totalCount: number
  organizationsPerPage: number
  availableTypes: string[]
  availableIndustries: string[]
  initialFilters: {
    search: string
    type: string
    industry: string
    location: string
  }
}

export default function OrganizationsClientWrapper({
  initialOrganizations,
  currentPage,
  totalPages,
  totalCount,
  organizationsPerPage,
  availableTypes,
  availableIndustries,
  initialFilters
}: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState(initialFilters)
  const [searchInput, setSearchInput] = useState(initialFilters.search)

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://app.covetalks.com'

  // Update URL when filters change
  const updateURL = (newFilters: typeof filters, page: number = 1) => {
    const params = new URLSearchParams()
    
    if (newFilters.search) params.set('search', newFilters.search)
    if (newFilters.type) params.set('type', newFilters.type)
    if (newFilters.industry) params.set('industry', newFilters.industry)
    if (newFilters.location) params.set('location', newFilters.location)
    if (page > 1) params.set('page', page.toString())

    const queryString = params.toString()
    router.push(`/organizations${queryString ? `?${queryString}` : ''}`)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const newFilters = { ...filters, search: searchInput }
    setFilters(newFilters)
    updateURL(newFilters)
  }

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    updateURL(newFilters)
  }

  const clearFilters = () => {
    const emptyFilters = { search: '', type: '', industry: '', location: '' }
    setFilters(emptyFilters)
    setSearchInput('')
    updateURL(emptyFilters)
  }

  const handlePageChange = (newPage: number) => {
    updateURL(filters, newPage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const hasActiveFilters = filters.search || filters.type || filters.industry || filters.location

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
                placeholder="Search organizations by name, industry, or description..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-calm focus:border-transparent"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className={`px-6 py-3 border rounded-lg transition-colors ${
                showFilters || hasActiveFilters
                  ? 'bg-foam border-calm text-calm'
                  : 'bg-white border-gray-300 hover:bg-gray-50'
              }`}
            >
              <Filter className="h-5 w-5" />
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-deep text-white rounded-lg hover:bg-calm transition-colors"
            >
              Search
            </button>
          </div>
        </form>

        {/* Filters Panel */}
        {showFilters && (
          <div className="mb-8 p-6 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Filter Organizations</h3>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
                >
                  <X className="h-4 w-4" />
                  Clear all filters
                </button>
              )}
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Organization Type Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Organization Type
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-calm focus:border-transparent transition-colors"
                  value={filters.type}
                  onChange={(e) => handleFilterChange('type', e.target.value)}
                >
                  <option value="">All Types</option>
                  {availableTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Industry Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Industry
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-calm focus:border-transparent transition-colors"
                  value={filters.industry}
                  onChange={(e) => handleFilterChange('industry', e.target.value)}
                >
                  <option value="">All Industries</option>
                  {availableIndustries.map((industry) => (
                    <option key={industry} value={industry}>
                      {industry}
                    </option>
                  ))}
                </select>
              </div>

              {/* Location Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  placeholder="City, State, or Country"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-calm focus:border-transparent transition-colors"
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                />
              </div>
            </div>
          </div>
        )}

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="mb-6 flex flex-wrap gap-2">
            {filters.type && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-foam text-deep rounded-full text-sm">
                Type: {filters.type}
                <button
                  onClick={() => handleFilterChange('type', '')}
                  className="hover:bg-calm/10 rounded-full p-0.5 transition-colors"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            {filters.industry && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-foam text-deep rounded-full text-sm">
                Industry: {filters.industry}
                <button
                  onClick={() => handleFilterChange('industry', '')}
                  className="hover:bg-calm/10 rounded-full p-0.5 transition-colors"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            {filters.location && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-foam text-deep rounded-full text-sm">
                Location: {filters.location}
                <button
                  onClick={() => handleFilterChange('location', '')}
                  className="hover:bg-calm/10 rounded-full p-0.5 transition-colors"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
          </div>
        )}

        {/* Results Summary */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">
            Showing {totalCount > 0 ? (currentPage - 1) * organizationsPerPage + 1 : 0} -{' '}
            {Math.min(currentPage * organizationsPerPage, totalCount)} of {totalCount} organizations
          </p>
        </div>

        {/* Organizations Grid */}
        {initialOrganizations.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {initialOrganizations.map((org) => (
              <OrganizationCard key={org.id} organization={org} appUrl={appUrl} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Building2 className="mx-auto h-16 w-16 text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No organizations found
            </h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search or filters
            </p>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="px-6 py-2 bg-deep text-white rounded-lg hover:bg-calm transition-colors"
              >
                Clear all filters
              </button>
            )}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex justify-center items-center gap-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <ChevronLeft className="h-5 w-5" />
              Previous
            </button>
            
            <span className="text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              Next
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

function OrganizationCard({ organization, appUrl }: { organization: Organization; appUrl: string }) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow h-full flex flex-col">
      <div className="p-6 flex flex-col flex-grow">
        {/* Logo */}
        <div className="flex items-center justify-center mb-4">
          {organization.logo_url ? (
            <img
              src={organization.logo_url}
              alt={organization.name}
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
            {organization.name}
            {organization.verified && (
              <span className="ml-2 text-green-500" title="Verified">
                ✓
              </span>
            )}
          </h3>
          <p className="text-sm text-gray-500">{organization.organization_type}</p>
        </div>

        {/* Location & Industry */}
        <div className="space-y-2 mb-4">
          {(organization.city || organization.location) && (
            <div className="flex items-center justify-center text-gray-600 text-sm">
              <MapPin className="h-4 w-4 mr-1" />
              <span>
                {organization.city && organization.state 
                  ? `${organization.city}, ${organization.state}`
                  : organization.location}
              </span>
            </div>
          )}
          {organization.industry && (
            <div className="flex items-center justify-center text-gray-600 text-sm">
              <Building2 className="h-4 w-4 mr-1" />
              <span>{organization.industry}</span>
            </div>
          )}
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 text-center">
          {organization.description || 'No description available'}
        </p>

        {/* Event Types */}
        {organization.event_types && organization.event_types.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2 justify-center">
              {organization.event_types.slice(0, 3).map((type) => (
                <span
                  key={type}
                  className="px-2 py-1 text-xs rounded-full bg-foam text-deep"
                >
                  {type}
                </span>
              ))}
              {organization.event_types.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                  +{organization.event_types.length - 3}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Stats Row */}
        <div className="grid grid-cols-2 gap-3 mb-4 text-xs text-gray-600">
          {organization.event_frequency && (
            <div className="flex items-center">
              <Calendar className="h-3 w-3 mr-1" />
              <span>{organization.event_frequency}</span>
            </div>
          )}
          {organization.average_audience_size && (
            <div className="flex items-center">
              <Users className="h-3 w-3 mr-1" />
              <span>{organization.average_audience_size}</span>
            </div>
          )}
        </div>

        {/* Flexible spacer to push button to bottom */}
        <div className="flex-grow"></div>

        {/* View Profile Button - Points to app subdomain */}
        <a
          href={`${appUrl}/organizations/${organization.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-2 bg-deep text-white rounded-lg hover:bg-calm transition-colors"
        >
          View Full Profile
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </div>
  )
}