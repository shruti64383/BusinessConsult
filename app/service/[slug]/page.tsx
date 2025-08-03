import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check, Clock, FileText, HelpCircle, Star, ChevronRight } from "lucide-react";
import ServiceForm from "@/components/service-form";

import type { Metadata } from "next";
import { servicesData } from "@/lib/services-data";
import DefaultServicePage from "../default/[slug]/ServicePageClient";
import Style1ServicePage from "../style1/[slug]/ServicePageClient";
import Style2ServicePage from "../style2/[slug]/ServicePageClient";
import Style3ServicePage from "../style3/[slug]/ServicePageStyle3Client";

// Generate metadata for the page
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  // Wait for params to be available
  const { slug } = await params;

  // Find the matching service
  const service = servicesData.find((service) => service.slug === slug);

  if (!service) {
    return {
      title: "Service Not Found",
      description: "The requested service could not be found.",
    };
  }

  return {
    title: service.metaTitle,
    description: service.metaDescription,
  };
}

// Generate static paths for all services
export async function generateStaticParams() {
  return servicesData.map((service) => ({
    slug: service.slug,
  }));
}

// This function assigns a specific style to each service category
function getServiceStyle(slug: string): string {
  // Business Registration services use default style
  if (
    slug === "business-registration" ||
    slug === "private-limited" ||
    slug === "llp" ||
    slug === "opc" ||
    slug === "partnership" ||
    slug === "sole-proprietorship" ||
    slug === "msme" ||
    slug === "startup-india" ||
    slug === "section-8"
  ) {
    return "default";
  }

  // Tax & Compliance services use style1
  else if (
    slug === "tax-compliance" ||
    slug === "gst-registration" ||
    slug === "tan-registration" ||
    slug === "pan-application" ||
    slug === "tds-return" ||
    slug === "gst-return-filing" ||
    slug === "income-tax-return" ||
    slug === "business-itr" ||
    slug === "individual-itr" ||
    slug === "annual-compliance" ||
    slug === "roc-filing" ||
    slug === "accounting"
  ) {
    return "style1";
  }

  // Trademark & IP services use style2
  else if (
    slug === "trademark-ip" ||
    slug === "trademark-registration" ||
    slug === "trademark-renewal" ||
    slug === "trademark-objection" ||
    slug === "international-trademark" ||
    slug === "copyright-registration" ||
    slug === "software-copyright" ||
    slug === "literary-copyright" ||
    slug === "artistic-copyright" ||
    slug === "patent-search" ||
    slug === "patent-registration" ||
    slug === "patent-drafting" ||
    slug === "international-patent"
  ) {
    return "style2";
  }

  // Licenses and Legal services use style3
  else if (
    slug === "licenses" ||
    slug === "shop-establishment" ||
    slug === "fssai" ||
    slug === "trade-license" ||
    slug === "msme-license" ||
    slug === "iec" ||
    slug === "drug-license" ||
    slug === "ayush-license" ||
    slug === "esi-registration" ||
    slug === "dsc" ||
    slug === "iso" ||
    slug === "bis" ||
    slug === "udyam" ||
    slug === "legal-services" ||
    slug === "nda" ||
    slug === "employment-agreement" ||
    slug === "partnership-deed" ||
    slug === "llp-agreement" ||
    slug === "legal-notice" ||
    slug === "legal-documentation"
  ) {
    return "style3";
  }

  // Default fallback
  return "default";
}

export default async function ServicePage({ params }: { params: { slug: string } }) {
  const resolvedParams = await Promise.resolve(params);
  //console.log("ServicePage params:", resolvedParams);

  const service = servicesData.find((service) => service.slug === resolvedParams.slug);
  //console.log("ServicePage service:", service);

  if (!service) { 
    notFound();
  }

  const style = getServiceStyle(resolvedParams.slug);
  //console.log("ServicePage style:", style);

  // Convert URL slug to readable format
  const serviceName = resolvedParams.slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  // Render the appropriate component based on style
  if (style === "style1") {
    return <Style1ServicePage params={resolvedParams} />;
  } else if (style === "style2") {
    return <Style2ServicePage params={resolvedParams} />;
  } else if (style === "style3") {
    return <Style3ServicePage params={resolvedParams} />;
  } else {
    // Default behavior (renders the content from [service]/page.tsx)
    return (
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-10 md:py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center text-sm text-gray-600 mb-4">
                  <Link href="/" className="hover:text-primary">
                    Home
                  </Link>
                  <ChevronRight className="h-4 w-4 mx-1" />
                  <Link href="/services" className="hover:text-primary">
                    Services
                  </Link>
                  <ChevronRight className="h-4 w-4 mx-1" />
                  <span className="text-primary">{serviceName}</span>
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
                  {serviceName} Services
                </h1>
                <p className="text-base md:text-lg text-gray-700 mb-6 max-w-xl">
                  Professional {serviceName.toLowerCase()} services to help your business grow and succeed. Our expert
                  team ensures compliance with all regulations and provides end-to-end support.
                </p>
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
                  <Button className="bg-primary hover:bg-primary/90 text-white">Get Started</Button>
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                    View Pricing
                  </Button>
                </div>
              </div>
              <div className="relative">
                <Image
                  src={`/placeholder.svg?height=400&width=500&text=${serviceName}`}
                  alt={serviceName}
                  width={500}
                  height={400}
                  className="rounded-lg shadow-xl"
                />
                <div className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 bg-white p-3 md:p-4 rounded-lg shadow-lg">
                  <div className="flex items-center gap-2">
                    <div className="bg-green-100 p-1.5 rounded-full">
                      <Check className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Expert Assistance</p>
                      <p className="text-xs text-gray-500">Professional support</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Content - Service Information */}
            <div className="lg:col-span-2">
              {/* Overview */}
              <section className="mb-10">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">{serviceName} Overview</h2>
                <p className="mb-4 text-gray-700">
                  Our {serviceName.toLowerCase()} service provides comprehensive support for businesses looking to
                  {resolvedParams.slug.includes("registration")
                    ? " register and comply with all regulatory requirements."
                    : resolvedParams.slug.includes("tax")
                      ? " manage their tax obligations efficiently and accurately."
                      : " ensure legal compliance and documentation is properly handled."}
                </p>
                <p className="mb-4 text-gray-700">
                  With our team of experienced professionals, we handle the entire process from start to finish, ensuring
                  that you can focus on running your business while we take care of the compliance aspects.
                </p>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mt-6">
                  <h3 className="font-bold text-lg mb-2">Key Benefits</h3>
                  <ul className="space-y-2">
                    {[
                      `Professional ${serviceName.toLowerCase()} assistance`,
                      "Expert guidance from qualified professionals",
                      "Timely completion to avoid penalties",
                      "Compliance with the latest regulations",
                      "Reduced risk of errors and discrepancies",
                      "Time and resource savings for your business",
                    ].map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              {/* Process */}
              <section className="mb-10">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Our {serviceName} Process</h2>
                <div className="space-y-6">
                  {[
                    {
                      title: "Initial Consultation",
                      description:
                        "We begin with a detailed consultation to understand your specific requirements and objectives.",
                    },
                    {
                      title: "Document Collection",
                      description:
                        "We guide you on the necessary documents and help you collect all required information.",
                    },
                    {
                      title: "Preparation & Verification",
                      description:
                        "Our experts prepare all required forms and applications, verifying information for accuracy.",
                    },
                    {
                      title: "Submission & Follow-up",
                      description:
                        "We submit the application to the relevant authorities and follow up regularly on the progress.",
                    },
                    {
                      title: "Completion & Delivery",
                      description:
                        "Once approved, we deliver all certificates and documents to you with guidance on next steps.",
                    },
                  ].map((step, index) => (
                    <div key={index} className="flex">
                      <div className="flex-shrink-0 mr-4">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-bold">
                          {index + 1}
                        </div>
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-1">{step.title}</h3>
                        <p className="text-gray-700">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* FAQs */}
              <section className="mb-10">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {[
                    {
                      question: `What is the process for ${serviceName.toLowerCase()}?`,
                      answer: `The ${serviceName.toLowerCase()} process involves initial consultation, document collection, preparation, submission to authorities, and follow-up until completion. Our team handles all these steps professionally.`,
                    },
                    {
                      question: `How long does the ${serviceName.toLowerCase()} process take?`,
                      answer: `The timeline varies depending on the complexity of your case and government processing times. Typically, it takes 2-4 weeks, but we always work to expedite the process wherever possible.`,
                    },
                    {
                      question: `What documents are required for ${serviceName.toLowerCase()}?`,
                      answer: `Required documents generally include identity proof, address proof, business details, and specific documents related to your industry. Our team will provide you with a comprehensive checklist during the initial consultation.`,
                    },
                    {
                      question: `What are the fees for ${serviceName.toLowerCase()} services?`,
                      answer: `Our fees depend on the complexity of your requirements and the specific service package you choose. We offer transparent pricing with no hidden charges. Contact us for a customized quote.`,
                    },
                    {
                      question: `Do I need to visit your office for ${serviceName.toLowerCase()} services?`,
                      answer: `No, our services are completely online. You can submit all documents electronically, and our team handles the entire process remotely. We'll keep you updated at every step via email and phone.`,
                    },
                  ].map((faq, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                      <h3 className="font-bold text-lg mb-2 flex items-start">
                        <HelpCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                        {faq.question}
                      </h3>
                      <p className="text-gray-700">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Right Sidebar - Service Form */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <ServiceForm service={serviceName} />

                <div className="mt-8 bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <h3 className="font-bold text-lg mb-4">Why Choose Us?</h3>
                  <ul className="space-y-3">
                    {[
                      "Team of experienced professionals",
                      "100% accuracy guarantee",
                      "Timely processing to avoid delays",
                      "Comprehensive documentation",
                      "Dedicated account manager",
                      "Regular status updates",
                      "Secure data handling",
                    ].map((reason, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 bg-primary/10 p-6 rounded-lg border border-primary/20">
                  <h3 className="font-bold text-lg mb-2">Need Help?</h3>
                  <p className="text-sm text-gray-700 mb-4">
                    Our experts are available to answer your questions and provide guidance.
                  </p>
                  <div className="flex items-center gap-4">
                    <Button className="bg-primary hover:bg-primary/90 w-full">Call Us</Button>
                    <Button variant="outline" className="border-primary text-primary hover:bg-primary/10 w-full">
                      WhatsApp
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}