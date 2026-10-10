"use client";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/zustand/useCartStore";

export function CartButton({ className }: { className?: string }) {
  const open = useCartStore((s) => s.open);
  const count = useCartStore((s) => s.items.reduce((a, i) => a + i.quantity, 0));

  return (
    <Button variant="default" className={className} onClick={open}>
      <ShoppingCart className="h-4 w-4" />
      Carrinho ({count})
    </Button>
  );
}