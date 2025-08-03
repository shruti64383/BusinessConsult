"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle, ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"

export default function ThankYouPage() {
  const searchParams = useSearchParams()
  const service = searchParams.get("service") || "our services"

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-12 px-4">
      <motion.div
        className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
        >
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
        </motion.div>

        <h1 className="text-2xl font-bold text-gray-800 mb-4">Thank You!</h1>

        <p className="text-gray-600 mb-6">
          Our team will contact you shortly regarding <span className="font-semibold text-primary">{service}</span>. We
          appreciate your interest and will do our best to assist you with your requirements.
        </p>

        <div className="space-y-4">
          <Link href="/">
            <Button className="bg-primary hover:bg-primary/90 w-full">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return to Home
            </Button>
          </Link>

          <Link href="/services">
            <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/10">
              Explore Other Services
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  )
}

