"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
export default function Navbar(){
const router=useRouter()
  const handleLogout = () => {
    localStorage.removeItem("access_token")
    router.push("/login")
  }

  return (
     <>
<div className="w-full bg-slate-800 text-white px-10 py-4 flex justify-between  items-center">
  <h1 className="text-xl font-bold">
    Hotel System
  </h1>
  <div className="flex gap-8">
    <Link href="/dashboard">Dashboard</Link>
    <Link href="/rooms">Rooms</Link>
    <Link href="/bookings">Bookings</Link>
    <Link href="/reports">Reports</Link>
     <button onClick={handleLogout} className="bg-red-600 px-4 py-2 rounded">
        Logout
      </button>
  </div>
  </div>  
  </>
  )
 
}