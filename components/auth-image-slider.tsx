"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

interface SlideImage {
  src: string
  alt: string
  title: string
  description: string
}

export default function AuthImageSlider({ className = "h-full" }: { className?: string }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const slides: SlideImage[] = [
    {
      src: "/placeholder.svg?height=1000&width=1000&text=Business Services",
      alt: "Business Services",
      title: "Grow Your Business with Us",
      description:
        "Access all your business services in one place. We provide comprehensive solutions for your business needs.",
    },
    {
      src: "/placeholder.svg?height=1000&width=1000&text=Tax Services",
      alt: "Tax Services",
      title: "Hassle-free Tax Compliance",
      description:
        "Stay compliant with all tax regulations and focus on growing your business while we handle your tax filings.",
    },
    {
      src: "/placeholder.svg?height=1000&width=1000&text=Legal Services",
      alt: "Legal Services",
      title: "Expert Legal Assistance",
      description:
        "Get professionally drafted legal documents tailored to your business needs with our expert guidance.",
    },
    {
      src: "/placeholder.svg?height=1000&width=1000&text=Trademark Services",
      alt: "Trademark Services",
      title: "Protect Your Brand Identity",
      description: "Secure your business name and logo with our comprehensive trademark registration services.",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [slides.length])

  return (
    <div className={`relative w-full ${className} bg-primary overflow-hidden`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <Image
            src={slides[currentIndex].src || "/placeholder.svg"}
            alt={slides[currentIndex].alt}
            fill
            className="object-cover opacity-50"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center p-12 text-white">
            <motion.h2
              className="text-3xl font-bold mb-4 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {slides[currentIndex].title}
            </motion.h2>
            <motion.p
              className="text-lg mb-6 max-w-md text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {slides[currentIndex].description}
            </motion.p>
            <div className="flex space-x-2">
              {slides.map((_, i) => (
                <motion.div
                  key={i}
                  className={`h-2 w-2 rounded-full ${i === currentIndex ? "bg-white" : "bg-white/60"}`}
                  animate={{ scale: i === currentIndex ? 1.5 : 1 }}
                  transition={{ duration: 0.3 }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

