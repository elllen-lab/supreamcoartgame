import { serverApi } from "@/lib/server-api";
import Link from "next/link";


export default async function AdminPage(){


  const me =
    await serverApi<any>(
      "/auth/me"
    );



  if(
    !me.authenticated ||
    me.user.role !== "SUPER_ADMIN"
  ){

    return (

      <main className="p-8">

        <h1 className="text-3xl font-bold text-red-600">
          Доступ запрещён
        </h1>


        <p className="mt-2">
          Требуются права SUPER_ADMIN
        </p>


        <Link
          href="/"
          className="
          text-blue-600
          underline
          mt-4
          inline-block
          "
        >

          На главную

        </Link>


      </main>

    );

  }




  return (

    <main className="p-8">


      <h1 className="text-4xl font-bold mb-8">
        Панель администратора
      </h1>



      <div
        className="
        border
        rounded-xl
        p-6
        bg-gray-100
        mb-6
        "
      >

        <h2 className="text-2xl font-semibold">
          Администратор
        </h2>


        <p className="mt-2">
          Пользователь:
          {" "}
          {me.user.username}
        </p>


        <p>
          Discord ID:
          {" "}
          {me.user.discordId}
        </p>


        <p>
          Роль:
          {" "}
          {me.user.role}
        </p>


      </div>





      <div
        className="
        grid
        md:grid-cols-3
        gap-5
        "
      >


        <Link

          href="/admin/users"

          className="
          border
          rounded-xl
          p-6
          hover:bg-gray-100
          "

        >

          <h3 className="text-xl font-bold">
            Пользователи
          </h3>

          <p>
            Управление аккаунтами
          </p>

        </Link>





        <Link

          href="/admin/cases"

          className="
          border
          rounded-xl
          p-6
          hover:bg-gray-100
          "

        >

          <h3 className="text-xl font-bold">
            Судебные дела
          </h3>

          <p>
            Создание и назначение судей
          </p>

        </Link>





        <Link

          href="/admin/audit"

          className="
          border
          rounded-xl
          p-6
          hover:bg-gray-100
          "

        >

          <h3 className="text-xl font-bold">
            Аудит

          </h3>


          <p>
            История действий
          </p>


        </Link>



      </div>



    </main>

  );

}