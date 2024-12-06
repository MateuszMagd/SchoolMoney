// page.tsx
import RouterButton from "@/components/routerButton"

export default function Home() {
  return (
    <div className="bg-blue-300 ">
      <main className="flex flex-col p-20 mt-20 space-y-6">
        <RouterButton page="register" buttonString = "Rejestracja"/>
        <RouterButton page="login" buttonString = "Logowanie"/>
        <RouterButton page="parent-details" buttonString = "Konto rodzica"/>
        <RouterButton page="fund-page" buttonString = "Zbiórka"/>
        <RouterButton page="transactions" buttonString = "Przelewy"/>
        <RouterButton page="class" buttonString = "Klasa"/>
        <RouterButton page="chat" buttonString = "Chat"/>
      </main>
      <footer className="">
        
      </footer>
    </div>
  );
}
