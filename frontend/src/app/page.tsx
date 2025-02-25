"use client"

// page.tsx
import RouterButton from "@/components/routerButton"
import  { isLogged, clearToken } from "@/data/tokenHandler";
import { useEffect, useState } from "react";

function test() {
  alert(isLogged());
}

export default function Home() {
  const [logged, setLogged] = useState<boolean>(false);

  useEffect(() => {
    setLogged(isLogged());
   }, [logged]);

  function logout() { 
    alert("You have been logged out!");
    setLogged(false);
    clearToken()
  }


  // return (
  //   <div className="bg-blue-300 ">
  //     <main className="flex flex-col p-20 mt-20 space-y-6">
        
  //       {isLogged() ?
  //         <>
  //           <button onClick={logout}>Logout!</button> 
  //           <RouterButton page="parent-details" buttonString = "Konto rodzica"/>
  //           <RouterButton page="fund-page" buttonString = "Zbiórka"/>
  //           <RouterButton page="transactions" buttonString = "Przelewy"/>
  //           <RouterButton page="class" buttonString = "Klasa"/>
  //           <RouterButton page="chat" buttonString = "Chat"/>
  //           <button onClick={test}>Show me if logged!</button>
            
  //         </>
  //         : 
  //         <>
  //           <RouterButton page="register" buttonString = "Rejestracja"/>
  //           <RouterButton page="login" buttonString = "Logowanie"/>
            
  //         </>}
  //     </main>
  //     <footer className="">
        
  //     </footer>
  //   </div>
  // );
  return (
    <div 
        className="min-h-screen flex justify-center items-center bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/main_page_background_2.png')" }} 
    >
      <main className="flex flex-col p-20 mt-20 space-y-6">
        
        {isLogged() ? (
          <>
            <div className="fixed top-0 left-0 w-full bg-white shadow-md p-4 flex items-center justify-between">
            <h1 className="text-dark_blue text-[35px] font-anton ml-6">ZBIÓRKI KLASOWE</h1> 
            <button onClick={logout} 
                className="w-[100px] h-[40px] text-dark_blue bg-transparent font-anton text-[22px] mr-5">
                WYLOGUJ
            </button>

            </div>
          
          <div className="flex flex-col space-y-8 justify-center b-20 relative top-[-80px]">

          <div className="flex flex-row space-x-8 mr-6 font-anton text-[22px]">
            <RouterButton page="parent-details" buttonString="Konto Rodzica" color="bg-dark_blue" width="w-[200px]" height="h-[100px]"/>
            <RouterButton page="fund-page" buttonString="Zbiórka" color="bg-normal_blue" width="w-[200px]" height="h-[100px]"/>
          </div> 

          <div className="flex flex-row space-x-8 mr-6 font-anton text-[22px]">
            <RouterButton page="transactions" buttonString="Przelewy" color="bg-light_blue" width="w-[200px]" height="h-[100px]"/>
            <RouterButton page="class" buttonString="Klasa" color="bg-marine" width="w-[200px]" height="h-[100px]"/>
          </div>

          <div className="flex flex-row mr-[25px] font-anton text-[22px] justify-center">
            <RouterButton page="chat" buttonString="Chat" color="bg-light_marine" width="w-[200px]" height="h-[100px]"/>
          </div>
          
          </div>
          
            {/* <button onClick={test}>Show me if logged!</button> */}
         
          </>
        ) : (
          <div className="fixed top-0 left-0 w-full bg-white shadow-md p-4 flex items-center justify-between">
          <h1 className="text-dark_blue text-[35px] font-anton ml-6">ZBIÓRKI KLASOWE</h1>
          <div className="flex space-x-8 mr-6 font-anton text-[22px]">
              <RouterButton page="register" buttonString="REJESTRACJA" color="bg-transparent text-dark_blue hover:text-dark_blue !text-dark_blue" width="w-[100px]" height="h-[40px]"/>
              <RouterButton page="login" buttonString="LOGOWANIE" color="bg-transparent text-dark_blue hover:text-dark_blue !text-dark_blue" width="w-[100px]" height="h-[40px]"/>
          </div>
      </div>
      
        )}
      </main>
      <footer></footer>
    </div>
);

}
