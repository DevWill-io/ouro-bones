import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { AuthProvider } from "@/components/providers/AuthProvider";
import { CartProvider } from "@/components/providers/CartProvider";
import { Toaster } from "@/components/ui/toaster";
import { PWARegister } from "@/components/PWARegister";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://ouro-bones.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Ouro Bonés — Bonés personalizados no atacado",
    template: "%s | Ouro Bonés",
  },
  description:
    "Bonés personalizados de altíssima qualidade. Atacado a partir de 30 unidades, envio para todo o Brasil e Frete Grátis em condições especiais.",
  keywords: [
    "bonés personalizados",
    "atacado",
    "bonés para empresa",
    "brindes",
    "Ouro Bonés",
  ],
  applicationName: "Ouro Bonés",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Ouro Bonés",
  },
  icons: {
    icon: [
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE_URL,
    siteName: "Ouro Bonés",
    title: "Ouro Bonés — Bonés personalizados no atacado",
    description:
      "Sua marca na cabeça do cliente. Atacado a partir de 30 unidades.",
    images: [
      {
        url: "/icons/icon-512x512.png",
        width: 512,
        height: 512,
        alt: "Ouro Bonés",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ouro Bonés — Bonés personalizados no atacado",
    description:
      "Sua marca na cabeça do cliente. Atacado a partir de 30 unidades.",
    images: ["/icons/icon-512x512.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#DDAF06" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning className={inter.variable}>
      <body className="min-h-dvh bg-background font-sans text-foreground antialiased no-x-scroll">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>
            <CartProvider>{children}</CartProvider>
          </AuthProvider>
          <Toaster />
        </ThemeProvider>

        <PWARegister />
      </body>
    </html>
  );
}
