"use client";
import { useCartStore, MIN_ORDER_UNITS } from "@/lib/zustand/useCartStore";
import { Sheet, SheetContent, SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { CartItem } from "./CartItem";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { formatBRL } from "@/lib/utils";
import { ShoppingBag, LogIn } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/components/providers/AuthProvider";

export function CartDrawer() {
  const router = useRouter();
  const { user } = useAuthContext();
  const isOpen = useCartStore((s) => s.isOpen);
  const close = useCartStore((s) => s.close);
  const items = useCartStore((s) => s.items);

  const totalUnits = items.reduce((a, i) => a + i.quantity, 0);
  const totalPrice = items.reduce((a, i) => a + i.quantity * i.unitPrice, 0);
  const missing = Math.max(0, MIN_ORDER_UNITS - totalUnits);
  const canCheckout = totalUnits >= MIN_ORDER_UNITS && !!user;

  const handleSend = () => {
    if (!canCheckout) return;
    window.open(buildWhatsAppLink(items, totalUnits, totalPrice), "_blank", "noopener,noreferrer");
  };

  const handleGoLogin = () => {
    close();
    router.push("/login");
  };
