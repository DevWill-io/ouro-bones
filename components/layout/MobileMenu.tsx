"use client";
import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

type NavItem = { label: string; href: string };

export function MobileMenu({
  nav,
  onLogout,
}: {
  nav: NavItem[];
  onLogout?: () => void | Promise<void>;
}) {
  const [open, setOpen] = useState(false);

  const handleClick = async (item: NavItem) => {
    if (item.href === "#logout" && onLogout) {
      setOpen(false);
      await onLogout();
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Abrir menu"
          className="h-11 w-11 lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-[85%] max-w-sm pt-safe pb-safe"
      >
        <nav className="mt-8 flex flex-col gap-1">
          {nav.map((item) =>
            item.href === "#logout" ? (
              <SheetClose asChild key={item.href}>
                <button
                  type="button"
                  onClick={() => handleClick(item)}
                  className="w-full rounded-lg px-3 py-3 text-left text-base font-medium text-foreground transition-colors hover:bg-accent"
                >
                  {item.label}
                </button>
              </SheetClose>
            ) : item.href.startsWith("/") ? (
              <SheetClose asChild key={item.href}>
                <a
                  href={item.href}
                  className="rounded-lg px-3 py-3 text-base font-medium text-foreground transition-colors hover:bg-accent"
                >
                  {item.label}
                </a>
              </SheetClose>
            ) : (
              <SheetClose asChild key={item.href}>
                <a
                  href={item.href}
                  className="rounded-lg px-3 py-3 text-base font-medium text-foreground transition-colors hover:bg-accent"
                >
                  {item.label}
                </a>
              </SheetClose>
            )
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
