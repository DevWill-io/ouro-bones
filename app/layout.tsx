import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { CartProvider } from "@/components/providers/CartProvider";
import { Toaster } from "@/components/ui/toaster";
import { PWARegister } from "@/components/PWARegister";
import { json } from 'react-router-dom';

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  manifest: "/manifest.json",
  appleWebApp: {
  capable: true,
  statusBarStyle: "black-translucent",
  title: "Ouro Bonés",
  title: "Ouro Bonés — Bonés personalizados no atacado",
  description:
    "Bonés personalizados de altíssima qualidade. Atacado a partir de 30 unidades, envio para todo o Brasil e Frete Grátis em condições especiais.",
  keywords: ["bonés personalizados", "atacado", "bonés para empresa", "brindes", "Ouro Bonés"],
  openGraph: {
    title: "Ouro Bonés — Bonés personalizados no atacado",
    description: "Sua marca na cabeça do cliente. Atacado a partir de 30 unidades.",
    type: "website",
    locale: "pt_BR",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning className={inter.variable}>
      <body className="min-h-dvh bg-background font-sans text-foreground antialiased no-x-scroll">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <CartProvider>{children}</CartProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}