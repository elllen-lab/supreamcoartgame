import { serverApi } from "@/lib/server-api";
import Link from "next/link";


export default async function AdminCasesPage() {


  const cases = await serverApi<any[]>(
    "/cases"
  );


  return (

    <main className="p-8">


      <h1 className="text-4xl font-bold mb-6">
        Управление судебными делами
      </h1>



      <Link
        href="/admin/cases/create"
        className="
        inline-block
        bg-black
        text-white
        px-6
        py-3
        rounded-xl
        mb-8
        "
      >

        Создать новое дело

      </Link>



      <div className="grid gap-5">


        {cases.map((item)=>(
          

          <Link

          href={`/admin/cases/${item.id}`}

          key={item.id}

          className="
          block
          border
          rounded-xl
          p-6
          hover:bg-gray-50
          "

          >


            <h2 className="text-2xl font-bold">

              {item.number}

            </h2>



            <p className="mt-2">

              {item.title}

            </p>



            <p className="text-gray-500 mt-2">

              Статус:
              {" "}
              {item.status}

            </p>



            <p>

              Судья:
              {" "}

              {
                item.judge
                ?
                item.judge.username
                :
                "Не назначен"
              }

            </p>



          </Link>


        ))}


      </div>


    </main>

  );


}