import AnimatedServicesSection from "@/components/animated-services-section"

export const metadata = {
  title: "Our Services | Business Services",
  description: "Explore our comprehensive range of business services including registration, compliance, and more.",
}

export default function ServicesDemo() {
  return (
    <div className="min-h-screen">
      <div className="bg-primary text-white py-16 md:py-24 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-5xl font-bold mb-6">Our Services</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Comprehensive business solutions to help you start, manage, and grow your business
          </p>
        </div>
      </div>

      <AnimatedServicesSection />
    </div>
  )
}

