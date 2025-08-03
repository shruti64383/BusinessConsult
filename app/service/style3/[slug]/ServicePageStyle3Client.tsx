"use client"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Check, ChevronRight, Phone, Star, FileText, Clock } from "lucide-react"
import { BsWhatsapp } from "react-icons/bs"
import { servicesData } from "@/lib/services-data"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

// Import the animated components
import AnimatedBenefitsSection from "@/components/animated-benefits-section"
import AnimatedProcessSection from "@/components/animated-process-section"
import AnimatedFAQSection from "@/components/animated-faq-section"

type ServicePageStyle3ClientProps = {
  params: { slug: string }
}

export default function ServicePageStyle3Client({ params }: ServicePageStyle3ClientProps) {
  const service = servicesData.find((service) => service.slug === params.slug)
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.1 })

  // If service not found, return 404
  if (!service) {
    notFound()
  }

  // Other services to display in the "Other Services" section
  const otherServices = servicesData.filter((s) => s.slug !== params.slug).slice(0, 2)

  return (
    <div className="min-h-screen" ref={containerRef}>
      {/* Hero Section - Style 3 */}
      <motion.section
        className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
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
              <p className="text-lg mb-8 text-white/90">{service.description}</p>
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-500 mr-1" />
                  <span className="text-sm font-medium">4.9/5 Rating</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-primary mr-1" />
                  <span className="text-sm font-medium">Quick Turnaround</span>
                </div>
                <div className="flex items-center">
                  <FileText className="h-5 w-5 text-primary mr-1" />
                  <span className="text-sm font-medium">100% Compliance</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  className="bg-primary hover:bg-primary/90 text-white"
                  onClick={() => {
                    const form = document.querySelector("form")
                    if (form) {
                      form.scrollIntoView({ behavior: "smooth" })
                    }
                  }}
                >
                  Get Started
                </Button>
                <Link href="/pricing">
                  <Button variant="outline" className="border-white text-white hover:bg-white/10 text-white">
                    View Pricing
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-primary/20 rounded-lg blur-lg"></div>
              <div className="relative rounded-lg overflow-hidden">
                <Image
                  src={service.bannerImage || "/placeholder.svg"}
                  alt={service.title}
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Tabs Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="flex flex-wrap border-b border-gray-200 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <button className="px-6 py-3 font-medium text-primary border-b-2 border-primary">Overview</button>
            <button className="px-6 py-3 font-medium text-gray-500 hover:text-gray-700">Benefits</button>
            <button className="px-6 py-3 font-medium text-gray-500 hover:text-gray-700">Process</button>
            <button className="px-6 py-3 font-medium text-gray-500 hover:text-gray-700">FAQ</button>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {/* Overview Section */}
              <div className="mb-10">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">{service.title} Overview</h2>
                <div className="prose max-w-none mb-6">
                  <p className="text-gray-700 mb-4">{service.description}</p>
                  <p className="text-gray-700">
                    Our team of experienced professionals handles the entire process from start to finish, ensuring that
                    you can focus on running your business while we take care of the compliance aspects.
                  </p>
                </div>

                {/* Benefits Cards */}
                <div className="mt-8">
                  <h3 className="text-xl font-bold mb-6 text-gray-900">Key Benefits</h3>
                  <AnimatedBenefitsSection
                    benefits={service.benefits.map((benefit) => ({ text: benefit }))}
                    style="style3"
                    description=""
                    title=""
                  />
                </div>
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
                  style="style3"
                  description=""
                  title=""
                />
              </div>

              {/* Add an FAQ section before the "Why Choose Us" section: */}
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
                    {
                      question: `Do I need to visit your office for ${service.title.toLowerCase()} services?`,
                      answer: `No, our services are completely online. You can submit all documents electronically, and our team handles the entire process remotely. We'll keep you updated at every step via email and phone.`,
                    },
                  ]}
                  style="style3"
                  description=""
                  title=""
                />
              </div>

              {/* Why Choose Us */}
              <div>
                <h3 className="text-xl font-bold mb-6 text-gray-900">Why Choose Us</h3>
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <ul className="space-y-4">
                    {service.whyChooseUs.map((reason, index) => (
                      <li key={index} className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                            <Check className="h-4 w-4 text-primary" />
                          </div>
                        </div>
                        <p className="ml-3 text-gray-700">{reason}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Right Sidebar */}
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              {/* Contact Form */}
              <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 mb-8 sticky top-24">
                <div className="bg-primary text-white p-4 rounded-t-lg -mt-6 -mx-6 mb-6">
                  <h3 className="text-xl font-bold">Get {service.title}</h3>
                  <p className="text-sm text-white/80 mt-1">Fill the form for expert assistance</p>
                </div>

                <form className="space-y-4">
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
                    Submit Inquiry
                  </Button>
                </form>

                {/* Contact Options */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="grid grid-cols-2 gap-3">
                    <a
                      href="tel:+911234567890"
                      className="flex items-center justify-center gap-2 bg-blue-600 text-white py-2 px-3 rounded-md hover:bg-blue-700 transition-colors text-sm"
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

              {/* Related Services */}
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <h3 className="text-xl font-bold mb-4 text-gray-900">Related Services</h3>
                <div className="space-y-4">
                  {otherServices.map((otherService, index) => (
                    <Link
                      key={index}
                      href={`/service/style3/${otherService.slug}`}
                      className="block p-4 border border-gray-200 rounded-lg hover:border-primary hover:shadow-md transition-all duration-300"
                    >
                      <h4 className="font-bold mb-1 text-gray-800 hover:text-primary transition-colors">
                        {otherService.title}
                      </h4>
                      <p className="text-sm text-gray-600 line-clamp-2">{otherService.description}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <motion.section
        className="py-12 bg-gray-50"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-10 text-gray-900">What Our Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <div className="flex text-yellow-400 mb-4 justify-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6">
                  "The {service.title} service was excellent. The team was professional and handled everything
                  efficiently. Highly recommended!"
                </p>
                <div className="flex items-center justify-center">
                  <Image
                    src={`/placeholder.svg?height=48&width=48&text=${i}`}
                    alt="Client"
                    width={48}
                    height={48}
                    className="rounded-full mr-4"
                  />
                  <div className="text-left">
                    <h4 className="font-medium">Client Name</h4>
                    <p className="text-sm text-gray-500">Business Owner</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="py-16 bg-primary text-white"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.5, delay: 0.7 }}
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
              Get Started Now
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white/10">
              Learn More
            </Button>
          </div>
        </div>
      </motion.section>
    </div>
  )
}

