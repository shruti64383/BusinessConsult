"use client"

import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { motion, useInView } from "framer-motion"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function HeroSection() {
  const router = useRouter()
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  }

  if (!isLoaded) {
    return (
      <section className="py-8 md:py-12 lg:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-4">
              <div className="h-12 bg-gray-200 rounded-md animate-pulse w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded-md animate-pulse w-full"></div>
              <div className="h-4 bg-gray-200 rounded-md animate-pulse w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded-md animate-pulse w-4/6"></div>
              <div className="flex gap-3 pt-2">
                <div className="h-10 bg-gray-200 rounded-md animate-pulse w-32"></div>
                <div className="h-10 bg-gray-200 rounded-md animate-pulse w-32"></div>
              </div>
            </div>
            <div className="h-64 md:h-80 bg-gray-200 rounded-lg animate-pulse"></div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-8 md:py-12 lg:py-20" ref={sectionRef}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <motion.div variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
            <motion.h1
              variants={itemVariants}
              className="text-2xl md:text-3xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4 md:mb-6"
            >
              Start & Grow Your Business with Expert Guidance
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-sm md:text-base lg:text-lg text-gray-700 mb-6 md:mb-8 max-w-xl"
            >
              Comprehensive business services including company registration, tax filing, compliance, and legal support
              to help your business thrive.
            </motion.p>
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                <Button
                  className="bg-primary hover:bg-primary/90 text-white px-4 py-2 md:px-6 md:py-2 text-sm md:text-base group w-full sm:w-auto"
                  onClick={() => router.push("/services")}
                >
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                <Link href="/pricing">
                  <Button
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary/10 px-4 py-2 md:px-6 md:py-2 text-sm md:text-base w-full sm:w-auto"
                  >
                    View Pricing
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
            <motion.div variants={itemVariants} className="mt-6 md:mt-10 flex items-center gap-4 md:gap-6">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={i}
                    className="w-6 h-6 md:w-8 md:h-8 rounded-full border-2 border-white overflow-hidden"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3, delay: 0.2 + i * 0.05 }}
                  >
                    <Image
                      src={`/placeholder.svg?height=40&width=40&text=${i}`}
                      alt={`Customer ${i}`}
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </motion.div>
                ))}
              </div>
              <div>
                <p className="text-xs md:text-sm font-medium">Trusted by 10,000+ businesses</p>
                <p className="text-xs md:text-sm text-yellow-500">★★★★★ 4.9/5 rating</p>
              </div>
            </motion.div>
          </motion.div>
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.div
               whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
               transition={{ duration: 0.5, delay: 0.3 }}
            > 
              <Image
                src="/placeholder.svg?height=500&width=600"
                alt="Business Services"
                width={600}
                height={500}
                className="rounded-lg shadow-xl w-full h-auto"
                loading="eager"
                priority
              />
            </motion.div>
            <motion.div
              className="absolute -bottom-2 -left-2 md:-bottom-4 md:-left-4 bg-white p-2 md:p-3 rounded-lg shadow-lg"
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center gap-2">
                <div className="bg-green-100 p-1 md:p-1.5 rounded-full">
                  <svg
                    className="h-3 w-3 md:h-4 md:w-4 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs md:text-sm font-medium">Fast Processing</p>
                  <p className="text-xs text-gray-500">Quick turnaround time</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              className="absolute -top-2 -right-2 md:-top-4 md:-right-4 bg-white p-2 md:p-3 rounded-lg shadow-lg"
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              whileHover={{ y: 5 }}
            >
              <div className="flex items-center gap-2">
                <div className="bg-blue-100 p-1 md:p-1.5 rounded-full">
                  <svg
                    className="h-3 w-3 md:h-4 md:w-4 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-xs md:text-sm font-medium">100% Secure</p>
                  <p className="text-xs text-gray-500">Data protection</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

