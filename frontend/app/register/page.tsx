"use client"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { registerUser } from "@/Services/apiService"
export default function RegisterPage(){

  const [username,setUsername]=useState("")
  const [password,setPassword]=useState("")
  const [email,setEmail]=useState("")
  const [error,setError]=useState("")
  const router=useRouter()

  const handleSubmit=async (e:any)=>{
    e.preventDefault()
    setError("")

    try{
       await registerUser(username,email,password)
       router.push("/login")
    } catch(err:any){
      setError(err.message)
    }
  }

  return <>
  <div className="min-h-screen bg-gray-100 flex items-center justify-center">
    <div className="bg-white p-10 rounded-2xl shadow-lg w-3/5  ">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Create Account
      </h1>
      
      <form onSubmit={handleSubmit} className="space-y-5   ">
      <input type="text"
      placeholder="Username"
      className=" border border-gray-300 p-3  w-full rounded-lg focus:out "
      value={username}
      onChange={(e)=>setUsername(e.target.value)}
      required
    >
      </input>
      <input type="email"
      placeholder="Email"
      className="w-full border border-gray-300 p-3  rounded-lg focus:out "
      value={email}
      onChange={(e)=>setEmail(e.target.value)}  
      required
    >
      </input>
      <input 
      type="password"
      placeholder="Password"
      className="w-full border border-gray-300 p-3 rounded-lg focus:out "
      value={password}
      onChange={(e)=>setPassword(e.target.value)}
      required
      >
      </input>
      {error && (
        <p className="text-red-500 text-sm">
{error}
        </p>
      )}

      <button 
      type="submit" 
      className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition"
      >
       Register 

      </button>


      </form>
      
      <p className="mt-4 text-center text-gray-500 text-sm">Arleady have an Account?<Link  href="/login" className="text-blue-600 hover:underline">login here</Link></p>
      

    </div>

  </div>
  </>


}