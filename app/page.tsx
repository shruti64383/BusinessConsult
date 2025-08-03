import HeroSection from "@/components/hero-section"
import ImageCarousel from "@/components/image-carousel"
import UpdatesSection from "@/components/updates-section"
import FeaturedServices from "@/components/featured-services"
import ServicesSection from "@/components/services-section"
import StatsSection from "@/components/stats-section"
import TestimonialsSection from "@/components/testimonials-section"
import ContactSection from "@/components/contact-form"

export default function Home() {
  return (
    <div className="min-h-screen">
      <ImageCarousel />
      {/* <HeroSection /> */}
      <UpdatesSection />
      <FeaturedServices />
      <ServicesSection />
      <StatsSection />
      <TestimonialsSection />
      <ContactSection/>
    </div>
  )
}

