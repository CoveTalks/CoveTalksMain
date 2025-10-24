'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-foam to-white">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <div className="h-24 w-24 rounded-full bg-red-100 flex items-center justify-center mx-auto">
              <AlertTriangle className="h-12 w-12 text-red-600" />
            </div>
          </div>
          
          <h1 className="text-4xl font-bold mb-4">Something went wrong!</h1>
          <p className="text-xl text-gray-600 mb-8">
            We encountered an unexpected error. Don't worry, our team has been notified 
            and is working to fix the issue.
          </p>

          {process.env.NODE_ENV === 'development' && (
            <div className="mb-8 p-4 bg-red-50 rounded-lg text-left">
              <p className="text-sm font-mono text-red-800">
                {error.message || 'An unexpected error occurred'}
              </p>
              {error.digest && (
                <p className="text-xs text-red-600 mt-2">
                  Error ID: {error.digest}
                </p>
              )}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => reset()}
              className="btn-primary"
            >
              <RefreshCw className="mr-2 h-5 w-5" />
              Try Again
            </Button>
            <Link href="/">
              <Button size="lg" variant="outline">
                <Home className="mr-2 h-5 w-5" />
                Go to Homepage
              </Button>
            </Link>
          </div>

          <div className="mt-12">
            <p className="text-gray-600 mb-4">
              If the problem persists, please contact our support team
            </p>
            <Link href="/contact" className="text-primary hover:underline font-medium">
              Contact Support →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
