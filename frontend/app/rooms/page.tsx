"use client"
import Navbar from "../components/Navbar"
import {useEffect,useState} from "react"
import {getAvailableRooms} from "@/Services/apiService"

export default function Roompage(){
  const [rooms,setRooms]=useState<any[]>([])
  useEffect(()=>{
    loadRoom()
  },[])
  const loadRoom=async()=>{
    try{
      const data=await getAvailableRooms()
      setRooms(data)
    }catch(err){
      console.error("Failed to load Rooms")
    }
  }
return <>
   <div className="min-h-screen bg-slate-100 p-10">
    <Navbar></Navbar>
    <h1 className="text-4xl font-bold text-slate-800 mb-10">Room Management</h1>
    <div className="grid grid-cols-4 gap-8">
     {rooms.map((room:any)=>(
      <div key={room.id}
      className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition"
      >
<p className="text-xl font-bold text-slate-800">
  Room{room.number}
</p>
<p className="text-gray-500 mt-2">
  Type:{room.room_type}
</p>
<p className={`mt-4 font-semibold ${room.occupied?"text-red-500":"text-green-600"}`}>
{room.occupied?"occupied":"Available"}
</p>
      </div>
     ))}
     
    </div>
   </div>
</>

}