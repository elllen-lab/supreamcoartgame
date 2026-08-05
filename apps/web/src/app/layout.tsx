import "./globals.css";

import Link from "next/link";


export const metadata = {
  title: "Supreme Court",
  description: "San Andreas Supreme Court",
};



export default function RootLayout({

  children,

}: {

  children: React.ReactNode;

}) {


  return (

    <html lang="ru">


      <body

        style={{

          margin:0,

          background:"#0f172a",

          color:"#ffffff",

          minHeight:"100vh",

          fontFamily:
          "Arial, Helvetica, sans-serif",

        }}

      >


        <header

          style={{

            height:"70px",

            background:"#111827",

            display:"flex",

            alignItems:"center",

            justifyContent:"space-between",

            padding:"0 30px",

            borderBottom:
            "1px solid #1f2937",

          }}

        >



          <div>


            <h2

              style={{

                margin:0,

                fontSize:"22px",

              }}

            >

              ⚖️ Верховный суд San Andreas

            </h2>


          </div>





          <nav

            style={{

              display:"flex",

              gap:"20px",

            }}

          >


            <Link

              href="/dashboard"

              style={{

                color:"white",

                textDecoration:"none",

              }}

            >

              Главная

            </Link>





            <Link

              href="/cases"

              style={{

                color:"white",

                textDecoration:"none",

              }}

            >

              Дела

            </Link>





            <Link

              href="/users"

              style={{

                color:"white",

                textDecoration:"none",

              }}

            >

              Судьи

            </Link>





            <Link

              href="/audit"

              style={{

                color:"white",

                textDecoration:"none",

              }}

            >

              Аудит

            </Link>



          </nav>




          <a

            href="http://localhost:3001/auth/logout"

            style={{

              color:"#f87171",

              textDecoration:"none",

            }}

          >

            Выйти

          </a>



        </header>





        <main

          style={{

            padding:"30px",

          }}

        >

          {children}

        </main>





      </body>


    </html>


  );

}