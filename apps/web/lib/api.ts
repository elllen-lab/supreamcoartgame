"use client";


const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:3001";



export async function api<T = any>(
  path:string,
  options:RequestInit = {},
):Promise<T>{



  const response =
    await fetch(
      `${API_URL}${path}`,
      {

        ...options,


        credentials:
          "include",


        headers:{
          
          "Content-Type":
            "application/json",


          ...(options.headers || {}),

        },


      }
    );




  const text =
    await response.text();



  let data:any = null;



  try {

    data =
      text
      ? JSON.parse(text)
      : null;


  } catch {

    data = text;

  }





  if(!response.ok){

    console.log(
      "API ERROR:",
      response.status,
      data,
    );


    throw new Error(
      data?.message ||
      `API Error ${response.status}`
    );


  }




  return data;

}