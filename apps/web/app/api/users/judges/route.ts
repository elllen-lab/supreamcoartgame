import { NextResponse } from "next/server";
import { cookies } from "next/headers";


const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:3001";



export async function GET() {


  const cookieStore =
    await cookies();



  const token =
    cookieStore.get(
      "access_token"
    );



  const response =
    await fetch(
      `${API_URL}/users/judges`,
      {

        headers: {

          Cookie:
            token
            ?
            `access_token=${token.value}`
            :
            "",

        },

        cache:
          "no-store",

      }
    );



  const data =
    await response.json();



  return NextResponse.json(
    data,
    {
      status:
        response.status,
    }
  );


}