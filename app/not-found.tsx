import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Search, ArrowRight, Home, Phone, Mail, MapPin } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="text-7xl md:text-9xl font-bold text-primary mb-4">
            <span className="inline-block animate-pulse">⏳</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Services coming soon</h2>
          <p className="text-gray-600 mb-8">
            Thank you for choosing us. We're working hard to bring you this service. Please check back later or explore
            our available services.
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search for services..."
                className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 w-full"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Link href="/" passHref legacyBehavior>
              <Button className="bg-primary hover:bg-primary/90 flex items-center gap-2" asChild>
                <a>
                  <Home className="h-4 w-4" />
                  Back to Home
                </a>
              </Button>
            </Link>
            <Link href="/services" passHref legacyBehavior>
              <Button variant="outline" className="border-primary text-primary hover:bg-primary/10" asChild>
                <a>Explore Services</a>
              </Button>
            </Link>
          </div>
        </div>

        {/* Quick Links */}
        <div className="max-w-4xl mx-auto mb-16">
          <h3 className="text-xl font-bold text-center mb-6">Available Services</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Home", href: "/" },
              { name: "Services", href: "/services" },
              { name: "Pricing", href: "/pricing" },
              { name: "Contact", href: "/coming-soon?service=Contact" },
              { name: "Company Registration", href: "/service/company-registration" },
              { name: "GST Registration", href: "/service/gst-registration" },
              { name: "Trademark Registration", href: "/service/trademark-registration" },
              { name: "Legal Documentation", href: "/service/legal-documentation" },
            ].map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="bg-white p-3 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow text-gray-700 hover:text-primary"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Popular Services */}
        <div className="max-w-4xl mx-auto mb-16">
          <h3 className="text-xl font-bold text-center mb-6">Popular Services</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Company Registration",
                description: "Register your business as Private Limited, LLP, OPC or Partnership Firm.",
                href: "/service/company-registration",
              },
              {
                title: "GST Registration",
                description: "Get your business registered for GST and comply with tax regulations.",
                href: "/service/gst-registration",
              },
              {
                title: "Trademark Registration",
                description: "Protect your brand identity with trademark registration.",
                href: "/service/trademark-registration",
              },
            ].map((service, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-bold text-lg mb-2">{service.title}</h4>
                <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                <Link
                  href={service.href}
                  className="text-primary font-medium text-sm flex items-center hover:underline"
                >
                  Learn More
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Information */}
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-center mb-6">Need Help?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold mb-4">Contact Us</h4>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Phone className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                  <a href="tel:+911234567890" className="hover:text-primary">
                    +91 1234567890
                  </a>
                </li>
                <li className="flex items-start">
                  <Mail className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                  <a href="mailto:info@businessservices.com" className="hover:text-primary">
                    info@businessservices.com
                  </a>
                </li>
                <li className="flex items-start">
                  <MapPin className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                  <span>123 Business Avenue, Corporate Park, New Delhi - 110001</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Business Hours</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between">
                  <span>Monday - Friday:</span>
                  <span>9:00 AM - 6:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Saturday:</span>
                  <span>10:00 AM - 4:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Sunday:</span>
                  <span>Closed</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

