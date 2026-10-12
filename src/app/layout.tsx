import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { Toaster } from 'sonner';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppFloatButton } from '@/components/layout/WhatsAppFloatButton';
import { BackToTop } from '@/components/layout/BackToTop';
import { CookieBanner } from '@/components/layout/CookieBanner';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { SITE } from '@/lib/constants';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — Bonés personalizados no atacado`,
    template: `%s | ${SITE.name}`,
  },
  description: 'Bonés personalizados no atacado para marcas e empresas. Pedido mínimo 30 unidades. Orçamento pelo WhatsApp.',
  keywords: ['bonés personalizados', 'atacado de bonés', 'boné com logo', 'boné corporativo'],
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} — Bonés personalizados no atacado`,
    description: 'Bonés personalizados no atacado. Orçamento direto no WhatsApp.',
    images: ['/images/og/og-default.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE.name,
    description: 'Bonés personalizados no atacado.',
    images: ['/images/og/og-default.jpg'],
  },
  alternates: { canonical: '/' },
  robots: { index: true, follow: true },
  manifest: '/manifest.webmanifest',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning className={inter.variable}>
      <body className="min-h-dvh flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
          <WhatsAppFloatButton />
          <BackToTop />
          <CookieBanner />
          <Toaster richColors position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}