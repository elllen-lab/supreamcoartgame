"use client";

import { useEffect } from "react";


export default function Home() {


  useEffect(() => {


    async function checkAuth() {

      try {


        const res = await fetch(
          "http://localhost:3001/auth/me",
          {
            credentials: "include",
          }
        );


        const data = await res.json();


        console.log(
          "AUTH:",
          data
        );



        if (data.authenticated) {


          window.location.href =
            "/dashboard";


          return;

        }



        window.location.href =
          "http://localhost:3001/auth/discord";



      } catch (error) {


        console.error(
          "Auth error:",
          error
        );


      }

    }



    checkAuth();


  }, []);



  return (

    <main
      style={{
        minHeight:"100vh",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        background:"#111827",
        color:"white",
        fontSize:"24px",
      }}
    >

      Загрузка суда San Andreas...

    </main>

  );


}