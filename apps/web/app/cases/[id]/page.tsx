"use client";

import {
  useEffect,
  useState,
  use,
} from "react";

import ProtectedRoute from "../../components/ProtectedRoute";
import Sidebar from "../../components/Sidebar";


export default function CasePage({

  params,

}: {

  params: Promise<{
    id:string;
  }>;

}) {


  const { id } = use(params);



  const [user,setUser] =
    useState<any>(null);



  const [caseData,setCaseData] =
    useState<any>(null);



  const [judges,setJudges] =
    useState<any[]>([]);



  const [selectedJudge,setSelectedJudge] =
    useState("");





  async function loadCase(){


    const res =
      await fetch(
        `http://localhost:3001/cases/${id}`,
        {
          credentials:"include",
        }
      );


    const data =
      await res.json();


    setCaseData(data);

  }





  async function loadJudges(){


    const res =
      await fetch(
        "http://localhost:3001/users/judges",
        {
          credentials:"include",
        }
      );


    const data =
      await res.json();


    setJudges(data);

  }







  useEffect(()=>{


    async function load(){


      try{


        const userRes =
          await fetch(
            "http://localhost:3001/auth/me",
            {
              credentials:"include",
            }
          );


        const userJson =
          await userRes.json();



        setUser(
          userJson.user
        );



        await loadCase();


        await loadJudges();



      }
      catch(error){


        console.error(
          "LOAD ERROR:",
          error
        );


      }


    }



    load();



  },[id]);







  async function assignJudge(){


    if(!selectedJudge){

      alert(
        "Выберите судью"
      );

      return;

    }




    const res =
      await fetch(

        `http://localhost:3001/cases/${id}/judge`,

        {

          method:"PATCH",


          headers:{
            "Content-Type":
            "application/json",
          },


          credentials:"include",


          body:
          JSON.stringify({

            judgeId:selectedJudge

          }),

        }

      );





    if(res.ok){


      alert(
        "Судья назначен"
      );


      loadCase();


    }
    else{


      alert(
        "Ошибка назначения судьи"
      );


    }



  }







  return (

    <ProtectedRoute>


      <div

        style={{
          display:"flex",
          minHeight:"100vh",
        }}

      >



        {
          user &&

          <Sidebar
            role={user.role}
          />

        }






        <main

          style={{
            padding:"40px",
            width:"100%",
            background:"#f5f5f5",
          }}

        >




          {
            caseData && (


              <div

                style={{
                  background:"#fff",
                  padding:"30px",
                  borderRadius:"10px",
                }}

              >



                <h1>
                  ⚖ Дело {caseData.number}
                </h1>



                <hr />



                <h2>
                  {caseData.title}
                </h2>




                <p>

                  <b>
                    Описание:
                  </b>

                  <br/>

                  {caseData.description}

                </p>





                <p>

                  <b>
                    Статус:
                  </b>

                  <br/>

                  {caseData.status}

                </p>







                <p>

                  <b>
                    Судья:
                  </b>

                  <br/>


                  {
                    caseData.judge
                    ?
                    caseData.judge.username
                    :
                    "Не назначен"
                  }


                </p>







                {
                  (
                    user?.role === "SUPER_ADMIN" ||
                    user?.role === "CHIEF_JUDGE"
                  )
                  &&

                  !caseData.judge && (


                  <div

                    style={{
                      marginTop:"20px",
                      padding:"20px",
                      border:"1px solid #ddd",
                      borderRadius:"10px",
                    }}

                  >


                    <h3>
                      Назначить судью
                    </h3>




                    <select

                      value={selectedJudge}

                      onChange={(e)=>
                        setSelectedJudge(
                          e.target.value
                        )
                      }

                    >


                      <option value="">
                        Выберите судью
                      </option>



                      {
                        judges.map((judge)=>(

                          <option

                            key={judge.id}

                            value={judge.id}

                          >

                            {judge.username}

                          </option>


                        ))
                      }



                    </select>




                    <br/>
                    <br/>



                    <button

                      onClick={assignJudge}

                      style={{
                        padding:"10px 20px",
                      }}

                    >

                      Назначить

                    </button>



                  </div>


                  )

                }








                <h3>
                  История действий
                </h3>





                {
                  caseData.auditLogs?.map(
                    (log:any)=>(


                      <div

                        key={log.id}

                        style={{
                          padding:"10px",
                          borderBottom:
                          "1px solid #ddd",
                        }}

                      >


                        <b>
                          {log.action}
                        </b>


                        <br/>


                        {log.details}


                        <br/>


                        <small>

                          {
                            new Date(
                              log.createdAt
                            ).toLocaleString()
                          }

                        </small>


                      </div>


                    )
                  )
                }





              </div>


            )
          }





        </main>



      </div>



    </ProtectedRoute>

  );

}