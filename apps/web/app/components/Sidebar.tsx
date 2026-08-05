"use client";

import Link from "next/link";


export default function Sidebar({
  role,
}: {
  role:string;
}) {


  return (

    <aside
      style={{
        width:"250px",
        minHeight:"100vh",
        background:"#111827",
        color:"white",
        padding:"20px",
      }}
    >

      <h2>
        ⚖ San Andreas Court
      </h2>


      <nav>

        <p>
          <Link href="/dashboard">
            Главная
          </Link>
        </p>


        <p>
          <Link href="/cases">
            Дела
          </Link>
        </p>



        {
          (
            role === "SUPER_ADMIN" ||
            role === "CHIEF_JUDGE"
          ) && (

            <p>
              <Link href="/users">
                Пользователи
              </Link>
            </p>

          )
        }



        <p>
          <Link href="/audit">
            Аудит
          </Link>
        </p>


      </nav>


      <hr />


      <small>
        Роль:
        <br/>
        {role}
      </small>


    </aside>

  );

}