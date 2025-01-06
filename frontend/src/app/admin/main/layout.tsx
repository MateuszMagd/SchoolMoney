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
        <body className={`bg-blue-200 antialiased`}>
            <nav className="flex flex-row space-x-5 justify-center bg-blue-500 text-xl p-4 rounded-md">
                <RouterButton page="admin/main/users" buttonString = "Users"/>
                <RouterButton page="admin/main/children" buttonString = "Children"/>
                <RouterButton page="admin/main/classes" buttonString = "Classes"/>
                <RouterButton page="admin/main/funds" buttonString = "funds"/>
            </nav>
            {children}
        </body>
    </html>
  );
}
