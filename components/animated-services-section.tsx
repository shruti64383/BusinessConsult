"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { ChevronDown, Check, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function AnimatedServicesSection() {
  // Refs for scroll animations
  const benefitsRef = useRef(null)
  const processRef = useRef(null)
  const faqsRef = useRef(null)

  // InView states to trigger animations
  const benefitsInView = useInView(benefitsRef, { once: true, amount: 0.2 })
  const processInView = useInView(processRef, { once: true, amount: 0.2 })
  const faqsInView = useInView(faqsRef, { once: true, amount: 0.2 })

  // State for FAQ accordion
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  // Toggle FAQ function
  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  return (
    <div className="bg-gray-50 py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Our Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Comprehensive business solutions to help you start, manage, and grow your business efficiently
          </p>
        </motion.div>

        {/* Key Benefits Section */}
        <section className="mb-20" ref={benefitsRef}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={benefitsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 text-center">Key Benefits</h3>
            <p className="text-gray-600 max-w-2xl mx-auto text-center">
              Discover the advantages of our comprehensive business services
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={benefitsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <benefit.icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2">{benefit.title}</h4>
                    <p className="text-gray-600 text-sm">{benefit.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Registration Process Section */}
        <section className="mb-20" ref={processRef}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={processInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 text-center">Registration Process</h3>
            <p className="text-gray-600 max-w-2xl mx-auto text-center">
              Our streamlined process makes registration quick and hassle-free
            </p>
          </motion.div>

          <div className="relative">
            {/* Process timeline line */}
            <div className="absolute left-6 top-0 bottom-0 w-1 bg-primary/20 hidden md:block"></div>

            <div className="space-y-8">
              {registrationProcess.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  animate={processInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="flex flex-col md:flex-row"
                >
                  <div className="flex-shrink-0 mr-6 relative">
                    <motion.div
                      className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white font-bold z-10 relative"
                      initial={{ scale: 0 }}
                      animate={processInView ? { scale: 1 } : { scale: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.15 + 0.2, type: "spring" }}
                    >
                      {index + 1}
                    </motion.div>
                  </div>
                  <motion.div
                    className="bg-white p-6 rounded-lg shadow-md border border-gray-100 flex-grow mt-4 md:mt-0"
                    whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                    transition={{ duration: 0.2 }}
                  >
                    <h4 className="font-bold text-xl mb-2">{step.title}</h4>
                    <p className="text-gray-700 mb-4">{step.description}</p>
                    {step.details && (
                      <ul className="space-y-2">
                        {step.details.map((detail, i) => (
                          <motion.li
                            key={i}
                            className="flex items-start"
                            initial={{ opacity: 0, x: -10 }}
                            animate={processInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={processInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-10 text-center"
          >
            <Link href="/services">
              <Button className="bg-primary hover:bg-primary/90 text-white">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </section>

        {/* FAQ Section */}
        <section ref={faqsRef}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={faqsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 text-center">
              Frequently Asked Questions
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto text-center">
              Find answers to common questions about our services
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={faqsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="mb-4"
              >
                <motion.div
                  className={`bg-white rounded-lg border ${
                    openFaq === index ? "border-primary shadow-md" : "border-gray-200"
                  } overflow-hidden transition-all duration-300`}
                  whileHover={{ boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}
                >
                  <button
                    className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
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
                        <div className="px-6 pb-4 text-gray-600">
                          <p>{faq.answer}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={faqsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center bg-primary/10 p-8 rounded-lg border border-primary/20"
        >
          <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Contact our team today to learn more about our services and how we can help your business grow.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-primary hover:bg-primary/90 text-white">Contact Us</Button>
            <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
              View All Services
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

// Sample data
const benefits = [
  {
    title: "Legal Protection",
    description: "Protect your personal assets by separating them from your business liabilities.",
    icon: Shield,
  },
  {
    title: "Tax Benefits",
    description: "Access various tax advantages and deductions available to registered businesses.",
    icon: Calculator,
  },
  {
    title: "Enhanced Credibility",
    description: "Build trust with customers, suppliers, and partners through official registration.",
    icon: Award,
  },
  {
    title: "Access to Funding",
    description: "Improve your chances of securing loans, investments, and government grants.",
    icon: DollarSign,
  },
  {
    title: "Business Continuity",
    description: "Ensure your business can continue operating regardless of ownership changes.",
    icon: Clock,
  },
  {
    title: "Global Opportunities",
    description: "Expand your business internationally with proper legal documentation.",
    icon: Globe,
  },
]

const registrationProcess = [
  {
    title: "Initial Consultation",
    description: "We begin with a detailed consultation to understand your specific business needs and objectives.",
    details: ["Business structure assessment", "Regulatory requirements analysis", "Timeline and cost estimation"],
  },
  {
    title: "Document Collection",
    description: "We guide you through gathering all necessary documents required for registration.",
    details: ["Identity and address proofs", "Business activity details", "Ownership structure documentation"],
  },
  {
    title: "Application Preparation",
    description: "Our experts prepare all application forms and legal documents with meticulous attention to detail.",
    details: ["Form filling and verification", "Legal document drafting", "Compliance check"],
  },
  {
    title: "Submission & Follow-up",
    description: "We submit your application to the relevant authorities and actively follow up on its progress.",
    details: ["Application submission", "Regular status updates", "Query resolution with authorities"],
  },
  {
    title: "Completion & Delivery",
    description: "Once approved, we deliver all certificates and documents with guidance on next steps.",
    details: [
      "Certificate and document delivery",
      "Post-registration compliance guidance",
      "Future compliance calendar setup",
    ],
  },
]

const faqs = [
  {
    question: "How long does the business registration process take?",
    answer:
      "The timeline varies depending on the type of business structure and jurisdiction. Typically, it takes 7-15 business days for most registrations, but complex cases may take longer. Our team works efficiently to complete the process as quickly as possible while ensuring all legal requirements are met.",
  },
  {
    question: "What documents are required for business registration?",
    answer:
      "Required documents generally include identity proofs (passport, driver's license), address proofs, business address verification, details of directors/partners, and proposed business activities. For specific business structures, additional documents may be required. Our team will provide you with a comprehensive checklist during the initial consultation.",
  },
  {
    question: "What are the costs involved in business registration?",
    answer:
      "Registration costs include government fees, which vary by business structure and jurisdiction, and service fees. We offer transparent pricing with no hidden charges. During the initial consultation, we'll provide a detailed breakdown of all costs involved based on your specific requirements.",
  },
  {
    question: "Can I register my business online?",
    answer:
      "Yes, most business registrations can be completed online. Our digital process allows you to submit documents electronically and track your application status in real-time. Our team handles the entire online submission process, making it convenient and hassle-free for you.",
  },
  {
    question: "What ongoing compliance requirements will I have after registration?",
    answer:
      "After registration, businesses typically need to file annual returns, maintain proper books of accounts, comply with tax regulations, and renew certain licenses periodically. The specific requirements depend on your business structure and industry. We offer ongoing compliance services to help you meet all post-registration obligations.",
  },
  {
    question: "Can I change my business structure after registration?",
    answer:
      "Yes, it's possible to change your business structure after registration, though it involves a specific legal process. Common conversions include sole proprietorship to LLC or private limited company, or partnership to LLP. Our team can guide you through the conversion process to ensure a smooth transition while maintaining business continuity.",
  },
]

// Icons
function Shield(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  )
}

function Calculator(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="16" height="20" x="4" y="2" rx="2" />
      <line x1="8" x2="16" y1="6" y2="6" />
      <line x1="16" x2="16" y1="14" y2="18" />
      <path d="M16 10h.01" />
      <path d="M12 10h.01" />
      <path d="M8 10h.01" />
      <path d="M12 14h.01" />
      <path d="M8 14h.01" />
      <path d="M12 18h.01" />
      <path d="M8 18h.01" />
    </svg>
  )
}

function Award(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="8" r="7" />
      <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
    </svg>
  )
}

function DollarSign(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" x2="12" y1="2" y2="22" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  )
}

function Clock(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}

function Globe(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" x2="22" y1="12" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  )
}

