import { cookies } from "next/headers";


async function getCases(){

  const cookieStore = await cookies();

  const token =
    cookieStore.get(
      "access_token"
    )?.value;


  const res =
    await fetch(
      "http://localhost:3001/cases",
      {
        headers:{
          Cookie:
          `access_token=${token}`,
        },

        cache:"no-store",
      }
    );


  if(!res.ok){

    throw new Error(
      "Не удалось загрузить дела"
    );

  }


  return res.json();

}




export default async function CasesPage(){


  const cases =
    await getCases();



  return (

    <div
      style={{
        padding:"30px",
      }}
    >


      <h1>
        Судебные дела
      </h1>



      <div
        style={{
          display:"grid",
          gap:"20px",
          marginTop:"30px",
        }}
      >


      {cases.map((item:any)=>(


        <div

          key={item.id}

          style={{
            border:"1px solid #ddd",
            padding:"20px",
            borderRadius:"10px",
          }}

        >


          <h2>
            {item.number}
          </h2>


          <p>
            <b>
            Название:
            </b>
            {" "}
            {item.title}
          </p>


          <p>
            <b>
            Описание:
            </b>
            {" "}
            {item.description}
          </p>



          <p>
            <b>
            Статус:
            </b>
            {" "}
            {item.status}
          </p>



          <p>
            <b>
            Автор:
            </b>
            {" "}
            {item.author?.username}
          </p>



          <p>
            <b>
            Судья:
            </b>
            {" "}
            {
            item.judge?.username
            ||
            "Не назначен"
            }
          </p>



        </div>


      ))}


      </div>


    </div>

  );


}