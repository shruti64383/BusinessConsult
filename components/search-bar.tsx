"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Search, X } from "lucide-react"
import { servicesData } from "@/lib/services-data"

export default function SearchBar({ isMobile = false }: { isMobile?: boolean }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [suggestions, setSuggestions] = useState<Array<{ slug: string; title: string }>>([])
  const [isOpen, setIsOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const searchRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  // Filter services based on search term
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSuggestions([])
      return
    }

    const filteredServices = servicesData
      .filter(
        (service) =>
          service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          service.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      .map((service) => ({ slug: service.slug, title: service.title }))
      .slice(0, 5) // Limit to 5 suggestions

    setSuggestions(filteredServices)
    setSelectedIndex(-1)
  }, [searchTerm])

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : prev))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev))
    } else if (e.key === "Enter") {
      e.preventDefault()
      if (selectedIndex >= 0) {
        handleSuggestionClick(suggestions[selectedIndex].slug)
      } else if (suggestions.length > 0) {
        handleSuggestionClick(suggestions[0].slug)
      } else {
        handleSearch()
      }
    } else if (e.key === "Escape") {
      setIsOpen(false)
    }
  }

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      // If no specific service is selected, go to a search results page
      // or the first suggestion if available
      if (suggestions.length > 0) {
        router.push(`/service/${suggestions[0].slug}`)
      } else {
        // Could redirect to a search results page in the future
        router.push(`/services?search=${encodeURIComponent(searchTerm)}`)
      }
      setSearchTerm("")
      setIsOpen(false)
    }
  }

  const handleSuggestionClick = (slug: string) => {
    router.push(`/service/${slug}`)
    setSearchTerm("")
    setIsOpen(false)
  }

  const clearSearch = () => {
    setSearchTerm("")
    setSuggestions([])
  }

  return (
    <div ref={searchRef} className={`relative ${isMobile ? "w-full" : "w-64 lg:w-72"}`}>
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value)
            setIsOpen(true)
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search services..."
          className="w-full py-2 pl-10 pr-8 text-sm border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="w-4 h-4 text-gray-400" />
        </div>
        {searchTerm && (
          <button onClick={clearSearch} className="absolute inset-y-0 right-0 flex items-center pr-3">
            <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
          </button>
        )}
      </div>

      {isOpen && suggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border rounded-md shadow-lg border-gray-300">
          <ul className="py-1">
            {suggestions.map((suggestion, index) => (
              <li
                key={suggestion.slug}
                onClick={() => handleSuggestionClick(suggestion.slug)}
                className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
                  index === selectedIndex ? "bg-gray-100" : ""
                }`}
              >
                {suggestion.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

