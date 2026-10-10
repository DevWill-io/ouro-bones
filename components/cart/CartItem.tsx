"use client";
import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore, type CartItem as TItem } from "@/lib/zustand/useCartStore";
import { formatBRL } from "@/lib/utils";

export function CartItem({ item }: { item: TItem }) {
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateNotes = useCartStore((s) => s.updateNotes);

  const subtotal = item.unitPrice * item.quantity;

  return (
    <li className="flex gap-3 py-4">
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-secondary sm:h-20 sm:w-20">
        {item.imageUrl ? (
          <Image src={item.imageUrl} alt={item.name} fill sizes="80px" className="object-cover" />
        ) : (
          <span className="grid h-full w-full place-items-center text-2xl">🧢</span>
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-foreground">{item.name}</p>
            <p className="truncate text-xs text-muted-foreground">{item.variant}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {formatBRL(item.unitPrice)} / un.
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            aria-label={`Remover ${item.name}`}
            onClick={() => removeItem(item.id, item.variant)}
            className="h-9 w-9 shrink-0 text-muted-foreground hover:text-red-500"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center justify-between gap-2">
          {/* Stepper */}
          <div className="flex items-center rounded-lg border border-border">
            <button
              type="button"
              aria-label="Diminuir quantidade"
              onClick={() => updateQuantity(item.id, item.variant, item.quantity - 1)}
              className="grid h-9 w-9 place-items-center rounded-l-lg hover:bg-accent disabled:opacity-40"
              disabled={item.quantity <= 1}
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <input
              type="number"
              inputMode="numeric"
              min={1}
              value={item.quantity}
              onChange={(e) =>
                updateQuantity(item.id, item.variant, Number(e.target.value) || 1)
              }
              className="h-9 w-12 border-x border-border bg-transparent text-center text-sm outline-none"
              aria-label="Quantidade"
            />
            <button
              type="button"
              aria-label="Aumentar quantidade"
              onClick={() => updateQuantity(item.id, item.variant, item.quantity + 1)}
              className="grid h-9 w-9 place-items-center rounded-r-lg hover:bg-accent"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>

          <span className="text-sm font-semibold text-foreground">{formatBRL(subtotal)}</span>
        </div>

        <input
          type="text"
          placeholder="Observações (logo, cores, prazo...)"
          value={item.notes ?? ""}
          onChange={(e) => updateNotes(item.id, item.variant, e.target.value)}
          className="w-full rounded-lg border border-border bg-transparent px-2 py-1.5 text-xs placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
        />
      </div>
    </li>
  );
}