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


  return (
    <div className="bg-blue-300 ">
      <main className="flex flex-col p-20 mt-20 space-y-6">
        
        {isLogged() ?
          <>
            <button onClick={logout}>Logout!</button> 
            <RouterButton page="parent-details" buttonString = "Konto rodzica"/>
            <RouterButton page="fund-page" buttonString = "Zbiórka"/>
            <RouterButton page="transactions" buttonString = "Przelewy"/>
            <RouterButton page="class" buttonString = "Klasa"/>
            <RouterButton page="chat" buttonString = "Chat"/>
            <button onClick={test}>Show me if logged!</button>
            
          </>
          : 
          <>
            <RouterButton page="register" buttonString = "Rejestracja"/>
            <RouterButton page="login" buttonString = "Logowanie"/>
          </>}
      </main>
      <footer className="">
        
      </footer>
    </div>
  );
}
