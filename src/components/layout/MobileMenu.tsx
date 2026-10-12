'use client';
import Link from 'next/link';
import { NAV_LINKS, SITE } from '@/lib/constants';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MobileMenu({ open, onOpenChange }: Props) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-[85%] sm:max-w-sm">
        <SheetHeader>
          <SheetTitle className="gold-gradient">Ouro Bonés</SheetTitle>
        </SheetHeader>
        <nav className="mt-6 flex flex-col gap-1" aria-label="Menu mobile">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => onOpenChange(false)}
              className="rounded-md px-3 py-3 text-base font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="mt-6 border-t pt-6 space-y-3">
          <p className="text-xs text-muted-foreground">{SITE.hours}</p>
          <Button
            asChild
            variant="whatsapp"
            className="w-full"
          >
            <a
              href={`https://wa.me/${SITE.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Falar com especialista
            </a>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}