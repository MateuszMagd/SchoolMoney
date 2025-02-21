import type { Metadata } from "next";
import "@/app/globals.css";
import RouterButton from "@/components/routerButton";

export const metadata: Metadata = {
  title: "SchoolMoney",
  description: "Created by Martyna Kaszczyk, Mariusz Kamiński, Mateusz Magdziński.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <body className={`antialiased`}>
            <nav className="flex flex-row space-x-20 justify-center bg-dark_blue text-xl p-4 rounded-md font-bold text-[17px]">
                <RouterButton page="admin/main/users" buttonString="UŻYTKOWNICY" color="bg-dark_blue" width="w-[150px]" height="h-[25px]"/>
                <RouterButton page="admin/main/children" buttonString="DZIECI" color="bg-dark_blue" width="w-[150px]" height="h-[25px]"/>
                <RouterButton page="admin/main/classes" buttonString="KLASY" color="bg-dark_blue" width="w-[150px]" height="h-[25px]"/>
                <RouterButton page="admin/main/funds" buttonString="ZBIÓRKI" color="bg-dark_blue" width="w-[150px]" height="h-[25px]"/>
            </nav>
            {children}
        </body>
    </html>
  );
}
