"use client";

import ProtectedRoute from "../components/ProtectedRoute";
import Sidebar from "../components/Sidebar";


export default function AuditPage(){


return (

<ProtectedRoute>


<div style={{
display:"flex",
minHeight:"100vh"
}}>


<Sidebar role="SUPER_ADMIN"/>


<main style={{
padding:"40px"
}}>


<h1>
Журнал аудита
</h1>


<p>
История действий пользователей
</p>


</main>


</div>


</ProtectedRoute>

);


}