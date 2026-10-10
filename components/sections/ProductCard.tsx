"use client";
import Image from "next/image";
import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useCartStore } from "@/lib/zustand/useCartStore";
import { formatBRL } from "@/lib/utils";
import type { Product } from "@/types";

export function ProductCard({ product }: { product: Product }) {
  const [variant, setVariant] = useState(product.variants[0]);
  const addItem = useCartStore((s) => s.addItem);

  const handleAdd = () => {
    addItem({
      id: product.id,
      name: product.name,
      variant,
      unitPrice: product.wholesalePrice,
      imageUrl: product.imageUrl,
    });
    toast({
      title: "Adicionado ao carrinho 🧢",
      description: `${product.name} • ${variant}`,
      className: "animate-pop-in",
    });
  };

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
      <div className="relative aspect-square overflow-hidden bg-secondary">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
        <div className="flex-1">
          <h3 className="text-sm font-semibold leading-snug text-foreground sm:text-base">
            {product.name}
          </h3>
          <p className="mt-1 line-clamp-2 text-xs text-muted-foreground sm:text-sm">
            {product.description}
          </p>
        </div>

        {product.variants.length > 1 && (
          <label className="block">
            <span className="sr-only">Variação</span>
            <select
              value={variant}
              onChange={(e) => setVariant(e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs sm:text-sm"
            >
              {product.variants.map((v) => (
                <option key={v} value={v}>{v}</option>
              ))}
            </select>
          </label>
        )}

        <div className="flex items-center justify-between gap-3">
          <div className="leading-tight">
            <p className="text-[10px] uppercase text-muted-foreground">Atacado</p>
            <p className="text-sm font-bold text-foreground sm:text-base">
              {formatBRL(product.wholesalePrice)}
            </p>
          </div>

          <Button
            size="sm"
            onClick={handleAdd}
            className="h-11 min-w-[44px] px-4"
            aria-label={`Adicionar ${product.name} ao carrinho`}
          >
            <Plus className="h-4 w-4" /> Adicionar
          </Button>
        </div>
      </div>
    </article>
  );
}