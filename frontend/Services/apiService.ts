const API_URL = process.env.NEXT_PUBLIC_API_URL!;

// REGISTER USER
export async function registerUser(username:string,email:string,password:string){

  const res = await fetch(`${API_URL}/register/`,{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({username,email,password})
  })

  if(!res.ok){
    throw new Error("Registration failed")
  }

  return res.json()
}


// LOGIN USER
export async function loginUser(username:string,password:string){

  const res = await fetch(`${API_URL}/login/`,{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({username,password})
  });

  if(!res.ok){
    throw new Error("Login failed");
  }

  const data=await res.json();
  localStorage.setItem("access_token",data.access);
  return data;
}


// AUTH FETCH
export function authFetch(url:string,options:any={}){

  const token=localStorage.getItem("access_token");

  if(!token){
    throw new Error("User not authenticated")
  }

  return fetch(url,{
    ...options,
    headers:{
      "Content-Type":"application/json",
      ...options.headers,
      Authorization:`Bearer ${token}`
    },
  });
}



// GET BOOKINGS (PROTECTED)
export async function getBookings(){

  const res = await authFetch(`${API_URL}/bookings/`)

  if(!res.ok){
    throw new Error("Failed to fetch bookings")
  }

  return res.json()
}



// AVAILABLE ROOMS (PROTECTED)
export async function getAvailableRooms(){

  const res = await authFetch(`${API_URL}/rooms/available/`)

  if(!res.ok){
    throw new Error("Failed to fetch rooms")
  }

  return res.json()
}



// CHECK IN
export async function checkIn(booking_id:number){

  const res = await authFetch(`${API_URL}/check-in/`,{
    method:"POST",
    body:JSON.stringify({booking_id})
  })

  return res.json()
}



// CHECK OUT
export async function checkOut(booking_id:number){

  const res = await authFetch(`${API_URL}/check_out/`,{
    method:"POST",
    body:JSON.stringify({booking_id})
  })

  return res.json()
}



// GENERATE INVOICE
export async function generateInvoice(id:number){

  const res = await authFetch(`${API_URL}/invoice/${id}/`)

  if(!res.ok){
    throw new Error("Failed to generate invoice")
  }

  return res.json()
}



// OCCUPANCY REPORT
export async function getOccupancyReport(){

  const res = await authFetch(`${API_URL}/occupancy-report/`)

  if(!res.ok){
    throw new Error("Failed to fetch report")
  }

  return res.json()
}