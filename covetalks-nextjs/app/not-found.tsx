'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Home, ArrowLeft, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-foam to-white">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-9xl font-black text-primary/20">404</h1>
          </div>
          
          <h2 className="text-4xl font-bold mb-4">Page Not Found</h2>
          <p className="text-xl text-gray-600 mb-8">
            Oops! The page you're looking for seems to have wandered off. 
            It might have been moved, deleted, or perhaps it never existed.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button size="lg" className="btn-primary">
                <Home className="mr-2 h-5 w-5" />
                Go to Homepage
              </Button>
            </Link>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Go Back
            </Button>
          </div>

          <div className="mt-12 p-6 bg-white rounded-xl shadow-soft">
            <h3 className="font-semibold mb-4">Looking for something specific?</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-left">
              <Link href="/speakers" className="block p-4 rounded-lg border hover:border-primary transition-colors">
                <h4 className="font-semibold text-primary mb-1">Browse Speakers</h4>
                <p className="text-sm text-gray-600">Find professional speakers for your event</p>
              </Link>
              <Link href="/opportunities" className="block p-4 rounded-lg border hover:border-primary transition-colors">
                <h4 className="font-semibold text-primary mb-1">View Opportunities</h4>
                <p className="text-sm text-gray-600">Explore speaking opportunities</p>
              </Link>
              <Link href="/about" className="block p-4 rounded-lg border hover:border-primary transition-colors">
                <h4 className="font-semibold text-primary mb-1">About CoveTalks</h4>
                <p className="text-sm text-gray-600">Learn more about our platform</p>
              </Link>
              <Link href="/contact" className="block p-4 rounded-lg border hover:border-primary transition-colors">
                <h4 className="font-semibold text-primary mb-1">Contact Support</h4>
                <p className="text-sm text-gray-600">Get help from our team</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
