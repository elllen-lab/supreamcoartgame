"use client";


import {
  useEffect
} from "react";



export default function Home(){



useEffect(()=>{


async function auth(){



try{



const response =
await fetch(
"http://localhost:3001/auth/me",
{


credentials:"include",


}
);




const data =
await response.json();





console.log(
"AUTH RESULT",
data
);





if(data.authenticated){


window.location.href =
"/dashboard";


return;


}





window.location.href =
"http://localhost:3001/auth/discord";




}
catch(error){


console.error(
"AUTH ERROR",
error
);



}



}



auth();



},[]);





return (

<main

style={{

height:"100vh",

display:"flex",

alignItems:"center",

justifyContent:"center",

background:"#111827",

color:"white",

fontSize:"25px",

}}

>

⚖️ Загрузка суда San Andreas...

</main>


);


}