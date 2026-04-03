"use client"
import Navbar from "../components/Navbar"
import {useEffect,useState} from "react";
import { ResponsiveContainer,BarChart,LineChart,Bar,Line,XAxis,YAxis,Tooltip,CartesianGrid} from "recharts";
import  {getOccupancyReport} from "@/Services/apiService";

export default function ReportsPage(){
  const [report,setReport]=useState<any>({});
  useEffect(()=>{
    loadReport();
  },[]);
  const loadReport=async()=>{
    try{
      const data=await getOccupancyReport();
      setReport(data);
    } catch (error){
      console.error("Failed to load report",error);
    }
  };
 
  return <>
  <div className="min-h-screen bg-slate-100 p-10">
    <Navbar></Navbar>
   <h1 className="text-4xl font-bold text-slate-800 mb-10">Hotel Report
   </h1>
 
  <div className="grid grid-cols-3 gap-6 mb-12">
    <div className="bg-white rounded-xl shadow-lg p-8">
  <h2 className="text-lg text-gray-500">Occupied Rooms</h2>
  <p className="text-3xl font-bold text-red-500 p-8">{report.occupied_rooms}</p>
    </div>
  <div className="bg-white rounded-xl shadow-lg p-8">
  <h2 className="text-lg text-gray-500">Available Rooms</h2>
  <p className="text-3xl font-bold text-green-500 p-8">{report.available_rooms}</p>
  </div>
  </div>
  <div className="grid grid-cols-2 gap-8">
    <div className="bg-white rounded-xl shadow-lg p-8">
    <h2 className="text-2xl font-semibold mb-6 text-slate-800">Occupancy Trends</h2>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={report.occupncy_trend || []}>
        <CartesianGrid strokeDasharray="3 3"></CartesianGrid>
        <XAxis dataKey="date"></XAxis>
        <YAxis></YAxis>
        <Tooltip></Tooltip>
        <Bar dataKey="occupied" fill="#f87171"></Bar>
        <Bar dataKey="available" fill="#34d399"></Bar>
      </BarChart>
    </ResponsiveContainer>
</div>
  <div className="bg-white rounded-xl shadow-lg p-8">
    <h2 className="text-2xl font-semibold mb-6 text-slate-800">Revenue Trend</h2>
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={report.revenue_trend || []}>
        <CartesianGrid strokeDasharray={"3 3"}></CartesianGrid>
        <XAxis dataKey="date"></XAxis>
        <YAxis></YAxis>
        <Tooltip></Tooltip>
        <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3}></Line>
      </LineChart>
    </ResponsiveContainer>
  </div>
  </div>
 </div>
  </>
}