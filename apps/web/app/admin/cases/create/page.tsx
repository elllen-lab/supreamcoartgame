"use client";


import { useState } from "react";
import { useRouter } from "next/navigation";


export default function CreateCasePage(){


  const router = useRouter();


  const [number,setNumber] =
    useState("");

  const [title,setTitle] =
    useState("");

  const [description,setDescription] =
    useState("");

  const [loading,setLoading] =
    useState(false);



  async function createCase(){


    try {


      setLoading(true);



      const response =
        await fetch(
          "http://localhost:3001/cases",
          {

            method:"POST",

            credentials:"include",

            headers:{
              "Content-Type":
              "application/json",
            },


            body:JSON.stringify({

              number,

              title,

              description,

            }),

          }
        );



      const data =
        await response.json();



      console.log(
        "CREATE CASE:",
        data
      );



      if(!response.ok){

        alert(
          data.message ||
          "Ошибка создания"
        );

        return;

      }



      router.push(
        "/admin/cases"
      );


      router.refresh();



    } catch(error){


      console.error(error);


      alert(
        "Ошибка соединения с сервером"
      );


    } finally {


      setLoading(false);


    }


  }





  return (

    <main className="p-8">


      <h1 className="text-4xl font-bold mb-6">

        Создание судебного дела

      </h1>



      <div
        className="
        max-w-xl
        border
        rounded-xl
        p-6
        grid
        gap-4
        "
      >


        <input

          className="
          border
          rounded
          p-3
          "

          placeholder="Номер дела"

          value={number}

          onChange={
            e=>setNumber(e.target.value)
          }

        />



        <input

          className="
          border
          rounded
          p-3
          "

          placeholder="Название дела"

          value={title}

          onChange={
            e=>setTitle(e.target.value)
          }

        />



        <textarea

          className="
          border
          rounded
          p-3
          "

          placeholder="Описание"

          rows={5}

          value={description}

          onChange={
            e=>setDescription(e.target.value)
          }

        />



        <button

          onClick={createCase}

          disabled={loading}

          className="
          bg-black
          text-white
          rounded
          p-3
          "

        >

          {
            loading
            ?
            "Создание..."
            :
            "Создать дело"
          }


        </button>



      </div>


    </main>

  );

}