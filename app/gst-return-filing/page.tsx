import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Check, Clock, FileText, HelpCircle, Star, ChevronRight } from "lucide-react"
import ServiceForm from "@/components/service-form"

export default function GSTReturnFilingPage() {
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
                <span className="text-primary">GST Return Filing</span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
                GST Return Filing Services
              </h1>
              <p className="text-base md:text-lg text-gray-700 mb-6 max-w-xl">
                File your GST returns accurately and on time with our expert GST return filing services. Our team
                ensures compliance with all GST regulations and helps you avoid penalties.
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
                src="/placeholder.svg?height=400&width=500&text=GST Return Filing"
                alt="GST Return Filing"
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
                    <p className="text-xs text-gray-500">CA-assisted filing</p>
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
              <h2 className="text-2xl md:text-3xl font-bold mb-4">GST Return Filing Overview</h2>
              <p className="mb-4 text-gray-700">
                Goods and Services Tax (GST) is a comprehensive indirect tax levied on the supply of goods and services
                in India. All businesses registered under GST are required to file periodic returns. Our GST return
                filing service ensures that your business complies with all GST regulations and files returns accurately
                and on time.
              </p>
              <p className="mb-4 text-gray-700">
                Our team of experienced professionals handles the entire process of GST return filing, from data
                compilation to final submission, ensuring that you never miss a deadline and remain compliant with the
                latest GST regulations.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mt-6">
                <h3 className="font-bold text-lg mb-2">Key Benefits</h3>
                <ul className="space-y-2">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Types of GST Returns */}
            <section className="mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Types of GST Returns We Handle</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {gstReturnTypes.map((type, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                    <h3 className="font-bold text-lg mb-2">{type.name}</h3>
                    <p className="text-sm text-gray-700 mb-2">{type.description}</p>
                    <p className="text-sm">
                      <span className="font-medium">Due Date:</span> {type.dueDate}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Process */}
            <section className="mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Our GST Return Filing Process</h2>
              <div className="space-y-6">
                {process.map((step, index) => (
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

            {/* Pricing */}
            <section className="mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">GST Return Filing Pricing</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {pricingPlans.map((plan, index) => (
                  <div
                    key={index}
                    className={`bg-white rounded-lg border ${plan.popular ? "border-primary" : "border-gray-200"} shadow-sm overflow-hidden`}
                  >
                    {plan.popular && (
                      <div className="bg-primary text-white text-center py-1 text-sm font-medium">Most Popular</div>
                    )}
                    <div className="p-6">
                      <h3 className="font-bold text-xl mb-2">{plan.name}</h3>
                      <p className="text-gray-600 text-sm mb-4">{plan.description}</p>
                      <div className="mb-4">
                        <span className="text-3xl font-bold">₹{plan.price}</span>
                        <span className="text-gray-600 text-sm">/{plan.period}</span>
                      </div>
                      <ul className="space-y-2 mb-6">
                        {plan.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start text-sm">
                            <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button
                        className={`w-full ${plan.popular ? "bg-primary hover:bg-primary/90" : "bg-gray-800 hover:bg-gray-700"}`}
                      >
                        Select Plan
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQs */}
            <section className="mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
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
              <ServiceForm service="GST Return Filing" />

              <div className="mt-8 bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="font-bold text-lg mb-4">Why Choose Us?</h3>
                <ul className="space-y-3">
                  {whyChooseUs.map((reason, index) => (
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
                  Our GST experts are available to answer your questions and provide guidance.
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
  )
}

const benefits = [
  "Timely filing of GST returns to avoid penalties",
  "Expert assistance from qualified professionals",
  "Accurate reconciliation of input tax credits",
  "Compliance with the latest GST regulations",
  "Reduced risk of errors and discrepancies",
  "Time and resource savings for your business",
]

const gstReturnTypes = [
  {
    name: "GSTR-1",
    description: "Details of outward supplies of goods or services",
    dueDate: "11th of the following month",
  },
  {
    name: "GSTR-3B",
    description: "Monthly summary return with payment of tax",
    dueDate: "20th of the following month",
  },
  {
    name: "GSTR-4",
    description: "Return for taxpayers who have opted for composition scheme",
    dueDate: "18th of the month following the quarter",
  },
  {
    name: "GSTR-9",
    description: "Annual return for regular taxpayers",
    dueDate: "31st December of the following financial year",
  },
]

const process = [
  {
    title: "Data Collection",
    description:
      "We collect all necessary data including sales, purchases, and other financial transactions for the filing period.",
  },
  {
    title: "Data Verification",
    description: "Our experts verify the collected data for accuracy and completeness to ensure error-free filing.",
  },
  {
    title: "Reconciliation",
    description:
      "We reconcile your input tax credits with vendor data to maximize eligible credits and identify discrepancies.",
  },
  {
    title: "Return Preparation",
    description: "Based on the verified data, we prepare your GST returns in the required format.",
  },
  {
    title: "Review & Approval",
    description: "The prepared returns are reviewed by our GST experts and shared with you for final approval.",
  },
  {
    title: "Filing & Confirmation",
    description: "After your approval, we file the returns on the GST portal and provide you with filing confirmation.",
  },
]

const pricingPlans = [
  {
    name: "Basic",
    description: "For small businesses with minimal transactions",
    price: "1,999",
    period: "month",
    popular: false,
    features: [
      "GSTR-1 & GSTR-3B Filing",
      "Up to 100 transactions",
      "Basic reconciliation",
      "Email support",
      "Monthly compliance report",
    ],
  },
  {
    name: "Standard",
    description: "For growing businesses with moderate transactions",
    price: "3,499",
    period: "month",
    popular: true,
    features: [
      "GSTR-1 & GSTR-3B Filing",
      "Up to 500 transactions",
      "Advanced reconciliation",
      "Priority email & phone support",
      "Monthly compliance report",
      "Quarterly review meeting",
    ],
  },
  {
    name: "Premium",
    description: "For established businesses with complex requirements",
    price: "5,999",
    period: "month",
    popular: false,
    features: [
      "All GST Returns Filing",
      "Unlimited transactions",
      "Comprehensive reconciliation",
      "Dedicated account manager",
      "Monthly compliance report",
      "Monthly review meeting",
      "GST audit assistance",
    ],
  },
]

const faqs = [
  {
    question: "What is GST Return Filing?",
    answer:
      "GST Return Filing is the process of submitting details of your business's sales, purchases, and tax payments to the government through the GST portal. It's a mandatory compliance requirement for all GST-registered businesses in India.",
  },
  {
    question: "How often do I need to file GST returns?",
    answer:
      "The frequency depends on your business type. Regular taxpayers need to file GSTR-1 and GSTR-3B monthly. Composition scheme taxpayers file quarterly returns. Annual returns (GSTR-9) are filed once a year.",
  },
  {
    question: "What happens if I miss the GST filing deadline?",
    answer:
      "Missing the deadline results in late fees of ₹50-₹200 per day until you file the return. Additionally, you may face interest charges on any tax liability and potential restrictions on issuing tax invoices.",
  },
  {
    question: "What documents do I need to provide for GST return filing?",
    answer:
      "You'll need to provide sales invoices, purchase invoices, credit/debit notes, e-way bills, previous return copies, and bank statements for the filing period.",
  },
  {
    question: "Can I claim input tax credit for previous periods?",
    answer:
      "Yes, you can claim unclaimed input tax credit from previous periods, but there are time limitations. Generally, you can claim ITC up to the due date of filing the return for September of the following financial year.",
  },
]

const whyChooseUs = [
  "Team of experienced CA professionals",
  "100% accuracy guarantee",
  "Timely filing to avoid penalties",
  "Comprehensive reconciliation",
  "Dedicated account manager",
  "Regular compliance updates",
  "Secure data handling",
]

