"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Download,
  Eye,
  FileText,
  Phone,
  Mail,
  MapPin,
  Calendar,
  User,
  CreditCard,
  Clock,
} from "lucide-react"

interface CustomerDetailsProps {
  customerId: string
  onBack: () => void
}

export function CustomerDetails({ customerId, onBack }: CustomerDetailsProps) {
  const [customer] = useState({
    id: "CUST001",
    name: "Rajesh Kumar",
    email: "rajesh.kumar@email.com",
    phone: "+91 9876543210",
    address: "123 Business District, Mumbai, Maharashtra 400001",
    registrationDate: "2024-12-15",
    status: "Active",
    totalServices: 3,
    totalPaid: "₹45,000",
    services: [
      {
        id: "SRV001",
        name: "Company Registration",
        status: "Completed",
        date: "2024-12-20",
        amount: "₹15,000",
        documents: ["Certificate of Incorporation", "MOA", "AOA"],
      },
      {
        id: "SRV002",
        name: "GST Registration",
        status: "In Progress",
        date: "2025-01-05",
        amount: "₹5,000",
        documents: ["GST Application Form", "Address Proof", "Bank Statement"],
      },
      {
        id: "SRV003",
        name: "Trademark Registration",
        status: "Under Review",
        date: "2025-01-10",
        amount: "₹25,000",
        documents: ["Trademark Application", "Logo Design", "Class Specification"],
      },
    ],
    documents: [
      {
        id: "DOC001",
        name: "PAN Card",
        type: "Identity Proof",
        uploadDate: "2024-12-15",
        status: "Verified",
        url: "/placeholder.svg?height=200&width=300&text=PAN+Card",
      },
      {
        id: "DOC002",
        name: "Aadhaar Card",
        type: "Identity Proof",
        uploadDate: "2024-12-15",
        status: "Verified",
        url: "/placeholder.svg?height=200&width=300&text=Aadhaar+Card",
      },
      {
        id: "DOC003",
        name: "Address Proof",
        type: "Address Verification",
        uploadDate: "2024-12-16",
        status: "Verified",
        url: "/placeholder.svg?height=200&width=300&text=Address+Proof",
      },
      {
        id: "DOC004",
        name: "Bank Statement",
        type: "Financial Document",
        uploadDate: "2024-12-18",
        status: "Pending Review",
        url: "/placeholder.svg?height=200&width=300&text=Bank+Statement",
      },
      {
        id: "DOC005",
        name: "Business Plan",
        type: "Business Document",
        uploadDate: "2025-01-05",
        status: "Verified",
        url: "/placeholder.svg?height=200&width=300&text=Business+Plan",
      },
    ],
    communications: [
      {
        id: "COMM001",
        type: "Email",
        subject: "Company Registration Status Update",
        date: "2025-01-14",
        status: "Sent",
        content: "Your company registration has been completed successfully.",
      },
      {
        id: "COMM002",
        type: "Phone Call",
        subject: "GST Registration Discussion",
        date: "2025-01-12",
        status: "Completed",
        content: "Discussed GST registration requirements and documentation.",
      },
      {
        id: "COMM003",
        type: "Meeting",
        subject: "Trademark Consultation",
        date: "2025-01-10",
        status: "Scheduled",
        content: "In-person meeting to discuss trademark registration process.",
      },
    ],
  })

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "in progress":
        return "bg-blue-100 text-blue-800"
      case "under review":
        return "bg-yellow-100 text-yellow-800"
      case "verified":
        return "bg-green-100 text-green-800"
      case "pending review":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Customers
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{customer.name}</h1>
            <p className="text-gray-600">Customer ID: {customer.id}</p>
          </div>
        </div>
        <Badge className={getStatusColor(customer.status)}>{customer.status}</Badge>
      </div>

      {/* Customer Overview */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-teal-100 rounded-lg">
                <User className="w-5 h-5 text-teal-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Services</p>
                <p className="text-2xl font-bold">{customer.totalServices}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CreditCard className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Paid</p>
                <p className="text-2xl font-bold">{customer.totalPaid}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Member Since</p>
                <p className="text-2xl font-bold">{customer.registrationDate.split("-")[0]}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <FileText className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Documents</p>
                <p className="text-2xl font-bold">{customer.documents.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium">{customer.email}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="font-medium">{customer.phone}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Address</p>
                <p className="font-medium">{customer.address}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Tabs */}
      <Tabs defaultValue="services" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="communications">Communications</TabsTrigger>
        </TabsList>

        <TabsContent value="services" className="space-y-4">
          {customer.services.map((service) => (
            <Card key={service.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">{service.name}</h3>
                    <p className="text-sm text-gray-600">Service ID: {service.id}</p>
                    <p className="text-sm text-gray-600">Date: {service.date}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {service.documents.map((doc, index) => (
                        <Badge key={index} variant="outline">
                          {doc}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="text-right space-y-2">
                    <Badge className={getStatusColor(service.status)}>{service.status}</Badge>
                    <p className="text-lg font-bold">{service.amount}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {customer.documents.map((document) => (
              <Card key={document.id}>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-12 h-12 text-gray-400" />
                    </div>
                    <div>
                      <h4 className="font-medium">{document.name}</h4>
                      <p className="text-sm text-gray-600">{document.type}</p>
                      <p className="text-xs text-gray-500">Uploaded: {document.uploadDate}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge className={getStatusColor(document.status)}>{document.status}</Badge>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="communications" className="space-y-4">
          {customer.communications.map((comm) => (
            <Card key={comm.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">{comm.type}</Badge>
                      <h4 className="font-medium">{comm.subject}</h4>
                    </div>
                    <p className="text-sm text-gray-600">{comm.content}</p>
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      <span>{comm.date}</span>
                    </div>
                  </div>
                  <Badge className={getStatusColor(comm.status)}>{comm.status}</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
