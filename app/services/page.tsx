import Link from "next/link"
import Image from "next/image"
import { servicesData } from "@/lib/services-data"
import { ArrowRight, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export const metadata = {
  title: "Our Services | Business Services",
  description:
    "Explore our comprehensive range of business services including company registration, tax filing, compliance, and more.",
}

export default function ServicesPage({ searchParams }: { searchParams: { search?: string } }) {
  // Filter services based on search query if provided
  const searchQuery = searchParams.search || ""
  const filteredServices = searchQuery
    ? servicesData.filter(
        (service) =>
          service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          service.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : servicesData

  // Group services by category
  const serviceCategories = [
    {
      title: "Business Registration",
      services: filteredServices.filter(
        (service) => service.slug.includes("registration") || service.slug === "business-registration",
      ),
    },
    {
      title: "Tax & Compliance",
      services: filteredServices.filter(
        (service) => service.slug.includes("tax") || service.slug.includes("compliance"),
      ),
    },
    {
      title: "Trademark & IP",
      services: filteredServices.filter(
        (service) =>
          service.slug.includes("trademark") || service.slug.includes("copyright") || service.slug.includes("patent"),
      ),
    },
    {
      title: "Licenses",
      services: filteredServices.filter((service) => service.slug.includes("license") || service.slug === "licenses"),
    },
    {
      title: "Legal Services",
      services: filteredServices.filter(
        (service) =>
          service.slug.includes("legal") || service.slug.includes("agreement") || service.slug.includes("notice"),
      ),
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">Our Business Services</h1>
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">
            Comprehensive business solutions to help you start, manage, and grow your business efficiently
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto relative">
            <form action="/services" method="get">
              <div className="relative">
                <Input
                  type="text"
                  name="search"
                  defaultValue={searchQuery}
                  placeholder="Search for services..."
                  className="w-full py-3 pl-12 pr-4 text-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                  <Search className="w-5 h-5 text-gray-500" />
                </div>
                <button
                  type="submit"
                  className="absolute inset-y-0 right-0 flex items-center px-4 font-medium text-white bg-primary hover:bg-primary/90 rounded-r-full focus:outline-none focus:ring-2 focus:ring-white"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Search Results */}
      {searchQuery && (
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">
              Search Results for "{searchQuery}" ({filteredServices.length} results)
            </h2>

            {filteredServices.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg text-gray-600 mb-4">No services found matching your search.</p>
                <Link href="/services" className="text-primary hover:underline">
                  View all services
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredServices.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/service/${service.slug}`}
                    className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow group"
                  >
                    <div className="relative h-48">
                      <Image
                        src={service.bannerImage || "/placeholder.svg"}
                        alt={service.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{service.description}</p>
                      <div className="flex items-center text-primary font-medium text-sm">
                        Learn More
                        <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Services by Category */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {serviceCategories.map(
            (category, index) =>
              category.services.length > 0 && (
                <div key={index} className="mb-16 last:mb-0">
                  <h2 className="text-2xl md:text-3xl font-bold mb-8 pb-2 border-b border-gray-200">
                    {category.title}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {category.services.map((service) => (
                      <Link
                        key={service.slug}
                        href={`/service/${service.slug}`}
                        className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow group"
                      >
                        <div className="relative h-48">
                          <Image
                            src={service.bannerImage || "/placeholder.svg"}
                            alt={service.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="p-6">
                          <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                            {service.title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{service.description}</p>
                          <div className="flex items-center text-primary font-medium text-sm">
                            Learn More
                            <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ),
          )}
        </div>
      </section>
    </div>
  )
}

