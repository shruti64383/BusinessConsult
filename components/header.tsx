"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronDown, Phone, Mail, Menu, X, Home, Search } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"
import SearchBar from "@/components/search-bar"

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null)
  const [showMobileSearch, setShowMobileSearch] = useState(false)
  const isMobile = useMediaQuery("(max-width: 1024px)")

  // Close mobile menu when switching to desktop
  useEffect(() => {
    if (!isMobile) {
      setMobileMenuOpen(false)
      setShowMobileSearch(false)
    }
  }, [isMobile])

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
    setShowMobileSearch(false)
  }

  const toggleMobileSearch = () => {
    setShowMobileSearch(!showMobileSearch)
    if (!showMobileSearch) {
      setMobileMenuOpen(false)
    }
  }

  const toggleSubmenu = (label: string) => {
    if (activeSubmenu === label) {
      setActiveSubmenu(null)
    } else {
      setActiveSubmenu(label)
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-md">
      {/* Top bar with contact info */}
      <div className="bg-primary text-white py-2 px-4">
        <div className="w-full mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="hidden md:flex items-center space-x-4 text-sm">
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                <span>info@businessservices.com</span>
              </div>
              <span>|</span>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                <span>+91 1234567890</span>
              </div>
            </div>
            <div className="md:hidden flex items-center">
              <a href="tel:+911234567890" className="flex items-center text-white mr-4">
                <Phone className="h-4 w-4" />
              </a>
              <a href="mailto:info@businessservices.com" className="flex items-center text-white">
                <Mail className="h-4 w-4" />
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/login" className="text-white hover:text-white/80 text-sm transition-colors duration-200">
                Login
              </Link>
              <Link href="/register" className="text-white hover:text-white/80 text-sm transition-colors duration-200">
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu button and search */}
      <div className="lg:hidden flex justify-between items-center px-4 py-3 bg-white">
        <Link href="/" className="font-bold text-xl text-primary">
          Business Services
        </Link>
        <div className="flex items-center space-x-2">
          <button onClick={toggleMobileSearch} className="text-gray-700 hover:text-primary focus:outline-none p-2">
            <Search className="h-5 w-5" />
          </button>
          <button onClick={toggleMobileMenu} className="text-gray-700 hover:text-primary focus:outline-none p-2">
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {showMobileSearch && (
        <div className="lg:hidden px-4 py-3 bg-gray-50 border-t border-gray-200">
          <SearchBar isMobile={true} />
        </div>
      )}

      {/* Desktop Navigation */}
      <nav className="bg-gray-100 border-t border-b relative hidden lg:block">
        <div className="w-full mx-auto px-4 relative">
          <div className="flex justify-between items-center">
            <ul className="flex overflow-x-auto">
              {/* Home Link */}
              <li className="menu-item">
                <Link
                  href="/"
                  className="block px-4 py-3 font-medium text-gray-800 hover:text-primary hover:bg-gray-200 flex items-center transition-colors duration-200"
                >
                  <Home className="h-4 w-4 mr-1" />
                  Home
                </Link>
              </li>

              {menuItems.map((item, index) => (
                <li key={index} className="menu-item group">
                  <Link
                    href={item.href}
                    className="block px-4 py-3 font-medium text-gray-800 hover:text-primary hover:bg-gray-200 flex items-center transition-colors duration-200"
                  >
                    {item.label}
                    {item.children && (
                      <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
                    )}
                  </Link>

                  {item.children && (
                    <div className="mega-menu">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {item.children.map((category, catIndex) => (
                          <div key={catIndex}>
                            <h3 className="font-bold text-lg mb-3 text-primary">{category.title}</h3>
                            <ul className="space-y-2">
                              {category.links.map((link, linkIndex) => (
                                <li key={linkIndex}>
                                  <Link
                                    href={`/service/${link.href.replace(/^\//, "")}`}
                                    className="text-gray-700 hover:text-primary hover:underline block transition-colors duration-200"
                                  >
                                    {link.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>

            {/* Desktop Search Bar */}
            <div className="py-2 pr-4">
              <SearchBar />
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white overflow-y-auto max-h-[calc(100vh-120px)]">
          <ul className="py-2">
            {/* Home Link for Mobile */}
            <li className="border-b border-gray-100">
              <Link
                href="/"
                className="block px-4 py-3 font-medium text-gray-800 hover:text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="flex items-center">
                  <Home className="h-4 w-4 mr-2" />
                  Home
                </div>
              </Link>
            </li>

            {menuItems.map((item, index) => (
              <li key={index} className="border-b border-gray-100 last:border-b-0">
                {item.children ? (
                  <div>
                    <button
                      onClick={() => toggleSubmenu(item.label)}
                      className="w-full flex justify-between items-center px-4 py-3 font-medium text-gray-800 hover:text-primary"
                    >
                      {item.label}
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-200 ${activeSubmenu === item.label ? "rotate-180" : ""}`}
                      />
                    </button>

                    {activeSubmenu === item.label && (
                      <div className="bg-gray-50 py-2 px-4">
                        {item.children.map((category, catIndex) => (
                          <div key={catIndex} className="mb-4 last:mb-0">
                            <h3 className="font-bold text-sm text-primary mb-2 border-b border-gray-200 pb-1">
                              {category.title}
                            </h3>
                            <ul className="space-y-2">
                              {category.links.map((link, linkIndex) => (
                                <li key={linkIndex}>
                                  <Link
                                    href={`/service/${link.href.replace(/^\//, "")}`}
                                    className="text-gray-700 hover:text-primary text-sm block py-1"
                                    onClick={() => setMobileMenuOpen(false)}
                                  >
                                    {link.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className="block px-4 py-3 font-medium text-gray-800 hover:text-primary"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}

            {/* Add login and register links to mobile menu */}
            <li className="border-t border-gray-100 mt-2 pt-2">
              <div className="flex justify-between px-4 py-3">
                <Link
                  href="/login"
                  className="font-medium text-primary hover:text-primary/80"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="font-medium text-primary hover:text-primary/80"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Register
                </Link>
              </div>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}

const menuItems = [
  {
    label: "Business Registration",
    href: "/service/business-registration",
    children: [
      {
        title: "Company Formation",
        links: [
          { label: "Private Limited Company", href: "/private-limited" },
          { label: "Limited Liability Partnership", href: "/llp" },
          { label: "One Person Company", href: "/opc" },
          { label: "Partnership Firm", href: "/partnership" },
        ],
      },
      {
        title: "Business Registration",
        links: [
          { label: "Sole Proprietorship", href: "/sole-proprietorship" },
          { label: "MSME Registration", href: "/msme" },
          { label: "Startup India Registration", href: "/startup-india" },
          { label: "Section 8 Company", href: "/section-8" },
        ],
      },
      {
        title: "Foreign Business",
        links: [
          { label: "Foreign Company Registration", href: "/foreign-company" },
          { label: "Liaison Office", href: "/liaison-office" },
          { label: "Branch Office", href: "/branch-office" },
          { label: "Project Office", href: "/project-office" },
        ],
      },
      {
        title: "Resources",
        links: [
          { label: "Company Registration Guide", href: "/guides/company-registration" },
          { label: "Business Structure Comparison", href: "/guides/business-structure" },
          { label: "Registration Fees", href: "/fees" },
          { label: "FAQs", href: "/faqs/registration" },
        ],
      },
    ],
  },
  {
    label: "Tax & Compliance",
    href: "/service/tax-compliance",
    children: [
      {
        title: "Tax Registration",
        links: [
          { label: "GST Registration", href: "/gst-registration" },
          { label: "TAN Registration", href: "/tan-registration" },
          { label: "PAN Application", href: "/pan-application" },
          { label: "TDS Return", href: "/tds-return" },
        ],
      },
      {
        title: "Tax Filing",
        links: [
          { label: "Income Tax Return", href: "/income-tax-return" },
          { label: "GST Return Filing", href: "/gst-return-filing" },
          { label: "ITR for Businesses", href: "/business-itr" },
          { label: "ITR for Individuals", href: "/individual-itr" },
        ],
      },
      {
        title: "Compliance",
        links: [
          { label: "Annual Compliance", href: "/annual-compliance" },
          { label: "ROC Filing", href: "/roc-filing" },
          { label: "Accounting & Bookkeeping", href: "/accounting" },
          { label: "Legal Documentation", href: "/legal-documentation" },
        ],
      },
      {
        title: "Resources",
        links: [
          { label: "Tax Guides", href: "/guides/tax" },
          { label: "Compliance Calendar", href: "/compliance-calendar" },
          { label: "Tax Calculator", href: "/tax-calculator" },
          { label: "FAQs", href: "/faqs/tax" },
        ],
      },
    ],
  },
  {
    label: "Trademark & IP",
    href: "/service/trademark-ip",
    children: [
      {
        title: "Trademark",
        links: [
          { label: "Trademark Registration", href: "/trademark-registration" },
          { label: "Trademark Renewal", href: "/trademark-renewal" },
          { label: "Trademark Objection", href: "/trademark-objection" },
          { label: "International Trademark", href: "/international-trademark" },
        ],
      },
      {
        title: "Copyright",
        links: [
          { label: "Copyright Registration", href: "/copyright-registration" },
          { label: "Software Copyright", href: "/software-copyright" },
          { label: "Literary Copyright", href: "/literary-copyright" },
          { label: "Artistic Copyright", href: "/artistic-copyright" },
        ],
      },
      {
        title: "Patent",
        links: [
          { label: "Patent Search", href: "/patent-search" },
          { label: "Patent Registration", href: "/patent-registration" },
          { label: "Patent Drafting", href: "/patent-drafting" },
          { label: "International Patent", href: "/international-patent" },
        ],
      },
      {
        title: "Resources",
        links: [
          { label: "IP Protection Guide", href: "/guides/ip-protection" },
          { label: "Trademark Search", href: "/trademark-search" },
          { label: "IP Valuation", href: "/ip-valuation" },
          { label: "FAQs", href: "/faqs/ip" },
        ],
      },
    ],
  },
  {
    label: "Licenses",
    href: "/service/licenses",
    children: [
      {
        title: "Business Licenses",
        links: [
          { label: "Shop & Establishment", href: "/shop-establishment" },
          { label: "FSSAI License", href: "/fssai" },
          { label: "Trade License", href: "/trade-license" },
          { label: "MSME License", href: "/msme-license" },
        ],
      },
      {
        title: "Industry Specific",
        links: [
          { label: "Import Export Code", href: "/iec" },
          { label: "Drug License", href: "/drug-license" },
          { label: "AYUSH License", href: "/ayush-license" },
          { label: "ESI Registration", href: "/esi-registration" },
        ],
      },
      {
        title: "Professional Licenses",
        links: [
          { label: "DSC (Digital Signature)", href: "/dsc" },
          { label: "ISO Certification", href: "/iso" },
          { label: "BIS Certification", href: "/bis" },
          { label: "Udyam Registration", href: "/udyam" },
        ],
      },
      {
        title: "Resources",
        links: [
          { label: "License Finder Tool", href: "/license-finder" },
          { label: "Compliance Guide", href: "/guides/compliance" },
          { label: "License Renewal", href: "/license-renewal" },
          { label: "FAQs", href: "/faqs/licenses" },
        ],
      },
    ],
  },
  {
    label: "Legal Services",
    href: "/service/legal-services",
    children: [
      {
        title: "Legal Documents",
        links: [
          { label: "NDA", href: "/nda" },
          { label: "Employment Agreement", href: "/employment-agreement" },
          { label: "Partnership Deed", href: "/partnership-deed" },
          { label: "LLP Agreement", href: "/llp-agreement" },
        ],
      },
      {
        title: "Business Legal",
        links: [
          { label: "Legal Notice", href: "/legal-notice" },
          { label: "Legal Consultation", href: "/legal-consultation" },
          { label: "Contract Review", href: "/contract-review" },
          { label: "Due Diligence", href: "/due-diligence" },
        ],
      },
      {
        title: "Dispute Resolution",
        links: [
          { label: "Consumer Complaint", href: "/consumer-complaint" },
          { label: "Cheque Bounce", href: "/cheque-bounce" },
          { label: "Property Disputes", href: "/property-disputes" },
          { label: "Debt Recovery", href: "/debt-recovery" },
        ],
      },
      {
        title: "Resources",
        links: [
          { label: "Legal Document Templates", href: "/legal-templates" },
          { label: "Legal Guides", href: "/guides/legal" },
          { label: "Legal News", href: "/legal-news" },
          { label: "FAQs", href: "/faqs/legal" },
        ],
      },
    ],
  },
  {
    label: "Resources",
    href: "/coming-soon?service=Resources",
    children: [
      {
        title: "Guides & Articles",
        links: [
          { label: "Business Guides", href: "/coming-soon?service=Business%20Guides" },
          { label: "Tax Articles", href: "/coming-soon?service=Tax%20Articles" },
          { label: "Legal Updates", href: "/coming-soon?service=Legal%20Updates" },
          { label: "Compliance Checklists", href: "/coming-soon?service=Compliance%20Checklists" },
        ],
      },
      {
        title: "Tools",
        links: [
          { label: "Tax Calculator", href: "/coming-soon?service=Tax%20Calculator" },
          { label: "GST Calculator", href: "/coming-soon?service=GST%20Calculator" },
          { label: "EMI Calculator", href: "/coming-soon?service=EMI%20Calculator" },
          { label: "Business Name Generator", href: "/coming-soon?service=Business%20Name%20Generator" },
        ],
      },
      {
        title: "Downloads",
        links: [
          { label: "E-Books", href: "/coming-soon?service=E-Books" },
          { label: "Templates", href: "/coming-soon?service=Templates" },
          { label: "Checklists", href: "/coming-soon?service=Checklists" },
          { label: "Reports", href: "/coming-soon?service=Reports" },
        ],
      },
      {
        title: "Help Center",
        links: [
          { label: "FAQs", href: "/coming-soon?service=FAQs" },
          { label: "Support", href: "/coming-soon?service=Support" },
          { label: "Contact Us", href: "/coming-soon?service=Contact%20Us" },
          { label: "Feedback", href: "/coming-soon?service=Feedback" },
        ],
      },
    ],
  },
]

