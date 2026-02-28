import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Azules Violeta | Fidelización & Belleza",
  description: "Únete al Club Violeta, acumula puntos con tus facturas y canjea por los mejores productos de belleza.",
  keywords: ["belleza", "fidelización", "puntos", "regalos", "maquillaje", "club violeta"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={inter.variable}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
