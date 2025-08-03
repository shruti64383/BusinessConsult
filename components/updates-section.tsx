"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { Calendar, Bell } from "lucide-react"

export default function UpdatesSection() {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.2 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  const updates = [
    {
      title: "GST Amnesty Scheme Announced for Small Businesses",
      date: "August 15, 2023",
      link: "/news/gst-amnesty-scheme",
      tag: "GST",
      tagColor: "bg-green-100 text-green-800",
    },
    {
      title: "New Income Tax Return Forms Released for AY 2023-24",
      date: "July 28, 2023",
      link: "/news/itr-forms-2023",
      tag: "Income Tax",
      tagColor: "bg-blue-100 text-blue-800",
    },
    {
      title: "Section 80IC Benefits Extended for Businesses in Himalayan States",
      date: "July 15, 2023",
      link: "/news/section-80ic-extension",
      tag: "Section 80IC",
      tagColor: "bg-purple-100 text-purple-800",
    },
    {
      title: "Deadline Extended for Company Annual Filing",
      date: "July 10, 2023",
      link: "/news/annual-filing-extension",
      tag: "Compliance",
      tagColor: "bg-orange-100 text-orange-800",
    },
    {
      title: "New E-invoicing Rules for Businesses with Turnover Above 5 Crore",
      date: "June 30, 2023",
      link: "/news/e-invoicing-update",
      tag: "E-invoicing",
      tagColor: "bg-teal-100 text-teal-800",
    },
  ]

  const dueDates = [
    {
      title: "GSTR-1 Filing Due Date",
      date: "August 11, 2023",
      description: "Monthly return for outward supplies",
      tag: "GSTR-1",
      tagColor: "bg-red-100 text-red-800",
    },
    {
      title: "GSTR-3B Filing Due Date",
      date: "August 20, 2023",
      description: "Monthly summary return",
      tag: "GSTR-3B",
      tagColor: "bg-blue-100 text-blue-800",
    },
    {
      title: "Advance Tax Payment (Second Installment)",
      date: "September 15, 2023",
      description: "For all taxpayers",
      tag: "Advance Tax",
      tagColor: "bg-purple-100 text-purple-800",
    },
    {
      title: "TDS Return Filing (Form 24Q)",
      date: "July 31, 2023",
      description: "For Q1 of FY 2023-24",
      tag: "TDS",
      tagColor: "bg-green-100 text-green-800",
    },
    {
      title: "ESI Contribution Due Date",
      date: "August 15, 2023",
      description: "For July 2023",
      tag: "ESI",
      tagColor: "bg-yellow-100 text-yellow-800",
    },
  ]

  return (
    <div ref={containerRef} className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Updates & Alerts Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <div className="flex items-center mb-6">
              <Bell className="h-6 w-6 text-primary mr-2" />
              <h2 className="text-2xl font-bold">Updates & Alerts</h2>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="space-y-4"
            >
              {updates.map((update, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                  className="border-b border-gray-100 pb-4 last:border-0 last:pb-0"
                >
                  <div className="flex justify-between items-start mb-1">
                    <Link
                      href={update.link}
                      className="text-gray-800 font-medium hover:text-primary transition-colors duration-200"
                    >
                      {update.title}
                    </Link>
                    <motion.span
                      className={`text-xs px-2 py-1 rounded-full ${update.tagColor}`}
                      whileHover={{ scale: 1.1 }}
                    >
                      {update.tag}
                    </motion.span>
                  </div>
                  <p className="text-sm text-gray-500">{update.date}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Due Dates Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <div className="flex items-center mb-6">
              <Calendar className="h-6 w-6 text-primary mr-2" />
              <h2 className="text-2xl font-bold">Due Dates</h2>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="space-y-4"
            >
              {dueDates.map((dueDate, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, backgroundColor: "rgba(249, 250, 251, 0.5)" }}
                  className="border-b border-gray-100 pb-4 last:border-0 last:pb-0 rounded-md p-2 transition-all duration-200"
                >
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="text-gray-800 font-medium">{dueDate.title}</h3>
                      <p className="text-sm text-gray-600">{dueDate.description}</p>
                    </div>
                    <motion.span
                      className={`text-xs px-2 py-1 rounded-full ${dueDate.tagColor}`}
                      whileHover={{ scale: 1.1 }}
                    >
                      {dueDate.tag}
                    </motion.span>
                  </div>
                  <motion.p className="text-sm font-semibold text-red-600" whileHover={{ scale: 1.05 }}>
                    {dueDate.date}
                  </motion.p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

