"use client";


import {
  useEffect,
  useState,
} from "react";



interface User {

  username:string;

  discordId:string;

  role:string;

}




export default function Dashboard(){


const [user,setUser] =
useState<User | null>(null);



useEffect(()=>{


async function loadUser(){


try{


const res = await fetch(

"http://localhost:3001/auth/me",

{

credentials:"include",

}

);



const data = await res.json();



console.log(
"USER:",
data
);



if(data.authenticated){

setUser(data.user);

}



}

catch(error){


console.error(
"AUTH ERROR:",
error
);


}


}



loadUser();



},[]);





return (


<main

style={{

padding:"35px",

background:"#f3f4f6",

minHeight:"100vh",

}}

>


<div

style={{

background:"white",

borderRadius:"12px",

padding:"30px",

boxShadow:
"0 4px 15px rgba(0,0,0,0.08)"

}}

>


<h1>

Панель управления

</h1>



<p>

Добро пожаловать в Верховный суд San Andreas

</p>



<hr />





{
user &&

<div>


<h3>

Профиль пользователя

</h3>



<p>

Имя:

{" "}

<b>

{user.username}

</b>

</p>




<p>

Discord:

{" "}

{user.discordId}

</p>





<p>

Роль:

{" "}

<b>

{user.role}

</b>

</p>



</div>

}



{
!user &&

<p>

Загрузка профиля...

</p>

}



</div>





<br />





<div

style={{

display:"grid",

gridTemplateColumns:
"repeat(3,1fr)",

gap:"20px"

}}

>



<Card

title="Открытые дела"

value="0"

/>



<Card

title="Судьи"

value="0"

/>



<Card

title="Решения"

value="0"

/>



</div>



</main>


);


}






function Card({

title,

value,

}:{

title:string;

value:string;

}){


return (

<div

style={{

background:"white",

padding:"25px",

borderRadius:"12px",

boxShadow:
"0 4px 15px rgba(0,0,0,0.08)"

}}

>


<h3>

{title}

</h3>



<p

style={{

fontSize:"32px",

fontWeight:"bold",

}}

>

{value}

</p>



</div>

);


}