import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-12">
      <div className="w-full px-4 md:px-8 lg:px-12">
        {/* Main footer content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">About Us</h3>
            <p className="text-gray-400 mb-6 text-sm">
              We provide comprehensive business services including company registration, tax filing, compliance,
              trademark registration, and legal services to help your business grow.
            </p>
            <div className="flex space-x-3">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white hover:underline transition-colors duration-200 flex items-center"
                  >
                    <span className="mr-2">›</span> {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Our Services</h3>
            <ul className="space-y-2 text-sm">
              {services.map((service, index) => (
                <li key={index}>
                  <Link
                    href={service.href}
                    className="text-gray-400 hover:text-white hover:underline transition-colors duration-200 flex items-center"
                  >
                    <span className="mr-2">›</span> {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex">
                <MapPin className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                <span className="text-gray-400">123 Business Avenue, Corporate Park, New Delhi - 110001</span>
              </li>
              <li className="flex">
                <Phone className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                <span className="text-gray-400">+91 1234567890</span>
              </li>
              <li className="flex">
                <Mail className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                <span className="text-gray-400">info@businessservices.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom footer */}
        <div className="mt-10 pt-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-xs mb-4 md:mb-0 text-center md:text-left">
            &copy; {new Date().getFullYear()} Business Services. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-400">
            <Link href="/terms" className="hover:text-white hover:underline transition-colors duration-200">
              Terms of Service
            </Link>
            <Link href="/privacy" className="hover:text-white hover:underline transition-colors duration-200">
              Privacy Policy
            </Link>
            <Link href="/refund" className="hover:text-white hover:underline transition-colors duration-200">
              Refund Policy
            </Link>
            <Link href="/sitemap" className="hover:text-white hover:underline transition-colors duration-200">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
  { label: "FAQs", href: "/faqs" },
]

const services = [
  { label: "Company Registration", href: "/service/business-registration" },
  { label: "GST Registration", href: "/service/gst-registration" },
  { label: "Trademark Registration", href: "/service/trademark-registration" },
  { label: "Income Tax Filing", href: "/service/income-tax-return" },
  { label: "Legal Documentation", href: "/service/legal-documentation" },
  { label: "Business Licenses", href: "/service/licenses" },
  { label: "Compliance Services", href: "/service/tax-compliance" },
]

