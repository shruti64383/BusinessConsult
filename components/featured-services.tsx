"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { motion, useInView } from "framer-motion"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function FeaturedServices() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { amount: 0.1, once: true })
  const router = useRouter()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section className="py-12 md:py-16 bg-white" ref={ref}>
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          className="text-center mb-8 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">Our Featured Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
            Comprehensive business solutions to help you start, manage, and grow your business efficiently
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {featuredServices.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
            >
              <Link
                href={service.href}
                className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 block h-full"
              >
                <div className="p-4 md:p-6 h-full flex flex-col">
                  <motion.div
                    className="w-12 h-12 md:w-16 md:h-16 bg-primary/10 rounded-full flex items-center justify-center mb-3 md:mb-4 transition-all duration-300 group-hover:bg-primary/20"
                    whileHover={{ rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3 + index * 0.1, duration: 0.5, type: "spring" }}
                    >
                      <Image
                        src={`/placeholder.svg?height=40&width=40&text=${index + 1}`}
                        alt={service.title}
                        width={40}
                        height={40}
                        className="w-8 h-8 md:w-10 md:h-10 transition-transform duration-300 group-hover:scale-110"
                      />
                    </motion.div>
                  </motion.div>
                  <motion.h3
                    className="text-lg md:text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                  >
                    {service.title}
                  </motion.h3>
                  <motion.p
                    className="text-sm md:text-base text-gray-600 mb-4 flex-grow"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                  >
                    {service.description}
                  </motion.p>
                  <div className="space-y-2">
                    <Button
                      className="bg-primary hover:bg-primary/90 text-white text-sm md:text-base w-full"
                      // onClick={(e) => 
                      //   //e.preventDefault()
                      //   router.push(`/service/${service.href}`)
                      // }
                      onClick={(e) => {
                        e.preventDefault();
                        router.push(`/service/${service.href}`)
                      }}
                    >
                      <motion.span
                        className="flex items-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                      >
                        Get Started
                        <ArrowRight className="ml-1 md:ml-2 h-3 w-3 md:h-4 md:w-4 transition-transform duration-300" />
                      </motion.span>
                    </Button>
                    <Button
                      variant="outline"
                      className="border-primary text-primary hover:bg-primary/10 text-sm md:text-base w-full"
                      onClick={(e) => {
                        e.preventDefault()
                        router.push("/pricing")
                      }}
                    >
                      View Pricing
                    </Button>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

const featuredServices = [
  {
    title: "Company Registration",
    description: "Register your business as Private Limited, LLP, OPC or Partnership Firm with expert guidance.",
    href: "/business-registration",
  },
  {
    title: "GST Registration",
    description: "Get your business registered for GST and comply with tax regulations seamlessly.",
    href: "/gst-registration",
  },
  {
    title: "Trademark Registration",
    description: "Protect your brand identity with trademark registration and secure your business name.",
    href: "/trademark-registration",
  },
  {
    title: "Legal Documentation",
    description: "Get professionally drafted legal documents tailored to your business needs.",
    href: "/legal-documentation",
  },
]

