"use client";

import {
  useEffect,
  useState
} from "react";


export default function UsersPage(){


const [users,setUsers] = useState<any[]>([]);

const [loading,setLoading] = useState(true);

const [error,setError] = useState("");



useEffect(()=>{


async function loadUsers(){


try {


const res = await fetch(
"http://localhost:3001/users",
{
credentials:"include"
}
);



const data = await res.json();



console.log("USERS API:",data);



if(!res.ok){

throw new Error(
data.message || "Ошибка загрузки пользователей"
);

}




if(Array.isArray(data)){

setUsers(data);

}

else{

setUsers([]);

throw new Error(
"API вернул неправильный формат"
);

}



}
catch(err:any){


console.error(err);

setError(err.message);


}

finally{

setLoading(false);

}


}



loadUsers();


},[]);





if(loading){

return (

<div>

<h1>
Пользователи суда
</h1>

<p>
Загрузка...
</p>

</div>

);

}




if(error){

return (

<div>

<h1>
Пользователи суда
</h1>

<p style={{color:"red"}}>
{error}
</p>


</div>

)

}





return (

<div>


<h1>
Пользователи суда San Andreas
</h1>



{

users.length === 0 &&

<p>
Пользователи отсутствуют
</p>

}




{

users.map((user)=>(


<div

key={user.id}

style={{

border:"1px solid #444",

padding:"15px",

margin:"10px",

borderRadius:"8px"

}}

>


<h3>

{user.username}

</h3>



<p>

Discord:

{user.discordId}

</p>



<p>

Роль:

{user.role}

</p>



</div>


))


}



</div>


);


}