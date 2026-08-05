"use client";

import {
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";


export default function JudgeButton({

  caseId,

  judges = [],

}: {

  caseId:string;

  judges?:any[];

}) {


  const router = useRouter();


  const [
    judgeId,
    setJudgeId
  ] = useState("");



  const [
    loading,
    setLoading
  ] = useState(false);




  async function assignJudge(){


    if(!judgeId)
      return;



    setLoading(true);


    try {


      const response =
        await fetch(
          `/api/admin/cases/${caseId}/judge`,
          {
            method:"PATCH",

            headers:{
              "Content-Type":
              "application/json",
            },


            credentials:"include",


            body:JSON.stringify({
              judgeId,
            }),
          }
        );



      const data =
        await response.json();



      if(!response.ok){

        throw new Error(
          data.message ||
          "Ошибка назначения"
        );

      }



      router.refresh();



    }

    catch(error:any){

      alert(
        error.message
      );

    }


    finally{

      setLoading(false);

    }

  }





  return (

    <div className="mt-5">

      <h3 className="font-bold mb-2">
        Назначить судью
      </h3>



      <select

        className="
        border
        rounded
        p-2
        "

        value={judgeId}

        onChange={
          e =>
          setJudgeId(
            e.target.value
          )
        }

      >

        <option value="">
          Выберите судью
        </option>



        {
          Array.isArray(judges) &&

          judges.map(
            judge => (

              <option

                key={judge.id}

                value={judge.id}

              >

                {judge.username}

              </option>

            )
          )

        }


      </select>



      <button

        onClick={assignJudge}

        disabled={loading}

        className="
        ml-3
        bg-black
        text-white
        px-4
        py-2
        rounded
        "

      >

        {
          loading
          ?
          "Назначение..."
          :
          "Назначить"
        }


      </button>


    </div>

  );


}