'use client';
import Link from 'next/link';
import { Menu, ShoppingBag } from 'lucide-react';
import { useState } from 'react';
import { NAV_LINKS } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from './ThemeToggle';
import { MobileMenu } from './MobileMenu';
import { useCartStore } from '@/stores/cartStore';

export function Header() {
  const [openMobile, setOpenMobile] = useState(false);
  const totalItems = useCartStore((s) => s.items.reduce((sum, i) => sum + i.quantity, 0));
  const openCart = useCartStore((s) => s.open);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur safe-top">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <span className="inline-block h-7 w-7 rounded-full bg-primary" aria-hidden />
          <span className="gold-gradient">Ouro Bonés</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1" aria-label="Menu principal">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            aria-label="Abrir carrinho"
            className="relative"
            onClick={openCart}
          >
            <ShoppingBag className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
                {totalItems}
              </span>
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-label="Abrir menu"
            onClick={() => setOpenMobile(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
      <MobileMenu open={openMobile} onOpenChange={setOpenMobile} />
    </header>
  );
}