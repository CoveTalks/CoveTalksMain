'use client'

import Link from 'next/link'
import { 
  MapPin,
  Star,
  ArrowLeft,
  ExternalLink,
  Globe,
  Linkedin,
  Award,
  Briefcase
} from 'lucide-react'

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
  linkedin_url?: string
  years_experience?: number
  title?: string
  company?: string
  languages?: string[]
  certifications?: string
  awards?: string
}

interface Props {
  speaker: Speaker
}

export default function SpeakerDetailClient({ speaker }: Props) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://app.covetalks.com'

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${
          i < Math.floor(rating) ? 'text-accent fill-current' : 'text-gray-300'
        }`}
      />
    ))
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      {/* Back Button */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <Link 
          href="/speakers"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Speakers
        </Link>
      </div>

      {/* Speaker Header */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-deep to-calm px-8 py-12">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              {/* Profile Image */}
              <div className="flex-shrink-0">
                {speaker.profile_image_url ? (
                  <img
                    src={speaker.profile_image_url}
                    alt={speaker.name}
                    className="h-40 w-40 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                ) : (
                  <div className="h-40 w-40 rounded-full bg-white flex items-center justify-center border-4 border-white shadow-lg">
                    <span className="text-5xl text-gray-400">
                      {speaker.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
              </div>

              {/* Speaker Info */}
              <div className="flex-1 text-center md:text-left text-white">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  {speaker.name}
                </h1>
                {speaker.title && (
                  <p className="text-xl text-white/90 mb-2">{speaker.title}</p>
                )}
                {speaker.company && (
                  <p className="text-lg text-white/80 mb-4">{speaker.company}</p>
                )}
                
                {/* Quick Stats */}
                <div className="flex flex-wrap gap-6 text-white justify-center md:justify-start">
                  {speaker.location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      <span>{speaker.location}</span>
                    </div>
                  )}
                  {speaker.years_experience && (
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-5 w-5" />
                      <span>{speaker.years_experience}+ years experience</span>
                    </div>
                  )}
                </div>

                {/* Rating */}
                <div className="flex items-center justify-center md:justify-start mt-4 gap-2">
                  <div className="flex">
                    {renderStars(speaker.average_rating || 0)}
                  </div>
                  <span className="text-white/90">
                    {speaker.average_rating?.toFixed(1) || '0.0'} ({speaker.total_reviews || 0} reviews)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-8">
            {/* CTA Banner - Prominent */}
            <div className="mb-8 bg-gradient-to-r from-foam to-white border-2 border-calm rounded-lg p-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Interested in Booking {speaker.name}?
                </h2>
                <p className="text-gray-600 mb-4">
                  Create a free Organization account to view the full profile, see availability, and send a booking request.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href={`${appUrl}/speakers/${speaker.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-deep text-white rounded-lg hover:bg-calm transition-colors font-semibold text-lg"
                  >
                    View Full Profile
                    <ExternalLink className="h-5 w-5" />
                  </a>
                  <a
                    href={`${appUrl}/auth/register?type=organization`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-white text-deep border-2 border-deep rounded-lg hover:bg-foam transition-colors font-semibold text-lg"
                  >
                    Sign Up as Organization
                  </a>
                </div>
              </div>
            </div>

            {/* Bio */}
            {speaker.bio && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">About</h2>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {speaker.bio}
                </p>
              </div>
            )}

            {/* Specialties */}
            {speaker.specialties && speaker.specialties.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Areas of Expertise</h2>
                <div className="flex flex-wrap gap-3">
                  {speaker.specialties.map((specialty, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-foam text-deep rounded-full text-sm font-medium"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Additional Details Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Languages */}
              {speaker.languages && speaker.languages.length > 0 && (
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Globe className="h-5 w-5 text-calm" />
                    Languages
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {speaker.languages.map((language, index) => (
                      <span key={index} className="px-3 py-1 bg-white text-gray-700 rounded-full text-sm">
                        {language}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* External Links */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Connect</h3>
                <div className="space-y-2">
                  {speaker.website && (
                    <a
                      href={speaker.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-calm hover:text-deep transition-colors"
                    >
                      <Globe className="h-4 w-4" />
                      Website
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                  {speaker.linkedin_url && (
                    <a
                      href={speaker.linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-calm hover:text-deep transition-colors"
                    >
                      <Linkedin className="h-4 w-4" />
                      LinkedIn
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Certifications */}
            {speaker.certifications && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Award className="h-5 w-5 text-calm" />
                  Certifications
                </h3>
                <p className="text-gray-700">{speaker.certifications}</p>
              </div>
            )}

            {/* Awards */}
            {speaker.awards && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Award className="h-5 w-5 text-calm" />
                  Awards & Recognition
                </h3>
                <p className="text-gray-700">{speaker.awards}</p>
              </div>
            )}

            {/* Bottom CTA */}
            <div className="mt-12 bg-gradient-to-r from-deep to-calm rounded-lg p-8 text-center text-white">
              <h2 className="text-2xl font-bold mb-3">
                Ready to Book {speaker.name}?
              </h2>
              <p className="text-foam mb-6 text-lg">
                Join CoveTalks to access full speaker profiles, check availability, and book directly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={`${appUrl}/speakers/${speaker.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-white text-deep rounded-lg hover:bg-foam transition-colors font-semibold text-lg"
                >
                  View Full Profile
                  <ExternalLink className="h-5 w-5" />
                </a>
                <a
                  href={`${appUrl}/auth/register?type=organization`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-calm text-white rounded-lg hover:bg-deep transition-colors font-semibold text-lg"
                >
                  Create Free Organization Account
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Browse More Speakers */}
        <div className="mt-12 text-center">
          <Link 
            href="/speakers"
            className="inline-flex items-center gap-2 text-calm hover:text-deep font-medium transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            Browse More Speakers
          </Link>
        </div>
      </div>
    </div>
  )
}