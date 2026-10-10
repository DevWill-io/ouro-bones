import Image from "next/image";
import { notFound } from "next/navigation";
import { getProduct } from "@/lib/firestore/products";
import { ProductDetailClient } from "@/components/sections/ProductDetailClient";
import { formatBRL } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);
  if (!product || !product.active) return notFound();

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="relative aspect-square overflow-hidden rounded-2xl border border-border bg-secondary">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
            className="object-cover"
          />
        </div>

        <div>
          <h1 className="text-2xl font-bold leading-tight text-foreground sm:text-3xl lg:text-4xl">
            {product.name}
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
            {product.description}
          </p>
          <p className="mt-4 text-2xl font-bold text-primary sm:text-3xl">
            {formatBRL(product.wholesalePrice)}
            <span className="ml-2 text-sm font-normal text-muted-foreground">/ un. atacado</span>
          </p>

          <ProductDetailClient product={product} />
        </div>
      </div>
    </div>
  );
}