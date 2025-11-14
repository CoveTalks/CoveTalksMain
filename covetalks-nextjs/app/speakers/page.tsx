'use client'

import { useState, useEffect } from 'react'
import { Search, MapPin, Star, Filter, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react'
import Image from 'next/image'

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

const SPECIALTIES = [
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

export default function SpeakersPage() {
  const [speakers, setSpeakers] = useState<Speaker[]>([])
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState(0)
  const [filters, setFilters] = useState({
    search: '',
    specialties: [] as string[],
    location: '',
    minRating: 0,
    offset: 0,
    limit: 12
  })
  const [showFilters, setShowFilters] = useState(false)

  const totalPages = Math.ceil(total / filters.limit)
  const currentPage = Math.floor(filters.offset / filters.limit) + 1
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://app.covetalks.com'

  useEffect(() => {
    fetchSpeakers()
  }, [filters.offset, filters.specialties, filters.minRating])

  const fetchSpeakers = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        ...(filters.search && { search: filters.search }),
        ...(filters.specialties.length > 0 && { specialties: filters.specialties.join(',') }),
        ...(filters.location && { location: filters.location }),
        ...(filters.minRating > 0 && { minRating: filters.minRating.toString() }),
        limit: filters.limit.toString(),
        offset: filters.offset.toString()
      })

      const response = await fetch(`/api/speakers?${params}`)
      const data = await response.json()

      if (response.ok) {
        setSpeakers(data.speakers)
        setTotal(data.total)
      } else {
        console.error('Failed to fetch speakers:', data.error)
      }
    } catch (error) {
      console.error('Error fetching speakers:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setFilters({ ...filters, offset: 0 })
    fetchSpeakers()
  }

  const toggleSpecialty = (specialty: string) => {
    setFilters(prev => ({
      ...prev,
      specialties: prev.specialties.includes(specialty)
        ? prev.specialties.filter(s => s !== specialty)
        : [...prev.specialties, specialty],
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

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
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
            Sign up for a Organization account to view full profiles and contact speakers
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
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Search
            </button>
          </div>
        </form>

        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="grid md:grid-cols-3 gap-6">
              {/* Specialties */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Specialties</h3>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {SPECIALTIES.map(specialty => (
                    <label key={specialty} className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.specialties.includes(specialty)}
                        onChange={() => toggleSpecialty(specialty)}
                        className="mr-2 rounded text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-gray-700">{specialty}</span>
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={filters.location}
                  onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                />
              </div>

              {/* Rating */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Minimum Rating</h3>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={filters.minRating}
                  onChange={(e) => setFilters({ ...filters, minRating: parseFloat(e.target.value), offset: 0 })}
                >
                  <option value="0">Any Rating</option>
                  <option value="3">3+ Stars</option>
                  <option value="4">4+ Stars</option>
                  <option value="4.5">4.5+ Stars</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {speakers.length > 0 ? filters.offset + 1 : 0} - {Math.min(filters.offset + filters.limit, total)} of {total} speakers
          </p>
        </div>

        {/* Speakers Grid */}
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
        ) : speakers.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {speakers.map((speaker) => (
              <div key={speaker.id} className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow h-full flex flex-col">
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
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {speaker.bio}
                  </p>

                  {/* Specialties */}
                  {speaker.specialties && speaker.specialties.length > 0 && (
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {speaker.specialties.slice(0, 3).map((specialty) => (
                          <span
                            key={specialty}
                            className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
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

                  {/* View Profile Button - Now points to app subdomain */}
                  <a
                    href={`${appUrl}/speakers/${speaker.id}`}
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
            <p className="text-gray-600 text-lg">
              No speakers found matching your criteria.
            </p>
            <button
              onClick={() => {
                setFilters({
                  search: '',
                  specialties: [],
                  location: '',
                  minRating: 0,
                  offset: 0,
                  limit: 12
                })
              }}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
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
                          ? 'bg-blue-600 text-white'
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
      </div>
    </div>
  )
}