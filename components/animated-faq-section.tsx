"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { ChevronDown } from "lucide-react"

interface FAQ {
  question: string
  answer: string
}

interface AnimatedFAQSectionProps {
  faqs: FAQ[]
  title?: string
  description?: string
  className?: string
  style?: "default" | "style1" | "style2" | "style3"
}

export default function AnimatedFAQSection({
  faqs,
  title = "Frequently Asked Questions",
  description = "Find answers to common questions about our services",
  className = "",
  style = "default",
}: AnimatedFAQSectionProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const faqsRef = useRef(null)
  const isInView = useInView(faqsRef, { once: true, amount: 0.2 })

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  // Different styling based on the service page style
  const getStyleClasses = () => {
    switch (style) {
      case "style1":
        return {
          container: "space-y-4",
          item: "bg-white p-4 rounded-lg shadow-md border border-gray-200",
          question: "font-bold text-lg mb-2 flex items-start",
          answer: "text-gray-700",
        }
      case "style2":
        return {
          container: "space-y-4",
          item: "bg-gray-50 p-6 rounded-lg border border-gray-200",
          question: "font-bold text-lg mb-2 flex items-start",
          answer: "text-gray-700",
        }
      case "style3":
        return {
          container: "space-y-4",
          item: "bg-white p-4 rounded-lg border border-gray-200 shadow-sm",
          question: "font-bold text-lg mb-2 flex items-start",
          answer: "text-gray-700",
        }
      default:
        return {
          container: "space-y-4",
          item: "bg-white p-4 rounded-lg border border-gray-200 shadow-sm",
          question: "font-bold text-lg mb-2 flex items-start",
          answer: "text-gray-700",
        }
    }
  }

  const styleClasses = getStyleClasses()

  return (
    <div ref={faqsRef} className={`mb-10 ${className}`}>
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
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="mb-4"
          >
            <motion.div
              className={`${styleClasses.item} ${
                openFaq === index ? "border-primary shadow-md" : ""
              } overflow-hidden transition-all duration-300`}
              whileHover={{ boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}
            >
              <button
                className="w-full text-left flex justify-between items-center focus:outline-none"
                onClick={() => toggleFaq(index)}
              >
                <span className="font-semibold text-gray-900">{faq.question}</span>
                <motion.div animate={{ rotate: openFaq === index ? 180 : 0 }} transition={{ duration: 0.3 }}>
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                </motion.div>
              </button>
              <AnimatePresence>
                {openFaq === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="mt-2 text-gray-600">
                      <p>{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

