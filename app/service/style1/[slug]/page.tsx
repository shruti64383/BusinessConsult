import type { Metadata } from "next"
import { servicesData } from "@/lib/services-data"
import { notFound } from "next/navigation"
import ServicePageClient from "./ServicePageClient"

// Generate metadata for the page
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const service = servicesData.find((service) => service.slug === params.slug)

  if (!service) {
    return {
      title: "Service Not Found",
      description: "The requested service could not be found.",
    }
  }

  return {
    title: service.metaTitle,
    description: service.metaDescription,
  }
}

// Generate static paths for all services
export async function generateStaticParams() {
  return servicesData.map((service) => ({
    slug: service.slug,
  }))
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = servicesData.find((service) => service.slug === params.slug)

  // If service not found, return 404
  if (!service) {
    notFound()
  }

  return <ServicePageClient params={params} />
}

