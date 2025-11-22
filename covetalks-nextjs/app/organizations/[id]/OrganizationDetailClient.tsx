'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  Building2,
  MapPin,
  Users,
  Calendar,
  Globe,
  ArrowLeft,
  ExternalLink,
  Mail,
  Phone,
  CheckCircle,
  Briefcase,
  DollarSign
} from 'lucide-react'

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
  mission_statement: string
  preferred_topics: string[]
  venue_types: string[]
  contact_email: string
  contact_phone: string
}

interface Props {
  organization: Organization
}

export default function OrganizationDetailClient({ organization }: Props) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://app.covetalks.com'

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      {/* Back Button */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <Link 
          href="/organizations"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Organizations
        </Link>
      </div>

      {/* Organization Header */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-deep to-calm px-8 py-12">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              {/* Logo */}
              <div className="flex-shrink-0">
                {organization.logo_url ? (
                  <img
                    src={organization.logo_url}
                    alt={organization.name}
                    className="h-32 w-32 object-contain bg-white rounded-lg p-4"
                  />
                ) : (
                  <div className="h-32 w-32 bg-white rounded-lg flex items-center justify-center">
                    <Building2 className="h-16 w-16 text-gray-400" />
                  </div>
                )}
              </div>

              {/* Organization Info */}
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                  <h1 className="text-3xl md:text-4xl font-bold text-white">
                    {organization.name}
                  </h1>
                  {organization.verified && (
                    <CheckCircle className="h-8 w-8 text-green-400" />
                  )}
                </div>
                <p className="text-blue-100 text-lg mb-4">{organization.organization_type}</p>
                
                {/* Quick Stats */}
                <div className="flex flex-wrap gap-6 text-white justify-center md:justify-start">
                  {(organization.city || organization.location) && (
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      <span>
                        {organization.city && organization.state 
                          ? `${organization.city}, ${organization.state}`
                          : organization.location}
                      </span>
                    </div>
                  )}
                  {organization.industry && (
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-5 w-5" />
                      <span>{organization.industry}</span>
                    </div>
                  )}
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
                  Interested in Speaking for {organization.name}?
                </h2>
                <p className="text-gray-600 mb-4">
                  Create a free Speaker account to view the full organization profile, see speaking opportunities, and connect directly.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href={`${appUrl}/organizations/${organization.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-deep text-white rounded-lg hover:bg-calm transition-colors font-semibold text-lg"
                  >
                    View Full Profile
                    <ExternalLink className="h-5 w-5" />
                  </a>
                  <a
                    href={`${appUrl}/auth/register?type=speaker`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-white text-deep border-2 border-deep rounded-lg hover:bg-foam transition-colors font-semibold text-lg"
                  >
                    Sign Up as Speaker
                  </a>
                </div>
              </div>
            </div>

            {/* Description */}
            {organization.description && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">About</h2>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {organization.description}
                </p>
              </div>
            )}

            {/* Mission Statement */}
            {organization.mission_statement && (
              <div className="mb-8 bg-foam border-l-4 border-calm p-6 rounded-r-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Mission</h3>
                <p className="text-gray-700 leading-relaxed italic">
                  {organization.mission_statement}
                </p>
              </div>
            )}

            {/* Organization Details Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Event Information */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-calm" />
                  Event Information
                </h3>
                <div className="space-y-3">
                  {organization.event_frequency && (
                    <div>
                      <p className="text-sm text-gray-500">Event Frequency</p>
                      <p className="font-medium text-gray-900">{organization.event_frequency}</p>
                    </div>
                  )}
                  {organization.average_audience_size && (
                    <div>
                      <p className="text-sm text-gray-500">Average Audience Size</p>
                      <p className="font-medium text-gray-900">{organization.average_audience_size}</p>
                    </div>
                  )}
                  {organization.typical_budget && (
                    <div>
                      <p className="text-sm text-gray-500">Typical Budget</p>
                      <p className="font-medium text-gray-900">{organization.typical_budget}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Organization Information */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-calm" />
                  Organization Details
                </h3>
                <div className="space-y-3">
                  {organization.employee_count && (
                    <div>
                      <p className="text-sm text-gray-500">Organization Size</p>
                      <p className="font-medium text-gray-900">
                        {organization.employee_count.toLocaleString()} employees
                      </p>
                    </div>
                  )}
                  {organization.website && (
                    <div>
                      <p className="text-sm text-gray-500">Website</p>
                      <a 
                        href={organization.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-calm hover:text-deep flex items-center gap-1 transition-colors"
                      >
                        Visit Website
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Event Types */}
            {organization.event_types && organization.event_types.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Event Types</h3>
                <div className="flex flex-wrap gap-2">
                  {organization.event_types.map((type, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 text-sm font-medium rounded-full bg-foam text-deep"
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Preferred Topics */}
            {organization.preferred_topics && organization.preferred_topics.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Preferred Topics</h3>
                <div className="flex flex-wrap gap-2">
                  {organization.preferred_topics.map((topic, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Venue Types */}
            {organization.venue_types && organization.venue_types.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Venue Types</h3>
                <div className="flex flex-wrap gap-2">
                  {organization.venue_types.map((venue, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
                    >
                      {venue}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Bottom CTA */}
            <div className="mt-12 bg-gradient-to-r from-deep to-calm rounded-lg p-8 text-center text-white">
              <h2 className="text-2xl font-bold mb-3">
                Ready to Connect with {organization.name}?
              </h2>
              <p className="text-foam mb-6 text-lg">
                Join CoveTalks to unlock the full organization profile, browse speaking opportunities, and start connecting with organizations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={`${appUrl}/organizations/${organization.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-white text-deep rounded-lg hover:bg-foam transition-colors font-semibold text-lg"
                >
                  View Full Profile
                  <ExternalLink className="h-5 w-5" />
                </a>
                <a
                  href={`${appUrl}/auth/register?type=speaker`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-calm text-white rounded-lg hover:bg-deep transition-colors font-semibold text-lg"
                >
                  Create Free Speaker Account
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Browse More Organizations */}
        <div className="mt-12 text-center">
          <Link 
            href="/organizations"
            className="inline-flex items-center gap-2 text-calm hover:text-deep font-medium transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            Browse More Organizations
          </Link>
        </div>
      </div>
    </div>
  )
}