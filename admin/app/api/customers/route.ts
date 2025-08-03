import { NextResponse } from "next/server"

// Mock database
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
  {
    id: "CUST003",
    name: "Amit Patel",
    phone: "9876543212",
    email: "amit.patel@email.com",
    date: "2024-12-20 09:15:00",
    status: "active",
    services: ["Company Registration", "Legal Documentation"],
    totalSpent: "₹35,000",
    lastService: "Legal Documentation",
  },
]

export async function GET() {
  try {
    // Simulate database query delay
    await new Promise((resolve) => setTimeout(resolve, 500))
    return NextResponse.json(customers)
  } catch (error) {
    console.error("Customers API error:", error)
    return NextResponse.json({ error: "Failed to fetch customers" }, { status: 500 })
  }
}
