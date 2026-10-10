"use client";
import { useCartStore, MIN_ORDER_UNITS } from "@/lib/zustand/useCartStore";
import { Sheet, SheetContent, SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { CartItem } from "./CartItem";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { formatBRL } from "@/lib/utils";
import { ShoppingBag } from "lucide-react";

export function CartDrawer() {
  const isOpen = useCartStore((s) => s.isOpen);
  const close = useCartStore((s) => s.close);
  const items = useCartStore((s) => s.items);

  const totalUnits = items.reduce((a, i) => a + i.quantity, 0);
  const totalPrice = items.reduce((a, i) => a + i.quantity * i.unitPrice, 0);
  const missing = Math.max(0, MIN_ORDER_UNITS - totalUnits);
  const canCheckout = totalUnits >= MIN_ORDER_UNITS;

  const handleSend = () => {
    if (!canCheckout) return;
    window.open(buildWhatsAppLink(items, totalUnits, totalPrice), "_blank", "noopener,noreferrer");
  };

  return (
    <Sheet open={isOpen} onOpenChange={(v) => (v ? undefined : close())}>
      <SheetContent
        side="right"
        className="flex w-[92%] flex-col p-0 pt-safe pb-safe sm:w-[70%] md:w-[60%] lg:w-[420px]"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-4 py-4 pr-12 sm:px-5">
          <h2 className="flex items-center gap-2 text-base font-semibold">
            <ShoppingBag className="h-5 w-5 text-primary" /> Seu pedido
          </h2>
          <span className="text-xs text-muted-foreground">
            {totalUnits} {totalUnits === 1 ? "peça" : "peças"}
          </span>
        </div>

        {/* Lista */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-5">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 py-16 text-center">
              <div className="grid h-16 w-16 place-items-center rounded-full bg-muted text-2xl">
                🧢
              </div>
              <p className="text-sm font-medium text-foreground">Seu carrinho está vazio</p>
              <p className="max-w-xs text-xs text-muted-foreground">
                Adicione modelos e some até 30 peças para liberar o envio do orçamento.
              </p>
              <SheetClose asChild>
                <Button variant="outline" size="sm" className="mt-2">
                  Explorar modelos
                </Button>
              </SheetClose>
            </div>
          ) : (
            <ul className="divide-y divide-border py-2">
              {items.map((item) => (
                <CartItem key={`${item.id}-${item.variant}`} item={item} />
              ))}
            </ul>
          )}
        </div>

        {/* Footer fixo com safe-area */}
        <div className="sticky bottom-0 border-t border-border bg-background/95 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4 backdrop-blur sm:px-5">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Total</span>
            <span className="font-semibold text-foreground">{formatBRL(totalPrice)}</span>
          </div>

          {!canCheckout && items.length > 0 && (
            <p
              role="status"
              aria-live="polite"
              className="mt-2 rounded-lg bg-amber-100 px-3 py-2 text-xs font-medium text-amber-900 dark:bg-amber-950/40 dark:text-amber-200"
            >
              Faltam <strong>{missing}</strong>{" "}
              {missing === 1 ? "unidade" : "unidades"} para atingir o mínimo de {MIN_ORDER_UNITS}.
            </p>
          )}

          <Button
            onClick={handleSend}
            disabled={!canCheckout}
            aria-disabled={!canCheckout}
            className="mt-3 h-12 w-full text-sm font-semibold sm:text-base"
          >
            {canCheckout
              ? "Enviar Pedido via WhatsApp"
              : `Mínimo ${MIN_ORDER_UNITS} unidades`}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}