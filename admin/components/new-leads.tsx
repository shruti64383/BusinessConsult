"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Search, Eye, Trash2, Phone, Mail, Calendar, Loader2, X, Edit } from "lucide-react"

export function NewLeads() {
  const [searchTerm, setSearchTerm] = useState("")
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const [editingPriority, setEditingPriority] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    fetchLeads()
  }, [])

  const fetchLeads = async () => {
    try {
      setLoading(true)

      try {
        const response = await fetch("/api/leads")
        if (response.ok && response.headers.get("content-type")?.includes("application/json")) {
          const data = await response.json()
          setLeads(data)
        } else {
          throw new Error("API not available")
        }
      } catch (apiError) {
        console.log("Leads API not available, using mock data")
        setLeads(getMockLeads())
      }
    } catch (error) {
      console.error("Error fetching leads:", error)
      setLeads(getMockLeads())
      toast({
        title: "Info",
        description: "Using demo data. Connect to database for real data.",
      })
    } finally {
      setLoading(false)
    }
  }

  const getMockLeads = () => [
    {
      id: "LEAD001",
      name: "Rohit Gupta",
      email: "rohit.gupta@email.com",
      phone: "+91 9876543210",
      service: "Company Registration",
      budget: "₹10,000 - ₹20,000",
      message:
        "I want to register my startup as a Private Limited Company. Need complete assistance with documentation.",
      date: "2025-01-15",
      status: "new",
      priority: "medium", // Default priority, admin can change
      businessType: "Technology Startup",
    },
    {
      id: "LEAD002",
      name: "Sunita Mehta",
      email: "sunita.mehta@email.com",
      phone: "+91 9876543211",
      service: "GST Registration",
      budget: "₹3,000 - ₹5,000",
      message: "Need GST registration for my retail business. Already have company registration.",
      date: "2025-01-14",
      status: "contacted",
      priority: "low", // Default priority, admin can change
      businessType: "Retail",
    },
    {
      id: "LEAD003",
      name: "Vikram Singh",
      email: "vikram.singh@email.com",
      phone: "+91 9876543212",
      service: "Trademark Registration",
      budget: "₹20,000 - ₹30,000",
      message: "Want to register trademark for my brand name and logo. Need complete trademark search and filing.",
      date: "2025-01-13",
      status: "new",
      priority: "medium", // Default priority, admin can change
      businessType: "Manufacturing",
    },
    {
      id: "LEAD004",
      name: "Anita Desai",
      email: "anita.desai@email.com",
      phone: "+91 9876543214",
      service: "Legal Documentation",
      budget: "₹8,000 - ₹15,000",
      message: "Need help with partnership deed and other legal documents for my consulting business.",
      date: "2025-01-16",
      status: "new",
      priority: "medium", // Default priority, admin can change
      businessType: "Consulting",
    },
  ]

  const handlePriorityChange = async (leadId: string, newPriority: string) => {
    try {
      setActionLoading(leadId)
      const response = await fetch(`/api/leads/${leadId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ priority: newPriority }),
      })

      if (response.ok) {
        setLeads(leads.map((lead) => (lead.id === leadId ? { ...lead, priority: newPriority } : lead)))
        toast({
          title: "Success",
          description: `Lead priority updated to ${newPriority}.`,
        })
      } else {
        throw new Error("Failed to update priority")
      }
    } catch (error) {
      console.error("Error updating priority:", error)
      // Update locally even if API fails (for demo purposes)
      setLeads(leads.map((lead) => (lead.id === leadId ? { ...lead, priority: newPriority } : lead)))
      toast({
        title: "Updated",
        description: `Lead priority updated to ${newPriority} (demo mode).`,
      })
    } finally {
      setActionLoading(null)
      setEditingPriority(null)
    }
  }

  const handleDelete = async (leadId: string) => {
    try {
      setActionLoading(leadId)
      const response = await fetch(`/api/leads/${leadId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setLeads(leads.filter((lead) => lead.id !== leadId))
        toast({
          title: "Success",
          description: "Lead deleted successfully.",
        })
      } else {
        throw new Error("Failed to delete lead")
      }
    } catch (error) {
      console.error("Error deleting lead:", error)
      // Delete locally even if API fails (for demo purposes)
      setLeads(leads.filter((lead) => lead.id !== leadId))
      toast({
        title: "Deleted",
        description: "Lead deleted (demo mode).",
      })
    } finally {
      setActionLoading(null)
    }
  }

  const handleStatusUpdate = async (leadId: string, newStatus: string) => {
    try {
      setActionLoading(leadId)
      const response = await fetch(`/api/leads/${leadId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      })

      if (response.ok) {
        setLeads(leads.map((lead) => (lead.id === leadId ? { ...lead, status: newStatus } : lead)))
        toast({
          title: "Success",
          description: "Lead status updated successfully.",
        })
      } else {
        throw new Error("Failed to update lead status")
      }
    } catch (error) {
      console.error("Error updating lead status:", error)
      // Update locally even if API fails (for demo purposes)
      setLeads(leads.map((lead) => (lead.id === leadId ? { ...lead, status: newStatus } : lead)))
      toast({
        title: "Updated",
        description: "Lead status updated (demo mode).",
      })
    } finally {
      setActionLoading(null)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-green-100 text-green-800"
      case "contacted":
        return "bg-blue-100 text-blue-800"
      case "qualified":
        return "bg-purple-100 text-purple-800"
      case "converted":
        return "bg-emerald-100 text-emerald-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 hover:bg-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 hover:bg-green-200"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200"
    }
  }

  const filteredLeads = leads.filter(
    (lead) =>
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.service.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Priority statistics
  const priorityStats = {
    high: leads.filter((l) => l.priority === "high").length,
    medium: leads.filter((l) => l.priority === "medium").length,
    low: leads.filter((l) => l.priority === "low").length,
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
        <h1 className="text-2xl font-bold text-gray-900">New Leads</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search leads..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <Button onClick={fetchLeads} variant="outline">
            Refresh
          </Button>
        </div>
      </div>

      {/* Priority Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{leads.length}</p>
              <p className="text-sm text-gray-600">Total Leads</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">{priorityStats.high}</p>
              <p className="text-sm text-gray-600">High Priority</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">{priorityStats.medium}</p>
              <p className="text-sm text-gray-600">Medium Priority</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{priorityStats.low}</p>
              <p className="text-sm text-gray-600">Low Priority</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6">
        {filteredLeads.map((lead) => (
          <Card key={lead.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{lead.name}</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">Lead ID: {lead.id}</p>
                </div>
                <div className="flex items-center space-x-2">
                  {/* Priority Management */}
                  {editingPriority === lead.id ? (
                    <div className="flex items-center space-x-2">
                      <select
                        value={lead.priority}
                        onChange={(e) => handlePriorityChange(lead.id, e.target.value)}
                        className="px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={actionLoading === lead.id}
                      >
                        <option value="high">High Priority</option>
                        <option value="medium">Medium Priority</option>
                        <option value="low">Low Priority</option>
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
                    <div className="flex items-center space-x-1">
                      <Badge
                        className={`cursor-pointer ${getPriorityColor(lead.priority)}`}
                        onClick={() => setEditingPriority(lead.id)}
                      >
                        {lead.priority} priority
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditingPriority(lead.id)}
                        className="h-6 w-6 p-0"
                      >
                        <Edit className="w-3 h-3" />
                      </Button>
                    </div>
                  )}
                  <Badge className={getStatusColor(lead.status)}>{lead.status}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">{lead.email}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">{lead.phone}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">{lead.date}</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Service Required:</p>
                    <p className="text-sm text-gray-600">{lead.service}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Budget Range:</p>
                    <p className="text-sm text-gray-600">{lead.budget}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Business Type:</p>
                    <p className="text-sm text-gray-600">{lead.businessType}</p>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Message:</p>
                <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">{lead.message}</p>
              </div>
              <div className="flex items-center justify-between mt-4 pt-4 border-t">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Status:</span>
                  <select
                    value={lead.status}
                    onChange={(e) => handleStatusUpdate(lead.id, e.target.value)}
                    disabled={actionLoading === lead.id}
                    className="px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="qualified">Qualified</option>
                    <option value="converted">Converted</option>
                  </select>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                  <Button variant="outline" size="sm">
                    <Phone className="w-4 h-4 mr-2" />
                    Contact
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:text-red-700 bg-transparent"
                    onClick={() => handleDelete(lead.id)}
                    disabled={actionLoading === lead.id}
                  >
                    {actionLoading === lead.id ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4 mr-2" />
                    )}
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Admin Instructions */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-900">🎯 Priority Management Instructions</CardTitle>
        </CardHeader>
        <CardContent className="text-blue-800 space-y-2">
          <p>
            <strong>Set Priority:</strong> Click on any priority badge to change it (High/Medium/Low)
          </p>
          <p>
            <strong>High Priority:</strong> Urgent leads requiring immediate attention
          </p>
          <p>
            <strong>Medium Priority:</strong> Standard leads with normal follow-up
          </p>
          <p>
            <strong>Low Priority:</strong> Leads that can be handled when time permits
          </p>
          <p>
            <strong>Status Update:</strong> Change lead status as you progress through the sales process
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
