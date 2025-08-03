"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import {
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  FileText,
  IndianRupee,
  Clock,
  CheckCircle,
  AlertCircle,
  Upload,
} from "lucide-react"

interface ServiceManagementProps {
  customerId: string
  customerName: string
  onBack: () => void
}

export function ServiceManagement({ customerId, customerName, onBack }: ServiceManagementProps) {
  const [services, setServices] = useState([
    {
      id: "SRV001",
      name: "Company Registration",
      price: 15000,
      status: "completed",
      startDate: "2024-12-15",
      completedDate: "2024-12-25",
      description: "Private Limited Company registration with all legal documentation",
      requiredDocuments: [
        "PAN Card of Directors",
        "Aadhaar Card of Directors",
        "Address Proof",
        "Bank Statement",
        "Passport Size Photos",
      ],
      certificates: [
        "Certificate of Incorporation",
        "Memorandum of Association (MOA)",
        "Articles of Association (AOA)",
        "PAN Card of Company",
        "TAN Certificate",
      ],
      uploadedDocuments: [
        { name: "PAN Card - Director 1", status: "verified", uploadDate: "2024-12-15" },
        { name: "Aadhaar Card - Director 1", status: "verified", uploadDate: "2024-12-15" },
        { name: "Address Proof", status: "verified", uploadDate: "2024-12-16" },
      ],
    },
    {
      id: "SRV002",
      name: "GST Registration",
      price: 5000,
      status: "in_progress",
      startDate: "2025-01-05",
      description: "GST registration and compliance setup",
      requiredDocuments: [
        "Company Registration Certificate",
        "Bank Account Details",
        "Address Proof of Business",
        "Identity Proof of Authorized Signatory",
      ],
      certificates: ["GST Registration Certificate", "GST Login Credentials"],
      uploadedDocuments: [
        { name: "Company Certificate", status: "verified", uploadDate: "2025-01-05" },
        { name: "Bank Details", status: "pending", uploadDate: "2025-01-06" },
      ],
    },
  ])

  const [showAddForm, setShowAddForm] = useState(false)
  const [editingService, setEditingService] = useState<string | null>(null)
  const [newService, setNewService] = useState({
    name: "",
    price: 0,
    description: "",
    requiredDocuments: [""],
    certificates: [""],
    status: "not_started",
  })

  const { toast } = useToast()

  const handleAddService = () => {
    const service = {
      id: `SRV${String(services.length + 1).padStart(3, "0")}`,
      ...newService,
      startDate: new Date().toISOString().split("T")[0],
      requiredDocuments: newService.requiredDocuments.filter((doc) => doc.trim() !== ""),
      certificates: newService.certificates.filter((cert) => cert.trim() !== ""),
      uploadedDocuments: [],
    }

    setServices([...services, service])
    setNewService({
      name: "",
      price: 0,
      description: "",
      requiredDocuments: [""],
      certificates: [""],
      status: "not_started",
    })
    setShowAddForm(false)

    toast({
      title: "Success",
      description: "Service added successfully!",
    })
  }

  const handleUpdateServiceStatus = (serviceId: string, newStatus: string) => {
    setServices(
      services.map((service) => {
        if (service.id === serviceId) {
          const updatedService = { ...service, status: newStatus }
          if (newStatus === "completed" && !service.completedDate) {
            updatedService.completedDate = new Date().toISOString().split("T")[0]
          }
          return updatedService
        }
        return service
      }),
    )

    toast({
      title: "Success",
      description: `Service status updated to ${newStatus.replace("_", " ")}`,
    })
  }

  const handleDeleteService = (serviceId: string) => {
    setServices(services.filter((service) => service.id !== serviceId))
    toast({
      title: "Success",
      description: "Service deleted successfully",
    })
  }

  const addDocumentField = (type: "requiredDocuments" | "certificates") => {
    setNewService({
      ...newService,
      [type]: [...newService[type], ""],
    })
  }

  const updateDocumentField = (type: "requiredDocuments" | "certificates", index: number, value: string) => {
    const updated = [...newService[type]]
    updated[index] = value
    setNewService({
      ...newService,
      [type]: updated,
    })
  }

  const removeDocumentField = (type: "requiredDocuments" | "certificates", index: number) => {
    setNewService({
      ...newService,
      [type]: newService[type].filter((_, i) => i !== index),
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "in_progress":
        return "bg-blue-100 text-blue-800"
      case "under_review":
        return "bg-yellow-100 text-yellow-800"
      case "not_started":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4" />
      case "in_progress":
        return <Clock className="w-4 h-4" />
      case "under_review":
        return <AlertCircle className="w-4 h-4" />
      default:
        return <FileText className="w-4 h-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Button variant="outline" onClick={onBack} className="mb-4 bg-transparent">
            ← Back to Customers
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">Service Management</h1>
          <p className="text-gray-600">
            Customer: {customerName} (ID: {customerId})
          </p>
        </div>
        <Button onClick={() => setShowAddForm(true)} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Add New Service
        </Button>
      </div>

      {/* Service Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{services.length}</p>
              <p className="text-sm text-gray-600">Total Services</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {services.filter((s) => s.status === "completed").length}
              </p>
              <p className="text-sm text-gray-600">Completed</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">
                {services.filter((s) => s.status === "in_progress").length}
              </p>
              <p className="text-sm text-gray-600">In Progress</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-indigo-600">
                ₹{services.reduce((total, service) => total + service.price, 0).toLocaleString()}
              </p>
              <p className="text-sm text-gray-600">Total Value</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add Service Form */}
      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Service</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="serviceName">Service Name</Label>
                <Input
                  id="serviceName"
                  value={newService.name}
                  onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                  placeholder="Enter service name"
                />
              </div>
              <div>
                <Label htmlFor="price">Price (₹)</Label>
                <Input
                  id="price"
                  type="number"
                  value={newService.price}
                  onChange={(e) => setNewService({ ...newService, price: Number.parseInt(e.target.value) || 0 })}
                  placeholder="Enter price"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Service Description</Label>
              <Textarea
                id="description"
                value={newService.description}
                onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                placeholder="Describe the service details"
                rows={3}
              />
            </div>

            <div>
              <Label>Required Documents</Label>
              {newService.requiredDocuments.map((doc, index) => (
                <div key={index} className="flex items-center space-x-2 mt-2">
                  <Input
                    value={doc}
                    onChange={(e) => updateDocumentField("requiredDocuments", index, e.target.value)}
                    placeholder="Enter required document"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeDocumentField("requiredDocuments", index)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => addDocumentField("requiredDocuments")}
                className="mt-2"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Document
              </Button>
            </div>

            <div>
              <Label>Certificates/Deliverables</Label>
              {newService.certificates.map((cert, index) => (
                <div key={index} className="flex items-center space-x-2 mt-2">
                  <Input
                    value={cert}
                    onChange={(e) => updateDocumentField("certificates", index, e.target.value)}
                    placeholder="Enter certificate/deliverable"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeDocumentField("certificates", index)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => addDocumentField("certificates")}
                className="mt-2"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Certificate
              </Button>
            </div>

            <div className="flex items-center space-x-2 pt-4">
              <Button onClick={handleAddService} className="bg-green-600 hover:bg-green-700">
                <Save className="w-4 h-4 mr-2" />
                Add Service
              </Button>
              <Button variant="outline" onClick={() => setShowAddForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Services List */}
      <div className="space-y-6">
        {services.map((service) => (
          <Card key={service.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{service.name}</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">Service ID: {service.id}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getStatusColor(service.status)}>
                    {getStatusIcon(service.status)}
                    <span className="ml-1">{service.status.replace("_", " ")}</span>
                  </Badge>
                  <div className="flex items-center text-green-600 font-semibold">
                    <IndianRupee className="w-4 h-4" />
                    {service.price.toLocaleString()}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-700">Description:</p>
                <p className="text-sm text-gray-600">{service.description}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Required Documents:</p>
                  <div className="space-y-1">
                    {service.requiredDocuments.map((doc, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <FileText className="w-3 h-3 text-gray-400" />
                        <span className="text-sm text-gray-600">{doc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Certificates/Deliverables:</p>
                  <div className="space-y-1">
                    {service.certificates.map((cert, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className="w-3 h-3 text-green-500" />
                        <span className="text-sm text-gray-600">{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Document Upload Status */}
              {service.uploadedDocuments && service.uploadedDocuments.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Uploaded Documents:</p>
                  <div className="space-y-2">
                    {service.uploadedDocuments.map((doc, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <div className="flex items-center space-x-2">
                          <Upload className="w-4 h-4 text-gray-400" />
                          <span className="text-sm">{doc.name}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge
                            className={
                              doc.status === "verified"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }
                          >
                            {doc.status}
                          </Badge>
                          <span className="text-xs text-gray-500">{doc.uploadDate}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Service Timeline */}
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div>
                  <span className="font-medium">Started:</span> {service.startDate}
                </div>
                {service.completedDate && (
                  <div>
                    <span className="font-medium">Completed:</span> {service.completedDate}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Status:</span>
                  <select
                    value={service.status}
                    onChange={(e) => handleUpdateServiceStatus(service.id, e.target.value)}
                    className="px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="not_started">Not Started</option>
                    <option value="in_progress">In Progress</option>
                    <option value="under_review">Under Review</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>

                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Service
                  </Button>
                  <Button variant="outline" size="sm">
                    <Upload className="w-4 h-4 mr-2" />
                    Manage Documents
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:text-red-700 bg-transparent"
                    onClick={() => handleDeleteService(service.id)}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Instructions */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-900">📋 Service Management Guide</CardTitle>
        </CardHeader>
        <CardContent className="text-blue-800 space-y-2">
          <p>
            <strong>Add Service:</strong> Click "Add New Service" to create custom services with pricing
          </p>
          <p>
            <strong>Set Price:</strong> Define service cost in rupees
          </p>
          <p>
            <strong>Required Documents:</strong> List all documents customer needs to provide
          </p>
          <p>
            <strong>Certificates:</strong> Specify what deliverables customer will receive
          </p>
          <p>
            <strong>Status Management:</strong> Track progress from Not Started → In Progress → Under Review → Completed
          </p>
          <p>
            <strong>Document Tracking:</strong> Monitor uploaded documents and verification status
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
