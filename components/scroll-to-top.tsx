"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export default function ScrollToTop() {
  const pathname = usePathname()

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant", // Changed from "smooth" to "instant" for better performance
    })
  }, [pathname])

  return null
}

