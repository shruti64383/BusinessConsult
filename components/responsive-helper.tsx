"use client"

import { useEffect, useState } from "react"

export default function ResponsiveHelper() {
  const [windowWidth, setWindowWidth] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    // Set initial width
    handleResize()

    // Add event listener
    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Only show in development
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      setIsVisible(true)
    }
  }, [])

  if (!isVisible) return null

  // Determine current breakpoint
  let breakpoint = "xs"
  if (windowWidth >= 1280) breakpoint = "xl"
  else if (windowWidth >= 1024) breakpoint = "lg"
  else if (windowWidth >= 768) breakpoint = "md"
  else if (windowWidth >= 640) breakpoint = "sm"

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-black/80 text-white px-3 py-1 rounded-full text-xs font-mono">
      <div className="flex items-center gap-2">
        <span>{windowWidth}px</span>
        <span className="bg-primary px-1.5 py-0.5 rounded">{breakpoint}</span>
      </div>
    </div>
  )
}

