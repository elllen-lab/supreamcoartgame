"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";


import {
  clientApi,
} from "@/lib/client-api";



type User = {

  id:string;

  discordId:string;

  username:string;

  role:string;

};



type AuthContextType = {

  user:User | null;

  loading:boolean;

};



const AuthContext =
createContext<AuthContextType>({

  user:null,

  loading:true,

});





export function AuthProvider({

  children,

}:{

  children:React.ReactNode;

}) {



  const [user,setUser] =
  useState<User | null>(null);



  const [loading,setLoading] =
  useState(true);





  async function checkAuth(){


    try {


      const data =
      await clientApi<{

        authenticated:boolean;

        user:User;

      }>("/auth/me");





      if(data.authenticated){

        setUser(
          data.user
        );

      }
      else{

        setUser(null);

      }



    }

    catch(error){


      console.log(
        "AUTH ERROR:",
        error
      );


      setUser(null);


    }


    finally{

      setLoading(false);

    }


  }






  useEffect(()=>{


    checkAuth();


  },[]);







  return (


    <AuthContext.Provider

      value={{

        user,

        loading,

      }}

    >

      {children}


    </AuthContext.Provider>


  );


}






export function useAuth(){

  return useContext(
    AuthContext
  );

}