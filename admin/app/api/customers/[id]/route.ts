import { NextResponse } from "next/server"

// Mock database - in real app, this would be imported from a shared module
const customers = [
  {
    id: "CUST001",
    name: "Rajesh Kumar",
    phone: "9876543210",
    email: "rajesh.kumar@email.com",
    date: "2024-12-15 10:30:00",
    status: "active",
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
    services: ["Trademark Registration"],
    totalSpent: "₹25,000",
    lastService: "Trademark Registration",
  },
]

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const customerIndex = customers.findIndex((customer) => customer.id === id)

    if (customerIndex === -1) {
      return NextResponse.json({ error: "Customer not found" }, { status: 404 })
    }

    customers.splice(customerIndex, 1)
    return NextResponse.json({ message: "Customer deleted successfully" })
  } catch (error) {
    console.error("Delete customer API error:", error)
    return NextResponse.json({ error: "Failed to delete customer" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const body = await request.json()
    const customerIndex = customers.findIndex((customer) => customer.id === id)

    if (customerIndex === -1) {
      return NextResponse.json({ error: "Customer not found" }, { status: 404 })
    }

    customers[customerIndex] = { ...customers[customerIndex], ...body }
    return NextResponse.json(customers[customerIndex])
  } catch (error) {
    console.error("Update customer API error:", error)
    return NextResponse.json({ error: "Failed to update customer" }, { status: 500 })
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const body = await request.json()
    const customerIndex = customers.findIndex((customer) => customer.id === id)

    if (customerIndex === -1) {
      return NextResponse.json({ error: "Customer not found" }, { status: 404 })
    }

    customers[customerIndex] = { ...customers[customerIndex], ...body }
    return NextResponse.json(customers[customerIndex])
  } catch (error) {
    console.error("Update customer API error:", error)
    return NextResponse.json({ error: "Failed to update customer" }, { status: 500 })
  }
}
