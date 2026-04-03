"use client"

import Link from "next/link"

export default function HomePage(){

  return(

    <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center">

      <h1 className="text-4xl font-bold mb-6">
        Hotel Management System
      </h1>

      <p className="text-gray-600 mb-10">
        Manage bookings, rooms, invoices and reports easily
      </p>

      <div className="flex gap-4">

        <Link
        href="/login"
        className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
        >
          Login
        </Link>

        <Link
        href="/register"
        className="bg-gray-200 px-6 py-3 rounded hover:bg-gray-300"
        >
          Register
        </Link>

      </div>

    </div>

  )
}