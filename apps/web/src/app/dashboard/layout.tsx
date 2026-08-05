import "./globals.css";


import Sidebar from "@/components/Sidebar";

import Header from "@/components/Header";



export const metadata = {

title:"San Andreas Supreme Court",

description:"Court Portal",

};



export default function RootLayout({

children,

}:{

children:React.ReactNode;

}){


return (

<html lang="ru">


<body>


<div

style={{

display:"flex",

minHeight:"100vh",

}}

>



<Sidebar />



<div

style={{

flex:1,

display:"flex",

flexDirection:"column",

}}

>


<Header />



<main

style={{

padding:"35px",

}}

>


{children}


</main>


</div>


</div>



</body>


</html>


);


}