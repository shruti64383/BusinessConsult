'use client'
import { useEffect, useState } from 'react'
import axios from '@/utils/axiosInstance'
import { useRouter } from 'next/navigation'

export default function AdminDashboard() {
  const router = useRouter()
  const [admin, setAdmin] = useState<any>(null)

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const res = await axios.get('/admin/dashboard')
        if (res.data.role !== 'admin') throw new Error()
        setAdmin(res.data)
      } catch (err) {
        router.push('/login') // or /dashboard
      }
    }

    fetchAdmin()
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      {admin && (
        <p className="text-lg">Welcome, <strong>{admin.name}</strong> 👑</p>
      )}
    </div>
  )
}
