"use client";

import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import ProtectedRoute from "../components/ProtectedRoute";


export default function Dashboard() {

  const [user, setUser] = useState<any>(null);


  useEffect(() => {

    async function loadUser() {

      const res = await fetch(
        "http://localhost:3001/auth/me",
        {
          credentials: "include",
        }
      );


      const data = await res.json();

      console.log("USER:", data);

      setUser(data.user);

    }


    loadUser();

  }, []);



  return (

    <ProtectedRoute>


      <div
        style={{
          display:"flex",
          minHeight:"100vh",
          background:"#f5f5f5",
        }}
      >


        {
          user && (
            <Sidebar
              role={user.role}
            />
          )
        }



        <main
          style={{
            padding:"40px",
            color:"#111",
          }}
        >

          <h1>
            Верховный суд San Andreas
          </h1>


          {
            user && (

              <>
                <h2>
                  Добро пожаловать, {user.username}
                </h2>


                <p>
                  Discord:
                  <br/>
                  {user.discordId}
                </p>


                <p>
                  Роль:
                  <br/>

                  <b>
                    {user.role}
                  </b>

                </p>

              </>

            )
          }


        </main>


      </div>


    </ProtectedRoute>

  );
}