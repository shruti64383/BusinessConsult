"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, RefreshCcw, ChevronDown, ChevronUp } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
            <svg
              className="h-8 w-8 text-red-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h1>
          <p className="text-gray-600 mb-6">
            We apologize for the inconvenience. Please try again or return to the home page.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
            <Button onClick={() => reset()} className="bg-primary hover:bg-primary/90 flex items-center gap-2">
              <RefreshCcw className="h-4 w-4" />
              Try Again
            </Button>
            <Link href="/">
              <Button
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10 flex items-center gap-2"
              >
                <Home className="h-4 w-4" />
                Go to Home
              </Button>
            </Link>
          </div>

          <button
            onClick={() => setShowDetails(!showDetails)}
            className="flex items-center justify-center gap-1 text-sm text-gray-500 hover:text-gray-700 mx-auto"
          >
            {showDetails ? "Hide" : "Show"} Error Details
            {showDetails ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>

          {showDetails && (
            <div className="mt-4 p-3 bg-gray-100 rounded-md text-left">
              <p className="text-sm font-mono text-gray-700 break-all">{error.message}</p>
              {error.stack && (
                <details className="mt-2">
                  <summary className="text-xs text-gray-500 cursor-pointer">Stack trace</summary>
                  <pre className="mt-2 text-xs text-gray-500 overflow-auto p-2 bg-gray-200 rounded">{error.stack}</pre>
                </details>
              )}
              {error.digest && <p className="mt-2 text-xs text-gray-500">Error ID: {error.digest}</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

