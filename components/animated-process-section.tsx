"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Check } from "lucide-react"

interface ProcessStep {
  title: string
  description: string
  details?: string[]
}

interface AnimatedProcessSectionProps {
  steps: ProcessStep[]
  title?: string
  description?: string
  className?: string
  style?: "default" | "style1" | "style2" | "style3"
}

export default function AnimatedProcessSection({
  steps,
  title = "Our Process",
  description = "Our streamlined process makes everything quick and hassle-free",
  className = "",
  style = "default",
}: AnimatedProcessSectionProps) {
  const processRef = useRef(null)
  const isInView = useInView(processRef, { once: true, amount: 0.2 })

  // Different styling based on the service page style
  const getStyleClasses = () => {
    switch (style) {
      case "style1":
        return {
          container: "relative",
          timeline: "absolute left-6 top-0 bottom-0 w-1 bg-primary/20 hidden md:block",
          stepContainer: "flex flex-col md:flex-row mb-8 last:mb-0",
          numberContainer: "flex-shrink-0 mr-6 relative",
          number:
            "flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white font-bold z-10 relative",
          content: "bg-white p-6 rounded-lg shadow-md border border-gray-100 flex-grow mt-4 md:mt-0",
        }
      case "style2":
        return {
          container: "space-y-6",
          timeline: "",
          stepContainer: "bg-gray-50 p-6 rounded-lg border border-gray-200",
          numberContainer: "flex-shrink-0 mr-4",
          number: "flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white font-bold",
          content: "",
        }
      case "style3":
        return {
          container: "space-y-4",
          timeline: "",
          stepContainer: "flex",
          numberContainer: "flex-shrink-0 mr-4",
          number: "flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-bold",
          content: "bg-white p-4 rounded-lg border border-gray-200 flex-grow",
        }
      default:
        return {
          container: "space-y-6",
          timeline: "",
          stepContainer: "flex",
          numberContainer: "flex-shrink-0 mr-4",
          number: "flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-bold",
          content: "",
        }
    }
  }

  const styleClasses = getStyleClasses()

  return (
    <div ref={processRef} className={`mb-10 ${className}`}>
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
        {styleClasses.timeline && <div className={styleClasses.timeline}></div>}

        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            className={styleClasses.stepContainer}
          >
            <div className={styleClasses.numberContainer}>
              <motion.div
                className={styleClasses.number}
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : { scale: 0 }}
                transition={{ duration: 0.3, delay: index * 0.15 + 0.2, type: "spring" }}
              >
                {index + 1}
              </motion.div>
            </div>

            <motion.div
              className={styleClasses.content}
              whileHover={style === "style1" ? { y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" } : {}}
              transition={{ duration: 0.2 }}
            >
              <h4 className="font-bold text-lg mb-1">{step.title}</h4>
              <p className="text-gray-700 mb-3">{step.description}</p>

              {step.details && (
                <ul className="space-y-2">
                  {step.details.map((detail, i) => (
                    <motion.li
                      key={i}
                      className="flex items-start"
                      initial={{ opacity: 0, x: -10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                      transition={{ duration: 0.3, delay: index * 0.15 + 0.3 + i * 0.1 }}
                    >
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{detail}</span>
                    </motion.li>
                  ))}
                </ul>
              )}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

