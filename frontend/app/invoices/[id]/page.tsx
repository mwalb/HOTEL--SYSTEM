'use client'

import { useEffect, useState } from "react"
import { generateInvoice } from "@/Services/apiService"
import { useParams } from "next/navigation"

export default function InvoicePage(){
  const params=useParams()
  const [invoice,setInvoice]=useState<any>()

  useEffect(()=>{
    if(!params?.id) return
    const loadInvoice=async ()=>{
    try{
      const data=await generateInvoice(Number(params.id))
      setInvoice(data)
    }catch(error){
     console.error("Failed to load invoice",error)
    }
  }
  
    loadInvoice()
  },[params])

  
  
  return <>
   <div className="min-h-screen bg-slate-100 flex justify-center items-center">
    <div className="bg-white shadow-xl rounded-xl p-10 w-[500px]">
<h1 className="text-3xl text-center font-bold mb-6 text-slate-800">Hotel Invoice</h1>
<div className="space-y-4">
  <div className="flex justify-between">
    <span className="text-gray-500">Guest</span>
    <span className="font-semibold">{invoice?.booking?.guest?.username}</span>
      </div>
</div>
<div className="flex justify-between">
<span className="text-gray-500">Room</span>
<span className="font-semibold">{invoice?.booking?.room?.number}</span>
</div>
<div className="flex justify-between">
<span className="text-gray-500">Check In</span>
<span>{invoice?.booking?.check_in}</span>
</div>

<div className="flex justify-between">
  <span className="text-gray-500">Check Out</span>
  <span>{invoice?.booking?.Check_out}</span>

</div>
<div className="border-t pt-4 flex justify-between text-xl font-bold">
  <span>Total</span>
  <span>{invoice?.amount}TZS</span>
</div>
    </div>
   </div>
  </>
}

