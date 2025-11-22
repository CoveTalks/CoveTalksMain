'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, MapPin, Star, Filter, ChevronLeft, ChevronRight, ExternalLink, X } from 'lucide-react'

interface Speaker {
  id: string
  name: string
  bio: string
  location: string
  specialties: string[]
  profile_image_url: string
  average_rating: number
  total_reviews: number
  website?: string
}

interface Props {
  initialSpeakers: Speaker[]
  currentPage: number
  totalPages: number
  totalCount: number
  speakersPerPage: number
  availableSpecialties: string[]
  initialFilters: {
    search: string
    specialty: string
    location: string
    minRating: string
  }
}

export default function SpeakersClientWrapper({
  initialSpeakers,
  currentPage,
  totalPages,
  totalCount,
  speakersPerPage,
  availableSpecialties,
  initialFilters
}: Props) {
  const router = useRouter()
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState(initialFilters)
  const [searchInput, setSearchInput] = useState(initialFilters.search)

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://app.covetalks.com'

  // Update URL when filters change
  const updateURL = (newFilters: typeof filters, page: number = 1) => {
    const params = new URLSearchParams()
    
    if (newFilters.search) params.set('search', newFilters.search)
    if (newFilters.specialty) params.set('specialty', newFilters.specialty)
    if (newFilters.location) params.set('location', newFilters.location)
    if (newFilters.minRating) params.set('minRating', newFilters.minRating)
    if (page > 1) params.set('page', page.toString())

    const queryString = params.toString()
    router.push(`/speakers${queryString ? `?${queryString}` : ''}`)
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
    const emptyFilters = { search: '', specialty: '', location: '', minRating: '' }
    setFilters(emptyFilters)
    setSearchInput('')
    updateURL(emptyFilters)
  }

  const handlePageChange = (newPage: number) => {
    updateURL(filters, newPage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const hasActiveFilters = filters.search || filters.specialty || filters.location || filters.minRating

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating) ? 'text-accent fill-current' : 'text-gray-300'
        }`}
      />
    ))
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Find Your Perfect Speaker
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            Browse our curated network of professional speakers
          </p>
          <p className="text-sm text-gray-500">
            Sign up for an Organization account to view full profiles and contact speakers
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search speakers by name or expertise..."
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
              <h3 className="text-lg font-semibold text-gray-900">Filter Speakers</h3>
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
              {/* Specialty Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Specialty
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-calm focus:border-transparent transition-colors"
                  value={filters.specialty}
                  onChange={(e) => handleFilterChange('specialty', e.target.value)}
                >
                  <option value="">All Specialties</option>
                  {availableSpecialties.map((specialty) => (
                    <option key={specialty} value={specialty}>
                      {specialty}
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

              {/* Rating Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Minimum Rating
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-calm focus:border-transparent transition-colors"
                  value={filters.minRating}
                  onChange={(e) => handleFilterChange('minRating', e.target.value)}
                >
                  <option value="">Any Rating</option>
                  <option value="3">3+ Stars</option>
                  <option value="4">4+ Stars</option>
                  <option value="4.5">4.5+ Stars</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="mb-6 flex flex-wrap gap-2">
            {filters.specialty && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-foam text-deep rounded-full text-sm">
                Specialty: {filters.specialty}
                <button
                  onClick={() => handleFilterChange('specialty', '')}
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
            {filters.minRating && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-foam text-deep rounded-full text-sm">
                Rating: {filters.minRating}+ stars
                <button
                  onClick={() => handleFilterChange('minRating', '')}
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
            Showing {totalCount > 0 ? (currentPage - 1) * speakersPerPage + 1 : 0} -{' '}
            {Math.min(currentPage * speakersPerPage, totalCount)} of {totalCount} speakers
          </p>
        </div>

        {/* Speakers Grid */}
        {initialSpeakers.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {initialSpeakers.map((speaker) => (
              <SpeakerCard key={speaker.id} speaker={speaker} appUrl={appUrl} renderStars={renderStars} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg mb-4">
              No speakers found matching your criteria.
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

function SpeakerCard({ 
  speaker, 
  appUrl,
  renderStars 
}: { 
  speaker: Speaker
  appUrl: string
  renderStars: (rating: number) => JSX.Element[]
}) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow h-full flex flex-col">
      <div className="p-6 flex flex-col flex-grow">
        {/* Profile Image */}
        <div className="flex justify-center mb-4">
          {speaker.profile_image_url ? (
            <img
              src={speaker.profile_image_url}
              alt={speaker.name}
              className="h-32 w-32 rounded-full object-cover"
            />
          ) : (
            <div className="h-32 w-32 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-3xl text-gray-400">
                {speaker.name?.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </div>

        {/* Speaker Info */}
        <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">
          {speaker.name}
        </h3>

        {/* Location */}
        {speaker.location && (
          <div className="flex items-center justify-center text-gray-600 mb-2">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="text-sm">{speaker.location}</span>
          </div>
        )}

        {/* Rating */}
        <div className="flex items-center justify-center mb-3">
          <div className="flex mr-2">
            {renderStars(speaker.average_rating || 0)}
          </div>
          <span className="text-sm text-gray-600">
            ({speaker.total_reviews || 0})
          </span>
        </div>

        {/* Bio */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 text-center">
          {speaker.bio}
        </p>

        {/* Specialties */}
        {speaker.specialties && speaker.specialties.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2 justify-center">
              {speaker.specialties.slice(0, 3).map((specialty) => (
                <span
                  key={specialty}
                  className="px-2 py-1 bg-foam text-deep text-xs rounded-full"
                >
                  {specialty}
                </span>
              ))}
              {speaker.specialties.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                  +{speaker.specialties.length - 3}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Flexible spacer to push button to bottom */}
        <div className="flex-grow"></div>

        {/* View Profile Button - Points to app subdomain */}
        <a
          href={`${appUrl}/speakers/${speaker.id}`}
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