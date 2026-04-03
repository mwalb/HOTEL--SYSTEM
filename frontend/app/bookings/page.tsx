"use client"
import Navbar from "../components/Navbar"
import { useEffect, useState } from "react"
import {
  getBookings,
  checkIn,
  checkOut,
  generateInvoice
} from "@/Services/apiService"

export default function BookingsPage() {

  const [bookings, setBookings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadBookings()
  }, [])

  const loadBookings = async () => {
    try {
      const data = await getBookings()
      setBookings(data)
      setLoading(false)
    } catch (error) {
      console.error("Failed to load bookings", error)
    }
  }

  const handleCheckIn = async (id:number) => {
    await checkIn(id)
    loadBookings()
  }

  const handleCheckOut = async (id:number) => {
    await checkOut(id)
    loadBookings()
  }

  const handleInvoice = async (id:number) => {
    await generateInvoice(id)
    alert("Invoice generated")
  }

  if(loading){
    return (
      <div className="p-10 text-xl">
        Loading bookings...
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-100 p-10">
<Navbar></Navbar>

      <h1 className="text-4xl font-bold text-slate-800 mb-10">
        Bookings Management
      </h1>

      <div className="bg-white rounded-xl shadow-lg p-8">

        <table className="w-full">

          <thead className="border-b text-left">
            <tr>
              <th className="p-3">Guest</th>
              <th className="p-3">Room</th>
              <th className="p-3">Check-in</th>
              <th className="p-3">Check-out</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>

            {bookings.map((b:any)=>(
              <tr key={b.id} className="border-b hover:bg-slate-50">

                <td className="p-3 font-semibold">
                  {b.guest.username}
                </td>

                <td className="p-3">
                  Room {b.room.number}
                </td>

                <td className="p-3 text-gray-500">
                  {b.check_in || "Not checked in"}
                </td>

                <td className="p-3 text-gray-500">
                  {b.check_out || "Not checked out"}
                </td>

                <td className="p-3 flex gap-3">

                  <button
                    onClick={()=>handleCheckIn(b.id)}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                  >
                    Check-in
                  </button>

                  <button
                    onClick={()=>handleCheckOut(b.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                  >
                    Check-out
                  </button>

                  <button
                    onClick={()=>handleInvoice(b.id)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Invoice
                  </button>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  )
}