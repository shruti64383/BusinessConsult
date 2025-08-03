"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [autoplay, setAutoplay] = useState(true)
  const autoplayRef = useRef<NodeJS.Timeout | null>(null)

  const testimonials = [
    {
      text: "The team made my company registration process incredibly smooth. Their expertise and guidance were invaluable, and they handled all the paperwork efficiently.",
      name: "Rajesh Kumar",
      position: "Founder, TechSolutions Pvt Ltd",
    },
    {
      text: "I was worried about GST compliance, but their team took care of everything. They explained the process clearly and ensured we were fully compliant. Highly recommended!",
      name: "Priya Sharma",
      position: "Director, Fashion Trends LLP",
    },
    {
      text: "Their trademark registration service was excellent. They guided us through the entire process and helped us protect our brand identity. Very professional service!",
      name: "Amit Patel",
      position: "CEO, Innovate Solutions",
    },
    {
      text: "The annual compliance service has been a lifesaver for our business. They ensure we never miss any deadlines and handle all the filings professionally.",
      name: "Neha Gupta",
      position: "Managing Director, Global Exports",
    },
    {
      text: "Their legal documentation service is top-notch. They drafted all our contracts and agreements with great attention to detail, protecting our interests.",
      name: "Vikram Singh",
      position: "Partner, VS Associates",
    },
    {
      text: "We've been using their tax filing services for 3 years now, and they've consistently delivered excellent service. Their team is knowledgeable and responsive.",
      name: "Sunita Reddy",
      position: "CFO, Reddy Enterprises",
    },
  ]

  const nextTestimonial = () => {
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setDirection(-1)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  // Handle autoplay
  useEffect(() => {
    if (autoplay) {
      autoplayRef.current = setInterval(() => {
        nextTestimonial()
      }, 5000)
    }

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current)
      }
    }
  }, [autoplay, currentIndex])

  // Pause autoplay on hover
  const pauseAutoplay = () => setAutoplay(false)
  const resumeAutoplay = () => setAutoplay(true)

  // Get visible testimonials (3 on desktop, 1 on mobile)
  // const getVisibleTestimonials = () => {
  //   const isMobile = typeof window !== "undefined" && window.innerWidth < 768
  //   if (isMobile) {
  //     return [testimonials[currentIndex]]
  //   } else {
  //     const indices = [currentIndex, (currentIndex + 1) % testimonials.length, (currentIndex + 2) % testimonials.length]
  //     return indices.map((index) => testimonials[index])
  //   }
  // }

  // const visibleTestimonials = getVisibleTestimonials()

  const [isMobile, setIsMobile] = useState(false)

useEffect(() => {
  const checkMobile = () => setIsMobile(window.innerWidth < 768)
  checkMobile()
  window.addEventListener("resize", checkMobile)
  return () => window.removeEventListener("resize", checkMobile)
}, [])

const visibleTestimonials = isMobile
  ? [testimonials[currentIndex]]
  : [
      testimonials[currentIndex],
      testimonials[(currentIndex + 1) % testimonials.length],
      testimonials[(currentIndex + 2) % testimonials.length],
    ]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our clients have to say about our services.
          </p>
        </div>

        <div className="relative" onMouseEnter={pauseAutoplay} onMouseLeave={resumeAutoplay}>
          <div className="overflow-hidden">
            <motion.div
              className="flex flex-wrap justify-center gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <AnimatePresence mode="wait" custom={direction}>
                {visibleTestimonials.map((testimonial, index) => (
                  <motion.div
                    key={`${currentIndex}-${index}`}
                    custom={direction}
                    initial={{
                      opacity: 0,
                      x: direction > 0 ? 100 : -100,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    exit={{
                      opacity: 0,
                      x: direction > 0 ? -100 : 100,
                    }}
                    transition={{ duration: 0.5 }}
                    className="bg-gray-50 p-6 rounded-lg shadow-md w-full md:w-[calc(33.333%-1.5rem)] max-w-md"
                  >
                    <div className="flex text-yellow-400 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-6">"{testimonial.text}"</p>
                    <div className="flex items-center">
                      <Image
                        src={`/placeholder.svg?height=48&width=48&text=${testimonial.name.charAt(0)}`}
                        alt={testimonial.name}
                        width={48}
                        height={48}
                        className="rounded-full mr-4"
                      />
                      <div>
                        <h4 className="font-medium">{testimonial.name}</h4>
                        <p className="text-sm text-gray-500">{testimonial.position}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Navigation buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors z-10"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5 text-gray-700" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors z-10"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5 text-gray-700" />
          </button>

          {/* Dots indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1)
                  setCurrentIndex(index)
                }}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  index === currentIndex ? "bg-primary" : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

