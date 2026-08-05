"use client";


import {useEffect,useState} from "react";


export default function Audit(){


const [logs,setLogs]=useState<any[]>([]);



useEffect(()=>{


fetch(
"http://localhost:3001/audit",
{
credentials:"include"
}
)
.then(r=>r.json())
.then(setLogs);


},[]);



return (

<div>

<h1>
Журнал действий
</h1>


{
logs.map(log=>(


<div key={log.id}>


<p>
{log.action}
</p>


<p>
Пользователь:
{log.user?.username}
</p>


<hr/>


</div>


))
}


</div>


)

}