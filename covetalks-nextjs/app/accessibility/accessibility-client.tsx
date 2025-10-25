'use client'

import { Button } from '@/components/ui/button'

export default function AccessibilityClient() {
  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <Button onClick={handlePrint}>
        Print This Statement
      </Button>
      <a href="mailto:accessibility@covetalks.com">
        <Button variant="outline">Report an Issue</Button>
      </a>
    </div>
  )
}