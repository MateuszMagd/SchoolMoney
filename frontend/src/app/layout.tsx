import type { Metadata } from "next";
import "./globals.css";

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
      <body
        className={`bg-blue-200 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
