"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion, AnimatePresence } from "framer-motion"

export default function ContactForm() {
  const [isMinimized, setIsMinimized] = useState(false)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Redirect to thank you page with the string "YOUR QUERY"
    router.push(`/thank-you?service=your consultation request`)
  }

  return (
    <AnimatePresence>
      <motion.section
        className="fixed-contact-form"
        initial={{ y: 100 }}
        animate={{ y: isMinimized ? "calc(100% - 40px)" : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div
          className="bg-primary py-2 px-4 flex justify-between items-center cursor-pointer"
          onClick={() => setIsMinimized(!isMinimized)}
        >
          <h3 className="text-white font-medium text-sm">Get Free CA Guidance</h3>
          <button className="text-white hover:text-white/80 transition-colors">
            {isMinimized ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="18 15 12 9 6 15"></polyline>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            )}
          </button>
        </div>
        <motion.div
          className="bg-gray-100 py-4 border-t border-gray-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: isMinimized ? 0 : 1 }}
          transition={{ duration: 0.2 }}
        >
          <div className="w-full px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="w-full md:w-auto flex-1">
                <h2 className="text-xl font-bold text-gray-800 mb-1">Get Free CA Guidance</h2>
                <p className="text-gray-600 text-sm mb-2">
                  Fill the form and our expert will get in touch with you to provide personalized guidance.
                </p>
              </div>

              <div className="w-full md:w-auto flex-1">
                <form className="grid grid-cols-1 md:grid-cols-4 gap-2" onSubmit={handleSubmit}>
                  <div className="md:col-span-1">
                    <Input type="text" placeholder="Your Name" className="w-full h-9" />
                  </div>
                  <div className="md:col-span-1">
                    <Input type="email" placeholder="Email Address" className="w-full h-9" />
                  </div>
                  <div className="md:col-span-1">
                    <Input type="tel" placeholder="Mobile number" className="w-full h-9" />
                  </div>
                  <div className="md:col-span-1">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        className="bg-primary hover:bg-primary/90 text-white font-bold h-9 w-full"
                        type="submit"
                      >
                        FREE CA GUIDANCE
                      </Button>
                    </motion.div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.section>
    </AnimatePresence>
  )
}
