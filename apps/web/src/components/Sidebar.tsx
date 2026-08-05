export default function Sidebar() {


return (

<aside

style={{

width:"230px",

background:"#111827",

color:"white",

minHeight:"100vh",

padding:"25px",

}}

>


<h2>

⚖️ San Andreas Court

</h2>



<nav

style={{

display:"flex",

flexDirection:"column",

gap:"15px",

marginTop:"30px",

}}

>


<a href="/dashboard">
Главная
</a>


<a href="/cases">
Дела
</a>


<a href="/users">
Пользователи
</a>


<a href="/audit">
Аудит
</a>


</nav>



</aside>

);


}