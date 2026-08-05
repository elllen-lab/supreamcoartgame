"use client";


import {
useEffect,
useState
} from "react";



export default function CasesPage(){


const [cases,setCases]=useState<any[]>([]);

const [error,setError]=useState("");

const [loading,setLoading]=useState(true);




useEffect(()=>{


async function loadCases(){


try{


const res = await fetch(

"http://localhost:3001/cases",

{

credentials:"include"

}

);



const data = await res.json();



console.log(
"CASES API:",
data
);



if(!res.ok){

throw new Error(
data.message || "Не удалось загрузить дела"
);

}



if(Array.isArray(data)){

setCases(data);

}

else{

setCases([]);

}


}

catch(e:any){

console.error(e);

setError(e.message);

}

finally{

setLoading(false);

}


}



loadCases();



},[]);





if(loading){

return <h1>
Загрузка дел...
</h1>

}




if(error){

return (

<div>

<h1>
Дела Верховного суда San Andreas
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

Дела Верховного суда San Andreas

</h1>



{

cases.length===0 &&

<p>
Дел нет
</p>

}




{

cases.map((item)=>(


<div

key={item.id}

style={{

border:"1px solid #444",

padding:"15px",

margin:"10px",

borderRadius:"8px"

}}

>


<h3>

{item.title}

</h3>



<p>

Номер:

{item.number}

</p>



<p>

Автор:

{item.author?.username || "Нет"}

</p>



<p>

Судья:

{
item.judge?.username 
||
"Не назначен"
}

</p>



<p>

Статус:

{item.status}

</p>



</div>


))


}



</div>


)

}