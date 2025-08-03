"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Check, ChevronRight, Phone, ArrowRight } from "lucide-react"
import { BsWhatsapp } from "react-icons/bs"
import { servicesData } from "@/lib/services-data"

// Import the animated components
import AnimatedBenefitsSection from "@/components/animated-benefits-section"
import AnimatedProcessSection from "@/components/animated-process-section"
import AnimatedFAQSection from "@/components/animated-faq-section"

export default function ServicePageClient({ params }: { params: { slug: string } }) {
  const service = servicesData.find((service) => service.slug === params.slug)
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.1 })

  // If service not found, return 404
  if (!service) {
    notFound()
  }

  // Other services to display in the "Other Services" section
  const otherServices = servicesData.filter((s) => s.slug !== params.slug).slice(0, 4)

  return (
    <div className="min-h-screen bg-gray-50" ref={containerRef}>
      {/* Hero Section - Style 2 */}
      <motion.section
        className="relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-gray-900 opacity-80 z-0"></div>
        <div className="relative h-[300px] md:h-[400px] w-full">
          <Image
            src={service.bannerImage || "/placeholder.svg"}
            alt={service.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 flex flex-col justify-center z-10 container mx-auto px-4">
            <div className="max-w-3xl">
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
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">{service.title}</h1>
              <p className="text-lg text-white/90 max-w-2xl">{service.description}</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Key Features */}
      <motion.section
        className="py-8 bg-white border-b border-gray-200"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center">
              <div className="bg-primary/10 p-3 rounded-full mr-4">
                <Check className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Fast Processing</h3>
                <p className="text-sm text-gray-600">Quick turnaround time</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="bg-primary/10 p-3 rounded-full mr-4">
                <Check className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">100% Compliance</h3>
                <p className="text-sm text-gray-600">Legal and regulatory adherence</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="bg-primary/10 p-3 rounded-full mr-4">
                <Check className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Expert Assistance</h3>
                <p className="text-sm text-gray-600">Professional guidance</p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Main Content */}
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Sidebar */}
            <motion.div
              className="w-full lg:w-1/4 order-2 lg:order-1"
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {/* Contact Form */}
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-8 sticky top-24">
                <h3 className="text-xl font-bold mb-4 text-gray-900 border-b border-gray-200 pb-2">
                  Get {service.title}
                </h3>

                <form className="space-y-4 mt-6">
                  <div>
                    <Input id="name" name="name" placeholder="Your Name" required />
                  </div>

                  <div>
                    <Input id="phone" name="phone" type="tel" placeholder="Phone Number" required />
                  </div>

                  <div>
                    <Input id="email" name="email" type="email" placeholder="Email Address" required />
                  </div>

                  <div>
                    <Textarea id="message" name="message" placeholder="Your Requirements" rows={3} />
                  </div>

                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                    Request Callback
                  </Button>
                </form>

                {/* Contact Options */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="grid grid-cols-2 gap-3">
                    <a
                      href="tel:+911234567890"
                      className="flex items-center justify-center gap-2 bg-primary text-white py-2 px-3 rounded-md hover:bg-primary/90 transition-colors text-sm"
                    >
                      <Phone className="h-4 w-4" />
                      <span>Call Now</span>
                    </a>
                    <a
                      href={`https://wa.me/911234567890?text=Hello,%20I%20am%20interested%20in%20your%20${service.title}%20service.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 bg-green-500 text-white py-2 px-3 rounded-md hover:bg-green-600 transition-colors text-sm"
                    >
                      <BsWhatsapp className="h-4 w-4" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Other Services */}
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <h3 className="text-xl font-bold mb-4 text-gray-900 border-b border-gray-200 pb-2">Other Services</h3>
                <ul className="space-y-3 mt-4">
                  {otherServices.map((otherService, index) => (
                    <li key={index}>
                      <Link
                        href={`/service/style2/${otherService.slug}`}
                        className="flex items-center text-gray-700 hover:text-primary transition-colors"
                      >
                        <ArrowRight className="h-4 w-4 mr-2 text-primary" />
                        <span>{otherService.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Main Content */}
            <motion.div
              className="w-full lg:w-3/4 order-1 lg:order-2"
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <div className="bg-white p-6 md:p-8 rounded-lg shadow-md border border-gray-200">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900 border-b border-gray-200 pb-4">
                  About {service.title}
                </h2>

                <div className="prose max-w-none mb-8">
                  <p className="text-gray-700 mb-4">{service.description}</p>
                  <p className="text-gray-700">
                    Our team of experienced professionals handles the entire process from start to finish, ensuring that
                    you can focus on running your business while we take care of the compliance aspects.
                  </p>
                </div>

                {/* Benefits Section */}
                <div className="mb-10">
                  <h3 className="text-xl font-bold mb-6 text-gray-900">Key Benefits</h3>
                  <AnimatedBenefitsSection
                    benefits={service.benefits.map((benefit) => ({ text: benefit }))}
                    style="style2"
                    description=""
                    title=""
                  />
                </div>

                {/* Process Section */}
                <div className="mb-10">
                  <h3 className="text-xl font-bold mb-6 text-gray-900">Our Process</h3>
                  <AnimatedProcessSection
                    steps={[
                      {
                        title: "Initial Consultation",
                        description: "We begin with a detailed consultation to understand your specific requirements.",
                        details: [
                          "Business structure assessment",
                          "Regulatory requirements analysis",
                          "Timeline and cost estimation",
                        ],
                      },
                      {
                        title: "Document Collection",
                        description:
                          "We guide you on the necessary documents and help you collect all required information.",
                        details: [
                          "Identity and address proofs",
                          "Business activity details",
                          "Ownership structure documentation",
                        ],
                      },
                      {
                        title: "Processing & Verification",
                        description: "Our experts process your application and verify all information for accuracy.",
                        details: ["Form filling and verification", "Legal document drafting", "Compliance check"],
                      },
                      {
                        title: "Submission & Follow-up",
                        description: "We submit your application to the relevant authorities and follow up regularly.",
                        details: [
                          "Application submission",
                          "Regular status updates",
                          "Query resolution with authorities",
                        ],
                      },
                      {
                        title: "Completion & Delivery",
                        description:
                          "Once approved, we deliver all certificates and documents with guidance on next steps.",
                        details: [
                          "Certificate and document delivery",
                          "Post-registration compliance guidance",
                          "Future compliance calendar setup",
                        ],
                      },
                    ]}
                    style="style2"
                    description=""
                    title=""
                  />
                </div>

                {/* FAQ Section */}
                <div className="mb-10">
                  <h3 className="text-xl font-bold mb-6 text-gray-900">Frequently Asked Questions</h3>
                  <AnimatedFAQSection
                    faqs={[
                      {
                        question: `What is the process for ${service.title.toLowerCase()}?`,
                        answer: `The ${service.title.toLowerCase()} process involves initial consultation, document collection, preparation, submission to authorities, and follow-up until completion. Our team handles all these steps professionally.`,
                      },
                      {
                        question: `How long does the ${service.title.toLowerCase()} process take?`,
                        answer: `The timeline varies depending on the complexity of your case and government processing times. Typically, it takes 2-4 weeks, but we always work to expedite the process wherever possible.`,
                      },
                      {
                        question: `What documents are required for ${service.title.toLowerCase()}?`,
                        answer: `Required documents generally include identity proof, address proof, business details, and specific documents related to your industry. Our team will provide you with a comprehensive checklist during the initial consultation.`,
                      },
                      {
                        question: `What are the fees for ${service.title.toLowerCase()} services?`,
                        answer: `Our fees depend on the complexity of your requirements and the specific service package you choose. We offer transparent pricing with no hidden charges. Contact us for a customized quote.`,
                      },
                    ]}
                    style="style2"
                    description=""
                    title=""
                  />
                </div>

                {/* Why Choose Us */}
                <div>
                  <h3 className="text-xl font-bold mb-6 text-gray-900">Why Choose Us</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {service.whyChooseUs.map((reason, index) => (
                      <div key={index} className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                        <div className="flex items-start">
                          <div className="flex-shrink-0 mr-4">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                              <Check className="h-5 w-5 text-primary" />
                            </div>
                          </div>
                          <div>
                            <h4 className="font-bold text-lg mb-2">{reason.split(" ").slice(0, 2).join(" ")}</h4>
                            <p className="text-gray-700 text-sm">{reason}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <motion.section
        className="bg-primary py-12 text-white"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Contact us today to learn more about our {service.title} services and how we can help your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              className="bg-white text-primary hover:bg-gray-100"
              onClick={() => {
                const form = document.querySelector("form")
                if (form) {
                  form.scrollIntoView({ behavior: "smooth" })
                }
              }}
            >
              Request a Callback
            </Button>
            <Link href="/pricing">
              <Button variant="outline" className="border-white text-white hover:bg-white/10 text-white">
                View Pricing
              </Button>
            </Link>
          </div>
        </div>
      </motion.section>
    </div>
  )
}

