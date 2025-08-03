"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { Search, Trash2, CheckCircle, Eye, Loader2, X, FileText } from "lucide-react"
import { CustomerDetails } from "./customer-details"
import { Badge } from "@/components/ui/badge"
import { ServiceManagement } from "./service-management"

export function Customers() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null)
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const { toast } = useToast()
  const [editingPriority, setEditingPriority] = useState<string | null>(null)
  const [managingServices, setManagingServices] = useState<string | null>(null)

  useEffect(() => {
    fetchCustomers()
  }, [])

  const fetchCustomers = async () => {
    try {
      setLoading(true)

      try {
        const response = await fetch("/api/customers")
        if (response.ok && response.headers.get("content-type")?.includes("application/json")) {
          const data = await response.json()
          setCustomers(data)
        } else {
          throw new Error("API not available")
        }
      } catch (apiError) {
        console.log("Customers API not available, using mock data")
        setCustomers(getMockCustomers())
      }
    } catch (error) {
      console.error("Error fetching customers:", error)
      setCustomers(getMockCustomers())
      toast({
        title: "Info",
        description: "Using demo data. Connect to database for real data.",
      })
    } finally {
      setLoading(false)
    }
  }

  const getMockCustomers = () => [
    {
      id: "CUST001",
      name: "Rajesh Kumar",
      phone: "9876543210",
      email: "rajesh.kumar@email.com",
      date: "2024-12-15 10:30:00",
      status: "active",
      priority: "high",
      services: ["Company Registration", "GST Registration"],
      totalSpent: "₹20,000",
      lastService: "GST Registration",
    },
    {
      id: "CUST002",
      name: "Priya Sharma",
      phone: "9876543211",
      email: "priya.sharma@email.com",
      date: "2024-12-18 14:20:00",
      status: "active",
      priority: "medium",
      services: ["Trademark Registration"],
      totalSpent: "₹25,000",
      lastService: "Trademark Registration",
    },
    {
      id: "CUST003",
      name: "Amit Patel",
      phone: "9876543212",
      email: "amit.patel@email.com",
      date: "2024-12-20 09:15:00",
      status: "active",
      priority: "low",
      services: ["Company Registration", "Legal Documentation"],
      totalSpent: "₹35,000",
      lastService: "Legal Documentation",
    },
  ]

  const handlePriorityChange = async (customerId: string, newPriority: string) => {
    try {
      setActionLoading(customerId)
      const response = await fetch(`/api/customers/${customerId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ priority: newPriority }),
      })

      if (response.ok) {
        setCustomers(
          customers.map((customer) => (customer.id === customerId ? { ...customer, priority: newPriority } : customer)),
        )
        toast({
          title: "Success",
          description: `Customer priority updated to ${newPriority}.`,
        })
      } else {
        throw new Error("Failed to update priority")
      }
    } catch (error) {
      console.error("Error updating priority:", error)
      toast({
        title: "Error",
        description: "Failed to update priority. Please try again.",
        variant: "destructive",
      })
    } finally {
      setActionLoading(null)
      setEditingPriority(null)
    }
  }

  const handleSave = async (customerId: string) => {
    try {
      setActionLoading(customerId)
      const response = await fetch(`/api/customers/${customerId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(customers.find((c) => c.id === customerId)),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Customer data saved successfully.",
        })
      } else {
        throw new Error("Failed to save customer")
      }
    } catch (error) {
      console.error("Error saving customer:", error)
      toast({
        title: "Error",
        description: "Failed to save customer data. Please try again.",
        variant: "destructive",
      })
    } finally {
      setActionLoading(null)
    }
  }

  const handleDelete = async (customerId: string) => {
    try {
      setActionLoading(customerId)
      const response = await fetch(`/api/customers/${customerId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setCustomers(customers.filter((customer) => customer.id !== customerId))
        toast({
          title: "Success",
          description: "Customer deleted successfully.",
        })
      } else {
        throw new Error("Failed to delete customer")
      }
    } catch (error) {
      console.error("Error deleting customer:", error)
      toast({
        title: "Error",
        description: "Failed to delete customer. Please try again.",
        variant: "destructive",
      })
    } finally {
      setActionLoading(null)
    }
  }

  const handleStatusToggle = async (customerId: string) => {
    try {
      setActionLoading(customerId)
      const customer = customers.find((c) => c.id === customerId)
      const newStatus = customer.status === "active" ? "inactive" : "active"

      const response = await fetch(`/api/customers/${customerId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      })

      if (response.ok) {
        setCustomers(
          customers.map((customer) => (customer.id === customerId ? { ...customer, status: newStatus } : customer)),
        )
        toast({
          title: "Success",
          description: `Customer status updated to ${newStatus}.`,
        })
      } else {
        throw new Error("Failed to update customer status")
      }
    } catch (error) {
      console.error("Error updating customer status:", error)
      toast({
        title: "Error",
        description: "Failed to update customer status. Please try again.",
        variant: "destructive",
      })
    } finally {
      setActionLoading(null)
    }
  }

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm),
  )

  if (managingServices) {
    const customer = customers.find((c) => c.id === managingServices)
    return (
      <ServiceManagement
        customerId={managingServices}
        customerName={customer?.name || "Unknown Customer"}
        onBack={() => setManagingServices(null)}
      />
    )
  }

  if (selectedCustomer) {
    return <CustomerDetails customerId={selectedCustomer} onBack={() => setSelectedCustomer(null)} />
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Customers List</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <Button className="bg-green-600 hover:bg-green-700" onClick={fetchCustomers}>
            Refresh
          </Button>
          <Button variant="outline">Back</Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-4 px-6 font-medium text-gray-600">S.N</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-600">User ID</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-600">Person Name</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-600">Phone Number</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-600">Date</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-600">Status</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-600">Priority</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-600">Services</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-600">Total Spent</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer, index) => (
                  <tr key={customer.id} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-6">{index + 1}</td>
                    <td className="py-4 px-6 font-medium">{customer.id}</td>
                    <td className="py-4 px-6">{customer.name || "N/A"}</td>
                    <td className="py-4 px-6">{customer.phone}</td>
                    <td className="py-4 px-6 text-sm text-gray-600">
                      {customer.date.split(" ")[0]}
                      <br />
                      <span className="text-xs">{customer.date.split(" ")[1]}</span>
                    </td>
                    <td className="py-4 px-6">
                      <Switch
                        checked={customer.status === "active"}
                        onCheckedChange={() => handleStatusToggle(customer.id)}
                        disabled={actionLoading === customer.id}
                        className="data-[state=checked]:bg-blue-600"
                      />
                    </td>
                    <td className="py-4 px-6">
                      {editingPriority === customer.id ? (
                        <div className="flex items-center space-x-2">
                          <select
                            value={customer.priority || "medium"}
                            onChange={(e) => handlePriorityChange(customer.id, e.target.value)}
                            className="px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            disabled={actionLoading === customer.id}
                          >
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                          </select>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setEditingPriority(null)}
                            className="h-6 w-6 p-0"
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <Badge
                            className={`cursor-pointer ${
                              customer.priority === "high"
                                ? "bg-red-100 text-red-800 hover:bg-red-200"
                                : customer.priority === "medium"
                                  ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                                  : "bg-green-100 text-green-800 hover:bg-green-200"
                            }`}
                            onClick={() => setEditingPriority(customer.id)}
                          >
                            {customer.priority || "medium"}
                          </Badge>
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-6">{customer.services?.length || 0}</td>
                    <td className="py-4 px-6 font-medium">{customer.totalSpent}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm" onClick={() => setSelectedCustomer(customer.id)}>
                          <Eye className="w-4 h-4 mr-1" />
                          View Details
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setManagingServices(customer.id)}
                          className="bg-blue-50 hover:bg-blue-100"
                        >
                          <FileText className="w-4 h-4 mr-1" />
                          Manage Services
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleSave(customer.id)}
                          disabled={actionLoading === customer.id}
                        >
                          {actionLoading === customer.id ? <Loader2 className="w-4 h-4 mr-1 animate-spin" /> : "Save"}
                        </Button>
                        <Button variant="ghost" size="sm" className="text-green-600">
                          <CheckCircle className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600"
                          onClick={() => handleDelete(customer.id)}
                          disabled={actionLoading === customer.id}
                        >
                          {actionLoading === customer.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
