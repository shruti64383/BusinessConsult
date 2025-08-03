"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Check } from "lucide-react"
import { motion, useInView } from "framer-motion"
import { useRouter } from "next/navigation"

export default function ServicesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const router = useRouter()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  const featureVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4 },
    },
  }

  return (
    <section className="py-12 md:py-16 bg-gray-50" ref={ref}>
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          className="text-center mb-8 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">Our Business Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
            Comprehensive solutions to help you start, manage, and grow your business
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-12 md:space-y-16"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`flex flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} gap-6 md:gap-8 items-center`}
            >
              <div className="w-full lg:w-1/2 overflow-hidden rounded-lg">
              <motion.div
              whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
              initial={{ opacity: 0, scale: 0.95 }}
               animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
               transition={{ duration: 0.5, delay: 0.2 }}
              >
   

                  <Image
                    src={`/placeholder.svg?height=400&width=600&text=${service.title}`}
                    alt={service.title}
                    width={600}
                    height={400}
                    className="rounded-lg shadow-lg w-full h-auto"
                  />
                </motion.div>
              </div>
              <div className="w-full lg:w-1/2">
                <motion.h3
                  className="text-xl md:text-2xl lg:text-3xl font-bold mb-3 md:mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  {service.title}
                </motion.h3>
                <motion.p
                  className="text-sm md:text-base text-gray-600 mb-4 md:mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  {service.description}
                </motion.p>

                <motion.ul
                  className="space-y-2 md:space-y-3 mb-4 md:mb-6 text-sm md:text-base"
                  variants={containerVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                >
                  {service.features.map((feature, i) => (
                    <motion.li key={i} variants={featureVariants} custom={i} className="flex items-start">
                      <Check className="h-4 w-4 md:h-5 md:w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </motion.ul>

                <motion.div
                  className="flex flex-wrap gap-3 md:gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                    <Button
                      className="bg-primary hover:bg-primary/90 text-sm md:text-base group"
                      onClick={() => router.push(`/service/${service.href}`)}
                    >
                      Get Started
                      <ArrowRight className="ml-1 md:ml-2 h-3 w-3 md:h-4 md:w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>
                  </motion.div>
{/* //                   <div className="flex flex-wrap gap-3">
//                     <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
//                       <Link
//                         href={service.href}
//                         className="text-primary font-medium hover:underline flex items-center text-sm md:text-base group"
//                       >
//                         Learn More
//                         <ArrowRight className="ml-1 h-3 w-3 md:h-4 md:w-4 transition-transform duration-300 group-hover:translate-x-1" />
//                       </Link>
//                     </motion.div>
//                     <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
//                       <Link
//                         href="/pricing"
//                         className="text-gray-600 font-medium hover:underline flex items-center text-sm md:text-base group"
//                       >
//                         View Pricing
//                         <ArrowRight className="ml-1 h-3 w-3 md:h-4 md:w-4 transition-transform duration-300 group-hover:translate-x-1" />
//                       </Link>
//                     </motion.div>
//                   </div> */}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

const services = [
  {
    title: "Business Registration",
    description:
      "Start your business journey with the right business structure. Our experts will guide you through the entire registration process.",
    features: [
      "Private Limited Company Registration",
      "Limited Liability Partnership (LLP) Registration",
      "One Person Company (OPC) Registration",
      "Partnership Firm Registration",
      "Complete documentation and filing assistance",
    ],
    href: "/business-registration",
  },
  {
    title: "Tax & Compliance Services",
    description:
      "Stay compliant with all tax regulations and focus on growing your business while we handle your tax filings and compliance requirements.",
    features: [
      "GST Registration and Return Filing",
      "Income Tax Return Filing for Businesses",
      "TDS Return Filing",
      "Annual Compliance for Companies",
      "ROC Filing and Compliance",
    ],
    href: "/tax-compliance",
  },
  {
    title: "Trademark & Intellectual Property",
    description:
      "Protect your brand identity and intellectual property with our comprehensive trademark and IP services.",
    features: [
      "Trademark Registration in India",
      "International Trademark Registration",
      "Copyright Registration",
      "Patent Filing and Registration",
      "IP Protection Strategy",
    ],
    href: "/trademark-ip",
  },
]

