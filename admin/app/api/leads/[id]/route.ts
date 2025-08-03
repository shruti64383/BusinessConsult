import { NextResponse } from "next/server"

// Mock database - in real app, this would be imported from a shared module
const leads = [
  {
    id: "LEAD001",
    name: "Rohit Gupta",
    email: "rohit.gupta@email.com",
    phone: "+91 9876543210",
    service: "Company Registration",
    budget: "₹10,000 - ₹20,000",
    message: "I want to register my startup as a Private Limited Company. Need complete assistance with documentation.",
    date: "2025-01-15",
    status: "new",
    priority: "medium",
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
    priority: "low",
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
    priority: "medium",
    businessType: "Manufacturing",
  },
]

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const leadIndex = leads.findIndex((lead) => lead.id === id)

    if (leadIndex === -1) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 })
    }

    leads.splice(leadIndex, 1)
    return NextResponse.json({ message: "Lead deleted successfully" })
  } catch (error) {
    console.error("Delete lead API error:", error)
    return NextResponse.json({ error: "Failed to delete lead" }, { status: 500 })
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const body = await request.json()
    const leadIndex = leads.findIndex((lead) => lead.id === id)

    if (leadIndex === -1) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 })
    }

    // Update the lead with new data (including priority)
    leads[leadIndex] = { ...leads[leadIndex], ...body }

    return NextResponse.json(leads[leadIndex])
  } catch (error) {
    console.error("Update lead API error:", error)
    return NextResponse.json({ error: "Failed to update lead" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const body = await request.json()
    const leadIndex = leads.findIndex((lead) => lead.id === id)

    if (leadIndex === -1) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 })
    }

    // Replace the entire lead object
    leads[leadIndex] = { ...body, id }

    return NextResponse.json(leads[leadIndex])
  } catch (error) {
    console.error("Replace lead API error:", error)
    return NextResponse.json({ error: "Failed to replace lead" }, { status: 500 })
  }
}
