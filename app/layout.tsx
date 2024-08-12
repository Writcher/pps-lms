import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./ui/globals.css";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LabTrack",
  description: "Proyecto PPS Gimenez",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.className} antialiased`}>
        
          {children}
        
      </body>
    </html>
  );
}
