import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
});

export const metadata: Metadata = {
  title: "InvitaWeb",
  description: "Plataforma de invitaciones digitales inteligentes",
};

import { Suspense } from "react";
import { ProgressBar } from "@/components/shared/progress-bar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.variable} ${fraunces.variable} antialiased`}>
        <Suspense fallback={null}>
          <ProgressBar />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
