import { cookies } from "next/headers";


const API_URL =
  process.env.API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:3001";



export async function serverApi(
  path:string,
  options?:RequestInit,
){

  const response = await fetch(
    `${API_URL}${path}`,
    {
      ...options,
      cache:"no-store",
    }
  );


  if(!response.ok){

    throw new Error(
      `API error: ${response.status}`
    );

  }


  return response.json();

}