"use client"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Check, ChevronRight, Phone, MessageCircle, ArrowRight } from "lucide-react"
import { servicesData } from "@/lib/services-data"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

// Wrap the main content in motion components
export default function ServicePageStyle1({ params }: { params: { slug: string } }) {
  const service = servicesData.find((service) => service.slug === params.slug)
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.1 })

  // If service not found, return 404
  if (!service) {
    notFound()
  }

  // Other services to display in the "Other Services" section
  const otherServices = servicesData.filter((s) => s.slug !== params.slug).slice(0, 3)

  return (
    <div className="min-h-screen" ref={containerRef}>
      {/* Hero Section - Style 1 */}
      <section className="bg-gradient-to-r from-primary to-primary/70 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div
              className="w-full md:w-1/2 mb-8 md:mb-0 md:pr-8"
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center text-sm text-white/80 mb-4">
                <Link href="/" className="hover:text-white">
                  Home
                </Link>
                <ChevronRight className="h-4 w-4 mx-1" />
                <Link href="/services" className="hover:text-white">
                  Services
                </Link>
                <ChevronRight className="h-4 w-4 mx-1" />
                <span className="text-white">{service.title}</span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{service.title}</h1>
              <p className="text-lg md:text-xl mb-8 text-white/90">{service.description}</p>
              <div className="flex flex-wrap gap-4">
                <Button className="bg-white text-primary hover:bg-gray-100">Get Started</Button>
                <Button variant="outline" className="border-white text-white hover:bg-white/10">
                  Learn More
                </Button>
              </div>
            </motion.div>
            <motion.div
              className="w-full md:w-1/2"
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative rounded-lg overflow-hidden shadow-2xl">
                <Image
                  src={service.bannerImage || "/placeholder.svg"}
                  alt={service.title}
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                  <div className="flex items-center gap-2">
                    <div className="bg-white p-1 rounded-full">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                    <p className="text-white font-medium">Trusted by 10,000+ businesses</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Content */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {/* Benefits Section */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">Benefits of {service.title}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {service.benefits.map((benefit, index) => (
                    <div
                      key={index}
                      className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
                    >
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mr-4">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Check className="h-5 w-5 text-primary" />
                          </div>
                        </div>
                        <div>
                          <h3 className="font-bold text-lg mb-2">{benefit}</h3>
                          <p className="text-gray-600 text-sm">
                            Our {service.title.toLowerCase()} service ensures you get the most out of this benefit.
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Process Section */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">Our Process</h2>
                <div className="relative">
                  {/* Process timeline line */}
                  <div className="absolute left-6 top-0 bottom-0 w-1 bg-primary/20 hidden md:block"></div>

                  <div className="space-y-8">
                    {[
                      {
                        step: 1,
                        title: "Initial Consultation",
                        description: "We begin with a detailed consultation to understand your specific requirements.",
                      },
                      {
                        step: 2,
                        title: "Document Collection",
                        description:
                          "We guide you on the necessary documents and help you collect all required information.",
                      },
                      {
                        step: 3,
                        title: "Processing & Verification",
                        description: "Our experts process your application and verify all information for accuracy.",
                      },
                      {
                        step: 4,
                        title: "Submission & Follow-up",
                        description: "We submit your application to the relevant authorities and follow up regularly.",
                      },
                      {
                        step: 5,
                        title: "Completion & Delivery",
                        description:
                          "Once approved, we deliver all certificates and documents with guidance on next steps.",
                      },
                    ].map((process, index) => (
                      <div key={index} className="flex flex-col md:flex-row">
                        <div className="flex-shrink-0 mr-6 relative">
                          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white font-bold z-10 relative">
                            {process.step}
                          </div>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 flex-grow mt-4 md:mt-0">
                          <h3 className="font-bold text-xl mb-2">{process.title}</h3>
                          <p className="text-gray-700">{process.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Other Services */}
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">Related Services</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {otherServices.map((otherService, index) => (
                    <Link key={index} href={`/service/style1/${otherService.slug}`} className="group block">
                      <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow h-full flex flex-col">
                        <div className="relative h-40">
                          <Image
                            src={otherService.bannerImage || "/placeholder.svg"}
                            alt={otherService.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="p-6 flex-grow flex flex-col">
                          <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                            {otherService.title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-4 flex-grow">
                            {otherService.description.substring(0, 100)}...
                          </p>
                          <div className="flex items-center text-primary font-medium text-sm">
                            Learn More
                            <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Sidebar */}
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {/* Contact Form */}
              <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 mb-8 sticky top-24">
                <h3 className="text-xl font-bold mb-4 text-gray-900">Get {service.title} Service</h3>
                <p className="text-gray-600 text-sm mb-6">
                  Fill the form below and our expert will get in touch with you shortly.
                </p>

                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name
                    </label>
                    <Input id="name" name="name" placeholder="Enter your full name" required />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <Input id="phone" name="phone" type="tel" placeholder="Enter your phone number" required />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <Input id="email" name="email" type="email" placeholder="Enter your email" required />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <Textarea id="message" name="message" placeholder="Tell us about your requirements" rows={4} />
                  </div>

                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                    Submit Inquiry
                  </Button>
                </form>

                {/* Why Choose Us */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h3 className="text-lg font-bold mb-4 text-gray-900">Why Choose Us</h3>
                  <ul className="space-y-3">
                    {service.whyChooseUs.map((reason, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Contact Options */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h3 className="text-lg font-bold mb-4 text-gray-900">Need Help?</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <a
                      href="tel:+911234567890"
                      className="flex items-center justify-center gap-2 bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 transition-colors"
                    >
                      <Phone className="h-4 w-4" />
                      <span>Call Us</span>
                    </a>
                    <a
                      href={`https://wa.me/911234567890?text=Hello,%20I%20am%20interested%20in%20your%20${service.title}%20service.%20Please%20contact%20me.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors"
                    >
                      <MessageCircle className="h-4 w-4" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

