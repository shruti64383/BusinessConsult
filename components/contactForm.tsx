// "use client"

// import type React from "react"

// import { useState, useRef } from "react"
// import { X, Send, Loader2 } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { motion, AnimatePresence } from "framer-motion"
// import { useRouter } from "next/navigation"

// export default function ContactForm() {
//   const [isOpen, setIsOpen] = useState(false)
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     service: "",
//     message: "",
//   })
//   const formRef = useRef<HTMLDivElement>(null)
//   const router = useRouter()

//   const toggleForm = () => {
//     setIsOpen(!isOpen)
//   }

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({ ...prev, [name]: value }))
//   }

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     setIsSubmitting(true)

//     // Simulate form submission
//     setTimeout(() => {
//       console.log("Form submitted:", formData)
//       setIsSubmitting(false)
//       setIsOpen(false)
//       router.push("/thank-you")
//     }, 1000)
//   }

//   return (
//     <>
//       {/* Contact Form Button */}
//       <div className="fixed bottom-24 right-4 z-40">
//         <Button
//           onClick={toggleForm}
//           className="bg-primary hover:bg-primary/90 text-white rounded-full p-3 shadow-lg"
//           aria-label="Contact Us"
//         >
//           {isOpen ? <X className="h-5 w-5" /> : <Send className="h-5 w-5" />}
//         </Button>
//       </div>

//       {/* Contact Form Modal */}
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
//             onClick={() => setIsOpen(false)}
//           >
//             <motion.div
//               ref={formRef}
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//               transition={{ type: "spring", damping: 25, stiffness: 300 }}
//               className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <div className="p-5">
//                 <div className="flex justify-between items-center mb-4">
//                   <h2 className="text-xl font-bold text-gray-900 dark:text-white">Contact Us</h2>
//                   <button
//                     onClick={() => setIsOpen(false)}
//                     className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
//                   >
//                     <X className="h-5 w-5" />
//                   </button>
//                 </div>

//                 <form onSubmit={handleSubmit} className="space-y-4">
//                   <div>
//                     <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                       Your Name
//                     </label>
//                     <Input
//                       id="name"
//                       name="name"
//                       value={formData.name}
//                       onChange={handleChange}
//                       placeholder="Enter your full name"
//                       required
//                     />
//                   </div>

//                   <div>
//                     <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                       Email Address
//                     </label>
//                     <Input
//                       id="email"
//                       name="email"
//                       type="email"
//                       value={formData.email}
//                       onChange={handleChange}
//                       placeholder="Enter your email"
//                       required
//                     />
//                   </div>

//                   <div>
//                     <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                       Phone Number
//                     </label>
//                     <Input
//                       id="phone"
//                       name="phone"
//                       type="tel"
//                       value={formData.phone}
//                       onChange={handleChange}
//                       placeholder="Enter your phone number"
//                       required
//                     />
//                   </div>

//                   <div>
//                     <label
//                       htmlFor="service"
//                       className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
//                     >
//                       Service Interested In
//                     </label>
//                     <select
//                       id="service"
//                       name="service"
//                       value={formData.service}
//                       onChange={handleChange}
//                       className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder-gray-400 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
//                     >
//                       <option value="">Select a service</option>
//                       <option value="Company Registration">Company Registration</option>
//                       <option value="GST Registration">GST Registration</option>
//                       <option value="Trademark Registration">Trademark Registration</option>
//                       <option value="Income Tax Filing">Income Tax Filing</option>
//                       <option value="Legal Documentation">Legal Documentation</option>
//                       <option value="Other">Other</option>
//                     </select>
//                   </div>

//                   <div>
//                     <label
//                       htmlFor="message"
//                       className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
//                     >
//                       Message
//                     </label>
//                     <Textarea
//                       id="message"
//                       name="message"
//                       value={formData.message}
//                       onChange={handleChange}
//                       placeholder="Tell us about your requirements"
//                       rows={4}
//                     />
//                   </div>

//                   <Button
//                     type="submit"
//                     className="w-full bg-primary hover:bg-primary/90 text-white"
//                     disabled={isSubmitting}
//                   >
//                     {isSubmitting ? (
//                       <>
//                         <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                         Submitting...
//                       </>
//                     ) : (
//                       "Submit"
//                     )}
//                   </Button>
//                 </form>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   )
// }

