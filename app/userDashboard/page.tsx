"use client"

import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { Inter } from "next/font/google"
import {
  FaHome,
  FaUser,
  FaBriefcase,
  FaCalendarAlt,
  FaCreditCard,
  FaPlus,
  FaCog,
} from "react-icons/fa"
import axios from "axios"

const inter = Inter({ subsets: ["latin"] })

export default function UserDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const [selectedMonth, setSelectedMonth] = useState("August")
  const [hydrated, setHydrated] = useState(false)
  const [userData, setUserData] = useState(null)
  const [compliances, setCompliances] = useState([])
  const [showPending, setShowPending] = useState(false)

  useEffect(() => {
    setHydrated(true)

    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("token")

        if (!token) {
          alert("Session expired. Please log in again.")
          window.location.href = "/login"
          return
        }

        // Decode token to check expiry
        const payload = JSON.parse(atob(token.split(".")[1]))
        const now = Math.floor(Date.now() / 1000)

        if (payload.exp < now) {
          localStorage.removeItem("token")
          alert("Session expired. Please log in again.")
          window.location.href = "/login"
          return
        }

        // Token is valid, fetch dashboard data
        const res = await axios.get("http://localhost:5000/api/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        setUserData(res.data.user)
        setCompliances(res.data.compliance)
      } catch (err) {
        console.error("Dashboard fetch error:", err)
        alert("Something went wrong. Please try logging in again.")
        localStorage.removeItem("token")
        window.location.href = "/login"
      }
    }


    fetchDashboard()
  }, [])

  if (!hydrated) return null

  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ]

  const filteredCompliances = compliances.filter((c) => {
    const dueMonth = new Date(c.dueDate).toLocaleString("default", { month: "short" })
    const matchMonth = selectedMonth === dueMonth
    const matchStatus = showPending ? c.status.toLowerCase() === "pending" : true
    return matchMonth && matchStatus
  })


  // --- Monthly Stats ---
  const total = compliances.length
  const completed = compliances.filter(c => c.status.toLowerCase() === "completed").length
  const completionPercent = total ? Math.round((completed / total) * 100) : 0

  return (
    <div className={"flex flex-col md:flex-row min-h-screen bg-white text-gray-900 " + inter.className}>
      {/* Sidebar */}
      <div className="md:hidden flex justify-between items-center p-4 border-b">
        <span className="text-sm font-bold text-gray-700">USER-DASHBOARD</span>
        <button
          className="text-xl text-gray-700"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          ☰
        </button>
      </div>
      <aside className={`fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 transform transition-transform z-50 md:relative md:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center justify-between px-4 py-3 border-b md:border-b-0 md:justify-start">
          <span className="text-sm font-bold text-gray-700">USER-DASHBOARD</span>
          <button
            className="md:hidden text-lg text-gray-600"
            onClick={() => setSidebarOpen(false)}
          >
            ✕
          </button>
        </div>
        <nav className="flex flex-col gap-1 px-2 py-4">
          <SidebarItem icon={<FaHome />} label="Home" href="/dashboard" active={pathname === "/dashboard"} />
          <SidebarItem icon={<FaUser />} label="My services" href="/dashboard/my-services" active={pathname === "/dashboard/my-services"} />
          <SidebarItem icon={<FaCreditCard />} label="Payment history" href="/dashboard/payments" active={pathname === "/dashboard/payments"} />
          <SidebarItem icon={<FaCalendarAlt />} label="Compliance calendar" href="/dashboard/calendar" active={pathname === "/dashboard/calendar"} />
        </nav>
      </aside>


      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 space-y-6 md:ml-64">
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
          <div className="text-sm font-semibold text-gray-900">Compliance Calendar</div>
          <div className="flex flex-wrap gap-2 text-gray-500 text-xs">
            {/* <HeaderButton icon={<FaPlus />} label="Complete your business profile" /> */}
            <a
              href="/dashboard/upload-documents"
              className="flex items-center space-x-1 border border-gray-300 rounded px-2 py-1 hover:bg-gray-100 text-gray-700 text-xs"
            >
              <FaPlus className="text-xs" />
              <span>Upload Documents</span>
            </a>

            <HeaderButton icon={<FaCog />} label="Settings" />
            <button
              onClick={() => {
                localStorage.removeItem("token")
                window.location.href = "/login"
              }}
              className="border border-red-500 text-red-500 px-2 py-1 rounded hover:bg-red-50"
            >
              Logout
            </button>
          </div>
        </header>


        {/* User Info Card */}
        {userData && (
          <div className="border p-4 rounded-xl shadow bg-white text-xs sm:text-sm space-y-1 w-full overflow-hidden">
            <h2 className="font-bold">User Info</h2>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
              <p><strong>Name:</strong> {userData.name}</p>
              <p><strong>Email:</strong> {userData.email}</p>
              <p><strong>ID:</strong> {userData._id}</p>
            </div>
          </div>
        )}


        {/* Monthly Stats */}
        <div className="border p-4 rounded-xl shadow bg-white text-xs space-y-1">
          <h2 className="font-bold text-sm">Monthly Summary</h2>
          <p>Total Tasks: {total}</p>
          <p>Completed: {completed}</p>
          <p>Completion Rate: {completionPercent}%</p>
        </div>

        {/* Month Filters */}
        <div className="mb-4 flex flex-wrap gap-2 text-xs font-semibold overflow-x-auto pb-1">
          {months.map(month => (
            <button
              key={month}
              type="button"
              className={`px-2 py-1 rounded border ${selectedMonth === month
                ? "bg-blue-900 text-white border-blue-900"
                : "border-gray-300 hover:bg-gray-100"
                }`}
              onClick={() => setSelectedMonth(month)}
            >
              {month}
            </button>
          ))}
          <button
            type="button"
            className="text-blue-900 text-[10px] font-semibold border border-blue-900 rounded px-2 py-1 w-full sm:w-auto text-center">
            View all
          </button>
        </div>

        {/* Show Pending Toggle */}
        <div className="flex items-center justify-between mb-3 text-xs font-semibold text-gray-600">
          <span>{selectedMonth} Compliances</span>
          <label className="inline-flex items-center space-x-1 cursor-pointer">
            <input
              type="checkbox"
              className="form-checkbox h-4 w-4 text-blue-900"
              checked={showPending}
              onChange={() => setShowPending(!showPending)}
            />
            <span className="text-xs text-gray-600 select-none">Show pending</span>
          </label>
        </div>

        {/* Compliance Cards */}

        <div className="space-y-4 text-xs">
          {filteredCompliances.length > 0 ? (
            filteredCompliances.map((item, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row sm:items-center justify-between border border-gray-200 rounded px-3 py-2 gap-3"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full">
                  <div
                    className={`flex flex-col items-center ${item.status === "completed" ? "text-green-600" : "text-red-600"
                      } font-semibold text-[10px] leading-none min-w-[4.5rem]`}
                  >
                    <span>Due date</span>
                    <span className="text-[11px] font-bold">{item.dueDate}</span>
                  </div>
                  <div className="flex-1 flex flex-col w-full">
                    <span
                      className={`font-semibold ${item.status === "completed" ? "text-green-600" : "text-red-600"
                        }`}
                    >
                      {item.status}
                    </span>
                    <span className="text-gray-700">{item.description}</span>
                    <span className="text-gray-400 text-[9px]">{item.note}</span>
                  </div>
                </div>
                <button
                  type="button"
                  className="text-blue-900 text-[10px] font-semibold border border-blue-900 rounded px-2 py-1 w-full sm:w-auto text-center"
                >
                  {item.status === "completed" ? "View more" : "Get document"}
                </button>
              </div>
            ))
          ) : (
            <p className="text-xs text-gray-500">No compliances available.</p>
          )}
        </div>


      </main>
    </div>
  )
}

function SidebarItem({ icon, label, href, active }) {
  return (
    <a
      href={href}
      className={`flex items-center space-x-2 px-3 py-2 rounded transition-colors ${active ? "bg-blue-900 text-white" : "text-gray-600 hover:bg-gray-300"
        }`}
    >
      <span className="text-xs">{icon}</span>
      <span>{label}</span>
    </a>
  )
}

function HeaderButton({ icon, label }) {
  return (
    <button
      type="button"
      className="flex items-center space-x-1 border border-gray-300 rounded px-2 py-1 hover:bg-gray-100"
    >
      <span className="text-xs">{icon}</span>
      <span>{label}</span>
    </button>
  )
}
