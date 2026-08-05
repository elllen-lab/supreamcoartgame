const API_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  "http://localhost:3001";



export async function api(
  path:string,
  options:RequestInit = {},
){


  const response = await fetch(

    `${API_URL}${path}`,

    {

      ...options,

      credentials:"include",

      headers:{

        "Content-Type":
          "application/json",

        ...(options.headers ?? {}),

      },

    },

  );



  return response.json();

}