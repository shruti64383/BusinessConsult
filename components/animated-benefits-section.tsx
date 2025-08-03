"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Check } from "lucide-react"

interface Benefit {
  title?: string
  text: string
}

interface AnimatedBenefitsSectionProps {
  benefits: Benefit[]
  title?: string
  description?: string
  className?: string
  style?: "default" | "style1" | "style2" | "style3"
}

export default function AnimatedBenefitsSection({
  benefits,
  title = "Key Benefits",
  description = "Discover the advantages of our comprehensive services",
  className = "",
  style = "default",
}: AnimatedBenefitsSectionProps) {
  const benefitsRef = useRef(null)
  const isInView = useInView(benefitsRef, { once: true, amount: 0.2 })

  // Different styling based on the service page style
  const getStyleClasses = () => {
    switch (style) {
      case "style1":
        return {
          container: "grid grid-cols-1 md:grid-cols-2 gap-6",
          item: "bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow",
          icon: "w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center",
        }
      case "style2":
        return {
          container: "bg-gray-50 p-6 rounded-lg border border-gray-200",
          item: "flex items-start mb-4 last:mb-0",
          icon: "w-6 h-6 rounded-full bg-green-100 flex items-center justify-center",
        }
      case "style3":
        return {
          container: "grid grid-cols-1 sm:grid-cols-2 gap-4",
          item: "bg-gray-50 p-5 rounded-lg border-l-4 border-primary",
          icon: "",
        }
      default:
        return {
          container: "bg-gray-50 p-6 rounded-lg border border-gray-200 mt-6",
          item: "flex items-start mb-3 last:mb-0",
          icon: "h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0",
        }
    }
  }

  const styleClasses = getStyleClasses()

  return (
    <div ref={benefitsRef} className={`mb-10 ${className}`}>
      {(title || description) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          {title && <h3 className="font-bold text-lg mb-2">{title}</h3>}
          {description && <p className="text-gray-600 text-sm">{description}</p>}
        </motion.div>
      )}

      <div className={styleClasses.container}>
        {benefits.map((benefit, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={styleClasses.item}
          >
            <div className="flex items-start">
              {style !== "style3" && (
                <div className={styleClasses.icon}>
                  <Check className="h-4 w-4 text-green-600" />
                </div>
              )}
              <div className={style !== "style3" ? "ml-3" : ""}>
                {benefit.title && <h4 className="font-bold text-lg mb-1">{benefit.title}</h4>}
                <p className="text-gray-700">{benefit.text}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

