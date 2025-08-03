import { NextResponse } from "next/server"

// Mock services data
const services = [
  {
    id: "SRV001",
    name: "Company Registration",
    customerId: "CUST001",
    status: "completed",
    date: "2024-12-20",
    completedDate: "2024-12-25",
    amount: "₹15,000",
  },
  {
    id: "SRV002",
    name: "GST Registration",
    customerId: "CUST002",
    status: "completed",
    date: "2024-12-18",
    completedDate: "2024-12-22",
    amount: "₹5,000",
  },
  {
    id: "SRV003",
    name: "Trademark Registration",
    customerId: "CUST003",
    status: "in_progress",
    date: "2025-01-05",
    amount: "₹25,000",
  },
  {
    id: "SRV004",
    name: "Legal Documentation",
    customerId: "CUST001",
    status: "completed",
    date: "2024-12-10",
    completedDate: "2024-12-15",
    amount: "₹10,000",
  },
]

export async function GET() {
  try {
    // Simulate database query delay
    await new Promise((resolve) => setTimeout(resolve, 300))
    return NextResponse.json(services)
  } catch (error) {
    console.error("Services API error:", error)
    return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 })
  }
}
