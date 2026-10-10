"use client";
import { useState } from "react";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useCartStore } from "@/lib/zustand/useCartStore";
import type { Product } from "@/types";

export function ProductDetailClient({ product }: { product: Product }) {
  const [variant, setVariant] = useState(product.variants[0]);
  const [qty, setQty] = useState(1);
  const addItem = useCartStore((s) => s.addItem);

  const handleAdd = () => {
    addItem(
      {
        id: product.id,
        name: product.name,
        variant,
        unitPrice: product.wholesalePrice,
        imageUrl: product.imageUrl,
      },
      qty
    );
    toast({ title: "Adicionado ao carrinho 🧢", description: `${qty}x ${product.name} • ${variant}` });
  };

  return (
    <div className="mt-6 space-y-4">
      <label className="block">
        <span className="text-sm font-medium text-foreground">Variação</span>
        <select
          value={variant}
          onChange={(e) => setVariant(e.target.value)}
          className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-3 text-sm"
        >
          {product.variants.map((v) => (
            <option key={v} value={v}>{v}</option>
          ))}
        </select>
      </label>

      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-foreground">Quantidade</span>
        <div className="flex items-center rounded-lg border border-border">
          <button
            type="button"
            aria-label="Diminuir"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="grid h-11 w-11 place-items-center hover:bg-accent"
          >
            <Minus className="h-4 w-4" />
          </button>
          <input
            type="number"
            inputMode="numeric"
            min={1}
            value={qty}
            onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
            className="h-11 w-16 border-x border-border bg-transparent text-center text-sm outline-none"
            aria-label="Quantidade"
          />
          <button
            type="button"
            aria-label="Aumentar"
            onClick={() => setQty((q) => q + 1)}
            className="grid h-11 w-11 place-items-center hover:bg-accent"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      <Button onClick={handleAdd} size="lg" className="w-full">
        <ShoppingCart className="h-4 w-4" /> Adicionar ao carrinho
      </Button>

      <p className="text-xs text-muted-foreground">
        Lembre-se: o pedido mínimo é de <strong>30 unidades</strong> somando todos os modelos.
      </p>
    </div>
  );
}