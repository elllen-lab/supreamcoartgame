"use client";

import {
  useEffect,
  useState,
} from "react";

import ProtectedRoute from "../components/ProtectedRoute";
import Sidebar from "../components/Sidebar";


export default function UsersPage() {


const [users,setUsers] =
useState<any[]>([]);


const [currentUser,setCurrentUser] =
useState<any>(null);


const [error,setError] =
useState("");



const [form,setForm] =
useState({
discordId:"",
username:"",
});





async function loadUsers(){


try{


const res =
await fetch(
"http://localhost:3001/users",
{
credentials:"include",
}
);



const data =
await res.json();



console.log(
"USERS RESPONSE:",
data
);



if(!res.ok){

throw new Error(
data.message ||
"Ошибка загрузки пользователей"
);

}




if(!Array.isArray(data)){


throw new Error(
"API вернул неправильный формат"
);


}




setUsers(data);



}

catch(err:any){

console.error(err);

setError(err.message);

setUsers([]);

}



}







useEffect(()=>{


async function load(){


try{


const me =
await fetch(
"http://localhost:3001/auth/me",
{
credentials:"include",
}
);



const meData =
await me.json();



console.log(
"ME:",
meData
);



if(me.ok){

setCurrentUser(
meData.user
);

}



await loadUsers();



}

catch(err){

console.error(err);

}



}



load();



},[]);







async function createUser(){



const res =
await fetch(
"http://localhost:3001/users",
{
method:"POST",

headers:{
"Content-Type":
"application/json",
},

credentials:"include",

body:
JSON.stringify(form),

}
);



if(res.ok){


alert(
"Пользователь создан"
);



setForm({
discordId:"",
username:"",
});



loadUsers();


}
else{


const data =
await res.json();


alert(
data.message ||
"Ошибка создания"
);


}


}








async function changeRole(
id:string,
role:string
){


const res =
await fetch(
`http://localhost:3001/users/${id}/role`,
{

method:"PATCH",

headers:{
"Content-Type":
"application/json",
},

credentials:"include",

body:
JSON.stringify({
role
}),

}

);



if(res.ok){


alert(
"Роль изменена"
);


loadUsers();


}
else{


const data =
await res.json();


alert(
data.message ||
"Ошибка изменения роли"
);


}



}









return (

<ProtectedRoute>


<div
style={{
display:"flex",
minHeight:"100vh"
}}
>


{
currentUser &&
<Sidebar
role={currentUser.role}
/>
}




<main
style={{
padding:"40px",
width:"100%"
}}
>


<h1>
Пользователи суда San Andreas
</h1>





{
error &&

<div
style={{
color:"red",
marginBottom:"20px"
}}
>

{error}

</div>

}







<div
style={{
background:"#fff",
padding:"20px",
borderRadius:"10px",
border:"1px solid #ddd"
}}
>


<h2>
Создать пользователя
</h2>



<input

placeholder="Discord ID"

value={form.discordId}

onChange={(e)=>
setForm({
...form,
discordId:e.target.value
})
}

/>



<br/><br/>



<input

placeholder="Username"

value={form.username}

onChange={(e)=>
setForm({
...form,
username:e.target.value
})
}

/>



<br/><br/>




<button
onClick={createUser}
>

Создать

</button>


</div>








{
users.length===0 &&

<p>
Пользователи отсутствуют
</p>

}







{
users.map((user)=>(


<div

key={user.id}

style={{
marginTop:"15px",
padding:"20px",
border:"1px solid #ddd",
borderRadius:"10px",
background:"#fff"
}}

>



<h2>
{user.username}
</h2>




<p>
Discord:
{user.discordId}
</p>



<p>
Роль:
<b>
{" "}
{user.role}
</b>
</p>





<select

value={user.role}

onChange={(e)=>
changeRole(
user.id,
e.target.value
)
}

>


<option value="USER">
USER
</option>


<option value="LAWYER">
LAWYER
</option>


<option value="JUDGE">
JUDGE
</option>


<option value="CHIEF_JUDGE">
CHIEF_JUDGE
</option>


<option value="SUPER_ADMIN">
SUPER_ADMIN
</option>



</select>




</div>


))

}




</main>


</div>


</ProtectedRoute>

);


}