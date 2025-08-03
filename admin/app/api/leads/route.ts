import { NextResponse } from "next/server"
import Lead from "../../../../backend/models/Leads"  // Import your Mongoose model
import connectDB from "../../../../backend/config/db" 

// Mock database - in a real app, this would be a database
const lead = [
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
    priority: "medium", // Default priority set by admin
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
    priority: "low", // Default priority set by admin
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
    priority: "medium", // Default priority set by admin
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
    priority: "medium", // Default priority set by admin
    businessType: "Consulting",
  },
]

export async function GET() {
  try {
    // Simulate database query delay
    await connectDB()  // Connect to database    
    // Fetch all leads from MongoDB, sorted by date (newest first)
    const leads = await Lead.find({})
      .sort({ date: -1 })
      .lean()
    await new Promise((resolve) => setTimeout(resolve, 500))
    return NextResponse.json(leads)
  } catch (error) {
    console.error("Leads API error:", error)
    return NextResponse.json({ error: "Failed to fetch leads" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    await connectDB()
    const body = await request.json()
    
    // Create new lead (Mongoose will auto-generate ID and apply defaults)
    const newLead = new Lead(body)
    await newLead.save()
    
    return NextResponse.json(newLead, { status: 201 })
  } catch (error) {
    console.error("Create lead API error:", error)
    return NextResponse.json({ error: "Failed to create lead" }, { status: 500 })
  }
}
