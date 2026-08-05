import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";


const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:3001";



export async function PATCH(

  request: NextRequest,

  context: {
    params: Promise<{
      id: string;
    }>;
  }

) {


  try {


    const { id } =
      await context.params;



    const body =
      await request.json();



    const cookieStore =
      await cookies();



    const token =
      cookieStore.get(
        "access_token"
      );



    const response =
      await fetch(

        `${API_URL}/cases/${id}/judge`,

        {

          method:"PATCH",


          headers: {

            "Content-Type":
              "application/json",


            Cookie:
              token
              ?
              `access_token=${token.value}`
              :
              "",

          },


          body:

            JSON.stringify(body),


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



  } catch(error){


    console.log(
      "JUDGE ROUTE ERROR:",
      error
    );


    return NextResponse.json(

      {
        message:
          "Internal server error",
      },

      {
        status:500,
      }

    );


  }


}