"use client";
import { useEffect } from "react";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { useCartStore } from "@/lib/zustand/useCartStore";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const isOpen = useCartStore((s) => s.isOpen);

  // Trava scroll quando o drawer está aberto
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {children}
      <CartDrawer />
    </>
  );
}