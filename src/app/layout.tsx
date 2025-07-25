import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { ToastContainer, toast } from 'react-toastify';


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FleetLink",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="${inter.className}">
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}
