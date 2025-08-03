"use client"

import { Phone } from "lucide-react"
import { BsWhatsapp } from "react-icons/bs"
import { motion } from "framer-motion"

export default function FloatingButtons() {
  return (
    <div className="fixed right-4 md:right-6 bottom-[120px] md:bottom-[100px] flex flex-col gap-3 md:gap-4 z-50 floating-buttons">
      <motion.a
        href="tel:+911234567890"
        className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-colors"
        aria-label="Call us"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Phone className="h-4 w-4 md:h-5 md:w-5" />
      </motion.a>
      <motion.a
        href="https://wa.me/911234567890"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-green-500 text-white shadow-lg hover:bg-green-600 transition-colors"
        aria-label="WhatsApp"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <BsWhatsapp className="h-4 w-4 md:h-5 md:w-5" />
      </motion.a>
    </div>
  )
}

