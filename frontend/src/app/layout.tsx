import type { Metadata } from "next";
import "./globals.css";
import { Anton} from "next/font/google";
import { Oswald} from "next/font/google";  
import { Open_Sans } from "next/font/google";

const anton = Anton({subsets: ["latin"], weight: "400" }); 
const oswald = Oswald({subsets: ["latin"], weight: "400" });
const open_sans = Open_Sans({ style: "italic",subsets: ["latin"], weight: "400" });

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
       <head>
        <link href="https://fonts.googleapis.com/css2?family=Anton&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Anton&family=Oswald:wght@200..700&display=swap" rel="stylesheet"></link>
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap" rel="stylesheet"></link>
      </head>
      
      <body
        className={`bg-blue-200 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
