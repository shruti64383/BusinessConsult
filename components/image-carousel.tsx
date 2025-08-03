"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { useRouter } from "next/navigation"

export default function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.3 })
  const router = useRouter()

  const carouselImages = [
    {
      src: "/placeholder.svg?height=600&width=1200&text=Business Services",
      alt: "Business Services",
      title: "Comprehensive Business Solutions",
      description: "One-stop solution for all your business registration and compliance needs",
      link: "/service/business-registration",
    },
    {
      src: "/placeholder.svg?height=600&width=1200&text=Tax Filing",
      alt: "Tax Filing",
      title: "Hassle-free Tax Filing",
      description: "Expert assistance for GST, Income Tax, and TDS filing",
      link: "/service/tax-compliance",
    },
    {
      src: "/placeholder.svg?height=600&width=1200&text=Legal Services",
      alt: "Legal Services",
      title: "Professional Legal Services",
      description: "Legal documentation and compliance services for your business",
      link: "/service/legal-services",
    },
    {
      src: "/placeholder.svg?height=600&width=1200&text=Trademark Registration",
      alt: "Trademark Registration",
      title: "Protect Your Brand Identity",
      description: "Secure your business name and logo with trademark registration",
      link: "/service/trademark-registration",
    },
  ]

  const nextSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prevIndex) => (prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1))
    setTimeout(() => setIsAnimating(false), 500)
  }

  const prevSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? carouselImages.length - 1 : prevIndex - 1))
    setTimeout(() => setIsAnimating(false), 500)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 3000) // Changed to 2 seconds

    return () => clearInterval(interval)
  }, [ ])

  const scrollToImage = (index: number) => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex(index)
    setTimeout(() => setIsAnimating(false), 500)
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden bg-gradient-to-r from-gray-900 to-gray-800 text-white"
    >
      <motion.div
        initial={{ opacity: 0, scale: 1.1 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.1 }}
        transition={{ duration: 0.7 }}
        className="relative h-[500px] md:h-[600px] w-full"
      >
        <div className="absolute inset-0 bg-black/40 z-10"></div>

        <div ref={carouselRef} className="relative h-full w-full overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0"
            >
              <Image
                src={carouselImages[currentIndex].src || "/placeholder.svg"}
                alt={carouselImages[currentIndex].alt}
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 px-4 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-center max-w-4xl"
          >
            <motion.h2
              className="text-3xl md:text-5xl font-bold mb-4"
              key={`title-${currentIndex}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {carouselImages[currentIndex].title}
            </motion.h2>
            <motion.p
              className="text-lg md:text-xl mb-8 max-w-2xl mx-auto"
              key={`desc-${currentIndex}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {carouselImages[currentIndex].description}
            </motion.p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Button
                className="rounded-full bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg flex items-center gap-2"
                 
                onClick={() => 
                  router.push(carouselImages[currentIndex].link)

                  // const contactForm = document.querySelector(".fixed-contact-form")
                  // if (contactForm) {
                  //   contactForm.scrollIntoView({ behavior: "smooth" })
                  // }
                }
              >
                <ArrowRight className="h-5 w-5" />
                Get Expert Consultation
              </Button>
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-20">
          {carouselImages.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => scrollToImage(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex ? "bg-white scale-125" : "bg-white/50"
              }`}
              whileHover={{ scale: 1.5 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <motion.button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all duration-300"
          aria-label="Previous slide"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronLeft className="h-6 w-6" />
        </motion.button>

        <motion.button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all duration-300"
          aria-label="Next slide"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronRight className="h-6 w-6" />
        </motion.button>
      </motion.div>
    </div>
  )
}

