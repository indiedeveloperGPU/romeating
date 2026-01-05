import type { Metadata } from "next";
import { Geist, Playfair_Display } from "next/font/google";
import Navbar from "@/components/Navbar"; // Assicurati che l'import sia corretto
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Romeating | Sapori ed Esperienze Romane",
  description: "Scopri i migliori prodotti tipici e food tour esclusivi a Roma.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body
        className={`${geistSans.variable} ${playfair.variable} antialiased flex flex-col min-h-screen`}
      >
        <Navbar />
        
        <main className="grow">
          {children}
        </main>
        <WhatsAppButton />

        <Footer />
      </body>
    </html>
  );
}
