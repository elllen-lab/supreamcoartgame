import Link from "next/link";

import { serverApi } from "@/lib/server-api";
import JudgeButton from "@/components/JudgeButton";


export default async function CasePage({

  params,

}: {

  params: Promise<{
    id: string;
  }>;

}) {


  const { id } = await params;



  const [
    item,
    judges,
  ] = await Promise.all([


    serverApi<any>(
      `/cases/${id}`
    ),



    serverApi<any[]>(
      "/users/judges"
    ),


  ]);




  if (!item) {

    return (

      <main className="p-8">

        <h1 className="text-3xl font-bold">
          Дело не найдено
        </h1>


        <Link

          href="/admin/cases"

          className="
          mt-5
          inline-block
          bg-black
          text-white
          px-5
          py-3
          rounded-xl
          "

        >

          Назад

        </Link>


      </main>

    );

  }




  return (

    <main className="p-8">


      <Link

        href="/admin/cases"

        className="underline"

      >

        ← Назад

      </Link>





      <h1 className="text-4xl font-bold mt-5">

        Дело № {item.number}

      </h1>





      <div

        className="
        border
        rounded-xl
        p-6
        mt-5
        space-y-3
        "

      >


        <h2 className="text-2xl font-bold">

          {item.title}

        </h2>



        <p>

          Описание:
          {" "}
          {item.description}

        </p>



        <p>

          Статус:
          {" "}
          {item.status}

        </p>



        <p>

          Автор:
          {" "}
          {
            item.author?.username
            ||
            "Неизвестно"
          }

        </p>




        <p>

          Судья:
          {" "}
          {
            item.judge?.username
            ||
            "Не назначен"
          }

        </p>



      </div>






      <JudgeButton

        caseId={item.id}

        judges={
          Array.isArray(judges)
            ? judges
            : []
        }

      />







      <div

        className="
        mt-6
        border
        rounded-xl
        p-6
        "

      >


        <h2 className="text-2xl font-bold">

          Аудит

        </h2>





        {

          item.auditLogs?.length

          ?


          item.auditLogs.map(

            (log:any)=>(

              <div

                key={log.id}

                className="mt-3"

              >

                <p>

                  {log.action}

                </p>


                <p className="text-gray-500">

                  {log.description}

                </p>


              </div>

            )

          )


          :


          <p>

            Записей нет

          </p>


        }


      </div>




    </main>

  );


}