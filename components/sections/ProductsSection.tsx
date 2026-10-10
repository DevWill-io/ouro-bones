"use client";
import { useEffect, useState } from "react";
import { listActiveProducts } from "@/lib/firestore/products";
import type { Product } from "@/types";
import { ProductCard } from "@/components/sections/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";

export function ProductsSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listActiveProducts()
      .then(setProducts)
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="produtos" className="w-full bg-secondary/40 py-14 dark:bg-card/40 sm:py-16 lg:py-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
            Vitrine
          </span>
          <h2 className="mt-4 text-2xl font-bold leading-tight text-foreground sm:text-3xl lg:text-4xl">
            Escolha seus modelos
          </h2>
          <p className="mt-3 text-sm text-muted-foreground sm:text-base">
            Monte o carrinho somando todos os modelos até atingir o mínimo de 30 peças.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => (
                <Skeleton key={i} className="h-80 rounded-2xl" />
              ))
            : products.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>

        {!loading && products.length === 0 && (
          <p className="mt-10 text-center text-sm text-muted-foreground">
            Nenhum produto cadastrado ainda.
          </p>
        )}
      </div>
    </section>
  );
}