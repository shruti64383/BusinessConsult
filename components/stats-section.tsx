"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import AnimatedCounter from "@/components/animated-counter"

export default function StatsSection() {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.2 })

  const stats = [
    { value: 10000, label: "Businesses Served" },
    { value: 15000, label: "Registrations" },
    { value: 5000, label: "Tax Filings" },
    { value: 98.5, label: "Client Satisfaction", suffix: "%", decimals: 1 },
  ]

  return (
    <section ref={containerRef} className="bg-primary py-16">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Trusted by Businesses Across India</h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto">
            We've helped thousands of businesses start and grow with our comprehensive services
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <AnimatedCounter
                end={stat.value}
                suffix={stat.suffix || "+"}
                className="text-4xl md:text-5xl font-bold text-white mb-2"
                decimals={stat.decimals || 0}
              />
              <p className="text-primary-foreground/80">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

