"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { useRouter } from "next/navigation"

interface ServiceFormProps {
  service: string
}

export default function ServiceForm({ service }: ServiceFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: `I'm interested in ${service} services.`,
  })

  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const validateForm = () => {
    // Simple validation - check if required fields are filled
    if (!formData.name || !formData.email || !formData.phone) {
      alert("Please fill in all required fields")
      return false
    }
    return true
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, you would send this data to your backend
    console.log("Form submitted:", formData)
    alert("Thank you for your inquiry! We'll contact you shortly.")

    // Reset form (except for the service message)
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: `I'm interested in ${service} services.`,
    })
  }

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
      <h3 className="font-bold text-xl mb-4">Get {service} Service</h3>
      <p className="text-sm text-gray-600 mb-6">
        Fill the form below and our expert will get in touch with you shortly.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-1">
            Your Name
          </label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-1">
            Email Address
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-bold text-gray-700 mb-1">
            Phone Number
          </label>
          <Input
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
            required
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-bold text-gray-700 mb-1">
            Message
          </label>
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us about your requirements"
            rows={4}
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-primary hover:bg-primary/90"
          onClick={(e) => {
            e.preventDefault()
            if (validateForm()) {
              // In a real app, you would send the form data to your backend
              console.log("Form submitted:", formData)

              // Redirect to thank you page with service parameter
              router.push(`/thank-you?service=${encodeURIComponent(service)}`)
            }
          }}
        >
          Submit Inquiry
        </Button>
      </form>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-center">
          <div className="flex items-center">
            <div className="text-center">
              <p className="text-xs font-medium">More trusted. Verified reviews</p>
              <p className="text-xs text-yellow-500">★★★★★ 100+ Reviews</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

