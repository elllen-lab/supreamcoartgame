import Link from "next/link";
import { cookies } from "next/headers";


export default async function CasesPage() {

  const cookieStore = await cookies();

  const token = cookieStore.get(
    "access_token"
  );


  const response = await fetch(
    "http://localhost:3001/cases",
    {
      headers: {
        Cookie: token
          ? `access_token=${token.value}`
          : "",
      },

      cache: "no-store",
    }
  );


  if (!response.ok) {

    throw new Error(
      await response.text()
    );

  }


  const cases = await response.json();


  return (
    <main className="p-8">

      <h1 className="text-3xl font-bold mb-6">
        Судебные дела
      </h1>


      <div className="grid gap-4">

        {cases.map((item: any) => (

          <Link
            key={item.id}
            href={`/cases/${item.id}`}
            className="
              border 
              rounded-lg 
              p-5 
              hover:bg-gray-100
              transition
            "
          >

            <div className="text-xl font-semibold">
              {item.number}
            </div>


            <div className="mt-1">
              {item.title}
            </div>


            <div className="text-sm text-gray-500 mt-2">
              Статус: {item.status}
            </div>


            <div className="text-sm mt-2">
              Судья:{" "}
              {item.judge?.username || "Не назначен"}
            </div>


            {item.decision && (
              <div className="text-sm mt-2 text-green-600">
                Решение опубликовано
              </div>
            )}

          </Link>

        ))}

      </div>

    </main>
  );
}