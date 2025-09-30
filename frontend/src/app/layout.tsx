"use client";

import { usePathname } from "next/navigation";
import { AuthProvider } from "@/context/AuthContext";

import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const hideSidebar = pathname.startsWith("/auth");

  return (
    <html lang="es">
      <head>
        <title>LoanFlow | Sistema de gestión de préstamos</title>
        <meta name="description" content="Sistema de gestión de préstamos" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${inter.variable} antialiased`}>
        {!hideSidebar && <Sidebar />}
        <AuthProvider>
          <main className={hideSidebar ? "" : "ml-64"}>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
