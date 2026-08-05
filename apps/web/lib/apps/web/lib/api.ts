import { cookies } from "next/headers";


const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://127.0.0.1:3001";



export async function api<T = any>(
  path: string,
  options: RequestInit = {}
): Promise<T> {


  const cookieStore = await cookies();


  const cookieHeader = cookieStore
    .getAll()
    .map(
      (cookie) =>
        `${cookie.name}=${cookie.value}`
    )
    .join("; ");



  const headers = new Headers(
    options.headers
  );


  if (cookieHeader) {
    headers.set(
      "Cookie",
      cookieHeader
    );
  }



  headers.set(
    "Content-Type",
    "application/json"
  );



  const response = await fetch(
    `${API_URL}${path}`,
    {
      ...options,

      headers,

      cache: "no-store",
    }
  );



  const text =
    await response.text();



  let data:any = null;


  try {

    data =
      text
        ? JSON.parse(text)
        : null;

  } catch {

    data = text;

  }



  console.log(
    "API RESPONSE:",
    response.status,
    data
  );



  if (!response.ok) {


    if (
      response.status === 401
    ) {

      return {
        unauthorized:true,
        data:null
      } as T;

    }



    throw new Error(
      data?.message ||
      `API ERROR ${response.status}`
    );

  }



  return data as T;

}