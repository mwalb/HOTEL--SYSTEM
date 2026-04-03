"use client"

import Navbar from "../components/Navbar"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import {
  getBookings,
  getAvailableRooms,
  getOccupancyReport,
  checkIn,
  checkOut,
  generateInvoice
} from "@/Services/apiService"

import {
  BarChart,
  LineChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Line
} from "recharts"

export default function Dashboard(){

  const [bookings,setBookings]=useState<any[]>([])
  const [rooms,setRooms]=useState<any[]>([])
  const [report,setReport]=useState<any>({})

  const router=useRouter()

  useEffect(()=>{

    const token=localStorage.getItem("access_token")

    if(!token){
      router.push("/login")
      return
    }

    loadData()

  },[])


  const loadData=async()=>{
    try{

      const [bookingData,roomData,reportData]=await Promise.all([
        getBookings(),
        getAvailableRooms(),
        getOccupancyReport()
      ])

      setBookings(bookingData)
      setRooms(roomData)
      setReport(reportData)

    }catch(error){
      console.error("Dashboard load error:",error)

      // if token invalid → redirect login
      router.push("/login")
    }
  }


  const handleCheckIn=async(id:number)=>{
    await checkIn(id)
    loadData()
  }

  const handleCheckOut=async(id:number)=>{
    await checkOut(id)
    loadData()
  }

  const handleGenerateInvoice=async(id:number)=>{
    await generateInvoice(id)
    alert("Invoice generated")
  }



  return(

  <>
  <Navbar/>

  <div className="min-h-screen bg-slate-100 p-10">

  <h1 className="text-4xl font-bold text-slate-800 mb-10">
  HOTEL MANAGEMENT DASHBOARD
  </h1>


  <div className="grid grid-cols-3 gap-6 mb-12">

  <div className="bg-white rounded-xl shadow-lg p-8">
  <h2 className="text-lg text-gray-500">Total Rooms</h2>
  <p className="text-3xl font-bold">{report.total_rooms}</p>
  </div>

  <div className="bg-white rounded-xl shadow-lg p-8">
  <h2 className="text-lg text-gray-500">Occupied</h2>
  <p className="text-3xl font-bold text-red-500">{report.occupied_rooms}</p>
  </div>

  <div className="bg-white rounded-xl shadow-lg p-8">
  <h2 className="text-lg text-gray-500">Available</h2>
  <p className="text-3xl font-bold text-green-600">{report.available_rooms}</p>
  </div>

  </div>



  <div className="bg-white rounded-xl shadow-lg p-8 mb-12">

  <h2 className="text-2xl font-semibold mb-6">
  Current Bookings
  </h2>

  {bookings.map((b)=>(
  <div key={b.id} className="flex justify-between border-b pb-3 mb-2">

  <div>
  <p className="font-semibold">{b.guest.username}</p>
  <p className="text-gray-500">Room {b.room.number}</p>
  </div>

  <div className="flex gap-2">

  <button
  onClick={()=>handleCheckIn(b.id)}
  className="bg-green-600 text-white px-3 py-1 rounded"
  >
  Check-in
  </button>

  <button
  onClick={()=>handleCheckOut(b.id)}
  className="bg-yellow-500 text-white px-3 py-1 rounded"
  >
  Check-out
  </button>

  <button
  onClick={()=>handleGenerateInvoice(b.id)}
  className="bg-blue-600 text-white px-3 py-1 rounded"
  >
  Invoice
  </button>

  </div>

  </div>
  ))}

  </div>



  <div className="grid grid-cols-2 gap-8">

  <div className="bg-white rounded-xl shadow-lg p-8">

  <h2 className="text-xl font-semibold mb-6">
  Occupancy Trend
  </h2>

  <ResponsiveContainer width="100%" height={300}>

  <BarChart data={report.occupancy_trend || []}>
  <CartesianGrid strokeDasharray="3 3"/>
  <XAxis dataKey="date"/>
  <YAxis/>
  <Tooltip/>
  </BarChart>

  </ResponsiveContainer>

  </div>



  <div className="bg-white rounded-xl shadow-lg p-8">

  <h2 className="text-xl font-semibold mb-6">
  Revenue Trend
  </h2>

  <ResponsiveContainer width="100%" height={300}>

  <LineChart data={report.revenue_trend || []}>
  <CartesianGrid strokeDasharray="3 3"/>
  <XAxis dataKey="date"/>
  <YAxis/>
  <Tooltip/>
  <Line type="monotone" dataKey="revenue"/>
  </LineChart>

  </ResponsiveContainer>

  </div>

  </div>

  </div>
  </>
  )
}